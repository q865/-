"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductImage } from "@/components/product-image";
import { slugify, parsePositiveInt } from "@/lib/utils";

type Category = {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  sortOrder: number;
};

const emptyForm = { name: "", slug: "", image: "", sortOrder: "0" };

export function CategoryManager({ initialCategories }: { initialCategories: Category[] }) {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
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
      image: category.image ?? "",
      sortOrder: category.sortOrder.toString(),
    });
    setSlugTouched(true);
    setError("");
  }

  async function uploadImage(file: File) {
    setUploading(true);
    setError("");
    const body = new FormData();
    body.append("file", file);
    body.append("folder", "categories");

    try {
      const response = await fetch("/api/upload", { method: "POST", body });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(typeof data.error === "string" ? data.error : "Не удалось загрузить фото");
      }
      setForm((prev) => ({ ...prev, image: data.url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось загрузить фото");
    } finally {
      setUploading(false);
    }
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
      image: form.image.trim() || null,
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
        <p className="text-sm text-[#9c9590]">
          Картинка показывается в блоке «Что мы оформляем» на главной.
        </p>
        <div className="space-y-2">
          <Label htmlFor="category-name">Название</Label>
          <Input
            id="category-name"
            required
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
                slug: slugTouched ? form.slug : slugify(e.target.value),
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
        <div className="space-y-3">
          <Label htmlFor="category-image">Картинка</Label>
          {form.image ? (
            <div className="relative aspect-[4/3] max-h-48 w-full max-w-sm overflow-hidden rounded-2xl border border-rose-dusty-light/50 bg-rose-dusty-light/20">
              <ProductImage
                src={form.image}
                alt={form.name || "Категория"}
                fill
                sizes="320px"
                className="object-cover"
              />
            </div>
          ) : (
            <p className="text-sm text-[#9c9590]">Без фото — на главной будет запасное изображение</p>
          )}
          <Input
            id="category-image"
            type="file"
            accept="image/*"
            disabled={uploading || loading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadImage(file);
              e.target.value = "";
            }}
          />
          {uploading ? <p className="text-sm text-[#9c9590]">Загрузка...</p> : null}
          {form.image ? (
            <Button
              type="button"
              variant="outline"
              disabled={uploading || loading}
              onClick={() => setForm({ ...form, image: "" })}
            >
              Убрать картинку
            </Button>
          ) : null}
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={loading || uploading}>
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
              className={`flex items-center gap-3 rounded-2xl border bg-cream-card p-4 shadow-sm ${
                editingId === category.id
                  ? "border-rose-dusty ring-1 ring-rose-dusty/30"
                  : "border-rose-dusty-light/50"
              }`}
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-rose-dusty-light/30">
                {category.image ? (
                  <ProductImage
                    src={category.image}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center text-[10px] text-[#9c9590]">
                    нет фото
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-medium text-[#3d3a36]">{category.name}</div>
                <div className="text-sm text-[#9c9590]">
                  {category.slug} · порядок {category.sortOrder}
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-3">
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
