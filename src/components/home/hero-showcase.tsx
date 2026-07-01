import Link from "next/link";
import { ProductImage } from "@/components/product-image";
import { FadeIn } from "@/components/motion/fade-in-section";
import { getProductCoverImage } from "@/lib/utils";

type HeroProduct = {
  id: string;
  slug: string;
  name: string;
  images: string;
  category: { slug: string; name: string };
};

export function HeroShowcase({ products }: { products: HeroProduct[] }) {
  if (products.length === 0) return null;

  const [main, ...thumbs] = products;
  const mainSrc = getProductCoverImage(main.images, {
    slug: main.slug,
    categorySlug: main.category.slug,
  });

  return (
    <FadeIn delayMs={60} className="order-1 lg:order-2">
      <Link
        href={`/product/${main.slug}`}
        className="premium-card group relative block aspect-[4/3] overflow-hidden sm:aspect-[16/10] lg:aspect-[4/3]"
      >
        <ProductImage
          src={mainSrc}
          alt={`${main.name} — гелевые шары ${main.category.name}`}
          fill
          priority
          className="object-cover transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-[1.02]"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 pt-12">
          <p className="text-sm font-medium text-white/90">{main.category.name}</p>
          <p className="mt-0.5 line-clamp-1 text-base font-semibold text-white sm:text-lg">
            {main.name}
          </p>
        </div>
      </Link>

      {thumbs.length > 0 ? (
        <div className="mt-2.5 grid grid-cols-3 gap-2.5 sm:mt-3 sm:gap-3">
          {thumbs.slice(0, 3).map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="premium-card group relative aspect-square overflow-hidden"
            >
              <ProductImage
                src={getProductCoverImage(product.images, {
                  slug: product.slug,
                  categorySlug: product.category.slug,
                })}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 [@media(hover:hover)]:group-hover:scale-105"
                sizes="(max-width: 640px) 33vw, 15vw"
              />
            </Link>
          ))}
        </div>
      ) : null}
    </FadeIn>
  );
}
