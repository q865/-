import Link from "next/link";
import type { Product, Category } from "@/generated/prisma/client";
import { ProductImage } from "@/components/product-image";
import { Badge } from "@/components/ui/badge";
import { formatPrice, getProductCoverImage } from "@/lib/utils";

type ProductWithCategory = Product & { category: Category };

export function ProductCard({ product }: { product: ProductWithCategory }) {
  const image = getProductCoverImage(product.images);

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <article className="overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-100/60">
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-pink-50 to-sky-50">
          <ProductImage
            src={image}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {product.featured ? (
            <Badge className="absolute left-4 top-4 bg-white/90 text-pink-700">
              Популярное
            </Badge>
          ) : null}
        </div>
        <div className="space-y-2 p-5">
          <p className="text-xs uppercase tracking-wide text-sky-600">
            {product.category.name}
          </p>
          <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
          <p className="text-base font-bold text-pink-600">
            от {formatPrice(product.price)}
          </p>
        </div>
      </article>
    </Link>
  );
}
