import { NextResponse } from "next/server";
import { auth } from "@/auth";

const APEX_HOST = "air-cloud-msk.ru";
const WWW_HOST = "www.air-cloud-msk.ru";

export default auth((req) => {
  const raw =
    req.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
    req.headers.get("host")?.split(",")[0]?.trim() ||
    "";
  const host = raw.toLowerCase().replace(/:\d+$/, "");

  if (host === WWW_HOST) {
    const url = req.nextUrl.clone();
    url.hostname = APEX_HOST;
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 301);
  }
});

export const config = {
  matcher: [
    /*
     * www → apex на всех HTML-маршрутах.
     * Статику (_next, файлы с точкой) не трогаем.
     */
    "/((?!_next/static|_next/image|.*\\..*).*)",
  ],
};
