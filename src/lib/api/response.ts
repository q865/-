import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

const ZOD_FIELD_MESSAGES: Record<string, string> = {
  price: "Цена должна быть целым числом от 0 до 10 000 000",
  sortOrder: "Порядок сортировки — целое число от 0 до 9999",
};

function formatZodError(error: ZodError): string {
  const issue = error.issues[0];
  if (!issue) return "Некорректные данные";

  const field = issue.path[0];
  if (typeof field === "string" && ZOD_FIELD_MESSAGES[field]) {
    return ZOD_FIELD_MESSAGES[field];
  }

  if (typeof field === "string") {
    return `Некорректные данные: ${field}`;
  }

  return "Некорректные данные";
}

/** Преобразует ошибки валидации Zod в HTTP-ответ 400. */
export function jsonFromError(error: unknown) {
  if (error instanceof ZodError) {
    return jsonError(formatZodError(error), 400);
  }

  console.error("[api]", error);
  return jsonError("Внутренняя ошибка сервера", 500);
}
