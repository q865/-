import Link from "next/link";
import type { SiteSettings } from "@/generated/prisma/client";
import { formatPhone } from "@/lib/utils";
import { SocialLinks } from "@/components/layout/header";

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="mt-auto border-t border-rose-dusty-light/40 bg-gradient-to-b from-cream-card to-cream-dark/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold text-[#3d3a36]">{settings.siteName}</h3>
          <p className="mt-3 text-sm leading-6 text-[#6b6560]">
            Композиции из гелевых шаров и оформление праздников в Москве.
            Заказ по согласованию — напишите нам удобным способом.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-[#3d3a36]">Навигация</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm text-[#6b6560]">
            <Link href="/catalog" className="transition hover:text-rose-dusty-dark">Каталог</Link>
            <Link href="/how-to-order" className="transition hover:text-rose-dusty-dark">Как заказать</Link>
            <Link href="/contacts" className="transition hover:text-rose-dusty-dark">Контакты</Link>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-[#3d3a36]">Связаться</h4>
          <p className="mt-3 text-sm text-[#6b6560]">{formatPhone(settings.phone)}</p>
          <SocialLinks settings={settings} className="mt-4 flex items-center gap-2" />
        </div>
      </div>

      <div className="border-t border-rose-dusty-light/30 px-4 py-4 text-center text-xs text-[#9c9590]">
        © {new Date().getFullYear()} {settings.siteName}. Москва.
      </div>
    </footer>
  );
}
