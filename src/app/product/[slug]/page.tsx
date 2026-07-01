import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/home/json-ld";
import { OrderButtons } from "@/components/order-buttons";
import { ProductCard } from "@/components/product-card";
import { StaggerGrid } from "@/components/motion/stagger-grid";
import { cn, formatPrice, getProductGallery } from "@/lib/utils";
import { productGridClassName } from "@/components/ui/product-grid";
import { ProductGallery } from "@/components/product-gallery";
import { Badge } from "@/components/ui/badge";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getPublishedProductBySlug, getRelatedProducts } from "@/lib/queries/products";
import { getSettings } from "@/lib/queries/settings";
import { buildProductJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-config";

export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);
  if (!product) return {};

  const description =
    product.description ??
    `${product.name} — композиция из гелевых шаров (${product.category.name}). Заказ с доставкой по Москве.`;

  return {
    ...buildPageMetadata({
      title: `${product.name} — от ${formatPrice(product.price)}`,
      description,
      path: `/product/${product.slug}`,
    }),
    openGraph: {
      title: product.name,
      description,
      url: `${SITE_URL}/product/${product.slug}`,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);

  if (!product) notFound();

  const [settings, relatedProducts] = await Promise.all([
    getSettings(),
    getRelatedProducts(product.categoryId, product.id),
  ]);

  const gallery = getProductGallery(product.images, {
    slug: product.slug,
    categorySlug: product.category.slug,
  });

  return (
    <SiteShell>
      <JsonLd data={buildProductJsonLd(product)} />

      <div className="page-container section-spacing">
        <Breadcrumbs
          items={[
            { name: "Главная", href: "/" },
            { name: "Каталог", href: "/catalog" },
            { name: product.category.name, href: `/catalog?category=${product.category.slug}` },
            { name: product.name, href: `/product/${product.slug}`, current: true },
          ]}
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <ProductGallery images={gallery} alt={product.name} />

          <div className="space-y-5 sm:space-y-6">
            <div>
              <Link href={`/catalog?category=${product.category.slug}`} className="inline-block">
                <Badge className="min-h-11 px-3 py-2">{product.category.name}</Badge>
              </Link>
              <h1 className="heading-page mt-3">{product.name}</h1>
              <p className="mt-3 text-2xl font-bold text-foreground sm:mt-4 sm:text-3xl">
                от {formatPrice(product.price)}
              </p>
              <p className="mt-2 text-sm text-muted">
                Точная стоимость зависит от размера и дополнений — согласуем при заказе
              </p>
            </div>

            {product.description ? (
              <p className="text-base leading-7 text-muted sm:text-lg sm:leading-8">
                {product.description}
              </p>
            ) : null}

            <div className="premium-card p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-foreground">Оформить заказ</h2>
              <div className="mt-4">
                <OrderButtons compact settings={settings} productName={product.name} />
              </div>
            </div>

            <div id="form" className="premium-card scroll-mt-24 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-foreground">Или оставьте заявку</h2>
              <p className="mt-2 text-sm text-muted">
                Опишите дату и пожелания — перезвоним или напишем в мессенджер.
              </p>
              <div className="mt-4">
                <ContactForm productName={product.name} />
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 ? (
          <section
            aria-labelledby="related-heading"
            className="mt-10 border-t border-neutral-border pt-10 sm:mt-16 sm:pt-16"
          >
            <h2 id="related-heading" className="heading-section">
              Похожие композиции
            </h2>
            <p className="mt-2 text-muted">Ещё варианты из категории «{product.category.name}»</p>
            <StaggerGrid className={cn(productGridClassName, "mt-10")}>
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </StaggerGrid>
          </section>
        ) : null}
      </div>
    </SiteShell>
  );
}
