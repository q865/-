import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Air Cloud MSK — гелевые шары",
    short_name: "Air Cloud",
    description: "Композиции из гелевых шаров с доставкой по Москве",
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f2",
    theme_color: "#c4a0a0",
    lang: "ru",
  };
}
