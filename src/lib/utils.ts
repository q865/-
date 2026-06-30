import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  const map: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh",
    з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o",
    п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts",
    ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
  };

  return text
    .toLowerCase()
    .split("")
    .map((char) => map[char] ?? char)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("7")) {
    return `+7 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 9)}-${digits.slice(9, 11)}`;
  }
  return phone;
}

export function parseImages(images: string): string[] {
  try {
    const parsed = JSON.parse(images) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

const PLACEHOLDER = "/placeholder-product.svg";

export function isPlaceholderImage(url: string): boolean {
  return url.includes("placeholder");
}

/** Первое реальное фото или заглушка для карточки/обложки */
export function getProductCoverImage(images: string): string {
  const list = parseImages(images);
  const real = list.find((item) => !isPlaceholderImage(item));
  return real ?? PLACEHOLDER;
}

/** Галерея без заглушек; если фото нет — одна заглушка */
export function getProductGallery(images: string): string[] {
  const list = parseImages(images).filter((item) => !isPlaceholderImage(item));
  return list.length > 0 ? list : [PLACEHOLDER];
}

export function stringifyImages(images: string[]): string {
  const cleaned = images.filter((item) => item && !isPlaceholderImage(item));
  return JSON.stringify(cleaned);
}
