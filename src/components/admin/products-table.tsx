"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatPrice, parseImages } from "@/lib/utils";
import { ProductRowActions } from "@/components/admin/product-row-actions";

type AdminProduct = {
  id: string;
  name: string;
  price: number;
  images: string;
  featured: boolean;
  published: boolean;
  category: { name: string };
};

type FilterKey = "all" | "published" | "hidden" | "featured";

export function AdminProductsTable({ products }: { products: AdminProduct[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      if (filter === "published" && !product.published) return false;
      if (filter === "hidden" && product.published) return false;
      if (filter === "featured" && !product.featured) return false;
      if (!q) return true;
      return (
        product.name.toLowerCase().includes(q) ||
        product.category.name.toLowerCase().includes(q)
      );
    });
  }, [products, query, filter]);

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: "Все" },
    { key: "published", label: "Опубликованные" },
    { key: "hidden", label: "Скрытые" },
    { key: "featured", label: "Хиты" },
  ];

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-rose-dusty-light bg-cream-card p-12 text-center text-[#9c9590]">
        Товаров пока нет.{" "}
        <Link href="/admin/products/new" className="text-rose-dusty-dark hover:underline">
          Добавить первый
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск по названию или категории..."
          className="h-11 w-full rounded-2xl border border-rose-dusty-light/60 bg-cream-card px-4 text-sm outline-none focus:border-rose-dusty sm:max-w-sm"
          aria-label="Поиск товаров"
        />
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setFilter(item.key)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                filter === item.key
                  ? "bg-rose-dusty text-cream"
                  : "bg-rose-dusty-light/40 text-[#5c5651] hover:bg-rose-dusty-light/70"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-[#9c9590]">
        Показано: {filtered.length} из {products.length}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-rose-dusty-light bg-cream-card p-10 text-center text-[#9c9590]">
          Ничего не найдено.{" "}
          <button
            type="button"
            className="text-rose-dusty-dark hover:underline"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
          >
            Сбросить фильтр
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-rose-dusty-light/50 bg-cream-card shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="border-b border-rose-dusty-light/50 bg-rose-dusty-light/30 text-left text-[#6b6560]">
              <tr>
                <th className="px-4 py-3 font-medium">Название</th>
                <th className="px-4 py-3 font-medium">Категория</th>
                <th className="px-4 py-3 font-medium">Цена</th>
                <th className="px-4 py-3 font-medium">Статус</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-dusty-light/30">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-rose-dusty-light/15">
                  <td className="px-4 py-3">
                    <div className="font-medium text-[#3d3a36]">{product.name}</div>
                    <div className="text-xs text-[#9c9590]">
                      {parseImages(product.images).length} фото
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#5c5651]">{product.category.name}</td>
                  <td className="px-4 py-3 font-medium text-[#3d3a36]">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={product.published ? "text-emerald-700" : "text-[#9c9590]"}>
                      {product.published ? "Опубликован" : "Скрыт"}
                    </span>
                    {product.featured ? <span className="ml-2 text-amber-600">★</span> : null}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <ProductRowActions id={product.id} name={product.name} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
