import Link from "next/link";
import type { SiteSettings } from "@/generated/prisma/client";
import { formatPhone } from "@/lib/utils";
import { SocialLinks } from "@/components/layout/header";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="mt-auto border-t border-pink-100 bg-gradient-to-b from-white to-pink-50/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{settings.siteName}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Композиции из гелевых шаров и оформление праздников в Москве.
            Заказ по согласованию — напишите нам удобным способом.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900">Навигация</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
            <Link href="/catalog" className="hover:text-pink-600">Каталог</Link>
            <Link href="/how-to-order" className="hover:text-pink-600">Как заказать</Link>
            <Link href="/contacts" className="hover:text-pink-600">Контакты</Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900">Связаться</h4>
          <p className="mt-3 text-sm text-slate-600">{formatPhone(settings.phone)}</p>
          <SocialLinks settings={settings} className="mt-4 flex items-center gap-2" />
        </div>
      </div>

      <div className="border-t border-pink-100 px-4 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {settings.siteName}. Москва.
      </div>
    </footer>
  );
}
