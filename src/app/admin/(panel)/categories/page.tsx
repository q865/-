import { prisma } from "@/lib/prisma";
import { CategoryManager } from "@/components/admin/category-manager";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#3d3a36]">Категории</h1>
        <p className="mt-1 text-[#9c9590]">Группы товаров в каталоге</p>
      </div>
      <CategoryManager initialCategories={categories} />
    </div>
  );
}
