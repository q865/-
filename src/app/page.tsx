import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Phone,
  Sparkles,
  Truck,
} from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { JsonLd } from "@/components/home/json-ld";
import { FadeIn } from "@/components/motion/fade-in-section";
import { StaggerGrid } from "@/components/motion/stagger-grid";
import { OrderButtons } from "@/components/order-buttons";
import { ProductCard } from "@/components/product-card";
import { ProductImage } from "@/components/product-image";
import { Button } from "@/components/ui/button";
import {
  advantages,
  faqItems,
  occasions,
  orderSteps,
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
import { buildTelegramOrderUrl, buildTelUrl } from "@/lib/contact-links";
import { SITE_KEYWORDS, SITE_URL } from "@/lib/site-config";
import { formatPhone, getProductCoverImage } from "@/lib/utils";

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

  const featured = products.filter((product) => product.featured).slice(0, 8);
  const showcaseProducts = featured.length > 0 ? featured : products.slice(0, 8);
  const heroImages = products.slice(0, 4);

  const structuredData = [
    buildLocalBusinessJsonLd(settings),
    buildWebSiteJsonLd(settings),
    buildFaqJsonLd(),
    buildProductListJsonLd(showcaseProducts),
  ].filter(Boolean);

  return (
    <SiteShell>
      <JsonLd data={structuredData} />

      <section aria-labelledby="hero-heading" className="relative overflow-hidden border-b border-neutral-border bg-neutral-surface">
        <div className="floating-orb -left-16 top-8 h-48 w-48 bg-rose-dusty-light/60 animate-float-gentle" />
        <div
          className="floating-orb right-0 top-12 h-40 w-40 bg-lavender-soft/70 animate-float-gentle"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="floating-orb bottom-4 left-1/3 h-32 w-32 bg-mint-soft/60 animate-float-gentle"
          style={{ animationDelay: "4s" }}
        />

        <div className="page-container relative grid gap-10 py-14 lg:grid-cols-2 lg:items-center lg:py-20">
          <FadeIn className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-dusty-light/50 bg-rose-dusty-light/40 px-4 py-2 text-sm font-medium text-rose-dusty-dark shadow-sm">
              <Sparkles className="h-4 w-4" aria-hidden />
              Гелевые шары с доставкой по Москве
            </div>
            <h1 id="hero-heading" className="heading-display">
              {settings.heroTitle}
            </h1>
            <p className="max-w-xl text-lg leading-8 text-muted">{settings.heroSubtitle}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/catalog">
                  Смотреть каталог
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a
                  href={buildTelegramOrderUrl(settings.telegramUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Написать в Telegram
                </a>
              </Button>
            </div>
          </FadeIn>

          {heroImages.length > 0 ? (
            <FadeIn delayMs={120} className="grid grid-cols-2 gap-3 sm:gap-4">
              {heroImages.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className={`premium-card group overflow-hidden ${
                    index === 1 ? "translate-y-4" : index === 3 ? "-translate-y-2" : ""
                  }`}
                >
                  <div className="relative aspect-square overflow-hidden bg-neutral-muted">
                    <ProductImage
                      src={getProductCoverImage(product.images)}
                      alt={`${product.name} — гелевые шары ${product.category.name}`}
                      fill
                      className="object-cover transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                </Link>
              ))}
            </FadeIn>
          ) : null}
        </div>
      </section>

      <section aria-label="Преимущества сервиса" className="border-b border-neutral-border bg-neutral-muted/50">
        <div className="page-container grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div key={item.label} className="rounded-xl bg-neutral-surface px-4 py-4 shadow-sm">
              <p className="font-semibold text-foreground">{item.label}</p>
              <p className="mt-1 text-sm text-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="categories-heading" className="page-container py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="section-kicker">Каталог</p>
            <h2 id="categories-heading" className="heading-section mt-2">
              Шары по коллекциям
            </h2>
          </div>
          <Link href="/catalog" className="link-accent text-sm font-medium">
            Весь каталог →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/catalog?category=${category.slug}`}
              className="group flex items-center gap-4 rounded-2xl border border-neutral-border bg-neutral-surface px-5 py-4 shadow-sm transition hover:border-rose-dusty-light hover:shadow-md"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-neutral-muted text-lg font-bold text-neutral-text transition group-hover:bg-rose-dusty-light/40 group-hover:text-rose-dusty-dark">
                {category.name.charAt(0)}
              </div>
              <h3 className="text-lg font-semibold text-foreground">{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {showcaseProducts.length > 0 ? (
        <section aria-labelledby="products-heading" className="border-y border-neutral-border bg-neutral-muted/60 py-16">
          <div className="page-container">
            <p className="section-kicker">{featured.length > 0 ? "Популярное" : "Каталог"}</p>
            <h2 id="products-heading" className="heading-section mt-2">
              {featured.length > 0 ? "Товары к празднику" : "Композиции из гелевых шаров"}
            </h2>
            <p className="mt-2 max-w-2xl text-muted">
              Готовые идеи с ориентировочной ценой — точную стоимость согласуем после обсуждения
              деталей заказа.
            </p>
            <StaggerGrid className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

      <section aria-labelledby="occasions-heading" className="page-container py-16">
        <p className="section-kicker">Поводы</p>
        <h2 id="occasions-heading" className="heading-section mt-2">
          Оформление шарами на любой праздник
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {occasions.map((occasion) => (
            <Link
              key={occasion.title}
              href={occasion.href}
              className="rounded-2xl border border-neutral-border bg-neutral-surface p-6 shadow-sm transition hover:border-rose-dusty-light hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-foreground">{occasion.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{occasion.text}</p>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="advantages-heading" className="border-y border-neutral-border bg-neutral-surface py-16">
        <div className="page-container">
          <p className="section-kicker">О нас</p>
          <h2 id="advantages-heading" className="heading-section mt-2">
            Почему выбирают {settings.siteName}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {advantages.map((item) => (
              <article key={item.title} className="flex gap-4 rounded-2xl border border-neutral-border bg-neutral-muted/40 p-6">
                <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-rose-dusty-dark" aria-hidden />
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="steps-heading" className="page-container py-16">
        <p className="section-kicker">Заказ</p>
        <h2 id="steps-heading" className="heading-section mt-2">
          Как заказать гелевые шары
        </h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {orderSteps.map((step) => (
            <article key={step.step} className="rounded-2xl border border-neutral-border bg-neutral-surface p-6 shadow-sm">
              <p className="text-sm font-bold text-rose-dusty-dark">{step.step}</p>
              <h3 className="mt-2 text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{step.text}</p>
              <Link href={step.href} className="link-accent mt-4 inline-flex text-sm font-medium">
                Подробнее →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="border-y border-neutral-border bg-neutral-muted/40 py-16">
        <div className="page-container-narrow">
          <p className="section-kicker">FAQ</p>
          <h2 id="faq-heading" className="heading-section mt-2">
            Частые вопросы
          </h2>
          <div className="mt-8 space-y-3">
            {faqItems.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-neutral-border bg-neutral-surface px-5 py-4 shadow-sm">
                <summary className="cursor-pointer list-none font-semibold text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="promo-heading" className="page-container py-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-dusty via-rose-dusty-dark to-blue-soft-dark p-8 text-white sm:p-12">
          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Акция</p>
            <h2 id="promo-heading" className="mt-2 text-3xl font-bold">
              Заказ по согласованию — удобно и прозрачно
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Работаем из дома, поэтому каждый заказ обсуждаем лично: дата, адрес, цвета и бюджет.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-white text-rose-dusty-dark hover:bg-neutral-muted">
                <Link href="/how-to-order">Как оформить заказ</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10">
                <Link href="/contacts">Контакты</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-heading" className="page-container pb-8">
        <div className="grid gap-8 rounded-2xl border border-neutral-border bg-neutral-surface p-8 lg:grid-cols-2">
          <div>
            <p className="section-kicker">Связь</p>
            <h2 id="contact-heading" className="heading-section mt-2">
              Закажите оформление прямо сейчас
            </h2>
            <p className="mt-3 text-muted">
              Позвоните или напишите — поможем подобрать композицию и рассчитаем стоимость с
              доставкой по Москве.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <a href={buildTelUrl(settings.phone)} className="inline-flex items-center gap-2 text-lg font-bold text-foreground hover:text-rose-dusty-dark">
                <Phone className="h-5 w-5" aria-hidden />
                {formatPhone(settings.phone)}
              </a>
              <span className="inline-flex items-center gap-2 text-sm text-muted">
                <Truck className="h-4 w-4" aria-hidden />
                Доставка по согласованию
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-neutral-border bg-neutral-muted/40 p-6">
            <div className="mb-4 flex items-center gap-2 font-semibold text-foreground">
              <MessageCircle className="h-5 w-5 text-rose-dusty-dark" aria-hidden />
              Быстрый заказ
            </div>
            <OrderButtons settings={settings} />
          </div>
        </div>
      </section>

      <section aria-labelledby="seo-text-heading" className="page-container pb-16">
        <div className="rounded-2xl border border-neutral-border bg-neutral-muted/30 p-8 sm:p-10">
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
