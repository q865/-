"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProductRowActions({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Удалить «${name}»? Это действие нельзя отменить.`)) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(typeof data.error === "string" ? data.error : "Не удалось удалить товар");
      }
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Не удалось удалить товар");
      setDeleting(false);
    }
  }

  return (
    <div className="flex items-center justify-end gap-3">
      <Link
        href={`/admin/products/${id}`}
        className="font-medium text-rose-dusty-dark hover:text-rose-dusty"
      >
        Редактировать
      </Link>
      <button
        type="button"
        disabled={deleting}
        onClick={handleDelete}
        className="font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
      >
        {deleting ? "Удаление..." : "Удалить"}
      </button>
    </div>
  );
}
