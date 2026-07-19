"use client";

import { useState, type MouseEvent, type PointerEvent } from "react";
import Link from "next/link";
import type { Product, Category } from "@/generated/prisma/client";
import { ProductImage } from "@/components/product-image";
import { Badge } from "@/components/ui/badge";
import { resolveStockImage } from "@/lib/stock-images";
import { formatPrice, getProductGallery } from "@/lib/utils";

type ProductWithCategory = Product & { category: Category };

export function ProductCard({ product }: { product: ProductWithCategory }) {
  const gallery = getProductGallery(product.images, {
    slug: product.slug,
    categorySlug: product.category.slug,
  });
  const fallbackImage = resolveStockImage({
    slug: product.slug,
    categorySlug: product.category.slug,
  });
  const [index, setIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const activeIndex = gallery.length > 0 ? index % gallery.length : 0;
  const image = gallery[activeIndex] ?? fallbackImage;
  const hasMultiple = gallery.length > 1;

  function showPrev(event: MouseEvent | PointerEvent) {
    event.preventDefault();
    event.stopPropagation();
    setIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  }

  function showNext(event: MouseEvent | PointerEvent) {
    event.preventDefault();
    event.stopPropagation();
    setIndex((prev) => (prev + 1) % gallery.length);
  }

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-border/70 bg-neutral-surface shadow-sm transition-shadow duration-300 [@media(hover:hover)]:shadow-float">
      <div
        className="relative block aspect-square overflow-hidden bg-neutral-muted"
        onTouchStart={(event) => {
          if (!hasMultiple) return;
          setTouchStartX(event.changedTouches[0]?.clientX ?? null);
        }}
        onTouchEnd={(event) => {
          if (!hasMultiple || touchStartX === null) return;
          const delta = (event.changedTouches[0]?.clientX ?? touchStartX) - touchStartX;
          setTouchStartX(null);
          if (Math.abs(delta) < 40) return;
          if (delta > 0) {
            setIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
          } else {
            setIndex((prev) => (prev + 1) % gallery.length);
          }
        }}
      >
        <Link href={`/product/${product.slug}`} className="absolute inset-0 block">
          <ProductImage
            src={image}
            fallbackSrc={fallbackImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>
        {product.featured ? (
          <Badge variant="promo" className="absolute left-2 top-2 z-10 shadow-sm">
            Хит
          </Badge>
        ) : null}
        {hasMultiple ? (
          <>
            <button
              type="button"
              aria-label="Предыдущее фото"
              onClick={showPrev}
              className="absolute left-1.5 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-sm text-white opacity-0 transition [@media(hover:hover)]:flex [@media(hover:hover)]:group-hover:opacity-100"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Следующее фото"
              onClick={showNext}
              className="absolute right-1.5 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-sm text-white opacity-0 transition [@media(hover:hover)]:flex [@media(hover:hover)]:group-hover:opacity-100"
            >
              ›
            </button>
            <div className="pointer-events-none absolute inset-x-0 bottom-2 z-10 flex justify-center gap-1">
              {gallery.map((src, dotIndex) => (
                <span
                  key={src}
                  className={`h-1.5 w-1.5 rounded-full ${
                    dotIndex === activeIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-2.5 sm:p-3.5">
        <Link href={`/product/${product.slug}`} className="min-w-0 flex-1">
          <p className="line-clamp-1 text-[9px] font-semibold uppercase tracking-wide text-gold-muted-dark/80 sm:text-[10px]">
            {product.category.name}
          </p>
          <h3 className="mt-0.5 line-clamp-3 min-h-[2.75rem] text-xs font-semibold leading-snug text-foreground sm:line-clamp-2 sm:min-h-0 sm:text-sm">
            {product.name}
          </h3>
          <p className="mt-1 text-sm font-bold tabular-nums text-foreground sm:mt-1.5 sm:text-base">
            от {formatPrice(product.price)}
          </p>
        </Link>

        <Link
          href={`/product/${product.slug}`}
          className="flex min-h-9 w-full items-center justify-center rounded-xl bg-gold-muted text-[11px] font-semibold uppercase tracking-wide text-white shadow-sm transition-colors duration-300 sm:min-h-10 sm:text-xs [@media(hover:hover)]:group-hover:bg-gold-muted-dark"
        >
          Подробнее
        </Link>
      </div>
    </article>
  );
}
