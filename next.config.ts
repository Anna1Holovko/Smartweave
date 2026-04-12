import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Legacy / default browser requests → same asset as tab (public/favicon.png)
      { source: '/favicon.ico', destination: '/favicon.png', permanent: false },
      { source: '/apple-touch-icon.png', destination: '/favicon.png', permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'logo.clearbit.com', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.worldvectorlogo.com', pathname: '/**' },
      { protocol: 'https', hostname: 'upload.wikimedia.org', pathname: '/**' },
      { protocol: 'https', hostname: 'www.notion.so', pathname: '/**' },
      { protocol: 'https', hostname: 'notion.so', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      /** Notion file / cover URLs (S3 presigned paths are multi-segment; `*` is not enough). */
      { protocol: 'https', hostname: '**.amazonaws.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.amazon.com', pathname: '/**' },
      { protocol: 'https', hostname: '**.notionusercontent.com', pathname: '/**' },
      /** Full URL covers pointing at this site still go through next/image when passed as absolute. */
      { protocol: 'https', hostname: 'smartweave.pl', pathname: '/**' },
      { protocol: 'https', hostname: 'www.smartweave.pl', pathname: '/**' },
    ],
  },
};

export default nextConfig;
