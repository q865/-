import Link from "next/link";
import { getCategoryVisual } from "@/lib/category-visuals";

type CategoryItem = {
  id: string;
  name: string;
  slug: string;
};

/** Короткие подписи для узких экранов. */
const SHORT_LABELS: Record<string, string> = {
  "gelevye-kompozicii": "Композиции",
  "gender-pati": "Гендер-пати",
  vypiska: "Выписка",
  "dni-rozhdeniya": "Дни рождения",
  svadby: "Свадьбы",
  "biznes-i-meropriyatiya": "Для бизнеса",
};

export function CategoryIconGrid({ categories }: { categories: CategoryItem[] }) {
  return (
    <div className="category-scroll sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible lg:grid-cols-6">
      {categories.map((category) => {
        const visual = getCategoryVisual(category.slug);
        const Icon = visual.icon;
        const shortLabel = SHORT_LABELS[category.slug];

        return (
          <Link
            key={category.id}
            href={`/catalog?category=${category.slug}`}
            className="category-scroll-item group flex w-[4.75rem] flex-col items-center gap-2 sm:w-auto"
          >
            <div
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 sm:h-20 sm:w-full sm:rounded-3xl [@media(hover:hover)]:group-hover:scale-105 ${visual.bgClass}`}
            >
              <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${visual.iconClass}`} aria-hidden />
            </div>
            <span className="line-clamp-2 min-h-[2.125rem] w-full text-center text-[10px] font-semibold leading-tight text-foreground sm:min-h-0 sm:text-sm">
              <span className="sm:hidden">{shortLabel ?? category.name}</span>
              <span className="hidden sm:inline">{category.name}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
