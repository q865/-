import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function jsonOk<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

/** Преобразует ошибки валидации Zod в HTTP-ответ 400. */
export function jsonFromError(error: unknown) {
  if (error instanceof ZodError) {
    return jsonError("Некорректные данные", 400);
  }

  console.error("[api]", error);
  return jsonError("Внутренняя ошибка сервера", 500);
}
