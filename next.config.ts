import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'logo.clearbit.com', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.worldvectorlogo.com', pathname: '/**' },
      { protocol: 'https', hostname: 'upload.wikimedia.org', pathname: '/**' },
    ],
  },
};

export default nextConfig;
