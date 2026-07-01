import Link from "next/link";
import { MessageCircle, Phone, Send } from "lucide-react";
import type { SiteSettings } from "@/generated/prisma/client";
import { VkIcon } from "@/components/icons/vk-icon";
import { Button } from "@/components/ui/button";
import { buildTelUrl } from "@/lib/contact-links";
import { formatPhone } from "@/lib/utils";

function MaxIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2C6.48 2 2 6.03 2 11c0 2.76 1.36 5.23 3.5 6.88L4 22l4.38-1.28C9.5 21.24 10.72 21.5 12 21.5c5.52 0 10-4.03 10-9S17.52 2 12 2zm0 16c-1.1 0-2.16-.22-3.14-.62l-.22-.1-2.2.64.64-2.14-.14-.22C6.22 14.16 6 13.1 6 12c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6z" />
    </svg>
  );
}

export function SocialLinks({
  settings,
  className,
}: {
  settings: SiteSettings;
  className?: string;
}) {
  const iconClass =
    "icon-hover-bounce inline-flex h-11 w-11 items-center justify-center rounded-full bg-neutral-muted text-muted transition-colors duration-300";

  return (
    <div className={className}>
      <a
        href={settings.telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${iconClass} hover:bg-blue-soft-light hover:text-blue-soft-dark`}
        aria-label="Telegram"
      >
        <Send className="h-4 w-4" />
      </a>
      <a
        href={settings.vkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${iconClass} hover:bg-rose-dusty-light hover:text-rose-dusty-dark`}
        aria-label="ВКонтакте"
      >
        <VkIcon className="h-4 w-4" />
      </a>
      {settings.maxUrl ? (
        <a
          href={settings.maxUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconClass} hover:bg-rose-dusty-light/60`}
          aria-label="MAX"
        >
          <MaxIcon className="h-4 w-4" />
        </a>
      ) : null}
      <a
        href={buildTelUrl(settings.phone)}
        className={`${iconClass} hover:bg-rose-dusty-light hover:text-rose-dusty-dark`}
        aria-label="Позвонить"
      >
        <Phone className="h-4 w-4" />
      </a>
    </div>
  );
}

export function Header({ settings }: { settings: SiteSettings }) {
  const links = [
    { href: "/catalog", label: "Каталог" },
    { href: "/services", label: "Услуги", shortLabel: "Услуги" },
    { href: "/how-to-order", label: "Как заказать", shortLabel: "Заказ" },
    { href: "/contacts", label: "Контакты" },
  ];

  const navPillClass =
    "flex min-h-11 items-center justify-center rounded-2xl border border-neutral-border bg-neutral-muted px-2 text-center text-xs font-semibold leading-tight text-muted sm:text-sm";

  return (
    <header className="sticky top-0 z-50 bg-neutral-surface">
      <div className="hidden border-b border-neutral-border bg-cream/80 sm:block">
        <div className="page-container flex items-center justify-between gap-4 py-2 text-sm">
          <p className="text-muted">Сделайте праздник ярче</p>
          <a
            href={buildTelUrl(settings.phone)}
            className="touch-target py-1 font-semibold text-foreground transition hover:text-rose-dusty-dark"
          >
            {formatPhone(settings.phone)}
          </a>
        </div>
      </div>

      <div className="border-b border-neutral-border bg-neutral-surface/95 backdrop-blur-lg">
        <div className="page-container flex items-center justify-between gap-3 py-2.5 sm:gap-4 sm:py-3">
          <Link href="/" className="group flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-dusty to-blue-soft text-white shadow-sm sm:h-10 sm:w-10">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <div className="truncate text-base font-bold text-foreground sm:text-lg">{settings.siteName}</div>
              <div className="truncate text-[11px] text-neutral-text sm:text-xs">Гелевые шары · Москва</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted transition hover:text-rose-dusty-dark"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href={buildTelUrl(settings.phone)}
              className="icon-hover-bounce inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-muted text-muted transition-colors duration-300 hover:bg-rose-dusty-light hover:text-rose-dusty-dark sm:hidden"
              aria-label={`Позвонить ${formatPhone(settings.phone)}`}
            >
              <Phone className="h-4 w-4" />
            </a>
            <SocialLinks settings={settings} className="hidden items-center gap-1.5 sm:flex" />
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href="/catalog">Заказать</Link>
            </Button>
          </div>
        </div>

        <nav className="page-container grid grid-cols-2 gap-2 border-t border-neutral-border py-2 sm:grid-cols-4 md:hidden">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={navPillClass}>
              <span className="sm:hidden">{link.shortLabel ?? link.label}</span>
              <span className="hidden sm:inline">{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
