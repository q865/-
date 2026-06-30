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
      <article className="overflow-hidden rounded-3xl border border-rose-dusty-light/50 bg-cream-card shadow-sm transition duration-300 hover:-translate-y-1 hover:border-rose-dusty-light hover:shadow-lg hover:shadow-rose-dusty/10">
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-rose-dusty-light/30 to-blue-soft-light/40">
          <ProductImage
            src={image}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {product.featured ? (
            <Badge className="absolute left-4 top-4">Популярное</Badge>
          ) : null}
        </div>
        <div className="space-y-2 p-5">
          <p className="text-xs uppercase tracking-wider text-blue-soft-dark">
            {product.category.name}
          </p>
          <h3 className="text-lg font-semibold text-[#3d3a36]">{product.name}</h3>
          <p className="text-base font-bold text-rose-dusty-dark">
            от {formatPrice(product.price)}
          </p>
        </div>
      </article>
    </Link>
  );
}
