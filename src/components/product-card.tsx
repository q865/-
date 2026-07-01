import Link from "next/link";
import type { Product, Category } from "@/generated/prisma/client";
import { ProductImage } from "@/components/product-image";
import { Badge } from "@/components/ui/badge";
import { formatPrice, getProductCoverImage } from "@/lib/utils";

type ProductWithCategory = Product & { category: Category };

export function ProductCard({ product }: { product: ProductWithCategory }) {
  const image = getProductCoverImage(product.images, {
    slug: product.slug,
    categorySlug: product.category.slug,
  });

  return (
    <Link href={`/product/${product.slug}`} className="group block h-full min-w-0">
      <article className="premium-card flex h-full min-w-0 flex-col overflow-hidden">
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-muted">
          <ProductImage
            src={image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-[1.05]"
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100"
            aria-hidden
          />
          {product.featured ? (
            <Badge variant="promo" className="absolute left-2.5 top-2.5 shadow-sm sm:left-3 sm:top-3">
              Хит
            </Badge>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-2.5 p-3.5 sm:gap-3 sm:p-5">
          <div className="min-w-0 space-y-1">
            <p className="truncate text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-dusty-dark/80 sm:text-xs">
              {product.category.name}
            </p>
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground sm:text-[15px]">
              {product.name}
            </h3>
          </div>

          <div className="mt-auto flex flex-col gap-2 pt-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-wide text-neutral-text sm:text-xs">
                от
              </p>
              <p className="text-base font-bold tabular-nums text-foreground sm:text-lg">
                {formatPrice(product.price)}
              </p>
            </div>
            <span className="flex min-h-10 w-full items-center justify-center rounded-full bg-rose-dusty px-4 text-xs font-semibold text-white shadow-sm transition-all duration-300 ease-out sm:min-h-11 sm:w-auto sm:py-2.5 [@media(hover:hover)]:group-hover:bg-rose-dusty-dark [@media(hover:hover)]:group-hover:shadow-glow-rose">
              Заказать
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
