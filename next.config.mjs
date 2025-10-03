import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Standalone Output für Docker optimiert
  output: 'standalone',
  // Für bessere Docker Performance
  experimental: {
    outputFileTracingRoot: process.cwd(),
  },
};

export default withNextIntl(nextConfig);
