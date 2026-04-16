const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ritzmediaworld.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "etorisoft.com",
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  eslint: {
    // ⚠️ This disables ESLint during builds (optional)
    ignoreDuringBuilds: true,
  },
  // Compress responses
  compress: true,
  // Enable production source maps for better debugging
  productionBrowserSourceMaps: false,
  // Optimize package imports
  modularizeImports: {
    'react-icons': {
      transform: 'react-icons/{{member}}',
      skipDefaultConversion: true,
    },
  },
  // Note: optimizeCss requires 'critters' package
  // experimental: {
  //   optimizeCss: true,
  // },
  // Headers for better caching and security
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|ico|avif|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias || {}),
        "@": path.resolve(__dirname, "src"),
      },
    };
    return config;
  },
};

module.exports = nextConfig;
