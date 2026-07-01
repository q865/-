import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { DEFAULT_SITE_SETTINGS } from "@/lib/constants/defaults";
import type { SiteSettings } from "@/generated/prisma/client";

/** Кэшированное чтение настроек — один запрос на HTTP-запрос. */
export const getSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
    if (settings) return settings;
  } catch {
    // БД недоступна (например, при `next build` без Postgres)
  }

  return { id: 1, ...DEFAULT_SITE_SETTINGS };
});
