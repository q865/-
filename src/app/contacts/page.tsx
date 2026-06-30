import { SiteShell } from "@/components/layout/site-shell";
import { ContactForm } from "@/components/contact-form";
import { OrderButtons } from "@/components/order-buttons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSettings } from "@/lib/settings";
import { formatPhone } from "@/lib/utils";

export default async function ContactsPage() {
  const settings = await getSettings();

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900">Контакты</h1>
          <p className="mt-2 text-lg text-slate-600">
            Напишите нам удобным способом — ответим и согласуем заказ
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{settings.siteName}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-600">
                <p>Москва · доставка и оформление по согласованию</p>
                <p className="text-2xl font-bold text-slate-900">
                  {formatPhone(settings.phone)}
                </p>
                <OrderButtons settings={settings} />
              </CardContent>
            </Card>

            {!settings.maxUrl ? (
              <div className="rounded-3xl bg-violet-50 p-6 text-violet-900">
                <h3 className="font-semibold">Мессенджер MAX</h3>
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
