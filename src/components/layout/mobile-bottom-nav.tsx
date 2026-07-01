"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, MessageCircle, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Главная", icon: Home },
  { href: "/catalog", label: "Каталог", icon: LayoutGrid },
  { href: "/how-to-order", label: "Заказ", icon: ShoppingBag },
  { href: "/contacts", label: "Контакты", icon: MessageCircle },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav
      aria-label="Основная навигация"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-neutral-border bg-neutral-surface/95 backdrop-blur-lg md:hidden"
    >
      <div className="grid grid-cols-4 pb-[env(safe-area-inset-bottom,0px)]">
        {items.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex min-h-[3.25rem] flex-col items-center justify-center gap-0.5 px-1 pt-2 pb-1.5 text-[10px] font-medium transition-colors",
                active ? "text-gold-muted" : "text-neutral-text hover:text-gold-muted-dark",
              )}
            >
              <Icon
                className={cn("h-5 w-5", active && "stroke-[2.5px]")}
                aria-hidden
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
