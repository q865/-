"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SiteSettings } from "@/generated/prisma/client";

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const [form, setForm] = useState(settings);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");

    const { id: _id, ...payload } = form;

    const response = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setStatus(response.ok ? "success" : "error");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-4 rounded-2xl border border-pink-100 bg-white p-6 shadow-sm"
    >
      <div className="space-y-2">
        <Label htmlFor="siteName">Название сайта</Label>
        <Input
          id="siteName"
          value={form.siteName}
          onChange={(e) => setForm({ ...form, siteName: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="heroTitle">Заголовок на главной</Label>
        <Input
          id="heroTitle"
          value={form.heroTitle}
          onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="heroSubtitle">Подзаголовок</Label>
        <Textarea
          id="heroSubtitle"
          value={form.heroSubtitle}
          onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
        />
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
        <p className="text-xs text-slate-500">
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
      {status === "error" ? (
        <p className="text-sm text-red-600">Ошибка сохранения</p>
      ) : null}
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Сохранение..." : "Сохранить"}
      </Button>
    </form>
  );
}
