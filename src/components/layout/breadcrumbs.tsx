import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/home/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/seo";

export type BreadcrumbItem = {
  name: string;
  href: string;
  current?: boolean;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd(items.map((item) => ({ name: item.name, path: item.href })))}
      />
      <nav aria-label="Хлебные крошки" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
          {items.map((item, index) => (
            <li key={item.href} className="flex min-w-0 items-center gap-1">
              {index > 0 ? (
                <ChevronRight className="h-4 w-4 shrink-0 text-neutral-text" aria-hidden />
              ) : null}
              {item.current ? (
                <span
                  aria-current="page"
                  className="max-w-[12rem] truncate font-medium text-foreground sm:max-w-none"
                >
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="touch-target py-1 transition hover:text-rose-dusty-dark">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
