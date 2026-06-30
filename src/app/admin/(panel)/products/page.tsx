import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatPrice, parseImages } from "@/lib/utils";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Товары</h1>
          <p className="mt-1 text-slate-500">Всего: {products.length}</p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-pink-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-pink-600"
        >
          + Добавить товар
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-pink-200 bg-white p-12 text-center text-slate-500">
          Товаров пока нет.{" "}
          <Link href="/admin/products/new" className="text-pink-600 hover:underline">
            Добавить первый
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-pink-100 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="border-b border-pink-100 bg-pink-50/80 text-left text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium">Название</th>
                <th className="px-4 py-3 font-medium">Категория</th>
                <th className="px-4 py-3 font-medium">Цена</th>
                <th className="px-4 py-3 font-medium">Статус</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-pink-50/30">
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">{product.name}</div>
                    <div className="text-xs text-slate-500">
                      {parseImages(product.images).length} фото
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{product.category.name}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        product.published
                          ? "text-emerald-700"
                          : "text-slate-400"
                      }
                    >
                      {product.published ? "Опубликован" : "Скрыт"}
                    </span>
                    {product.featured ? (
                      <span className="ml-2 text-amber-600">★</span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="font-medium text-pink-600 hover:text-pink-700"
                    >
                      Редактировать
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
