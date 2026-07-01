import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { getSettings } from "@/lib/queries/settings";
import { SITE_KEYWORDS, SITE_URL } from "@/lib/site-config";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    title: {
      default: settings.seoTitle,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.seoDescription,
    keywords: SITE_KEYWORDS,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: SITE_URL,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: settings.seoTitle,
      description: settings.seoDescription,
      url: SITE_URL,
      siteName: settings.siteName,
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: settings.seoTitle,
      description: settings.seoDescription,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col page-glow text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-rose-dusty focus:px-4 focus:py-2 focus:text-white"
        >
          Перейти к содержимому
        </a>
        {children}
      </body>
    </html>
  );
}
