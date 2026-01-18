import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://dev.syntx-system.com/api/:path*',
      },
      {
        source: '/resonanz/:path*',
        destination: 'https://dev.syntx-system.com/resonanz/:path*',
      },
      {
        source: '/mapping/:path*',
        destination: 'https://dev.syntx-system.com/mapping/:path*',
      },
      {
        source: '/scoring/:path*',
        destination: 'https://dev.syntx-system.com/scoring/:path*',
      },
      {
        source: '/profiles/:path*',
        destination: 'https://dev.syntx-system.com/profiles/:path*',
      },
      {
        source: '/drift/:path*',
        destination: 'https://dev.syntx-system.com/drift/:path*',
      },
      {
        source: '/wrapper/:path*',
        destination: 'https://dev.syntx-system.com/wrapper/:path*',
      },
      {
        source: '/health',
        destination: 'https://dev.syntx-system.com/health',
      },
    ];
  },
};

export default nextConfig;
