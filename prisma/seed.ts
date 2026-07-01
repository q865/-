import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
import { DEFAULT_SITE_SETTINGS } from "../src/lib/constants/defaults";
import { SEED_CATEGORIES, SEED_PRODUCTS } from "../src/lib/seed-products";
import { getSeedImagesForProduct } from "../src/lib/stock-images";
import { stringifyImages } from "../src/lib/utils";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: DEFAULT_SITE_SETTINGS,
    create: { id: 1, ...DEFAULT_SITE_SETTINGS },
  });

  for (const category of SEED_CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  const categoryMap = Object.fromEntries(
    (await prisma.category.findMany()).map((category) => [category.slug, category.id]),
  );

  for (const product of SEED_PRODUCTS) {
    const categoryId = categoryMap[product.categorySlug];
    if (!categoryId) {
      console.warn(`Skip ${product.slug}: unknown category ${product.categorySlug}`);
      continue;
    }

    const images = getSeedImagesForProduct(
      product.slug,
      product.categorySlug,
      product.featured,
    );

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: product.description,
        price: product.price,
        featured: product.featured,
        images: stringifyImages(images),
        categoryId,
        published: true,
      },
      create: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        featured: product.featured,
        images: stringifyImages(images),
        categoryId,
        published: true,
      },
    });
  }

  console.log(`Seeded ${SEED_CATEGORIES.length} categories, ${SEED_PRODUCTS.length} products.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
