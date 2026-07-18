"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ProductImage } from "@/components/product-image";
import { slugify, isPlaceholderImage, parsePositiveInt } from "@/lib/utils";

type Category = { id: string; name: string };

export function ProductForm({
  product,
  categories,
}: {
  product?: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    price: number;
    images: string;
    featured: boolean;
    published: boolean;
    categoryId: string;
  };
  categories: Category[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [slugTouched, setSlugTouched] = useState(Boolean(product?.slug));
  const [images, setImages] = useState<string[]>(() => {
    try {
      return JSON.parse(product?.images ?? "[]").filter(
        (item: string) => typeof item === "string" && !isPlaceholderImage(item),
      );
    } catch {
      return [];
    }
  });
  const [form, setForm] = useState({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    price: product?.price?.toString() ?? "",
    categoryId: product?.categoryId ?? categories[0]?.id ?? "",
    featured: product?.featured ?? false,
    published: product?.published ?? true,
  });

  function updateName(name: string) {
    setForm((prev) => ({
      ...prev,
      name,
      slug: slugTouched ? prev.slug : slugify(name),
    }));
  }

  async function uploadFile(file: File) {
    setUploading(true);
    setError("");
    const body = new FormData();
    body.append("file", file);

    try {
      const response = await fetch("/api/upload", { method: "POST", body });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(typeof data.error === "string" ? data.error : "Не удалось загрузить фото");
      }
      setImages((prev) => {
        const cleaned = prev.filter((item) => !isPlaceholderImage(item));
        return [data.url, ...cleaned];
      });
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

    if (!form.categoryId) {
      setError("Сначала создайте категорию");
      setLoading(false);
      return;
    }

    const price = parsePositiveInt(form.price);
    if (price === null) {
      setError("Укажите цену целым числом в рублях (например, 4500)");
      setLoading(false);
      return;
    }

    const payload = {
      ...form,
      price,
      images,
    };

    try {
      const response = await fetch(
        product ? `/api/products/${product.id}` : "/api/products",
        {
          method: product ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : "Не удалось сохранить товар. Проверьте, что вы нажали «Сохранить» после загрузки фото.",
        );
      }
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось сохранить товар");
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!product) return;
    if (!confirm(`Удалить «${product.name}»? Это действие нельзя отменить.`)) return;

    setDeleting(true);
    setError("");

    try {
      const response = await fetch(`/api/products/${product.id}`, { method: "DELETE" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(typeof data.error === "string" ? data.error : "Не удалось удалить товар");
      }
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось удалить товар");
      setDeleting(false);
    }
  }

  if (categories.length === 0) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900">
        Сначала добавьте хотя бы одну категорию в разделе «Категории».
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-5 rounded-2xl border border-rose-dusty-light/50 bg-cream-card p-6 shadow-sm"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Название</Label>
        <Input
          id="name"
          required
          value={form.name}
          onChange={(e) => updateName(e.target.value)}
          placeholder="Например: Набор для гендер-пати"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug (URL)</Label>
        <Input
          id="slug"
          value={form.slug}
          onChange={(e) => {
            setSlugTouched(true);
            setForm({ ...form, slug: e.target.value });
          }}
          placeholder="nabor-gender-pati"
        />
        <p className="text-xs text-[#9c9590]">
          Адрес страницы: /product/{form.slug || "..."}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="categoryId">Категория</Label>
        <Select
          id="categoryId"
          required
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Цена, ₽</Label>
        <Input
          id="price"
          type="number"
          min="0"
          step="1"
          inputMode="numeric"
          required
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          placeholder="4500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Описание</Label>
        <Textarea
          id="description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Опишите композицию, размеры, цвета..."
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="photos">Фото</Label>
        <p className="text-sm text-[#9c9590]">
          Первое фото — обложка в каталоге. Загрузите фото, при необходимости нажмите «В обложку», затем «Сохранить».
        </p>
        <Input
          id="photos"
          type="file"
          accept="image/*"
          disabled={uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadFile(file);
            e.target.value = "";
          }}
        />
        {uploading ? <p className="text-sm text-[#9c9590]">Загрузка...</p> : null}
        {images.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {images.map((image, index) => (
              <div
                key={image}
                className="overflow-hidden rounded-xl border border-rose-dusty-light/50 bg-rose-dusty-light/20"
              >
                <div className="relative aspect-square">
                  <ProductImage src={image} alt="" fill className="object-cover" sizes="120px" />
                  {index === 0 ? (
                    <span className="absolute left-1.5 top-1.5 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] font-medium text-white">
                      Обложка
                    </span>
                  ) : null}
                </div>
                <div className="flex divide-x divide-rose-dusty-light/40">
                  {index > 0 ? (
                    <button
                      type="button"
                      className="flex-1 py-2 text-xs font-medium text-rose-dusty-dark hover:bg-rose-dusty-light/30"
                      onClick={() =>
                        setImages((prev) => {
                          const next = prev.filter((item) => item !== image);
                          return [image, ...next];
                        })
                      }
                    >
                      В обложку
                    </button>
                  ) : null}
                  <button
                    type="button"
                    className="flex-1 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                    onClick={() =>
                      setImages((prev) => prev.filter((item) => item !== image))
                    }
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#9c9590]">Фото пока не добавлены</p>
        )}
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-rose-dusty-light/25 p-4">
        <label className="flex cursor-pointer items-center gap-3 text-sm text-[#5c5651]">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-rose-dusty-light text-rose-dusty"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
          />
          Показывать в блоке «Популярное»
        </label>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-[#5c5651]">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-rose-dusty-light text-rose-dusty"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          Опубликован на сайте
        </label>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={loading || uploading || deleting}>
          {loading ? "Сохранение..." : "Сохранить"}
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={loading || uploading || deleting}
          onClick={() => router.push("/admin/products")}
        >
          Отмена
        </Button>
        {product ? (
          <Button
            type="button"
            variant="outline"
            disabled={loading || uploading || deleting}
            onClick={handleDelete}
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            {deleting ? "Удаление..." : "Удалить товар"}
          </Button>
        ) : null}
      </div>
    </form>
  );
}
