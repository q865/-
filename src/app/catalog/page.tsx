import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { CategoryFilter } from "@/components/catalog/category-filter";
import { ProductCard } from "@/components/product-card";
import { StaggerGrid } from "@/components/motion/stagger-grid";
import { productGridClassName } from "@/components/ui/product-grid";
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
      <div className="page-container pb-8 pt-5 sm:section-spacing sm:pb-14">
        <div className="hidden sm:block">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <div className="mb-4 flex items-start justify-between gap-3 sm:mb-6">
          <div className="min-w-0">
            <p className="section-kicker hidden sm:block">Каталог</p>
            <h1 className="heading-catalog sm:mt-2">
              {activeCategory ? activeCategory.name : "Каталог"}
            </h1>
            <p className="mt-1 hidden text-sm text-muted sm:block md:text-base">
              {activeCategory
                ? "Композиции из гелевых шаров с доставкой по Москве"
                : "Композиции из гелевых шаров на любой праздник в Москве"}
            </p>
          </div>
          <p className="hidden shrink-0 rounded-full bg-rose-dusty-light/50 px-3 py-1.5 text-xs font-semibold text-rose-dusty-dark sm:block">
            {products.length}{" "}
            {products.length === 1 ? "товар" : products.length < 5 ? "товара" : "товаров"}
          </p>
        </div>

        <CategoryFilter
          categories={categories}
          activeSlug={categorySlug}
          productCount={products.length}
        />

        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-border bg-neutral-surface/80 p-8 text-center text-muted sm:p-12">
            <p className="font-medium text-foreground">В этой категории пока нет товаров</p>
            <p className="mt-2 text-sm">Выберите другую категорию или напишите нам — соберём под заказ</p>
            <Link
              href="/catalog"
              className="touch-target mt-5 inline-flex rounded-full bg-rose-dusty px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-dusty-dark"
            >
              Смотреть весь каталог
            </Link>
          </div>
        ) : (
          <StaggerGrid className={productGridClassName}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </StaggerGrid>
        )}
      </div>
    </SiteShell>
  );
}
