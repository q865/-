import { auth } from "@/auth";
import { redirect } from "next/navigation";

/** Редирект авторизованного администратора с /admin/login на дашборд. */
export default async function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session?.user) redirect("/admin");

  return children;
}
