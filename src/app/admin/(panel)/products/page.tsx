import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminProductsTable } from "@/components/admin/products-table";

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

      <AdminProductsTable products={products} />
    </div>
  );
}
