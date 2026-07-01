import { requireAdminSession } from "@/lib/api/auth-guard";
import { jsonError, jsonFromError, jsonOk } from "@/lib/api/response";
import { prisma } from "@/lib/prisma";
import { revalidatePublicCatalog } from "@/lib/revalidate";
import { slugify } from "@/lib/utils";
import { categorySchema } from "@/lib/validations";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  const { unauthorized } = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const body = categorySchema.parse(await request.json());

    const category = await prisma.category.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug || slugify(body.name),
        image: body.image ?? null,
        sortOrder: body.sortOrder ?? 0,
      },
    });

    revalidatePublicCatalog();
    return jsonOk(category);
  } catch (error) {
    return jsonFromError(error);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { unauthorized } = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    await prisma.category.delete({ where: { id } });
    revalidatePublicCatalog();
    return jsonOk({ ok: true });
  } catch (error) {
    if ((error as { code?: string }).code === "P2025") {
      return jsonError("Not found", 404);
    }
    return jsonFromError(error);
  }
}
