import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <SiteShell>
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center sm:px-6">
        <p className="text-6xl font-extrabold text-gold-muted-light">404</p>
        <h1 className="heading-page mt-4">Страница не найдена</h1>
        <p className="mt-3 text-muted">
          Возможно, ссылка устарела или композиция уже снята с витрины.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/">На главную</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/catalog">Открыть каталог</Link>
          </Button>
        </div>
      </div>
    </SiteShell>
  );
}
