import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { ContactForm } from "@/components/contact-form";
import { OrderButtons } from "@/components/order-buttons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/page-metadata";
import { getSettings, buildTelUrl } from "@/lib/settings";
import { formatPhone } from "@/lib/utils";

export const metadata: Metadata = buildPageMetadata({
  title: "Контакты — заказать гелевые шары",
  description:
    "Свяжитесь с Air Cloud MSK: Telegram, VK, телефон. Москва, доставка шаров с гелием по согласованию. Форма заявки на сайте.",
  path: "/contacts",
});

export default async function ContactsPage() {
  const settings = await getSettings();

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Breadcrumbs
          items={[
            { name: "Главная", href: "/" },
            { name: "Контакты", href: "/contacts", current: true },
          ]}
        />

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#3d3a36]">Контакты</h1>
          <p className="mt-2 text-lg text-[#6b6560]">
            Напишите нам удобным способом — ответим и согласуем заказ
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{settings.siteName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-[#6b6560]">
                <p>Москва · доставка и оформление по согласованию</p>
                <a
                  href={buildTelUrl(settings.phone)}
                  className="block text-2xl font-bold text-[#3d3a36] hover:text-rose-dusty-dark"
                >
                  {formatPhone(settings.phone)}
                </a>
                <OrderButtons settings={settings} />
              </CardContent>
            </Card>

            {!settings.maxUrl ? (
              <div className="rounded-2xl border border-blue-soft/30 bg-blue-soft-light/40 p-6 text-blue-soft-dark">
                <h2 className="font-semibold text-[#3d3a36]">Мессенджер MAX</h2>
                <p className="mt-2 text-sm">
                  Найдите нас в MAX по номеру {formatPhone(settings.phone)} или добавьте
                  ссылку на профиль в админке, когда она будет готова.
                </p>
              </div>
            ) : null}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Форма заявки</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </SiteShell>
  );
}
