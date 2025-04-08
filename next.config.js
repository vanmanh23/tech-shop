// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
  },
  /* config options here */
};
module.exports = nextConfig;
// export default nextConfig;
