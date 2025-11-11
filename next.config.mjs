import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Standalone output für Docker - nur für Linux/Production aktivieren
  // Unter Windows mit Symlink-Problemen deaktivieren und stattdessen standard build nutzen
  ...(process.platform !== 'win32' && {
    output: 'standalone',
    outputFileTracingRoot: process.cwd(),
  }),
};

export default withNextIntl(nextConfig);
