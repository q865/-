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
        <div className="relative aspect-[4/5] max-h-[min(460px,72vh)] sm:aspect-[21/9] sm:max-h-none lg:aspect-[2.4/1]">
          {imageSrc ? (
            <ProductImage
              src={imageSrc}
              alt={product ? `${product.name} — гелевые шары` : `Гелевые шары ${siteName}`}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gold-muted-light via-lavender-soft to-blue-soft-light" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-4 pb-5 sm:p-8 lg:p-10">
            <div className="rounded-2xl bg-black/35 p-4 backdrop-blur-[2px] sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 sm:text-xs sm:tracking-[0.2em]">
                {siteName} · Москва
              </p>
              <h1
                id="hero-heading"
                className="mt-1.5 text-[1.375rem] font-extrabold leading-[1.2] text-white sm:mt-2 sm:max-w-lg sm:text-4xl sm:leading-tight lg:text-5xl"
              >
                {title}
              </h1>
              <p className="mt-2 max-w-md text-xs leading-5 text-white/90 sm:mt-3 sm:text-base sm:leading-7">
                {subtitle}
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:mt-5 sm:flex-row sm:gap-3">
                <Button asChild size="lg" className="h-11 w-full text-sm sm:h-12 sm:w-auto sm:text-base">
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
                    className="h-11 w-full border-white/40 bg-white/10 text-sm text-white hover:bg-white/20 sm:h-12 sm:w-auto sm:text-base"
                  >
                    <Link href={`/product/${product.slug}`}>Подробнее</Link>
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}
