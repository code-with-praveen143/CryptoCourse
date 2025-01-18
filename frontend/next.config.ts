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
      {
        protocol: 'https',
        hostname: 'https://res.cloudinary.com/',
        port: '',
        pathname: '/dpzpn3dkw/image/**',
        search: '',
      }
    ],
  },
};

export default nextConfig;
