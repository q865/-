"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

type CategoryItem = {
  id: string;
  name: string;
  slug: string;
};

const chipActive =
  "border-rose-dusty bg-rose-dusty text-white shadow-sm";
const chipIdle =
  "border border-neutral-border bg-neutral-surface text-muted hover:border-rose-dusty-light hover:text-rose-dusty-dark";

function formatCount(count: number): string {
  if (count === 1) return "1 вариант";
  if (count >= 2 && count <= 4) return `${count} варианта`;
  return `${count} вариантов`;
}

/**
 * Mobile: один sticky-select — все категории в одном тапе, товары сразу ниже.
 * Desktop: pills + sticky.
 */
export function CategoryFilter({
  categories,
  activeSlug,
  productCount,
}: {
  categories: CategoryItem[];
  activeSlug?: string;
  productCount: number;
}) {
  const router = useRouter();
  const activeCategory = categories.find((c) => c.slug === activeSlug);

  const chipClass = (active: boolean) =>
    cn(
      "inline-flex min-h-10 items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition",
      active ? chipActive : chipIdle,
    );

  const selectValue = activeSlug ? `/catalog?category=${activeSlug}` : "/catalog";

  return (
    <>
      <div className="catalog-filter-bar md:hidden">
        <div className="flex items-center gap-2 text-xs font-medium text-muted">
          <LayoutGrid className="h-3.5 w-3.5 text-rose-dusty-dark" aria-hidden />
          <span>{formatCount(productCount)}</span>
        </div>
        <div className="relative mt-2">
          <label htmlFor="category-select" className="sr-only">
            Выберите категорию
          </label>
          <select
            id="category-select"
            value={selectValue}
            onChange={(event) => router.push(event.target.value)}
            className="select-premium"
          >
            <option value="/catalog">Все композиции</option>
            {categories.map((category) => (
              <option key={category.id} value={`/catalog?category=${category.slug}`}>
                {category.name}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-text"
            aria-hidden
          />
        </div>
        {activeCategory ? (
          <p className="mt-2 truncate text-xs text-muted">
            Сейчас: <span className="font-medium text-foreground">{activeCategory.name}</span>
          </p>
        ) : null}
      </div>

      <nav
        aria-label="Фильтр по категориям"
        className="category-filter-desktop mb-6 hidden md:flex md:flex-wrap md:gap-2 lg:mb-8"
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
    </>
  );
}
