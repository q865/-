import Link from "next/link";
import type { Product, Category } from "@/generated/prisma/client";
import { ProductImage } from "@/components/product-image";
import { Badge } from "@/components/ui/badge";
import { formatPrice, getProductCoverImage } from "@/lib/utils";

type ProductWithCategory = Product & { category: Category };

export function ProductCard({ product }: { product: ProductWithCategory }) {
  const image = getProductCoverImage(product.images);

  return (
    <Link href={`/product/${product.slug}`} className="group block h-full">
      <article className="premium-card flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-muted">
          <ProductImage
            src={image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {product.featured ? (
            <Badge variant="promo" className="absolute left-3 top-3">
              Популярное
            </Badge>
          ) : null}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="space-y-1">
            <p className="text-[11px] font-medium uppercase tracking-widest text-neutral-text">
              {product.category.name}
            </p>
            <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground">
              {product.name}
            </h3>
          </div>
          <div className="mt-auto flex items-center justify-between gap-3 pt-1">
            <p className="text-lg font-bold text-foreground">{formatPrice(product.price)}</p>
            <span className="rounded-full bg-rose-dusty px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-300 ease-out [@media(hover:hover)]:group-hover:bg-rose-dusty-dark [@media(hover:hover)]:group-hover:shadow-glow-rose">
              Заказать
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
