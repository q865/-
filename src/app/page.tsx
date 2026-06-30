import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getSettings, buildTelegramOrderUrl } from "@/lib/settings";

export const dynamic = "force-dynamic";

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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#fce7f3_0%,_transparent_50%),radial-gradient(circle_at_top_right,_#dbeafe_0%,_transparent_45%)]" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm text-pink-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Оформление праздников в Москве
            </div>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
              {settings.heroTitle}
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
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

          <div className="grid grid-cols-2 gap-4">
            {[
              "from-pink-200 to-rose-300",
              "from-sky-200 to-blue-300",
              "from-violet-200 to-purple-300",
              "from-amber-200 to-orange-300",
            ].map((gradient, index) => (
              <div
                key={gradient}
                className={`aspect-square rounded-[2rem] bg-gradient-to-br ${gradient} shadow-xl shadow-pink-100/50 ${index % 2 === 1 ? "translate-y-6" : ""}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Категории</h2>
            <p className="mt-2 text-slate-600">Выберите повод — мы подберём композицию</p>
          </div>
          <Link href="/catalog" className="text-sm font-medium text-pink-600 hover:text-pink-700">
            Весь каталог →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/catalog?category=${category.slug}`}
              className="group rounded-3xl border border-pink-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`mb-4 h-24 rounded-2xl bg-gradient-to-br ${[
                "from-pink-100 to-rose-200",
                "from-sky-100 to-blue-200",
                "from-violet-100 to-purple-200",
                "from-amber-100 to-orange-200",
                "from-emerald-100 to-teal-200",
                "from-fuchsia-100 to-pink-200",
              ][index % 6]}`} />
              <h3 className="text-xl font-semibold text-slate-900 group-hover:text-pink-600">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {featured.length > 0 ? (
        <section className="bg-white/70 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-slate-900">Популярное</h2>
            <p className="mt-2 text-slate-600">Любимые композиции наших клиентов</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-[2rem] bg-gradient-to-r from-pink-500 to-sky-500 p-8 text-white sm:p-12">
          <h2 className="text-3xl font-bold">Заказ по согласованию</h2>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Работаем из дома — каждый заказ обсуждаем лично: дата, адрес, цвета и бюджет.
            Напишите в Telegram, VK или MAX — ответим быстро.
          </p>
          <div className="mt-6">
            <Button asChild variant="secondary" size="lg">
              <Link href="/how-to-order">Как оформить заказ</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
