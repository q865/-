import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";

const allowedFields = [
  "siteName",
  "telegramUrl",
  "vkUrl",
  "maxUrl",
  "phone",
  "heroTitle",
  "heroSubtitle",
  "seoTitle",
  "seoDescription",
] as const;

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const data = Object.fromEntries(
    allowedFields
      .filter((field) => field in body)
      .map((field) => [field, String(body[field] ?? "")]),
  );

  const settings = await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: data,
    create: {
      id: 1,
      siteName: "Air Cloud MSK",
      telegramUrl: "https://t.me/air_cloud_msk",
      vkUrl: "https://vk.ru/vozdushnyesharymsk",
      maxUrl: "",
      phone: "+79652955956",
      heroTitle: "Композиции из гелевых шаров",
      heroSubtitle:
        "Оформление праздников в Москве — гендер-пати, выписка, дни рождения",
      seoTitle: "Air Cloud MSK — гелевые шары и оформление праздников в Москве",
      seoDescription:
        "Композиции из гелевых шаров на заказ: гендер-пати, выписка из роддома, дни рождения. Москва.",
      ...data,
    },
  });

  return NextResponse.json(settings);
}
