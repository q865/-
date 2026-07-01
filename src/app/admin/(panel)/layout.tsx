import Link from "next/link";
import { signOut } from "@/auth";
import { getSettings } from "@/lib/queries/settings";

export const dynamic = "force-dynamic";

const links = [
  { href: "/admin", label: "Обзор" },
  { href: "/admin/products", label: "Товары" },
  { href: "/admin/categories", label: "Категории" },
  { href: "/admin/orders", label: "Заявки" },
  { href: "/admin/settings", label: "Настройки" },
];

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <div className="min-h-screen bg-cream text-[#3d3a36]">
      <header className="sticky top-0 z-40 border-b border-rose-dusty-light/50 bg-cream-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <Link href="/admin" className="font-bold text-[#3d3a36]">
            {settings.siteName} · Админка
          </Link>
          <nav className="flex flex-wrap gap-4 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-[#6b6560] transition hover:text-rose-dusty-dark"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-[#9c9590] transition hover:text-rose-dusty-dark"
            >
              На сайт
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/admin/login" });
              }}
            >
              <button
                type="submit"
                className="text-sm font-medium text-[#9c9590] transition hover:text-[#3d3a36]"
              >
                Выйти
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </div>
  );
}
