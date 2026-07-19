import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      // Прямой заход на www (Host)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.air-cloud-msk.ru" }],
        destination: "https://air-cloud-msk.ru/:path*",
        permanent: true,
      },
      // Через RU-прокси: Host = vercel.app, реальный хост в X-Forwarded-Host
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "x-forwarded-host",
            value: "www.air-cloud-msk.ru",
          },
        ],
        destination: "https://air-cloud-msk.ru/:path*",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "air-cloud-msk.ru",
      },
      {
        protocol: "https",
        hostname: "www.air-cloud-msk.ru",
      },
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
