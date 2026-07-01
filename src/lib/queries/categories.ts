import { cache } from "react";
import { prisma } from "@/lib/prisma";

/** Категории каталога — кэш на один HTTP-запрос. */
export const getCategories = cache(async () => {
  return prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });
});

/** Краткий список категорий для подвала. */
export const getFooterCategories = cache(async (take = 6) => {
  return prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    take,
    select: { name: true, slug: true },
  });
});
