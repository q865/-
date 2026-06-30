import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { getSettings } from "@/lib/settings";

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
    metadataBase: new URL("https://air-cloud-msk.ru"),
    openGraph: {
      title: settings.seoTitle,
      description: settings.seoDescription,
      url: "https://air-cloud-msk.ru",
      siteName: settings.siteName,
      locale: "ru_RU",
      type: "website",
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
      <body className="min-h-full flex flex-col page-glow text-[#3d3a36]">
        {children}
      </body>
    </html>
  );
}
