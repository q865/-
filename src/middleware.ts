import { NextResponse } from "next/server";
import { auth } from "@/auth";

const APEX_HOST = "air-cloud-msk.ru";
const WWW_HOST = "www.air-cloud-msk.ru";

function resolveHost(req: { headers: Headers }): string {
  const candidates = [
    req.headers.get("x-site-host"),
    req.headers.get("x-forwarded-host"),
    req.headers.get("host"),
  ];
  for (const raw of candidates) {
    const host = raw?.split(",")[0]?.trim().toLowerCase().replace(/:\d+$/, "");
    if (host) return host;
  }
  return "";
}

export default auth((req) => {
  if (resolveHost(req) === WWW_HOST) {
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
