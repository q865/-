import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CatalogView } from "@/components/catalog/catalog-view";
import { buildPageMetadata } from "@/lib/page-metadata";
import { SITE_BRAND_NAME } from "@/lib/site-config";
import { prisma } from "@/lib/prisma";
import { getCategories } from "@/lib/queries/categories";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ category?: string; q?: string; sort?: string }>;

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
        description: `Композиции из гелевых шаров: ${category.name.toLowerCase()}. Заказ с доставкой по Москве. ${SITE_BRAND_NAME}.`,
        path: `/catalog?category=${category.slug}`,
      });
    }
  }

  return buildPageMetadata({
    title: "Каталог гелевых шаров — композиции на праздник",
    description: `Каталог композиций из гелевых шаров в Москве: гендер-пати, выписка, дни рождения, свадьбы. ${SITE_BRAND_NAME}.`,
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
      <div className="page-container pb-8 pt-4 sm:section-spacing sm:pb-14">
        <div className="hidden sm:block">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <div className="mb-4 sm:mb-6">
          <p className="section-kicker hidden sm:block">Каталог</p>
          <h1 className="heading-catalog sm:mt-2">
            {activeCategory ? activeCategory.name : "Каталог товаров"}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {products.length}{" "}
            {products.length === 1 ? "композиция" : products.length < 5 ? "композиции" : "композиций"}
            {activeCategory ? ` · ${activeCategory.name}` : ""}
          </p>
        </div>

        <Suspense fallback={<div className="h-40 animate-pulse rounded-3xl bg-neutral-muted/60" />}>
          <CatalogView
            products={products}
            categories={categories}
            activeSlug={categorySlug}
          />
        </Suspense>
      </div>
    </SiteShell>
  );
}
