import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "air-cloud-msk.ru",
      },
      {
        protocol: "https",
        hostname: "www.air-cloud-msk.ru",
      },
    ],
  },
};

export default nextConfig;
