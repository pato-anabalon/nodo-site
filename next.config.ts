import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.1.33'],
  async headers() {
    return [
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },
  async redirects() {
    return [
      {
        source: '/pricing',
        destination: '/plans',
        permanent: true
      },
      {
        source: '/pricing/:path*',
        destination: '/plans',
        permanent: true
      }
    ];
  }
};

export default nextConfig;
