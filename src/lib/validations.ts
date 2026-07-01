import { z } from "zod";

export const orderSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(6).max(30),
  product: z.string().trim().max(200).optional(),
  message: z.string().trim().max(2000).optional(),
});

export const productSchema = z.object({
  name: z.string().trim().min(2).max(200),
  slug: z.string().trim().max(80).optional(),
  description: z.string().trim().max(5000).optional(),
  price: z.coerce.number().int().min(0).max(10_000_000),
  images: z.array(z.string().trim().max(500)).max(20).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  categoryId: z.string().trim().min(1),
});

export const categorySchema = z.object({
  name: z.string().trim().min(2).max(100),
  slug: z.string().trim().max(80).optional(),
  image: z.string().trim().max(500).nullable().optional(),
  sortOrder: z.coerce.number().int().min(0).max(9999).optional(),
});

const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .refine((value) => value === "" || URL.canParse(value), "Некорректный URL");

export const settingsSchema = z.object({
  siteName: z.string().trim().min(1).max(100).optional(),
  telegramUrl: optionalUrl.optional(),
  vkUrl: optionalUrl.optional(),
  maxUrl: optionalUrl.optional(),
  phone: z.string().trim().min(6).max(30).optional(),
  heroTitle: z.string().trim().min(1).max(200).optional(),
  heroSubtitle: z.string().trim().max(500).optional(),
  heroImageUrl: z.string().trim().max(500).optional(),
  seoTitle: z.string().trim().min(1).max(200).optional(),
  seoDescription: z.string().trim().max(500).optional(),
});
