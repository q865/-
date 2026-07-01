"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Send } from "lucide-react";
import type { SiteSettings } from "@/generated/prisma/client";
import { buildTelegramOrderUrl } from "@/lib/contact-links";
import { cn } from "@/lib/utils";

const HOME_SCROLL_THRESHOLD = 420;

export function MobileOrderBar({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [revealed, setRevealed] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setRevealed(true);
      return;
    }

    const update = () => setRevealed(window.scrollY > HOME_SCROLL_THRESHOLD);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [isHome]);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-neutral-border/80 bg-neutral-surface/90 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] backdrop-blur-lg transition-transform duration-300 ease-out md:hidden",
        !revealed && "pointer-events-none translate-y-full",
      )}
      aria-hidden={!revealed}
    >
      <a
        href={buildTelegramOrderUrl(settings.telegramUrl)}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={revealed ? 0 : -1}
        className="btn-premium-glow flex h-11 w-full items-center justify-center gap-2 rounded-full bg-rose-dusty text-sm font-semibold text-white shadow-float transition-colors duration-300 hover:bg-rose-dusty-dark"
      >
        <Send className="h-4 w-4" aria-hidden />
        Написать в Telegram
      </a>
    </div>
  );
}
