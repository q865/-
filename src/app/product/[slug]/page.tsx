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
import { ProductGallery } from "@/components/product-gallery";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getPublishedProductBySlug, getRelatedProducts } from "@/lib/queries/products";
import { getSettings } from "@/lib/queries/settings";
import { buildProductJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-config";
import { formatPrice, getProductGallery } from "@/lib/utils";

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

  const gallery = getProductGallery(product.images);

  return (
    <SiteShell>
      <JsonLd data={buildProductJsonLd(product)} />

      <div className="page-container py-12">
        <Breadcrumbs
          items={[
            { name: "Главная", href: "/" },
            { name: "Каталог", href: "/catalog" },
            { name: product.category.name, href: `/catalog?category=${product.category.slug}` },
            { name: product.name, href: `/product/${product.slug}`, current: true },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery images={gallery} alt={product.name} />

          <div className="space-y-6">
            <div>
              <Link href={`/catalog?category=${product.category.slug}`} className="inline-block">
                <Badge>{product.category.name}</Badge>
              </Link>
              <h1 className="mt-3 text-4xl font-bold text-foreground">{product.name}</h1>
              <p className="mt-4 text-3xl font-bold text-foreground">от {formatPrice(product.price)}</p>
              <p className="mt-2 text-sm text-muted">
                Точная стоимость зависит от размера и дополнений — согласуем при заказе
              </p>
            </div>

            {product.description ? (
              <p className="text-lg leading-8 text-muted">{product.description}</p>
            ) : null}

            <Card>
              <CardHeader>
                <CardTitle>Оформить заказ</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderButtons settings={settings} productName={product.name} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Или оставьте заявку</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm productName={product.name} />
              </CardContent>
            </Card>
          </div>
        </div>

        {relatedProducts.length > 0 ? (
          <section aria-labelledby="related-heading" className="mt-16 border-t border-neutral-border pt-16">
            <h2 id="related-heading" className="heading-section">
              Похожие композиции
            </h2>
            <p className="mt-2 text-muted">Ещё варианты из категории «{product.category.name}»</p>
            <StaggerGrid className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
