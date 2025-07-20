import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [{
        protocol: 'https',
        hostname: 'res.cloudinary.com',
    }]
  },
  eslint:{
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
