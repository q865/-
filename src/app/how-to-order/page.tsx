import type { Metadata } from "next";
import Link from "next/link";
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

export default async function HowToOrderPage() {
  const settings = await getSettings();

  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <Breadcrumbs
          items={[
            { name: "Главная", href: "/" },
            { name: "Как заказать", href: "/how-to-order", current: true },
          ]}
        />

        <h1 className="text-4xl font-bold text-[#3d3a36]">Как заказать</h1>
        <p className="mt-4 text-lg text-[#6b6560]">
          Мы работаем из дома, поэтому каждый заказ оформляется по согласованию — так мы
          можем учесть все ваши пожелания.
        </p>

        <div className="mt-12 space-y-5">
          {orderSteps.map((step) => (
            <article
              key={step.step}
              className="flex gap-5 rounded-2xl border border-neutral-border bg-neutral-surface p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-dusty text-lg font-bold text-white">
                {step.step}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#3d3a36]">{step.title}</h2>
                <p className="mt-2 text-[#6b6560]">{step.text}</p>
                <Link
                  href={step.href}
                  className="mt-3 inline-flex text-sm font-medium text-rose-dusty-dark hover:text-rose-dusty"
                >
                  Перейти →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-neutral-border bg-neutral-muted/40 p-8">
          <h2 className="text-2xl font-bold text-[#3d3a36]">
            Связаться с {settings.siteName}
          </h2>
          <p className="mt-2 text-[#6b6560]">
            Позвоните{" "}
            <a
              href={buildTelUrl(settings.phone)}
              className="font-semibold text-[#3d3a36] hover:text-rose-dusty-dark"
            >
              {formatPhone(settings.phone)}
            </a>{" "}
            или напишите в мессенджер:
          </p>
          <div className="mt-6 max-w-md">
            <OrderButtons settings={settings} />
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link href="/catalog">Перейти в каталог</Link>
          </Button>
        </div>
      </div>
    </SiteShell>
  );
}
