import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com', // <--- ADD THIS for Premium images
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'theharleylounge.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'events.theharleylounge.com',
        pathname: '/**',
      },
        {
        protocol: 'https',
        hostname: 'harleystreetlongevityclub.com',
        pathname: '/**',
      },
         {
        protocol: 'https',
        hostname: 'shutterstock.com',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: true, 
};

export default nextConfig;