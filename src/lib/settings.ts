import { prisma } from "@/lib/prisma";
import type { SiteSettings } from "@/generated/prisma/client";

const defaultSettings: SiteSettings = {
  id: 1,
  siteName: "Air Cloud MSK",
  telegramUrl: "https://t.me/air_cloud_msk",
  vkUrl: "https://vk.ru/vozdushnyesharymsk",
  maxUrl: "",
  phone: "+79652955956",
  heroTitle: "Композиции из гелевых шаров",
  heroSubtitle:
    "Оформление праздников в Москве — гендер-пати, выписка, дни рождения",
  seoTitle: "Air Cloud MSK — гелевые шары и оформление праздников в Москве",
  seoDescription:
    "Композиции из гелевых шаров на заказ: гендер-пати, выписка из роддома, дни рождения. Москва. Заказ через Telegram, VK или MAX.",
};

export async function getSettings(): Promise<SiteSettings> {
  const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
  return settings ?? defaultSettings;
}

export function buildTelegramOrderUrl(telegramUrl: string, productName?: string) {
  const base = telegramUrl.replace(/\/$/, "");
  if (!productName) return base;

  const text = encodeURIComponent(
    `Здравствуйте! Хочу заказать: ${productName}`,
  );
  return `${base}?text=${text}`;
}

export function buildTelUrl(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `tel:+${digits.startsWith("7") ? digits : `7${digits}`}`;
}
