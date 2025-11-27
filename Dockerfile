# Multi-stage Dockerfile für Next.js mit pnpm
# Optimiert für Produktion mit kleinem Image
# Node- und pnpm-Versionen werden dynamisch aus .nvmrc und package.json gelesen

# Build Stage
FROM node:22-alpine AS builder

# Arbeitsverzeichnis setzen
WORKDIR /app

# Kopiere zuerst .nvmrc und package.json für Version-Extraktion
COPY .nvmrc package.json pnpm-lock.yaml ./

# Extrahiere pnpm Version aus package.json und installiere
RUN export PNPM_VERSION=$(node -e "const pkg=require('./package.json'); const pm=pkg.packageManager||'pnpm@10.15.0'; console.log(pm.split('@')[1])") && \
    echo "📌 Using pnpm version: $PNPM_VERSION" && \
    corepack enable && \
    corepack prepare pnpm@${PNPM_VERSION} --activate

# Dependencies installieren (nur production)
RUN pnpm install --frozen-lockfile

# Source Code kopieren
COPY . .

# Next.js Build
RUN pnpm build

# Production Stage
FROM node:22-alpine AS runner

WORKDIR /app

# Non-root user für Sicherheit
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Next.js Build Artefakte kopieren
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Ownership ändern
RUN chown -R nextjs:nodejs /app
USER nextjs

# Port exposieren
EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start Kommando
CMD ["node", "server.js"]