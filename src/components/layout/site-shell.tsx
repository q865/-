import { YandexMetrika } from "@/components/analytics/yandex-metrika";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { getFooterCategories } from "@/lib/queries/categories";
import { getSettings } from "@/lib/queries/settings";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const [settings, categories] = await Promise.all([
    getSettings(),
    getFooterCategories(),
  ]);
  const metrikaId =
    process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim() || "110860180";

  return (
    <>
      <Header settings={settings} />
      <main id="main-content" className="flex-1 bottom-nav-offset md:pb-0">
        {children}
      </main>
      <Footer settings={settings} categories={categories} />
      <MobileBottomNav />
      {metrikaId ? <YandexMetrika counterId={metrikaId} /> : null}
    </>
  );
}
