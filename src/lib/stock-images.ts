/** Параметры оптимизации Unsplash для карточек и hero. */
export function unsplashUrl(photoPath: string, width = 800): string {
  return `https://images.unsplash.com/${photoPath}?auto=format&fit=crop&w=${width}&q=80`;
}

/** Параметры оптимизации Pexels (только проверенные фото шаров). */
export function pexelsUrl(id: number, width = 800): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

/** Локальные фото портфолио (public/uploads/portfolio) — приоритет для featured. */
export function portfolioUrl(slug: string): string {
  return `/uploads/portfolio/${slug}.jpg`;
}

/** Featured-товары с локальным портфолио (скачивается scripts/download-portfolio-images.mjs). */
export const PORTFOLIO_SLUGS = new Set([
  "nabor-gender-pati",
  "gender-box-surprise",
  "vypiska-nebesnaya-nezhnost",
  "vypiska-malysh-uzhe-tut",
  "fontan-iz-sharov",
  "oblako-sharov",
  "cifra-den-rozhdeniya",
  "fountain-den-rozhdeniya",
  "arka-svadba",
  "svadebnaya-fotozona",
  "serdtse-iz-sharov",
  "oformlenie-vitriny-magazina",
  "otkrytie-magazina",
  "korporativnoe-oformlenie",
]);

/** Универсальные фото шаров (Unsplash) — запасной вариант без «чужих» сюжетов. */
const BALLOON_PARTY = unsplashUrl("photo-1530103862676-de8c9debad1d", 900);
const BALLOON_ARCH = unsplashUrl("photo-1464349095431-e9a21285b5f3", 900);
const BALLOON_HELIUM = unsplashUrl("photo-1527529482837-4698179dc6ce", 900);
const BALLOON_PINK = unsplashUrl("photo-1513885535751-8b9238bd345a", 900);
const BALLOON_CELEBRATION = unsplashUrl("photo-1464366400600-7168b8af9bc3", 900);

/** Фото по slug товара — приоритетнее категории. */
export const STOCK_IMAGES_BY_SLUG: Record<string, string> = {
  "nabor-gender-pati": portfolioUrl("nabor-gender-pati"),
  "mini-nabor-gender-pati": portfolioUrl("nabor-gender-pati"),
  "gender-box-surprise": portfolioUrl("gender-box-surprise"),
  "vypiska-nebesnaya-nezhnost": portfolioUrl("vypiska-nebesnaya-nezhnost"),
  "vypiska-rozovaya-nezhnost": portfolioUrl("vypiska-nebesnaya-nezhnost"),
  "vypiska-malysh-uzhe-tut": portfolioUrl("vypiska-malysh-uzhe-tut"),
  "nabor-s-novorozhdennym": portfolioUrl("vypiska-malysh-uzhe-tut"),
  "fontan-iz-sharov": portfolioUrl("fontan-iz-sharov"),
  "buket-iz-sharov": portfolioUrl("oblako-sharov"),
  "svyazka-10-sharov": BALLOON_HELIUM,
  "oblako-sharov": portfolioUrl("oblako-sharov"),
  "girlyanda-iz-sharov": portfolioUrl("fontan-iz-sharov"),
  "cifra-den-rozhdeniya": portfolioUrl("cifra-den-rozhdeniya"),
  "fountain-den-rozhdeniya": portfolioUrl("fountain-den-rozhdeniya"),
  "tematicheskiy-nabor-deti": portfolioUrl("cifra-den-rozhdeniya"),
  "svetyashchiesya-shary": BALLOON_PARTY,
  "oformlenie-detskogo-prazdnika": portfolioUrl("fountain-den-rozhdeniya"),
  "arka-svadba": portfolioUrl("arka-svadba"),
  "svadebnaya-fotozona": portfolioUrl("svadebnaya-fotozona"),
  "romanticheskaya-svyazka-svadba": portfolioUrl("serdtse-iz-sharov"),
  "serdtse-iz-sharov": portfolioUrl("serdtse-iz-sharov"),
  "oformlenie-vitriny-magazina": portfolioUrl("oformlenie-vitriny-magazina"),
  "otkrytie-magazina": portfolioUrl("otkrytie-magazina"),
  "korporativnoe-oformlenie": portfolioUrl("korporativnoe-oformlenie"),
  "promo-zona-prezentaciya": portfolioUrl("korporativnoe-oformlenie"),
};

/** Второе фото галереи для featured (разнообразие). */
export const STOCK_GALLERY_SECOND: Record<string, string> = {
  "nabor-gender-pati": portfolioUrl("gender-box-surprise"),
  "gender-box-surprise": portfolioUrl("nabor-gender-pati"),
  "vypiska-nebesnaya-nezhnost": portfolioUrl("vypiska-malysh-uzhe-tut"),
  "fontan-iz-sharov": portfolioUrl("oblako-sharov"),
  "oblako-sharov": portfolioUrl("fontan-iz-sharov"),
  "cifra-den-rozhdeniya": portfolioUrl("fountain-den-rozhdeniya"),
  "fountain-den-rozhdeniya": portfolioUrl("cifra-den-rozhdeniya"),
  "arka-svadba": portfolioUrl("svadebnaya-fotozona"),
  "svadebnaya-fotozona": portfolioUrl("arka-svadba"),
  "serdtse-iz-sharov": BALLOON_PINK,
  "oformlenie-vitriny-magazina": portfolioUrl("otkrytie-magazina"),
  "otkrytie-magazina": portfolioUrl("oformlenie-vitriny-magazina"),
  "korporativnoe-oformlenie": portfolioUrl("oformlenie-vitriny-magazina"),
};

/** Fallback по категории, если у товара/категории нет своих фото. */
export const STOCK_IMAGES_BY_CATEGORY: Record<string, string> = {
  "gender-pati": portfolioUrl("nabor-gender-pati"),
  vypiska: portfolioUrl("vypiska-nebesnaya-nezhnost"),
  "gelevye-kompozicii": portfolioUrl("fontan-iz-sharov"),
  "dni-rozhdeniya": portfolioUrl("cifra-den-rozhdeniya"),
  "den-rozhdeniya": portfolioUrl("cifra-den-rozhdeniya"),
  svadby: portfolioUrl("arka-svadba"),
  "biznes-i-meropriyatiya": portfolioUrl("korporativnoe-oformlenie"),
  "bolshoe-serdtse-80-90sm": portfolioUrl("serdtse-iz-sharov"),
  "shar-babl": BALLOON_PARTY,
  "steklyannyy-shar": BALLOON_CELEBRATION,
  "gelievyy-vozdushnyy-shar": BALLOON_HELIUM,
  "korobka-syurpriz-s-sharami": portfolioUrl("gender-box-surprise"),
  fotozona: portfolioUrl("svadebnaya-fotozona"),
  "oformlenie-vhodnoy-gruppy": portfolioUrl("otkrytie-magazina"),
  "oformlenie-vhodnoj-gruppy": portfolioUrl("otkrytie-magazina"),
};

export const STOCK_IMAGE_DEFAULT = portfolioUrl("oblako-sharov");

/** Лёгкий blur-placeholder для Next/Image (пастельный крем). */
export const IMAGE_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAAECAwQRBQAGIQcSMVH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANe0zU4NN063trV1kt2P2cDzF7f6Vp2m3M1zcrK0oXa7H/9k=";

export type ProductImageContext = {
  slug?: string;
  categorySlug?: string;
};

function resolveCategoryStock(categorySlug: string): string | undefined {
  if (STOCK_IMAGES_BY_CATEGORY[categorySlug]) {
    return STOCK_IMAGES_BY_CATEGORY[categorySlug];
  }

  const text = categorySlug.toLowerCase().replace(/ё/g, "е");
  if (text.includes("fotozon") || text.includes("фотозон")) {
    return portfolioUrl("svadebnaya-fotozona");
  }
  if (text.includes("vhod") || text.includes("вход") || text.includes("vitrin") || text.includes("витрин")) {
    return portfolioUrl("otkrytie-magazina");
  }
  if (text.includes("korobk") || text.includes("коробк") || text.includes("syurpriz")) {
    return portfolioUrl("gender-box-surprise");
  }
  if (text.includes("geliev") || text.includes("гелиев") || text.includes("vozdush")) {
    return BALLOON_HELIUM;
  }
  if (text.includes("babl") || text.includes("бабл")) {
    return BALLOON_PARTY;
  }
  if (text.includes("serdc") || text.includes("сердц")) {
    return portfolioUrl("serdtse-iz-sharov");
  }
  if (text.includes("rozhden") || text.includes("birth")) {
    return portfolioUrl("cifra-den-rozhdeniya");
  }
  if (text.includes("svadb") || text.includes("свадьб")) {
    return portfolioUrl("arka-svadba");
  }
  if (text.includes("vypisk") || text.includes("выписк")) {
    return portfolioUrl("vypiska-nebesnaya-nezhnost");
  }
  if (text.includes("gender") || text.includes("гендер")) {
    return portfolioUrl("nabor-gender-pati");
  }
  return undefined;
}

export function resolveStockImage(context?: ProductImageContext): string {
  if (context?.slug && PORTFOLIO_SLUGS.has(context.slug)) {
    return portfolioUrl(context.slug);
  }

  if (context?.slug && STOCK_IMAGES_BY_SLUG[context.slug]) {
    return STOCK_IMAGES_BY_SLUG[context.slug];
  }

  if (context?.categorySlug) {
    const byCategory = resolveCategoryStock(context.categorySlug);
    if (byCategory) return byCategory;
  }

  // Иногда slug категории передают как slug товара
  if (context?.slug) {
    const bySlugAsCategory = resolveCategoryStock(context.slug);
    if (bySlugAsCategory) return bySlugAsCategory;
  }

  return STOCK_IMAGE_DEFAULT;
}

/** Все URL для seed: локальное портфолио + второе фото для featured. */
export function getSeedImagesForProduct(
  slug: string,
  categorySlug: string,
  featured = false,
): string[] {
  const primary = resolveStockImage({ slug, categorySlug });
  const images = [primary];

  if (featured) {
    const second = STOCK_GALLERY_SECOND[slug];
    if (second && second !== primary) {
      images.push(second);
    }
  }

  return images;
}

/** Hero: главное фото — первый featured или дефолт. */
export function getHeroMainImage(slug?: string, categorySlug?: string): string {
  return resolveStockImage({ slug, categorySlug });
}
