# Multi-stage Dockerfile für Next.js 14 mit pnpm
# Optimiert für Produktion mit kleinem Image

# Build Stage
FROM node:18-alpine AS builder

# Arbeitsverzeichnis setzen
WORKDIR /app

# pnpm installieren
RUN corepack enable && corepack prepare pnpm@latest --activate

# Package Files kopieren
COPY package.json pnpm-lock.yaml ./

# Dependencies installieren (nur production)
RUN pnpm install --frozen-lockfile

# Source Code kopieren
COPY . .

# Next.js Build
RUN pnpm build

# Production Stage
FROM node:18-alpine AS runner

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

# Health Check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start Kommando
CMD ["node", "server.js"]