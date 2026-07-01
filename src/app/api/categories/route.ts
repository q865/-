import { requireAdminSession } from "@/lib/api/auth-guard";
import { jsonFromError, jsonOk } from "@/lib/api/response";
import { prisma } from "@/lib/prisma";
import { revalidatePublicCatalog } from "@/lib/revalidate";
import { slugify } from "@/lib/utils";
import { categorySchema } from "@/lib/validations";

export async function GET() {
  const { unauthorized } = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { sortOrder: "asc" },
  });

  return jsonOk(categories);
}

export async function POST(request: Request) {
  const { unauthorized } = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const body = categorySchema.parse(await request.json());

    const category = await prisma.category.create({
      data: {
        name: body.name,
        slug: body.slug || slugify(body.name),
        image: body.image ?? null,
        sortOrder: body.sortOrder ?? 0,
      },
    });

    revalidatePublicCatalog();
    return jsonOk(category, 201);
  } catch (error) {
    return jsonFromError(error);
  }
}
