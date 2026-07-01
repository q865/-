import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { OrderButtons } from "@/components/order-buttons";
import { Button } from "@/components/ui/button";
import { orderSteps } from "@/lib/home-content";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getSettings, buildTelUrl } from "@/lib/settings";
import { formatPhone } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Как заказать гелевые шары",
  description:
    "Пошаговая инструкция: как заказать композиции из гелевых шаров в Москве. Выбор, согласование, доставка. Air Cloud MSK.",
  path: "/how-to-order",
});

const orderTips = [
  "Цены на сайте — ориентир «от»; точную сумму согласуем после обсуждения деталей.",
  "Доставка по Москве и области — время и адрес согласуем заранее.",
  "Можно прислать референс-фото — подберём похожую композицию.",
];

export default async function HowToOrderPage() {
  const settings = await getSettings();

  return (
    <SiteShell>
      <div className="page-container section-spacing">
        <Breadcrumbs
          items={[
            { name: "Главная", href: "/" },
            { name: "Как заказать", href: "/how-to-order", current: true },
          ]}
        />

        <div className="mb-10 max-w-2xl">
          <p className="section-kicker">Заказ</p>
          <h1 className="heading-page mt-2">Как заказать</h1>
          <p className="mt-3 text-muted leading-7">
            Каждый заказ оформляется по согласованию — так мы учитываем дату, адрес, цвета и
            бюджет.
          </p>
        </div>

        <div className="space-y-4">
          {orderSteps.map((step) => (
            <article
              key={step.step}
              className="premium-card flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:gap-6 sm:p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-dusty text-lg font-bold text-white">
                {step.step}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-semibold text-foreground">{step.title}</h2>
                <p className="mt-2 text-sm leading-7 text-muted sm:text-base">{step.text}</p>
                <Link
                  href={step.href}
                  className="link-accent touch-target mt-4 inline-flex items-center gap-1 py-1 text-sm font-medium"
                >
                  Перейти
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <section aria-labelledby="tips-heading" className="mt-10 sm:mt-12">
          <h2 id="tips-heading" className="heading-section">
            Полезно знать
          </h2>
          <ul className="mt-5 space-y-3">
            {orderTips.map((tip) => (
              <li
                key={tip}
                className="flex gap-3 rounded-2xl border border-neutral-border bg-neutral-muted/40 px-5 py-4"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-rose-dusty-dark"
                  aria-hidden
                />
                <span className="text-sm leading-7 text-muted">{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 rounded-3xl bg-neutral-muted/50 p-6 sm:mt-12 sm:p-8">
          <h2 className="heading-section">Связаться с {settings.siteName}</h2>
          <p className="mt-2 text-muted">
            Позвоните{" "}
            <a
              href={buildTelUrl(settings.phone)}
              className="font-semibold text-foreground hover:text-rose-dusty-dark"
            >
              {formatPhone(settings.phone)}
            </a>{" "}
            или напишите в мессенджер:
          </p>
          <div className="mt-6 max-w-md">
            <OrderButtons settings={settings} />
          </div>
        </section>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/catalog">
              Перейти в каталог
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href="/contacts">Контакты</Link>
          </Button>
        </div>
      </div>
    </SiteShell>
  );
}
