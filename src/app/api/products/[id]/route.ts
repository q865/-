import { requireAdminSession } from "@/lib/api/auth-guard";
import { jsonError, jsonFromError, jsonOk } from "@/lib/api/response";
import { prisma } from "@/lib/prisma";
import { revalidatePublicCatalog } from "@/lib/revalidate";
import { slugify, stringifyImages } from "@/lib/utils";
import { productSchema } from "@/lib/validations";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { unauthorized } = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    return jsonError("Not found", 404);
  }

  return jsonOk(product);
}

export async function PUT(request: Request, { params }: Params) {
  const { unauthorized } = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const body = productSchema.parse(await request.json());

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug || slugify(body.name),
        description: body.description ?? "",
        price: body.price,
        images: stringifyImages(body.images ?? []),
        featured: body.featured ?? false,
        published: body.published !== false,
        categoryId: body.categoryId,
      },
    });

    revalidatePublicCatalog(product.slug);
    return jsonOk(product);
  } catch (error) {
    return jsonFromError(error);
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  const { unauthorized } = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const existing = await prisma.product.findUnique({ where: { id } });

    if (!existing) {
      return jsonError("Not found", 404);
    }

    await prisma.product.delete({ where: { id } });
    revalidatePublicCatalog(existing.slug);

    return jsonOk({ ok: true });
  } catch (error) {
    return jsonFromError(error);
  }
}
