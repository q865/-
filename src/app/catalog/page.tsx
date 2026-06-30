import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { ProductCard } from "@/components/product-card";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ category?: string }>;

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category: categorySlug } = await searchParams;

  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const products = await prisma.product.findMany({
    where: {
      published: true,
      ...(categorySlug
        ? { category: { slug: categorySlug } }
        : {}),
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Каталог</h1>
          <p className="mt-2 text-slate-600">
            Композиции из гелевых шаров на любой праздник
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/catalog"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              !categorySlug
                ? "bg-pink-500 text-white"
                : "bg-pink-50 text-pink-700 hover:bg-pink-100"
            }`}
          >
            Все
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/catalog?category=${category.slug}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                categorySlug === category.slug
                  ? "bg-pink-500 text-white"
                  : "bg-pink-50 text-pink-700 hover:bg-pink-100"
              }`}
            >
              {category.name}
            </Link>
          ))}
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-pink-200 bg-white p-12 text-center text-slate-500">
            В этой категории пока нет товаров.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </SiteShell>
  );
}
