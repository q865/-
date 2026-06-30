import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/product-form";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#3d3a36]">Новый товар</h1>
        <p className="mt-1 text-[#9c9590]">Добавление композиции в каталог</p>
      </div>
      <ProductForm categories={categories} />
    </div>
  );
}
