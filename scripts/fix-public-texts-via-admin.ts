/**
 * Fix awkward public texts via production admin API (no DATABASE_URL needed).
 * Uses ADMIN_EMAIL / ADMIN_PASSWORD from .env
 *
 * Usage: npx tsx scripts/fix-public-texts-via-admin.ts
 */
import { config } from "dotenv";

// Cursor may inject empty ADMIN_* into the process env; force .env values.
config({ path: ".env", override: true });

const BASE = "https://air-cloud-msk.ru";

const email = process.env.ADMIN_EMAIL?.trim() ?? "";
const password = process.env.ADMIN_PASSWORD?.trim() ?? "";

if (!email || !password) {
  throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
}

type CookieJar = Map<string, string>;

function storeCookies(jar: CookieJar, response: Response) {
  const raw = response.headers.getSetCookie?.() ?? [];
  for (const line of raw) {
    const [pair] = line.split(";");
    const eq = pair.indexOf("=");
    if (eq > 0) jar.set(pair.slice(0, eq), pair.slice(eq + 1));
  }
}

function cookieHeader(jar: CookieJar) {
  return [...jar.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
}

async function adminFetch(jar: CookieJar, path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("cookie", cookieHeader(jar));
  if (init.body && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  const response = await fetch(`${BASE}${path}`, { ...init, headers });
  storeCookies(jar, response);
  return response;
}

async function login(jar: CookieJar) {
  const csrfRes = await adminFetch(jar, "/api/auth/csrf");
  const { csrfToken } = (await csrfRes.json()) as { csrfToken: string };

  const body = new URLSearchParams({
    csrfToken,
    email,
    password,
    callbackUrl: `${BASE}/admin`,
    json: "true",
  });

  const loginRes = await adminFetch(jar, "/api/auth/callback/credentials", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
    redirect: "manual",
  });

  if (![200, 302].includes(loginRes.status)) {
    throw new Error(`Login failed: ${loginRes.status}`);
  }

  const sessionRes = await adminFetch(jar, "/api/auth/session");
  const session = (await sessionRes.json()) as { user?: { email?: string } };
  if (!session.user?.email) {
    throw new Error("Login succeeded HTTP-wise but session is empty (check ADMIN_* vs production)");
  }
  console.log("Logged in as", session.user.email);
}

const CLEAN_HERO_SUBTITLE =
  "Композиции для выписки, дня рождения, свадьбы и фотозон — с доставкой по Москве.";

async function main() {
  const jar: CookieJar = new Map();
  await login(jar);

  const settingsRes = await adminFetch(jar, "/api/settings");
  if (!settingsRes.ok) throw new Error(`GET settings ${settingsRes.status}`);
  const settings = (await settingsRes.json()) as Record<string, string>;

  const heroTitle = String(settings.heroTitle || "").replace(/создаем/gi, "создаём");
  const currentSubtitle = String(settings.heroSubtitle || "");
  const looksLikeBulletList = /[•·]/.test(currentSubtitle) || currentSubtitle.length > 140;
  const heroSubtitle = looksLikeBulletList ? CLEAN_HERO_SUBTITLE : currentSubtitle.trim();

  if (heroTitle !== settings.heroTitle || heroSubtitle !== settings.heroSubtitle) {
    const put = await adminFetch(jar, "/api/settings", {
      method: "PUT",
      body: JSON.stringify({ ...settings, heroTitle, heroSubtitle }),
    });
    if (!put.ok) throw new Error(`PUT settings ${put.status}: ${await put.text()}`);
    console.log("Updated hero");
    console.log("  title:", heroTitle);
    console.log("  subtitle:", heroSubtitle);
  } else {
    console.log("Hero texts already OK");
  }

  const categoriesRes = await adminFetch(jar, "/api/categories");
  if (!categoriesRes.ok) throw new Error(`GET categories ${categoriesRes.status}`);
  const categories = (await categoriesRes.json()) as Array<{
    id: string;
    name: string;
    slug: string;
    image: string | null;
    sortOrder: number;
  }>;

  const categoryMap: Record<string, string> = {
    "Большое сердце , 80-90см": "Большое сердце, 80–90 см",
    "Коробка - сюрприз с шарами": "Коробка-сюрприз с шарами",
  };

  for (const category of categories) {
    const renamed = categoryMap[category.name];
    const cleaned =
      renamed ??
      category.name
        .replace(/\s+,/g, ",")
        .replace(/«\s+/g, "«")
        .replace(/\s+»/g, "»")
        .replace(/\s{2,}/g, " ")
        .trim();
    if (cleaned === category.name) continue;

    const put = await adminFetch(jar, `/api/categories/${category.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: cleaned,
        slug: category.slug,
        image: category.image,
        sortOrder: category.sortOrder,
      }),
    });
    if (!put.ok) throw new Error(`PUT category ${category.id}: ${put.status}`);
    console.log(`Category: "${category.name}" → "${cleaned}"`);
  }

  const productsRes = await adminFetch(jar, "/api/products");
  if (!productsRes.ok) throw new Error(`GET products ${productsRes.status}`);
  const products = (await productsRes.json()) as Array<{
    id: string;
    name: string;
    slug: string;
    description: string | null;
    price: number;
    images: string;
    featured: boolean;
    published: boolean;
    categoryId: string;
  }>;

  const productMap: Record<string, string> = {
    "Сердце с фонтанов": "Сердце с фонтаном",
    "Коробка -сюрприз": "Коробка-сюрприз",
    "Цифра и фигура « Маккуин»": "Цифра и фигура «Маккуин»",
    "Хром , прозрачные с конфетти": "Хром, прозрачные с конфетти",
  };

  for (const product of products) {
    const renamed = productMap[product.name];
    const cleaned =
      renamed ??
      product.name
        .replace(/\s+,/g, ",")
        .replace(/«\s+/g, "«")
        .replace(/\s+»/g, "»")
        .replace(/\s{2,}/g, " ")
        .trim();
    if (cleaned === product.name) continue;

    let images: string[] = [];
    try {
      images = JSON.parse(product.images || "[]");
    } catch {
      images = [];
    }

    const put = await adminFetch(jar, `/api/products/${product.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: cleaned,
        slug: product.slug,
        description: product.description ?? "",
        price: product.price,
        images,
        featured: product.featured,
        published: product.published,
        categoryId: product.categoryId,
      }),
    });
    if (!put.ok) throw new Error(`PUT product ${product.id}: ${put.status} ${await put.text()}`);
    console.log(`Product: "${product.name}" → "${cleaned}"`);
  }

  console.log("Done");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
