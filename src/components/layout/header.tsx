import Link from "next/link";
import { LayoutGrid, Phone, Send } from "lucide-react";
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
    "icon-hover-bounce inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-muted text-muted transition-colors duration-300";

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
        className={`${iconClass} hover:bg-gold-muted-light hover:text-gold-muted-dark`}
        aria-label="ВКонтакте"
      >
        <VkIcon className="h-4 w-4" />
      </a>
      {settings.maxUrl ? (
        <a
          href={settings.maxUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconClass} hover:bg-gold-muted-light/60`}
          aria-label="MAX"
        >
          <MaxIcon className="h-4 w-4" />
        </a>
      ) : null}
      <a
        href={buildTelUrl(settings.phone)}
        className={`${iconClass} hover:bg-gold-muted-light hover:text-gold-muted-dark`}
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
    { href: "/services", label: "Услуги" },
    { href: "/how-to-order", label: "Как заказать" },
    { href: "/contacts", label: "Контакты" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-border bg-neutral-surface/95 backdrop-blur-lg">
      <div className="hidden border-b border-neutral-border/60 sm:block">
        <div className="page-container flex items-center justify-between gap-4 py-2 text-sm">
          <p className="text-muted">Гелевые шары с доставкой по Москве</p>
          <a
            href={buildTelUrl(settings.phone)}
            className="touch-target py-1 font-semibold text-foreground transition hover:text-gold-muted-dark"
          >
            {formatPhone(settings.phone)}
          </a>
        </div>
      </div>

      <div className="page-container flex items-center justify-between gap-3 py-3 sm:py-3.5">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-muted to-gold-muted-dark text-white shadow-sm">
            <LayoutGrid className="h-5 w-5" aria-hidden />
          </div>
          <div className="min-w-0">
            <div className="truncate text-base font-bold text-foreground sm:text-lg">
              {settings.siteName}
            </div>
            <div className="truncate text-[11px] text-neutral-text sm:text-xs">
              Создаём праздник
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition hover:text-gold-muted-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={buildTelUrl(settings.phone)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-muted text-muted transition hover:bg-gold-muted-light hover:text-gold-muted-dark md:hidden"
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
    </header>
  );
}
