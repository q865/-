import { requireAdminSession } from "@/lib/api/auth-guard";
import { jsonFromError, jsonOk } from "@/lib/api/response";
import { DEFAULT_SITE_SETTINGS } from "@/lib/constants/defaults";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/queries/settings";
import { revalidateSiteContent } from "@/lib/revalidate";
import { settingsSchema } from "@/lib/validations";

export async function GET() {
  const { unauthorized } = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const settings = await getSettings();
  return jsonOk(settings);
}

export async function PUT(request: Request) {
  const { unauthorized } = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const body = settingsSchema.parse(await request.json());

    const settings = await prisma.siteSettings.upsert({
      where: { id: 1 },
      update: body,
      create: {
        id: 1,
        ...DEFAULT_SITE_SETTINGS,
        ...body,
      },
    });

    revalidateSiteContent();
    return jsonOk(settings);
  } catch (error) {
    return jsonFromError(error);
  }
}
