import { auth } from "@/auth";
import { jsonError } from "@/lib/api/response";

/** Возвращает сессию администратора или готовый 401-ответ. */
export async function requireAdminSession() {
  const session = await auth();

  if (!session?.user) {
    return { session: null, unauthorized: jsonError("Unauthorized", 401) as Response };
  }

  return { session, unauthorized: null };
}
