import Link from "next/link";
import { MessageCircle, Phone, Send } from "lucide-react";
import type { SiteSettings } from "@/generated/prisma/client";
import { buildTelUrl } from "@/lib/settings";

function VkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.08 14.27h-1.46c-.55 0-.72-.44-1.71-1.44-1-.94-1.43-1.07-1.68-1.07-.34 0-.44.1-.44.58v1.31c0 .42-.13.67-1.24.67-1.83 0-3.86-1.12-5.28-3.21C4.94 10.86 4.5 8.78 4.5 8.37c0-.25.1-.48.58-.48h1.46c.44 0 .6.2.77.67.85 2.45 2.27 4.6 2.85 4.6.22 0 .32-.1.32-.65V9.66c-.07-1.12-.65-1.21-.65-1.62 0-.19.16-.38.41-.38h2.3c.37 0 .5.2.5.63v3.38c0 .37.17.5.27.5.22 0 .4-.13.79-.52 1.22-1.36 2.09-3.47 2.09-3.47.12-.25.31-.48.75-.48h1.46c.44 0 .54.23.44.63-.18.84-1.93 3.3-1.93 3.3-.17.27-.23.39 0 .7.17.23.73.72 1.11 1.16.68.77 1.2 1.42 1.34 1.86.14.48-.08.73-.52.73z" />
    </svg>
  );
}

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
  return (
    <div className={className}>
      <a
        href={settings.telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-soft-light text-blue-soft-dark transition hover:bg-blue-soft/50"
        aria-label="Telegram"
      >
        <Send className="h-4 w-4" />
      </a>
      <a
        href={settings.vkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-dusty-light/60 text-rose-dusty-dark transition hover:bg-rose-dusty-light"
        aria-label="ВКонтакте"
      >
        <VkIcon className="h-4 w-4" />
      </a>
      {settings.maxUrl ? (
        <a
          href={settings.maxUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream-dark text-[#6b6560] transition hover:bg-rose-dusty-light/40"
          aria-label="MAX"
        >
          <MaxIcon className="h-4 w-4" />
        </a>
      ) : null}
      <a
        href={buildTelUrl(settings.phone)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream-dark text-rose-dusty-dark transition hover:bg-rose-dusty-light/50"
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
    { href: "/how-to-order", label: "Как заказать" },
    { href: "/contacts", label: "Контакты" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-rose-dusty-light/50 bg-cream/85 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-dusty to-blue-soft text-white shadow-md shadow-rose-dusty/20 transition group-hover:shadow-lg group-hover:shadow-rose-dusty/25">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <div className="text-lg font-bold text-[#3d3a36]">{settings.siteName}</div>
            <div className="text-xs text-[#6b6560]">Гелевые шары · Москва</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#6b6560] transition hover:text-rose-dusty-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <SocialLinks settings={settings} className="flex items-center gap-2" />
      </div>

      <nav className="flex gap-3 overflow-x-auto border-t border-rose-dusty-light/30 px-4 py-3 md:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="whitespace-nowrap rounded-full bg-rose-dusty-light/40 px-4 py-2 text-sm font-medium text-rose-dusty-dark"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
