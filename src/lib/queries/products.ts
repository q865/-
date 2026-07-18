import { cache } from "react";
import { prisma } from "@/lib/prisma";

const productInclude = { category: true } as const;

/** Опубликованный товар по slug — для публичных страниц и metadata. */
export const getPublishedProductBySlug = cache(async (slug: string) => {
  try {
    return await prisma.product.findUnique({
      where: { slug, published: true },
      include: productInclude,
    });
  } catch (error) {
    console.error("[getPublishedProductBySlug]", slug, error);
    return null;
  }
});

/** Все опубликованные товары для главной и каталога. */
export const getPublishedProducts = cache(async () => {
  try {
    return await prisma.product.findMany({
      where: { published: true },
      include: productInclude,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("[getPublishedProducts]", error);
    return [];
  }
});

/** Похожие товары из той же категории. */
export async function getRelatedProducts(categoryId: string, excludeId: string, take = 4) {
  try {
    return await prisma.product.findMany({
      where: {
        published: true,
        categoryId,
        id: { not: excludeId },
      },
      include: productInclude,
      take,
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("[getRelatedProducts]", categoryId, error);
    return [];
  }
}
