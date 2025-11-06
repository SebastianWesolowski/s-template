import withBundleAnalyzer from '@next/bundle-analyzer';
import { type NextConfig } from 'next';
import path from 'path';
import { env } from './env.mjs';
const isProd = process.env.NODE_ENV === 'production';

// Security headers configuration
const securityHeaders = [
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
];

const config: NextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  rewrites: async () => [
    { source: '/healthz', destination: '/api/health' },
    { source: '/api/healthz', destination: '/api/health' },
    { source: '/health', destination: '/api/health' },
    { source: '/ping', destination: '/api/health' },
  ],
  typescript: {
    tsconfigPath: isProd ? './tsconfig.build.json' : './tsconfig.json',
  },
  pageExtensions: ['mdx', 'md', 'tsx', 'ts', 'jsx', 'js'],
  sassOptions: {
    includePaths: [path.join(process.cwd(), './src/styles')],
  },
  eslint: {
    dirs: ['src/components', 'src/lib', 'src/pages', 'src/styles', 'src/app'],
    ignoreDuringBuilds: isProd,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};

export default env.ANALYZE ? withBundleAnalyzer({ enabled: true, openAnalyzer: false })(config) : config;
