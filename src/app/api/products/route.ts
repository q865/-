import { requireAdminSession } from "@/lib/api/auth-guard";
import { jsonError, jsonFromError, jsonOk } from "@/lib/api/response";
import { prisma } from "@/lib/prisma";
import { revalidatePublicCatalog } from "@/lib/revalidate";
import { slugify, stringifyImages } from "@/lib/utils";
import { productSchema } from "@/lib/validations";

export async function GET() {
  const { unauthorized } = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return jsonOk(products);
}

export async function POST(request: Request) {
  const { unauthorized } = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const body = productSchema.parse(await request.json());
    const slug = body.slug || slugify(body.name);

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug,
        description: body.description ?? "",
        price: body.price,
        images: stringifyImages(body.images ?? []),
        featured: body.featured ?? false,
        published: body.published !== false,
        categoryId: body.categoryId,
      },
    });

    revalidatePublicCatalog(product.slug);
    return jsonOk(product, 201);
  } catch (error) {
    return jsonFromError(error);
  }
}
