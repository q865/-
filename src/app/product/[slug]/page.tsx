import { notFound } from "next/navigation";
import { SiteShell } from "@/components/layout/site-shell";
import { ContactForm } from "@/components/contact-form";
import { OrderButtons } from "@/components/order-buttons";
import { ProductImage } from "@/components/product-image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { formatPrice, getProductGallery } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return {};

  return {
    title: product.name,
    description: product.description ?? undefined,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const [product, settings] = await Promise.all([
    prisma.product.findUnique({
      where: { slug, published: true },
      include: { category: true },
    }),
    getSettings(),
  ]);

  if (!product) notFound();

  const gallery = getProductGallery(product.images);

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-gradient-to-br from-pink-50 to-sky-50">
              <ProductImage
                src={gallery[0]}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {gallery.length > 1 ? (
              <div className="grid grid-cols-4 gap-3">
                {gallery.slice(1, 5).map((image) => (
                  <div
                    key={image}
                    className="relative aspect-square overflow-hidden rounded-2xl"
                  >
                    <ProductImage src={image} alt={product.name} fill className="object-cover" />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="space-y-6">
            <div>
              <Badge>{product.category.name}</Badge>
              <h1 className="mt-3 text-4xl font-bold text-slate-900">{product.name}</h1>
              <p className="mt-4 text-3xl font-bold text-pink-600">
                от {formatPrice(product.price)}
              </p>
            </div>

            {product.description ? (
              <p className="text-lg leading-8 text-slate-600">{product.description}</p>
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
      </div>
    </SiteShell>
  );
}
