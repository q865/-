import type { MetadataRoute } from "next";
import { SITE_BRAND_NAME } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_BRAND_NAME} — гелевые шары`,
    short_name: SITE_BRAND_NAME,
    description: "Композиции из гелевых шаров с доставкой по Москве",
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f2",
    theme_color: "#a68b67",
    lang: "ru",
  };
}
