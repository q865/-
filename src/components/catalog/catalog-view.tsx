"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import type { Product, Category } from "@/generated/prisma/client";
import { ProductCard } from "@/components/product-card";
import { productGridClassName } from "@/components/ui/product-grid";
import { cn } from "@/lib/utils";

type ProductWithCategory = Product & { category: Category };

type CategoryItem = { id: string; name: string; slug: string };

type SortKey = "new" | "price-asc" | "price-desc";

export function CatalogView({
  products,
  categories,
  activeSlug,
}: {
  products: ProductWithCategory[];
  categories: CategoryItem[];
  activeSlug?: string;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("new");

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
          <Link href="/catalog" className={chipClass(!activeSlug)}>
            Все
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/catalog?category=${category.slug}`}
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
        <Link href="/catalog" className={chipClass(!activeSlug)}>
          Все
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/catalog?category=${category.slug}`}
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
            Измените запрос или{" "}
            <Link href="/contacts" className="link-accent font-medium">
              напишите нам
            </Link>{" "}
            — соберём под заказ
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
