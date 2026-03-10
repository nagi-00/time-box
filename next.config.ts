import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/time-box',
  assetPrefix: '/time-box/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
