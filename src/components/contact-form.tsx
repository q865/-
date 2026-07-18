"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm({ productName }: { productName?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: productName ? `Интересует: ${productName}` : "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          product: productName,
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : response.status === 429
              ? "Слишком много заявок. Подождите минуту или напишите в Telegram."
              : "Не удалось отправить заявку. Попробуйте ещё раз или напишите в мессенджер.",
        );
      }
      setStatus("success");
      setForm({
        name: "",
        phone: "",
        message: productName ? `Интересует: ${productName}` : "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Не удалось отправить заявку. Напишите нам в Telegram или VK.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-gold-muted-light/50 bg-gold-muted-light/30 p-6 text-gold-muted-dark">
        <h3 className="font-semibold">Заявка отправлена!</h3>
        <p className="mt-2 text-sm">Мы свяжемся с вами в ближайшее время.</p>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="mt-4 w-full"
          onClick={() => setStatus("idle")}
        >
          Отправить ещё
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Ваше имя</Label>
        <Input
          id="name"
          required
          autoComplete="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Анна"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Телефон</Label>
        <Input
          id="phone"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+7 (999) 123-45-67"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Комментарий</Label>
        <Textarea
          id="message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Дата, адрес, пожелания..."
        />
      </div>
      {status === "error" ? (
        <p className="text-sm text-red-600">
          {errorMessage || "Не удалось отправить. Попробуйте позже или напишите в Telegram."}
        </p>
      ) : null}
      <Button type="submit" size="lg" className="scroll-mt-24 w-full" disabled={status === "loading"}>
        {status === "loading" ? "Отправка..." : "Отправить заявку"}
      </Button>
    </form>
  );
}
