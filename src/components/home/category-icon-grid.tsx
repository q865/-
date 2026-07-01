import Link from "next/link";
import { getCategoryVisual } from "@/lib/category-visuals";

type CategoryItem = {
  id: string;
  name: string;
  slug: string;
};

export function CategoryIconGrid({ categories }: { categories: CategoryItem[] }) {
  return (
    <div className="category-scroll sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible lg:grid-cols-6">
      {categories.map((category) => {
        const visual = getCategoryVisual(category.slug);
        const Icon = visual.icon;

        return (
          <Link
            key={category.id}
            href={`/catalog?category=${category.slug}`}
            className="category-scroll-item group flex w-[5.5rem] flex-col items-center gap-2 sm:w-auto"
          >
            <div
              className={`flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl transition-transform duration-300 sm:h-20 sm:w-full sm:rounded-3xl [@media(hover:hover)]:group-hover:scale-105 ${visual.bgClass}`}
            >
              <Icon className={`h-7 w-7 sm:h-8 sm:w-8 ${visual.iconClass}`} aria-hidden />
            </div>
            <span className="max-w-[5.5rem] text-center text-[11px] font-semibold leading-tight text-foreground sm:max-w-none sm:text-sm">
              {category.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
