import type { Product, Category, SiteSettings } from "@/generated/prisma/client";
import { SITE_URL } from "@/lib/site-config";
import { faqItems } from "@/lib/home-content";
import { getProductGallery, getProductCoverImage } from "@/lib/utils";

type ProductWithCategory = Product & { category: Category };

export function buildLocalBusinessJsonLd(settings: SiteSettings) {
  const sameAs = [settings.telegramUrl, settings.vkUrl].filter(Boolean);
  if (settings.maxUrl) sameAs.push(settings.maxUrl);

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: settings.siteName,
    description: settings.seoDescription,
    url: SITE_URL,
    telephone: settings.phone,
    image: `${SITE_URL}/uploads/portfolio/nabor-gender-pati.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Москва",
      addressRegion: "Москва",
      addressCountry: "RU",
    },
    areaServed: {
      "@type": "City",
      name: "Москва",
    },
    priceRange: "₽₽",
    sameAs,
  };
}

export function buildWebSiteJsonLd(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.siteName,
    url: SITE_URL,
    description: settings.seoDescription,
    inLanguage: "ru-RU",
  };
}

export function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildProductListJsonLd(products: ProductWithCategory[]) {
  if (products.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Популярные композиции из гелевых шаров",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/product/${product.slug}`,
      name: product.name,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.description ?? undefined,
        image: getProductCoverImage(product.images, {
          slug: product.slug,
          categorySlug: product.category.slug,
        }),
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "RUB",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}/product/${product.slug}`,
        },
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function buildProductJsonLd(product: ProductWithCategory) {
  const images = getProductGallery(product.images, {
    slug: product.slug,
    categorySlug: product.category.slug,
  }).map((image) =>
    image.startsWith("/") ? `${SITE_URL}${image}` : image,
  );

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? undefined,
    image: images,
    category: product.category.name,
    url: `${SITE_URL}/product/${product.slug}`,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/product/${product.slug}`,
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10),
    },
  };
}
