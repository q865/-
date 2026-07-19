import type { SiteSettings } from "@/generated/prisma/client";
import { SITE_BRAND_NAME } from "@/lib/site-config";

/** Единый источник дефолтов настроек — используется в seed, API и fallback. */
export const DEFAULT_SITE_SETTINGS: Omit<SiteSettings, "id"> = {
  siteName: SITE_BRAND_NAME,
  telegramUrl: "https://t.me/air_cloud_msk",
  vkUrl: "https://vk.ru/vozdushnyesharymsk",
  maxUrl: "",
  phone: "+79652955956",
  pickupAddress: "Лобненская ул., 13к1, ЖК «Дмитровский парк»",
  heroTitle: "Создаём волшебство!",
  heroSubtitle:
    "Композиции на заказ: гендер-пати, выписка из роддома, дни рождения и свадьбы. Согласуем дату, цвета и доставку — напишите в Telegram или VK.",
  heroImageUrl: "/brand/hero.jpg",
  seoTitle:
    "Гелевые шары с доставкой в Москве — Воздушное облако | Композиции на праздник",
  seoDescription:
    "Воздушное облако — композиции из гелевых шаров в Москве: гендер-пати, выписка, дни рождения, свадьбы. Индивидуальный подбор, доставка по согласованию. Telegram, VK, телефон.",
};

export const UPLOAD_MAX_BYTES = 5 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export const ALLOWED_IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
