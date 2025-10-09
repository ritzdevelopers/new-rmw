/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
  },
  eslint: {
    // ⚠️ This disables ESLint during builds (optional)
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
