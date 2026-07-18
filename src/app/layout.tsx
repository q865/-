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

  const yandexVerification = process.env.YANDEX_VERIFICATION;
  const googleVerification = process.env.GOOGLE_VERIFICATION;

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
    ...(yandexVerification || googleVerification
      ? {
          verification: {
            ...(yandexVerification ? { yandex: yandexVerification } : {}),
            ...(googleVerification ? { google: googleVerification } : {}),
          },
        }
      : {}),
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
      images: [{ url: "/brand/logo.png", width: 640, height: 640, alt: settings.siteName }],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.seoTitle,
      description: settings.seoDescription,
      images: ["/brand/logo.png"],
    },
    icons: {
      icon: [{ url: "/brand/logo.png", type: "image/png", sizes: "640x640" }],
      apple: [{ url: "/brand/logo.png", type: "image/png", sizes: "640x640" }],
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
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-2xl focus:bg-gold-muted focus:px-4 focus:py-2 focus:text-white"
        >
          Перейти к содержимому
        </a>
        {children}
      </body>
    </html>
  );
}
