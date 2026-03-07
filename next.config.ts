import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh6.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
