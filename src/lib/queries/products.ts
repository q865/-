import { cache } from "react";
import { prisma } from "@/lib/prisma";

const productInclude = { category: true } as const;

/** Опубликованный товар по slug — для публичных страниц и metadata. */
export const getPublishedProductBySlug = cache(async (slug: string) => {
  return prisma.product.findUnique({
    where: { slug, published: true },
    include: productInclude,
  });
});

/** Все опубликованные товары для главной и каталога. */
export const getPublishedProducts = cache(async () => {
  return prisma.product.findMany({
    where: { published: true },
    include: productInclude,
    orderBy: { createdAt: "desc" },
  });
});

/** Похожие товары из той же категории. */
export async function getRelatedProducts(categoryId: string, excludeId: string, take = 4) {
  return prisma.product.findMany({
    where: {
      published: true,
      categoryId,
      id: { not: excludeId },
    },
    include: productInclude,
    take,
    orderBy: { createdAt: "desc" },
  });
}
