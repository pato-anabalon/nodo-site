import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.1.33'],
  async redirects() {
    return [
      {
        source: '/pricing',
        destination: '/plans',
        permanent: true,
      },
      {
        source: '/pricing/:path*',
        destination: '/plans',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
