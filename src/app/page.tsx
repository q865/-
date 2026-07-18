import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  MessageCircle,
  Phone,
  Truck,
} from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { JsonLd } from "@/components/home/json-ld";
import { StaggerGrid } from "@/components/motion/stagger-grid";
import { OrderButtons } from "@/components/order-buttons";
import { ProductCard } from "@/components/product-card";
import { HeroBanner } from "@/components/home/hero-banner";
import { CategoryIconGrid } from "@/components/home/category-icon-grid";
import { Button } from "@/components/ui/button";
import { productGridClassName } from "@/components/ui/product-grid";
import {
  advantages,
  faqItems,
  occasions,
  seoTextBlocks,
  trustItems,
} from "@/lib/home-content";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getCategories } from "@/lib/queries/categories";
import { getPublishedProducts } from "@/lib/queries/products";
import { getSettings } from "@/lib/queries/settings";
import {
  buildFaqJsonLd,
  buildLocalBusinessJsonLd,
  buildProductListJsonLd,
  buildWebSiteJsonLd,
} from "@/lib/seo";
import { buildTelUrl } from "@/lib/contact-links";
import { SITE_KEYWORDS, SITE_URL } from "@/lib/site-config";
import { cn, formatPhone } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    ...buildPageMetadata({
      title: settings.seoTitle,
      description: settings.seoDescription,
      path: "/",
    }),
    keywords: SITE_KEYWORDS,
    alternates: { canonical: SITE_URL },
  };
}

export default async function HomePage() {
  const [settings, categories, products] = await Promise.all([
    getSettings(),
    getCategories(),
    getPublishedProducts(),
  ]);

  const featured = products.filter((product) => product.featured);
  const showcaseProducts = featured.length > 0 ? featured.slice(0, 8) : products.slice(0, 8);
  const heroProduct =
    featured.find((p) => p.slug === "nabor-gender-pati") ??
    featured.find((p) => p.category.slug === "gender-pati") ??
    featured.find((p) => p.slug === "fontan-iz-sharov") ??
    featured[0] ??
    products[0];

  const structuredData = [
    buildLocalBusinessJsonLd(settings),
    buildWebSiteJsonLd(settings),
    buildFaqJsonLd(),
    buildProductListJsonLd(showcaseProducts),
  ].filter(Boolean);

  return (
    <SiteShell>
      <JsonLd data={structuredData} />

      <section aria-labelledby="hero-heading" className="page-container pt-4 sm:pt-6">
        <HeroBanner
          imageUrl={settings.heroImageUrl}
          product={heroProduct}
          title={settings.heroTitle}
          subtitle={settings.heroSubtitle}
          siteName={settings.siteName}
        />
      </section>

      <section aria-label="Преимущества сервиса" className="mt-6 border-b border-neutral-border bg-neutral-surface sm:mt-8">
        <div className="page-container grid grid-cols-2 gap-3 py-6 sm:grid-cols-4 sm:gap-4 sm:py-8">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
            <div
              key={item.label}
              className="rounded-2xl border border-neutral-border/60 bg-neutral-muted/40 px-3 py-3 sm:px-4 sm:py-4"
            >
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-gold-muted-light/80 text-gold-muted-dark">
                <Icon className="h-4 w-4" aria-hidden />
              </div>
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="mt-1 text-xs text-muted sm:text-sm">{item.detail}</p>
            </div>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="categories-heading" className="page-container py-8 sm:py-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="section-kicker">Коллекции</p>
            <h2 id="categories-heading" className="heading-section mt-2">
              Популярные категории
            </h2>
          </div>
          <Link href="/catalog" className="link-accent shrink-0 text-sm font-medium">
            Все →
          </Link>
        </div>
        <CategoryIconGrid categories={categories} />
      </section>

      {showcaseProducts.length > 0 ? (
        <section aria-labelledby="products-heading" className="border-y border-neutral-border bg-neutral-muted/60 section-spacing">
          <div className="page-container">
            <p className="section-kicker">{featured.length > 0 ? "Новинки" : "Каталог"}</p>
            <h2 id="products-heading" className="heading-section mt-2">
              {featured.length > 0 ? "Популярные композиции" : "Композиции из гелевых шаров"}
            </h2>
            <p className="mt-2 max-w-2xl text-muted">
              Готовые идеи с ориентировочной ценой — точную стоимость согласуем после обсуждения
              деталей заказа.
            </p>
            <StaggerGrid className={cn(productGridClassName, "mt-10")}>
              {showcaseProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </StaggerGrid>
            <div className="mt-10 text-center">
              <Button asChild variant="outline">
                <Link href="/catalog">Показать все композиции</Link>
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="occasions-heading" className="page-container section-spacing">
        <p className="section-kicker">Поводы</p>
        <h2 id="occasions-heading" className="heading-section mt-2">
          Оформление шарами на любой праздник
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {occasions.map((occasion) => (
            <Link
              key={occasion.title}
              href={occasion.href}
              className="rounded-2xl border border-neutral-border bg-neutral-surface p-6 shadow-sm transition hover:border-gold-muted-light hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-foreground">{occasion.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{occasion.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="advantages-heading" className="border-y border-neutral-border bg-neutral-surface section-spacing">
        <div className="page-container">
          <p className="section-kicker">О нас</p>
          <h2 id="advantages-heading" className="heading-section mt-2">
            Почему выбирают {settings.siteName}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {advantages.map((item) => (
              <article key={item.title} className="flex gap-4 rounded-2xl border border-neutral-border bg-neutral-muted/40 p-6">
                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-gold-muted-dark" aria-hidden />
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="steps-heading" className="page-container section-spacing">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Заказ</p>
            <h2 id="steps-heading" className="heading-section mt-2">
              Как заказать гелевые шары
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              Выберите композицию, согласуйте детали и доставку — без лишней бюрократии.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/how-to-order">Подробная инструкция →</Link>
          </Button>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="border-y border-neutral-border bg-neutral-muted/40 section-spacing">
        <div className="page-container-narrow">
          <p className="section-kicker">FAQ</p>
          <h2 id="faq-heading" className="heading-section mt-2">
            Частые вопросы
          </h2>
          <div className="mt-8 space-y-3">
            {faqItems.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-neutral-border bg-neutral-surface px-5 py-4 shadow-sm">
                <summary className="touch-target min-h-11 cursor-pointer list-none font-semibold text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="promo-heading" className="page-container section-spacing">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gold-muted via-gold-muted-dark to-blue-soft-dark p-6 text-white sm:p-12">
          <div className="relative max-w-2xl">
            <p className="section-kicker text-white/70">Заказ</p>
            <h2 id="promo-heading" className="heading-section mt-2 text-white">
              Заказ по согласованию — удобно и прозрачно
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Каждый заказ обсуждаем лично: дата, адрес, цвета и бюджет — без лишней бюрократии.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-white text-gold-muted-dark hover:bg-neutral-muted">
                <Link href="/how-to-order">Как оформить заказ</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10">
                <Link href="/contacts">Контакты</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-heading" className="page-container pb-10 sm:pb-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <div className="space-y-4">
            <p className="section-kicker">Связь</p>
            <h2 id="contact-heading" className="heading-section">
              Закажите оформление прямо сейчас
            </h2>
            <p className="text-muted leading-7">
              Позвоните или напишите — поможем подобрать композицию и рассчитаем стоимость с
              доставкой по Москве.
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <a
                href={buildTelUrl(settings.phone)}
                className="touch-target inline-flex items-center gap-2 py-1 text-xl font-bold text-foreground hover:text-gold-muted-dark sm:text-lg"
              >
                <Phone className="h-5 w-5 shrink-0" aria-hidden />
                {formatPhone(settings.phone)}
              </a>
              <span className="inline-flex items-center gap-2 text-sm text-muted">
                <Truck className="h-4 w-4 shrink-0" aria-hidden />
                Доставка по согласованию
              </span>
            </div>
          </div>

          <div className="rounded-3xl bg-neutral-muted/50 p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-muted-light/60 text-gold-muted-dark">
                <MessageCircle className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-foreground">Быстрый заказ</p>
                <p className="text-xs text-muted">Ответим в мессенджере или по телефону</p>
              </div>
            </div>
            <OrderButtons
              compact
              hideTelegramOnMobile
              showMaxNote
              settings={settings}
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="seo-text-heading" className="page-container pb-12 sm:pb-16">
        <div className="rounded-2xl border border-neutral-border bg-neutral-muted/30 p-6 sm:p-10">
          <h2 id="seo-text-heading" className="sr-only">
            О доставке гелевых шаров в Москве
          </h2>
          <div className="space-y-8">
            {seoTextBlocks.map((block) => (
              <div key={block.title}>
                <h3 className="text-xl font-bold text-foreground">{block.title}</h3>
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="mt-3 text-sm leading-7 text-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
