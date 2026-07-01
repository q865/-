import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Store, Users } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { OrderButtons } from "@/components/order-buttons";
import { ProductCard } from "@/components/product-card";
import { ProductImage } from "@/components/product-image";
import { Button } from "@/components/ui/button";
import { buildPageMetadata } from "@/lib/page-metadata";
import { SITE_BRAND_NAME } from "@/lib/site-config";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/queries/settings";
import { businessFaq, businessSeoParagraphs, businessServices } from "@/lib/services-content";
import { resolveStockImage } from "@/lib/stock-images";

export const metadata: Metadata = buildPageMetadata({
  title: "Оформление витрин, открытие магазинов и корпоративы",
  description: `Коммерческое оформление шарами в Москве: витрины, grand opening, корпоративы и промо-зоны. ${SITE_BRAND_NAME}.`,
  path: "/services",
});

const serviceIcons = [Store, Building2, Users, Building2] as const;

export default async function ServicesPage() {
  const settings = await getSettings();

  const products = await prisma.product.findMany({
    where: {
      published: true,
      category: { slug: "biznes-i-meropriyatiya" },
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <SiteShell>
      <div className="page-container section-spacing">
        <Breadcrumbs
          items={[
            { name: "Главная", href: "/" },
            { name: "Услуги для бизнеса", href: "/services", current: true },
          ]}
        />

        <div className="mb-10 max-w-2xl">
          <p className="section-kicker">B2B</p>
          <h1 className="heading-page mt-2">Оформление для бизнеса</h1>
          <p className="mt-3 text-muted leading-7">
            Витрины, открытия магазинов, корпоративы и промо — подберём композиции под ваш
            бренд, площадку и бюджет. Каждый проект согласуем заранее.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/catalog?category=biznes-i-meropriyatiya">
                Смотреть решения
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/contacts">Обсудить проект</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {businessServices.map((service, index) => {
            const Icon = serviceIcons[index] ?? Building2;
            const image = resolveStockImage({ slug: service.slug, categorySlug: "biznes-i-meropriyatiya" });

            return (
              <Link
                key={service.slug}
                href={service.href}
                className="premium-card group flex flex-col overflow-hidden sm:flex-row"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-muted sm:aspect-auto sm:w-40 sm:shrink-0 md:w-48">
                  <ProductImage
                    src={image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 [@media(hover:hover)]:group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 200px"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-center gap-2 text-gold-muted-dark">
                    <Icon className="h-5 w-5 shrink-0" aria-hidden />
                    <h2 className="text-lg font-semibold text-foreground">{service.title}</h2>
                  </div>
                  <p className="text-sm leading-6 text-muted">{service.description}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {service.highlights.map((item) => (
                      <li
                        key={item}
                        className="rounded-full bg-neutral-muted px-2.5 py-1 text-[11px] font-medium text-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            );
          })}
        </div>

        {products.length > 0 ? (
          <section aria-labelledby="biz-products-heading" className="mt-14 sm:mt-16">
            <h2 id="biz-products-heading" className="heading-section">
              Готовые решения
            </h2>
            <p className="mt-2 text-muted">Ориентировочные цены — финальная сумма после брифа</p>
            <div className="mt-8 grid grid-cols-2 gap-3 min-[480px]:gap-4 sm:gap-5 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ) : null}

        <section aria-labelledby="biz-faq-heading" className="mt-14 sm:mt-16">
          <h2 id="biz-faq-heading" className="heading-section">
            Вопросы бизнес-заказчиков
          </h2>
          <div className="mt-6 space-y-3">
            {businessFaq.map((item) => (
              <details
                key={item.question}
                className="rounded-2xl border border-neutral-border bg-neutral-surface px-5 py-4 shadow-sm"
              >
                <summary className="touch-target min-h-11 cursor-pointer list-none font-semibold text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="biz-seo-heading" className="mt-14 rounded-3xl bg-neutral-muted/40 p-6 sm:mt-16 sm:p-8">
          <h2 id="biz-seo-heading" className="sr-only">
            Коммерческое оформление шарами в Москве
          </h2>
          <div className="mt-4 space-y-4">
            {businessSeoParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-sm leading-7 text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-3xl bg-neutral-muted/50 p-6 sm:mt-16 sm:p-8">
          <h2 className="heading-section">Обсудить проект</h2>
          <p className="mt-2 text-muted">
            Опишите площадку, дату и задачу — рассчитаем оформление и сроки монтажа.
          </p>
          <div className="mt-6 max-w-md">
            <OrderButtons settings={settings} />
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
