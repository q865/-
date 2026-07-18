"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProductImage } from "@/components/product-image";
import type { SiteSettings } from "@/generated/prisma/client";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [form, setForm] = useState({
    ...settings,
    heroImageUrl: settings.heroImageUrl ?? "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function uploadHeroImage(file: File) {
    setUploading(true);
    setErrorMessage("");
    const body = new FormData();
    body.append("file", file);
    body.append("folder", "hero");

    try {
      const response = await fetch("/api/upload", { method: "POST", body });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(typeof data.error === "string" ? data.error : "Не удалось загрузить фото");
      }
      setForm((prev) => ({ ...prev, heroImageUrl: data.url }));
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Не удалось загрузить фото");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const { id: _id, ...payload } = form;

    const response = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));
    if (response.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(typeof data.error === "string" ? data.error : "Ошибка сохранения");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-4 rounded-2xl border border-rose-dusty-light/50 bg-cream-card p-6 shadow-sm"
    >
      <div className="space-y-2">
        <Label htmlFor="siteName">Название сайта</Label>
        <Input
          id="siteName"
          value={form.siteName}
          onChange={(e) => setForm({ ...form, siteName: e.target.value })}
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="hero-image">Фото на главной (hero)</Label>
        <p className="text-xs text-[#9c9590]">
          Вертикальное фото 3:4 лучше всего смотрится на телефоне. После загрузки нажмите «Сохранить».
        </p>
        {form.heroImageUrl ? (
          <div className="relative mx-auto aspect-[3/4] max-h-64 w-full max-w-xs overflow-hidden rounded-2xl border border-rose-dusty-light/50 bg-rose-dusty-light/20">
            <ProductImage
              src={form.heroImageUrl}
              alt="Фото на главной"
              fill
              sizes="256px"
              className="object-cover object-center"
            />
          </div>
        ) : (
          <p className="text-sm text-[#9c9590]">Фото не выбрано — будет градиент</p>
        )}
        <Input
          id="hero-image"
          type="file"
          accept="image/*"
          disabled={uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadHeroImage(file);
            e.target.value = "";
          }}
        />
        {uploading ? <p className="text-sm text-[#9c9590]">Загрузка...</p> : null}
        {form.heroImageUrl ? (
          <Button
            type="button"
            variant="outline"
            disabled={uploading || status === "loading"}
            onClick={() => setForm({ ...form, heroImageUrl: "" })}
          >
            Убрать фото
          </Button>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="heroTitle">Заголовок на главной</Label>
        <Input
          id="heroTitle"
          value={form.heroTitle}
          onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
          maxLength={80}
        />
        <p className="text-xs text-[#9c9590]">
          До 80 символов. Показывается крупно на главной — лучше одна ясная фраза.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="heroSubtitle">Подзаголовок</Label>
        <Textarea
          id="heroSubtitle"
          value={form.heroSubtitle}
          onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
          maxLength={200}
          rows={3}
        />
        <p className="text-xs text-[#9c9590]">
          До 200 символов, 1–2 предложения. Без списков и «•» — на телефоне обрежется.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="telegramUrl">Telegram</Label>
        <Input
          id="telegramUrl"
          value={form.telegramUrl}
          onChange={(e) => setForm({ ...form, telegramUrl: e.target.value })}
          placeholder="https://t.me/air_cloud_msk"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="vkUrl">VK</Label>
        <Input
          id="vkUrl"
          value={form.vkUrl}
          onChange={(e) => setForm({ ...form, vkUrl: e.target.value })}
          placeholder="https://vk.ru/vozdushnyesharymsk"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="maxUrl">MAX (ссылка на профиль)</Label>
        <Input
          id="maxUrl"
          value={form.maxUrl}
          onChange={(e) => setForm({ ...form, maxUrl: e.target.value })}
          placeholder="https://max.ru/u/..."
        />
        <p className="text-xs text-[#9c9590]">
          Получите в приложении MAX: Профиль → QR-код → Поделиться
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Телефон</Label>
        <Input
          id="phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+79652955956"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="seoTitle">SEO заголовок</Label>
        <Input
          id="seoTitle"
          value={form.seoTitle}
          onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="seoDescription">SEO описание</Label>
        <Textarea
          id="seoDescription"
          value={form.seoDescription}
          onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
        />
      </div>
      {status === "success" ? (
        <p className="text-sm text-emerald-600">Настройки сохранены</p>
      ) : null}
      {status === "error" || errorMessage ? (
        <p className="text-sm text-red-600">{errorMessage || "Ошибка сохранения"}</p>
      ) : null}
      <Button type="submit" disabled={status === "loading" || uploading}>
        {status === "loading" ? "Сохранение..." : "Сохранить"}
      </Button>
    </form>
  );
}
