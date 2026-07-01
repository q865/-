"use client";

import { Send } from "lucide-react";
import type { SiteSettings } from "@/generated/prisma/client";
import { buildTelegramOrderUrl } from "@/lib/contact-links";

export function MobileOrderBar({ settings }: { settings: SiteSettings }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-border bg-neutral-surface/95 p-3 backdrop-blur-md md:hidden">
      <a
        href={buildTelegramOrderUrl(settings.telegramUrl)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-premium-glow flex h-12 w-full items-center justify-center gap-2 rounded-full bg-rose-dusty text-sm font-semibold text-white shadow-float transition-colors duration-300 hover:bg-rose-dusty-dark"
      >
        <Send className="h-4 w-4" aria-hidden />
        Написать в Telegram
      </a>
    </div>
  );
}
