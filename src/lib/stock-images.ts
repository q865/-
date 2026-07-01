/** Параметры оптимизации Unsplash для карточек и hero. */
export function unsplashUrl(photoPath: string, width = 800): string {
  return `https://images.unsplash.com/${photoPath}?auto=format&fit=crop&w=${width}&q=80`;
}

/** Параметры оптимизации Pexels (fallback и тематические фото). */
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

/** Фото по slug товара — приоритетнее категории. */
export const STOCK_IMAGES_BY_SLUG: Record<string, string> = {
  "nabor-gender-pati": pexelsUrl(38257445, 900),
  "mini-nabor-gender-pati": pexelsUrl(31779567, 900),
  "gender-box-surprise": pexelsUrl(38257445, 900),
  "vypiska-nebesnaya-nezhnost": pexelsUrl(3609498, 900),
  "vypiska-rozovaya-nezhnost": pexelsUrl(3609498, 900),
  "vypiska-malysh-uzhe-tut": pexelsUrl(3609498, 900),
  "nabor-s-novorozhdennym": pexelsUrl(3609498, 900),
  "fontan-iz-sharov": pexelsUrl(1763075, 900),
  "buket-iz-sharov": pexelsUrl(3609498, 900),
  "svyazka-10-sharov": pexelsUrl(265906, 900),
  "oblako-sharov": pexelsUrl(1708601, 900),
  "girlyanda-iz-sharov": pexelsUrl(1763075, 900),
  "cifra-den-rozhdeniya": pexelsUrl(1267320, 900),
  "fountain-den-rozhdeniya": pexelsUrl(1267320, 900),
  "tematicheskiy-nabor-deti": pexelsUrl(1267320, 900),
  "svetyashchiesya-shary": pexelsUrl(1267320, 900),
  "oformlenie-detskogo-prazdnika": pexelsUrl(1267320, 900),
  "arka-svadba": pexelsUrl(931177, 900),
  "svadebnaya-fotozona": pexelsUrl(265856, 900),
  "romanticheskaya-svyazka-svadba": pexelsUrl(1024993, 900),
  "serdtse-iz-sharov": pexelsUrl(1024993, 900),
  "oformlenie-vitriny-magazina": pexelsUrl(5632401, 900),
  "otkrytie-magazina": pexelsUrl(799443, 900),
  "korporativnoe-oformlenie": pexelsUrl(265906, 900),
  "promo-zona-prezentaciya": pexelsUrl(265906, 900),
};

/** Второе фото галереи для featured (разнообразие). */
export const STOCK_GALLERY_SECOND: Record<string, string> = {
  "nabor-gender-pati": pexelsUrl(31779567, 900),
  "gender-box-surprise": pexelsUrl(38257445, 900),
  "vypiska-nebesnaya-nezhnost": pexelsUrl(1708601, 900),
  "fontan-iz-sharov": pexelsUrl(265906, 900),
  "oblako-sharov": pexelsUrl(1763075, 900),
  "cifra-den-rozhdeniya": pexelsUrl(1763075, 900),
  "fountain-den-rozhdeniya": pexelsUrl(38257445, 900),
  "arka-svadba": pexelsUrl(265856, 900),
  "svadebnaya-fotozona": pexelsUrl(931177, 900),
  "serdtse-iz-sharov": pexelsUrl(931177, 900),
  "oformlenie-vitriny-magazina": pexelsUrl(799443, 900),
  "otkrytie-magazina": pexelsUrl(5632401, 900),
  "korporativnoe-oformlenie": pexelsUrl(5632401, 900),
};

/** Fallback по категории, если у товара нет своих фото. */
export const STOCK_IMAGES_BY_CATEGORY: Record<string, string> = {
  "gender-pati": pexelsUrl(31779567, 900),
  vypiska: pexelsUrl(3609498, 900),
  "gelevye-kompozicii": pexelsUrl(265906, 900),
  "dni-rozhdeniya": pexelsUrl(1267320, 900),
  svadby: pexelsUrl(1708601, 900),
  "biznes-i-meropriyatiya": pexelsUrl(5632401, 900),
};

export const STOCK_IMAGE_DEFAULT = pexelsUrl(265906, 900);

/** Лёгкий blur-placeholder для Next/Image (пастельный крем). */
export const IMAGE_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAAECAwQRBQAGIQcSMVH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANe0zU4NN063trV1kt2P2cDzF7f6Vp2m3M1zcrK0oXa7H/9k=";

export type ProductImageContext = {
  slug?: string;
  categorySlug?: string;
};

export function resolveStockImage(context?: ProductImageContext): string {
  if (context?.slug && PORTFOLIO_SLUGS.has(context.slug)) {
    return portfolioUrl(context.slug);
  }

  if (context?.slug && STOCK_IMAGES_BY_SLUG[context.slug]) {
    return STOCK_IMAGES_BY_SLUG[context.slug];
  }

  if (context?.categorySlug && STOCK_IMAGES_BY_CATEGORY[context.categorySlug]) {
    return STOCK_IMAGES_BY_CATEGORY[context.categorySlug];
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
