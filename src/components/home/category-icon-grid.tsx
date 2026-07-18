import Link from "next/link";
import { ProductImage } from "@/components/product-image";
import { getCategoryVisual } from "@/lib/category-visuals";
import { resolveStockImage } from "@/lib/stock-images";

type CategoryItem = {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
};

/** Короткие подписи для узких экранов. */
const SHORT_LABELS: Record<string, string> = {
  "gelevye-kompozicii": "Композиции",
  "gender-pati": "Гендер-пати",
  vypiska: "Выписка",
  "dni-rozhdeniya": "Дни рождения",
  svadby: "Свадьбы",
  "biznes-i-meropriyatiya": "Мероприятия",
  "bolshoe-serdtse-80-90sm": "Сердце",
  "shar-babl": "Бабл",
  "steklyannyy-shar": "Стеклянный",
  "gelievyy-vozdushnyy-shar": "Гелий",
  "korobka-syurpriz-s-sharami": "Коробка",
};

function categoryImage(category: CategoryItem): string | null {
  const fromAdmin = category.image?.trim();
  if (fromAdmin) return fromAdmin;
  return resolveStockImage({ categorySlug: category.slug });
}

export function CategoryIconGrid({ categories }: { categories: CategoryItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {categories.map((category) => {
        const visual = getCategoryVisual(category.slug);
        const Icon = visual.icon;
        const shortLabel = SHORT_LABELS[category.slug];
        const imageSrc = categoryImage(category);

        return (
          <Link
            key={category.id}
            href={`/catalog?category=${category.slug}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-muted shadow-sm ring-1 ring-neutral-border/60 transition duration-300 [@media(hover:hover)]:hover:shadow-md"
          >
            {imageSrc ? (
              <ProductImage
                src={imageSrc}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-[1.04]"
              />
            ) : (
              <div className={`absolute inset-0 flex items-center justify-center ${visual.bgClass}`}>
                <Icon className={`h-10 w-10 ${visual.iconClass}`} aria-hidden />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-3 text-sm font-semibold leading-snug text-white sm:p-4 sm:text-base">
              <span className="sm:hidden">{shortLabel ?? category.name}</span>
              <span className="hidden sm:inline">{category.name}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
