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
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-neutral-border/70 bg-neutral-surface shadow-sm transition-shadow duration-300 [@media(hover:hover)]:shadow-float">
      <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-neutral-muted">
        <ProductImage
          src={image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 33vw, 25vw"
        />
        {product.featured ? (
          <Badge variant="promo" className="absolute left-2 top-2 shadow-sm">
            Хит
          </Badge>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-3.5">
        <Link href={`/product/${product.slug}`} className="min-w-0 flex-1">
          <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-gold-muted-dark/80">
            {product.category.name}
          </p>
          <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug text-foreground">
            {product.name}
          </h3>
          <p className="mt-1.5 text-base font-bold tabular-nums text-foreground">
            от {formatPrice(product.price)}
          </p>
        </Link>

        <Link
          href={`/product/${product.slug}`}
          className="flex min-h-10 w-full items-center justify-center rounded-xl bg-gold-muted text-xs font-semibold uppercase tracking-wide text-white shadow-sm transition-colors duration-300 [@media(hover:hover)]:group-hover:bg-gold-muted-dark"
        >
          Заказать
        </Link>
      </div>
    </article>
  );
}
