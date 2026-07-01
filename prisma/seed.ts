import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
import { stringifyImages } from "../src/lib/utils";
import { DEFAULT_SITE_SETTINGS } from "../src/lib/constants/defaults";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const categories = [
  { name: "Гелевые композиции", slug: "gelevye-kompozicii", sortOrder: 1 },
  { name: "Гендер-пати", slug: "gender-pati", sortOrder: 2 },
  { name: "Выписка из роддома", slug: "vypiska", sortOrder: 3 },
  { name: "Дни рождения", slug: "dni-rozhdeniya", sortOrder: 4 },
  { name: "Свадьбы и торжества", slug: "svadby", sortOrder: 5 },
];

const products = [
  {
    name: "Набор для гендер-пати",
    slug: "nabor-gender-pati",
    description:
      "Композиция из гелевых шаров с секретным цветом — идеально для раскрытия пола малыша.",
    price: 4500,
    categorySlug: "gender-pati",
    featured: true,
    images: [],
  },
  {
    name: "Оформление выписки «Небесная нежность»",
    slug: "vypiska-nebesnaya-nezhnost",
    description:
      "Нежная композиция в голубых и белых тонах для торжественной выписки из роддома.",
    price: 5500,
    categorySlug: "vypiska",
    featured: true,
    images: [],
  },
  {
    name: "Фонтан из шаров",
    slug: "fontan-iz-sharov",
    description: "Эффектная композиция-фонтан для фотозоны и праздничного зала.",
    price: 3800,
    categorySlug: "gelevye-kompozicii",
    featured: true,
    images: [],
  },
  {
    name: "Цифра на день рождения",
    slug: "cifra-den-rozhdeniya",
    description: "Большая цифра из гелевых шаров — любой возраст и цветовая гамма.",
    price: 3200,
    categorySlug: "dni-rozhdeniya",
    featured: false,
    images: [],
  },
  {
    name: "Арка для свадьбы",
    slug: "arka-svadba",
    description: "Романтическая арка из шаров для церемонии или фотозоны.",
    price: 8900,
    categorySlug: "svadby",
    featured: true,
    images: [],
  },
  {
    name: "Букет из шаров",
    slug: "buket-iz-sharov",
    description: "Яркий букет из фольгированных и гелевых шаров — отличный подарок.",
    price: 2800,
    categorySlug: "gelevye-kompozicii",
    featured: false,
    images: [],
  },
];

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: DEFAULT_SITE_SETTINGS,
    create: { id: 1, ...DEFAULT_SITE_SETTINGS },
  });

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
  }

  const categoryMap = Object.fromEntries(
    (await prisma.category.findMany()).map((category) => [category.slug, category.id]),
  );

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: product.description,
        price: product.price,
        featured: product.featured,
        images: stringifyImages(product.images),
        categoryId: categoryMap[product.categorySlug],
        published: true,
      },
      create: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        featured: product.featured,
        images: stringifyImages(product.images),
        categoryId: categoryMap[product.categorySlug],
        published: true,
      },
    });
  }
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
