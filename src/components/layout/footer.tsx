import Link from "next/link";
import type { SiteSettings } from "@/generated/prisma/client";
import { Logo } from "@/components/brand/logo";
import { formatPhone } from "@/lib/utils";
import { SocialLinks } from "@/components/layout/header";

type FooterCategory = { name: string; slug: string };

export function Footer({
  settings,
  categories = [],
}: {
  settings: SiteSettings;
  categories?: FooterCategory[];
}) {
  const linkClass = "touch-target py-1 text-sm text-muted transition hover:text-gold-muted-dark";

  return (
    <footer className="mt-auto border-t border-neutral-border bg-neutral-surface">
      <div className="page-container grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 shrink-0 overflow-hidden rounded-xl ring-1 ring-neutral-border/60">
              <Logo className="h-9 w-9" />
            </div>
            <h3 className="text-lg font-bold text-foreground">{settings.siteName}</h3>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">
            Композиции из гелевых шаров и оформление праздников в Москве.
            Заказ по согласованию — напишите нам удобным способом.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground">Навигация</h4>
          <div className="mt-3 flex flex-col gap-1">
            <Link href="/catalog" className={linkClass}>
              Каталог
            </Link>
            <Link href="/services" className={linkClass}>
              Услуги для бизнеса
            </Link>
            <Link href="/how-to-order" className={linkClass}>
              Как заказать
            </Link>
            <Link href="/contacts" className={linkClass}>
              Контакты
            </Link>
          </div>
        </div>

        {categories.length > 0 ? (
          <div>
            <h4 className="font-semibold text-foreground">Коллекции</h4>
            <div className="mt-3 flex flex-col gap-1">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/catalog?category=${category.slug}`}
                  className={linkClass}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div>
          <h4 className="font-semibold text-foreground">Связаться</h4>
          <a
            href={`tel:${settings.phone.replace(/\D/g, "")}`}
            className="touch-target mt-3 block py-1 text-sm font-medium text-foreground hover:text-gold-muted-dark"
          >
            {formatPhone(settings.phone)}
          </a>
          <SocialLinks settings={settings} className="mt-4 flex items-center gap-2" />
        </div>
      </div>

      <div className="page-container border-t border-neutral-border py-4 text-center text-xs text-neutral-text">
        © {new Date().getFullYear()} {settings.siteName}. Москва.
      </div>
    </footer>
  );
}
