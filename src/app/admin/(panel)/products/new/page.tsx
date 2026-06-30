import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/product-form";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Новый товар</h1>
        <p className="mt-1 text-slate-500">Добавление композиции в каталог</p>
      </div>
      <ProductForm categories={categories} />
    </div>
  );
}
