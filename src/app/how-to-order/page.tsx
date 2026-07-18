import type { Metadata } from "next";
import Link from "next/link";
import { Send } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { orderSteps } from "@/lib/home-content";
import { buildPageMetadata } from "@/lib/page-metadata";
import { SITE_BRAND_NAME } from "@/lib/site-config";
import { getSettings } from "@/lib/queries/settings";
import { buildTelegramOrderUrl, buildTelUrl } from "@/lib/contact-links";
import { formatPhone } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Как заказать гелевые шары",
  description: `Пошаговая инструкция: как заказать композиции из гелевых шаров в Москве. Выбор, согласование, доставка. ${SITE_BRAND_NAME}.`,
  path: "/how-to-order",
});

const workflowSteps = [
  "Обсуждаем палитру и идею композиции",
  "Согласуем дату, адрес и бюджет",
  "Утверждаем финальную стоимость",
  "Изготавливаем и доставляем оформление",
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

        <div className="mb-8 max-w-2xl">
          <p className="section-kicker">Заказ</p>
          <h1 className="heading-page mt-2">Как оформить заказ</h1>
          <p className="mt-3 text-muted leading-7">
            Каждый заказ согласуем лично — так учитываем все пожелания по цветам, поводу и
            доставке.
          </p>
        </div>

        <div className="mb-8 inline-flex items-center gap-2 rounded-2xl bg-mint-soft/60 px-4 py-2 text-sm font-semibold text-blue-soft-dark">
          <span className="h-2 w-2 rounded-full bg-blue-soft-dark" aria-hidden />
          На согласовании — напишите, и мы подключимся
        </div>

        <div className="space-y-4">
          {orderSteps.map((step, index) => (
            <article
              key={step.step}
              className="relative flex gap-4 rounded-2xl border border-neutral-border bg-neutral-surface p-5 sm:gap-5 sm:p-6"
            >
              {index < orderSteps.length - 1 ? (
                <span
                  className="absolute left-[2.125rem] top-14 hidden h-[calc(100%-1rem)] w-px bg-neutral-border sm:block"
                  aria-hidden
                />
              ) : null}
              <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold-muted text-base font-bold text-white">
                {step.step}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold text-foreground sm:text-xl">{step.title}</h2>
                <p className="mt-2 text-sm leading-7 text-muted">{step.text}</p>
                <Link href={step.href} className="link-accent mt-3 inline-flex text-sm font-medium">
                  Перейти →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <section aria-labelledby="workflow-heading" className="mt-10 rounded-3xl bg-neutral-muted/50 p-6 sm:mt-12 sm:p-8">
          <h2 id="workflow-heading" className="heading-section">
            Как проходит заказ
          </h2>
          <ol className="mt-5 space-y-3">
            {workflowSteps.map((item, index) => (
              <li key={item} className="flex gap-3 text-sm leading-7 text-muted">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-muted-light text-xs font-bold text-gold-muted-dark">
                  {index + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-8 rounded-3xl border border-gold-muted-light/60 bg-gold-muted-light/25 p-6 sm:p-8">
          <h2 className="heading-section">Консультация с декоратором</h2>
          <p className="mt-2 text-sm leading-7 text-muted">
            Опишите повод и пожелания — подберём композицию и рассчитаем стоимость с доставкой.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a
                href={buildTelegramOrderUrl(settings.telegramUrl)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Send className="h-4 w-4" aria-hidden />
                Написать в Telegram
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/contacts">Форма заявки</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted">
            Или позвоните{" "}
            <a
              href={buildTelUrl(settings.phone)}
              className="font-semibold text-foreground hover:text-gold-muted-dark"
            >
              {formatPhone(settings.phone)}
            </a>
          </p>
        </section>
      </div>
    </SiteShell>
  );
}
