import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ProductCard } from "@/components/product-card";
import { buildPageMetadata } from "@/lib/page-metadata";
import { prisma } from "@/lib/prisma";
import { getCategories } from "@/lib/queries/categories";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ category?: string }>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { category: categorySlug } = await searchParams;

  if (categorySlug) {
    const category = await prisma.category.findUnique({
      where: { slug: categorySlug },
    });

    if (category) {
      return buildPageMetadata({
        title: `${category.name} — гелевые шары в Москве`,
        description: `Композиции из гелевых шаров: ${category.name.toLowerCase()}. Заказ с доставкой по Москве. Air Cloud MSK.`,
        path: `/catalog?category=${category.slug}`,
      });
    }
  }

  return buildPageMetadata({
    title: "Каталог гелевых шаров — композиции на праздник",
    description:
      "Каталог композиций из гелевых шаров в Москве: гендер-пати, выписка, дни рождения, свадьбы. Цены и фото. Заказ по согласованию.",
    path: "/catalog",
  });
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category: categorySlug } = await searchParams;

  const categories = await getCategories();

  const activeCategory = categorySlug
    ? categories.find((category) => category.slug === categorySlug)
    : null;

  const products = await prisma.product.findMany({
    where: {
      published: true,
      ...(categorySlug ? { category: { slug: categorySlug } } : {}),
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const chipActive = "bg-rose-dusty text-white shadow-sm";
  const chipIdle =
    "border border-neutral-border bg-neutral-surface text-[#6b6560] hover:border-rose-dusty-light hover:text-rose-dusty-dark";

  const breadcrumbItems = [
    { name: "Главная", href: "/" },
    { name: "Каталог", href: "/catalog", current: !activeCategory },
    ...(activeCategory
      ? [
          {
            name: activeCategory.name,
            href: `/catalog?category=${activeCategory.slug}`,
            current: true,
          },
        ]
      : []),
  ];

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-text">
            Каталог
          </p>
          <h1 className="mt-2 text-4xl font-bold text-[#3d3a36]">
            {activeCategory ? activeCategory.name : "Шары с гелием"}
          </h1>
          <p className="mt-2 text-[#6b6560]">
            {activeCategory
              ? `Композиции для «${activeCategory.name.toLowerCase()}» — ${products.length} ${products.length === 1 ? "вариант" : products.length < 5 ? "варианта" : "вариантов"}`
              : "Композиции из гелевых шаров на любой праздник в Москве"}
          </p>
        </div>

        <div className="sticky top-[7.5rem] z-30 -mx-4 mb-8 border-b border-neutral-border bg-cream/90 px-4 py-3 backdrop-blur-md sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
          <div className="flex flex-wrap gap-2">
            <Link
              href="/catalog"
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${!categorySlug ? chipActive : chipIdle}`}
            >
              Все
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/catalog?category=${category.slug}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  categorySlug === category.slug ? chipActive : chipIdle
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-border bg-neutral-surface p-12 text-center text-[#6b6560]">
            <p>В этой категории пока нет товаров.</p>
            <Link
              href="/catalog"
              className="mt-4 inline-block text-sm font-medium text-rose-dusty-dark hover:text-rose-dusty"
            >
              Смотреть весь каталог →
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </SiteShell>
  );
}
