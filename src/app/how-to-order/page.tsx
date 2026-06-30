import { SiteShell } from "@/components/layout/site-shell";
import { getSettings } from "@/lib/settings";

const steps = [
  {
    title: "Выберите композицию",
    text: "Посмотрите каталог или напишите нам — поможем подобрать вариант под ваш праздник и бюджет.",
  },
  {
    title: "Согласуем детали",
    text: "Обсудим дату, время, адрес доставки, цветовую гамму и финальную стоимость.",
  },
  {
    title: "Получите оформление",
    text: "Изготовим композицию и доставим в согласованное время. Оплата — по договорённости.",
  },
];

export default async function HowToOrderPage() {
  const settings = await getSettings();

  return (
    <SiteShell>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h1 className="text-4xl font-bold text-slate-900">Как заказать</h1>
        <p className="mt-4 text-lg text-slate-600">
          Мы работаем из дома, поэтому каждый заказ оформляется по согласованию — так мы
          можем учесть все ваши пожелания.
        </p>

        <div className="mt-12 space-y-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex gap-5 rounded-3xl border border-pink-100 bg-white p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-500 text-lg font-bold text-white">
                {index + 1}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{step.title}</h2>
                <p className="mt-2 text-slate-600">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-sky-50 p-8">
          <h2 className="text-2xl font-bold text-slate-900">Связаться с {settings.siteName}</h2>
          <ul className="mt-4 space-y-2 text-slate-700">
            <li>Telegram: {settings.telegramUrl}</li>
            <li>VK: {settings.vkUrl}</li>
            {settings.maxUrl ? <li>MAX: {settings.maxUrl}</li> : null}
            <li>Телефон: {settings.phone}</li>
          </ul>
        </div>
      </div>
    </SiteShell>
  );
}
