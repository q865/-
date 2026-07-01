"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { slugify, parsePositiveInt } from "@/lib/utils";

type Category = {
  id: string;
  name: string;
  slug: string;
  sortOrder: number;
};

const emptyForm = { name: "", slug: "", sortOrder: "0" };

export function CategoryManager({ initialCategories }: { initialCategories: Category[] }) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setSlugTouched(false);
    setError("");
  }

  function startEdit(category: Category) {
    setEditingId(category.id);
    setForm({
      name: category.name,
      slug: category.slug,
      sortOrder: category.sortOrder.toString(),
    });
    setSlugTouched(true);
    setError("");
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const sortOrder = parsePositiveInt(form.sortOrder);
    if (sortOrder === null) {
      setError("Порядок сортировки — целое число от 0 (например, 0 или 10)");
      setLoading(false);
      return;
    }

    const payload = {
      name: form.name,
      slug: form.slug || slugify(form.name),
      sortOrder,
    };

    try {
      const response = await fetch(
        editingId ? `/api/categories/${editingId}` : "/api/categories",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : editingId
              ? "Не удалось сохранить категорию"
              : "Не удалось добавить категорию",
        );
      }

      if (editingId) {
        setCategories((prev) =>
          prev.map((category) => (category.id === editingId ? data : category)),
        );
      } else {
        setCategories((prev) => [...prev, data]);
      }

      resetForm();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось сохранить категорию");
    } finally {
      setLoading(false);
    }
  }

  async function deleteCategory(id: string, name: string) {
    if (!confirm(`Удалить категорию «${name}»? Товары в ней тоже будут удалены.`)) return;

    const response = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setError(typeof data.error === "string" ? data.error : "Не удалось удалить категорию");
      return;
    }

    if (editingId === id) resetForm();
    setCategories((prev) => prev.filter((category) => category.id !== id));
    router.refresh();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-rose-dusty-light/50 bg-cream-card p-6 shadow-sm"
      >
        <h2 className="text-xl font-semibold text-[#3d3a36]">
          {editingId ? "Редактировать категорию" : "Новая категория"}
        </h2>
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
            min="0"
            step="1"
            inputMode="numeric"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
          />
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? "Сохранение..." : editingId ? "Сохранить" : "Добавить"}
          </Button>
          {editingId ? (
            <Button type="button" variant="outline" disabled={loading} onClick={resetForm}>
              Отмена
            </Button>
          ) : null}
        </div>
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
              className={`flex items-center justify-between rounded-2xl border bg-cream-card p-4 shadow-sm ${
                editingId === category.id
                  ? "border-rose-dusty ring-1 ring-rose-dusty/30"
                  : "border-rose-dusty-light/50"
              }`}
            >
              <div>
                <div className="font-medium text-[#3d3a36]">{category.name}</div>
                <div className="text-sm text-[#9c9590]">
                  {category.slug} · порядок {category.sortOrder}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => startEdit(category)}
                  className="text-sm font-medium text-rose-dusty-dark hover:text-rose-dusty"
                >
                  Редактировать
                </button>
                <button
                  type="button"
                  onClick={() => deleteCategory(category.id, category.name)}
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
