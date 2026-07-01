import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductImage } from "@/components/product-image";
import { FadeIn } from "@/components/motion/fade-in-section";
import { Button } from "@/components/ui/button";
import { getProductCoverImage } from "@/lib/utils";

type HeroProduct = {
  slug: string;
  name: string;
  images: string;
  category: { slug: string; name: string };
};

export function HeroBanner({
  product,
  title,
  subtitle,
  siteName,
}: {
  product?: HeroProduct;
  title: string;
  subtitle: string;
  siteName: string;
}) {
  const imageSrc = product
    ? getProductCoverImage(product.images, {
        slug: product.slug,
        categorySlug: product.category.slug,
      })
    : null;

  return (
    <FadeIn delayMs={40}>
      <div className="relative overflow-hidden rounded-3xl bg-neutral-muted shadow-float">
        <div className="relative aspect-[4/5] sm:aspect-[21/9] lg:aspect-[2.4/1]">
          {imageSrc ? (
            <ProductImage
              src={imageSrc}
              alt={product ? `${product.name} — гелевые шары` : `Гелевые шары ${siteName}`}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-rose-dusty-light via-lavender-soft to-blue-soft-light" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/10" />
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75 sm:text-sm">
              {siteName} · Москва
            </p>
            <h1 id="hero-heading" className="mt-2 max-w-lg text-2xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/90 sm:text-base sm:leading-7">
              {subtitle}
            </p>
            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/catalog">
                  Смотреть каталог
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              {product ? (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full border-white/40 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
                >
                  <Link href={`/product/${product.slug}`}>Подробнее</Link>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
