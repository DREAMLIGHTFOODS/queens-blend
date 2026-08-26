import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thequeensblend.com",
      },
    ],
  },
};

export default nextConfig;
