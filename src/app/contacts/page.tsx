import type { Metadata } from "next";
import { Clock, MapPin, Phone } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ContactForm } from "@/components/contact-form";
import { OrderButtons } from "@/components/order-buttons";
import { buildPageMetadata } from "@/lib/page-metadata";
import { SITE_BRAND_NAME } from "@/lib/site-config";
import { getSettings, buildTelUrl } from "@/lib/settings";
import { formatPhone } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Контакты — заказать гелевые шары",
  description: `Свяжитесь с «${SITE_BRAND_NAME}»: Telegram, VK, телефон. Москва, доставка шаров с гелием по согласованию. Форма заявки на сайте.`,
  path: "/contacts",
});

const contactHighlights = [
  { icon: MapPin, label: "Москва и область", detail: "Доставка по согласованию" },
  { icon: Clock, label: "Ответ", detail: "Обычно в течение часа в рабочее время" },
  { icon: Phone, label: "Телефон", detail: "Звонок или мессенджер — как удобнее" },
];

export default async function ContactsPage() {
  const settings = await getSettings();

  return (
    <SiteShell>
      <div className="page-container section-spacing">
        <Breadcrumbs
          items={[
            { name: "Главная", href: "/" },
            { name: "Контакты", href: "/contacts", current: true },
          ]}
        />

        <div className="mb-10 max-w-2xl">
          <p className="section-kicker">Связь</p>
          <h1 className="heading-page mt-2">Контакты</h1>
          <p className="mt-3 text-muted leading-7">
            Напишите удобным способом — ответим, подберём композицию и согласуем дату доставки.
          </p>
        </div>

        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {contactHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="premium-card flex items-start gap-3 p-4 sm:p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gold-muted-light/50 text-gold-muted-dark">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="font-semibold text-foreground">{item.label}</p>
                  <p className="mt-1 text-sm text-muted">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-6">
            <div className="premium-card p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-foreground">{settings.siteName}</h2>
              <p className="mt-2 text-sm text-muted">
                Гелевые шары и оформление праздников · Москва
              </p>
              <a
                href={buildTelUrl(settings.phone)}
                className="touch-target mt-5 block text-2xl font-bold text-foreground hover:text-gold-muted-dark sm:text-3xl"
              >
                {formatPhone(settings.phone)}
              </a>
              <div className="mt-6">
                <OrderButtons settings={settings} />
              </div>
            </div>

            {!settings.maxUrl ? (
              <div className="rounded-3xl border border-blue-soft/30 bg-blue-soft-light/40 p-5 sm:p-6">
                <h2 className="font-semibold text-foreground">Мессенджер MAX</h2>
                <p className="mt-2 text-sm leading-6 text-blue-soft-dark">
                  Найдите нас в MAX по номеру {formatPhone(settings.phone)} или добавьте
                  ссылку на профиль в админке, когда она будет готова.
                </p>
              </div>
            ) : null}
          </div>

          <div id="form" className="premium-card scroll-mt-24 p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-foreground">Форма заявки</h2>
            <p className="mt-2 text-sm text-muted">
              Опишите повод, дату и пожелания — перезвоним или напишем в мессенджер.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
