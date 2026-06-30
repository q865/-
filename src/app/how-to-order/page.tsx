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
        <h1 className="text-4xl font-bold text-[#3d3a36]">Как заказать</h1>
        <p className="mt-4 text-lg text-[#6b6560]">
          Мы работаем из дома, поэтому каждый заказ оформляется по согласованию — так мы
          можем учесть все ваши пожелания.
        </p>

        <div className="mt-12 space-y-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex gap-5 rounded-3xl border border-rose-dusty-light/50 bg-cream-card p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-dusty to-rose-dusty-dark text-lg font-bold text-cream">
                {index + 1}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#3d3a36]">{step.title}</h2>
                <p className="mt-2 text-[#6b6560]">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl border border-blue-soft/30 bg-blue-soft-light/40 p-8">
          <h2 className="text-2xl font-bold text-[#3d3a36]">Связаться с {settings.siteName}</h2>
          <ul className="mt-4 space-y-2 text-[#5c5651]">
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
