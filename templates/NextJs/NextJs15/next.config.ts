import withBundleAnalyzer from '@next/bundle-analyzer';
import { type NextConfig } from 'next';

import { env } from './env.mjs';

const config: NextConfig = {
  experimental: {
    turbo: {
      resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
    },
  },
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  rewrites: async () => [
    { source: '/healthz', destination: '/api/health' },
    { source: '/api/healthz', destination: '/api/health' },
    { source: '/health', destination: '/api/health' },
    { source: '/ping', destination: '/api/health' },
  ],
};

export default env.ANALYZE ? withBundleAnalyzer({ enabled: env.ANALYZE })(config) : config;
