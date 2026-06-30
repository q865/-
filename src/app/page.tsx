import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getSettings, buildTelegramOrderUrl } from "@/lib/settings";

export const dynamic = "force-dynamic";

const categoryGradients = [
  "from-rose-dusty-light/80 to-cream-dark",
  "from-blue-soft-light to-cream",
  "from-rose-dusty-light/50 to-blue-soft-light/60",
  "from-cream-dark to-blue-soft-light/70",
  "from-blue-soft-light/80 to-rose-dusty-light/40",
  "from-cream to-rose-dusty-light/60",
];

export default async function HomePage() {
  const settings = await getSettings();

  const [featured, categories] = await Promise.all([
    prisma.product.findMany({
      where: { published: true, featured: true },
      include: { category: true },
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      take: 6,
    }),
  ]);

  return (
    <SiteShell>
      <section className="relative overflow-hidden">
        <div className="cloud-orb cloud-orb-rose -left-20 top-10 h-64 w-64" />
        <div className="cloud-orb cloud-orb-blue -right-16 top-20 h-56 w-56" />
        <div className="cloud-orb cloud-orb-cream bottom-0 left-1/3 h-48 w-48" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-dusty-light/60 bg-cream-card/80 px-4 py-2 text-sm text-rose-dusty-dark shadow-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-blue-soft-dark" />
              Оформление праздников в Москве
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-[#3d3a36] sm:text-5xl">
              {settings.heroTitle}
            </h1>
            <p className="max-w-xl text-lg leading-8 text-[#6b6560]">
              {settings.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/catalog">
                  Смотреть каталог
                  <ArrowRight className="h-4 w-4" />
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
          </div>

          <div className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-4 lg:max-w-none">
            {[
              { cls: "bg-gradient-to-br from-rose-dusty-light to-rose-dusty/40", delay: "" },
              { cls: "bg-gradient-to-br from-blue-soft-light to-blue-soft/50", delay: "translate-y-8" },
              { cls: "bg-gradient-to-br from-cream-dark to-blue-soft-light/80", delay: "-translate-y-2" },
              { cls: "bg-gradient-to-br from-rose-dusty/30 to-blue-soft-light", delay: "translate-y-6" },
            ].map((item, index) => (
              <div
                key={index}
                className={`aspect-square rounded-[2rem] shadow-lg shadow-rose-dusty/10 transition duration-500 hover:scale-[1.02] ${item.cls} ${item.delay}`}
              />
            ))}
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-rose-dusty-light/30" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-[#3d3a36]">Категории</h2>
            <p className="mt-2 text-[#6b6560]">Выберите повод — мы подберём композицию</p>
          </div>
          <Link
            href="/catalog"
            className="text-sm font-medium text-rose-dusty-dark transition hover:text-rose-dusty"
          >
            Весь каталог →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/catalog?category=${category.slug}`}
              className="group rounded-3xl border border-rose-dusty-light/50 bg-cream-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-rose-dusty-light hover:shadow-md hover:shadow-rose-dusty/10"
            >
              <div
                className={`mb-4 h-24 rounded-2xl bg-gradient-to-br ${categoryGradients[index % categoryGradients.length]} transition group-hover:opacity-90`}
              />
              <h3 className="text-xl font-semibold text-[#3d3a36] transition group-hover:text-rose-dusty-dark">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {featured.length > 0 ? (
        <section className="border-y border-rose-dusty-light/30 bg-cream-card/50 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-[#3d3a36]">Популярное</h2>
            <p className="mt-2 text-[#6b6560]">Любимые композиции наших клиентов</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-rose-dusty/90 via-rose-dusty-dark/85 to-blue-soft-dark/80 p-8 text-cream sm:p-12">
          <div className="cloud-orb cloud-orb-cream -right-10 -top-10 h-40 w-40 opacity-30" />
          <div className="relative">
            <h2 className="text-3xl font-bold">Заказ по согласованию</h2>
            <p className="mt-4 max-w-2xl text-lg text-cream/90">
              Работаем из дома — каждый заказ обсуждаем лично: дата, адрес, цвета и бюджет.
              Напишите в Telegram, VK или MAX — ответим быстро.
            </p>
            <div className="mt-6">
              <Button
                asChild
                variant="secondary"
                size="lg"
                className="bg-cream-card text-rose-dusty-dark hover:bg-cream"
              >
                <Link href="/how-to-order">Как оформить заказ</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
