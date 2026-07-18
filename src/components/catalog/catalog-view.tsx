"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import type { Product, Category } from "@/generated/prisma/client";
import { ProductCard } from "@/components/product-card";
import { productGridClassName } from "@/components/ui/product-grid";
import { cn } from "@/lib/utils";

type ProductWithCategory = Product & { category: Category };

type CategoryItem = { id: string; name: string; slug: string };

type SortKey = "new" | "price-asc" | "price-desc";

function isSortKey(value: string | null): value is SortKey {
  return value === "new" || value === "price-asc" || value === "price-desc";
}

export function CatalogView({
  products,
  categories,
  activeSlug,
}: {
  products: ProductWithCategory[];
  categories: CategoryItem[];
  activeSlug?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [sort, setSort] = useState<SortKey>(() => {
    const fromUrl = searchParams.get("sort");
    return isSortKey(fromUrl) ? fromUrl : "new";
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const trimmed = query.trim();
    if (trimmed) params.set("q", trimmed);
    else params.delete("q");

    if (sort === "new") params.delete("sort");
    else params.set("sort", sort);

    const next = params.toString();
    const current = searchParams.toString();
    if (next !== current) {
      router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false });
    }
  }, [query, sort, pathname, router, searchParams]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products;

    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category.name.toLowerCase().includes(q),
      );
    }

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    return sorted;
  }, [products, query, sort]);

  function categoryHref(slug?: string) {
    const params = new URLSearchParams();
    if (slug) params.set("category", slug);
    const trimmed = query.trim();
    if (trimmed) params.set("q", trimmed);
    if (sort !== "new") params.set("sort", sort);
    const qs = params.toString();
    return qs ? `/catalog?${qs}` : "/catalog";
  }

  const chipClass = (active: boolean) =>
    cn(
      "category-scroll-item inline-flex min-h-10 shrink-0 items-center justify-center rounded-2xl border px-3.5 py-2 text-sm font-medium transition sm:px-4",
      active ? "chip-active" : "chip-idle",
    );

  return (
    <>
      <div className="catalog-filter-bar">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative min-w-0 flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-text"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск..."
              className="h-11 w-full rounded-2xl border border-neutral-border bg-neutral-surface pl-10 pr-3 text-base outline-none transition focus:border-gold-muted-light focus:ring-2 focus:ring-gold-muted-light/40"
              aria-label="Поиск по каталогу"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-11 w-full cursor-pointer appearance-none rounded-2xl border border-neutral-border bg-neutral-surface px-4 text-sm font-medium outline-none sm:w-auto sm:min-w-[9.5rem]"
            aria-label="Сортировка"
          >
            <option value="new">Сначала новые</option>
            <option value="price-asc">Сначала дешевле</option>
            <option value="price-desc">Сначала дороже</option>
          </select>
        </div>

        <nav aria-label="Категории" className="category-scroll mt-3 md:hidden">
          <Link href={categoryHref()} className={chipClass(!activeSlug)}>
            Все
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={categoryHref(category.slug)}
              className={chipClass(activeSlug === category.slug)}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>

      <nav
        aria-label="Фильтр по категориям"
        className="mb-6 hidden md:flex md:flex-wrap md:gap-2 lg:mb-8"
      >
        <Link href={categoryHref()} className={chipClass(!activeSlug)}>
          Все
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={categoryHref(category.slug)}
            className={chipClass(activeSlug === category.slug)}
          >
            {category.name}
          </Link>
        ))}
      </nav>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-neutral-border bg-neutral-surface p-8 text-center text-muted sm:p-12">
          <p className="font-medium text-foreground">Ничего не найдено</p>
          <p className="mt-2 text-sm">
            {query.trim() ? (
              <>
                Попробуйте другой запрос или{" "}
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="link-accent font-medium"
                >
                  сбросить поиск
                </button>
              </>
            ) : (
              <>
                Измените фильтр или{" "}
                <Link href="/contacts" className="link-accent font-medium">
                  напишите нам
                </Link>{" "}
                — соберём под заказ
              </>
            )}
          </p>
        </div>
      ) : (
        <div className={productGridClassName}>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}
