"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { slugify } from "@/lib/utils";

export function CategoryManager({
  initialCategories,
}: {
  initialCategories: Array<{
    id: string;
    name: string;
    slug: string;
    sortOrder: number;
  }>;
}) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [form, setForm] = useState({ name: "", slug: "", sortOrder: "0" });
  const [slugTouched, setSlugTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function createCategory(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          slug: form.slug || slugify(form.name),
          sortOrder: Number(form.sortOrder),
        }),
      });

      if (!response.ok) throw new Error("failed");
      const created = await response.json();
      setCategories((prev) => [...prev, created]);
      setForm({ name: "", slug: "", sortOrder: "0" });
      setSlugTouched(false);
      router.refresh();
    } catch {
      setError("Не удалось добавить категорию");
    } finally {
      setLoading(false);
    }
  }

  async function deleteCategory(id: string) {
    if (!confirm("Удалить категорию? Товары в ней тоже будут удалены.")) return;

    const response = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (response.ok) {
      setCategories((prev) => prev.filter((category) => category.id !== id));
      router.refresh();
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form
        onSubmit={createCategory}
        className="space-y-4 rounded-2xl border border-rose-dusty-light/50 bg-cream-card p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold text-[#3d3a36]">Новая категория</h2>
        <div className="space-y-2">
          <Label htmlFor="category-name">Название</Label>
          <Input
            id="category-name"
            required
            value={form.name}
            onChange={(e) =>
              setForm({
                name: e.target.value,
                slug: slugTouched ? form.slug : slugify(e.target.value),
                sortOrder: form.sortOrder,
              })
            }
            placeholder="Гендер-пати"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category-slug">Slug</Label>
          <Input
            id="category-slug"
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              setForm({ ...form, slug: e.target.value });
            }}
            placeholder="gender-pati"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category-sort">Порядок сортировки</Label>
          <Input
            id="category-sort"
            type="number"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
          />
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button type="submit" disabled={loading}>
          {loading ? "Добавление..." : "Добавить"}
        </Button>
      </form>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-[#3d3a36]">
          Список ({categories.length})
        </h2>
        {categories.length === 0 ? (
          <p className="text-[#9c9590]">Категорий пока нет</p>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between rounded-2xl border border-rose-dusty-light/50 bg-cream-card p-4 shadow-sm"
            >
              <div>
                <div className="font-medium text-[#3d3a36]">{category.name}</div>
                <div className="text-sm text-[#9c9590]">{category.slug}</div>
              </div>
              <button
                type="button"
                onClick={() => deleteCategory(category.id)}
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Удалить
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
