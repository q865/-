import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileOrderBar } from "@/components/layout/mobile-order-bar";
import { getFooterCategories } from "@/lib/queries/categories";
import { getSettings } from "@/lib/queries/settings";

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const [settings, categories] = await Promise.all([
    getSettings(),
    getFooterCategories(),
  ]);

  return (
    <>
      <Header settings={settings} />
      <main id="main-content" className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
      <Footer settings={settings} categories={categories} />
      <MobileOrderBar settings={settings} />
    </>
  );
}
