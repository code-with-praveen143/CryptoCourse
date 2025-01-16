import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'learn.swyftx.com',
        port: '',
        pathname: '/wp-content/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
