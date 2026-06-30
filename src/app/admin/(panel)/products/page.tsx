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
          <h1 className="text-3xl font-bold text-[#3d3a36]">Товары</h1>
          <p className="mt-1 text-[#9c9590]">Всего: {products.length}</p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-rose-dusty px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-rose-dusty-dark"
        >
          + Добавить товар
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-rose-dusty-light bg-cream-card p-12 text-center text-[#9c9590]">
          Товаров пока нет.{" "}
          <Link href="/admin/products/new" className="text-rose-dusty-dark hover:underline">
            Добавить первый
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-rose-dusty-light/50 bg-cream-card shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="border-b border-rose-dusty-light/50 bg-rose-dusty-light/30 text-left text-[#6b6560]">
              <tr>
                <th className="px-4 py-3 font-medium">Название</th>
                <th className="px-4 py-3 font-medium">Категория</th>
                <th className="px-4 py-3 font-medium">Цена</th>
                <th className="px-4 py-3 font-medium">Статус</th>
                <th className="px-4 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-dusty-light/30">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-rose-dusty-light/15">
                  <td className="px-4 py-3">
                    <div className="font-medium text-[#3d3a36]">{product.name}</div>
                    <div className="text-xs text-[#9c9590]">
                      {parseImages(product.images).length} фото
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#5c5651]">{product.category.name}</td>
                  <td className="px-4 py-3 font-medium text-[#3d3a36]">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        product.published
                          ? "text-emerald-700"
                          : "text-[#9c9590]"
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
                      className="font-medium text-rose-dusty-dark hover:text-rose-dusty"
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
