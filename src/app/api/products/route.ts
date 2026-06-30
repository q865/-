import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { slugify, stringifyImages } from "@/lib/utils";

export async function GET() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const slug = body.slug || slugify(body.name);

  const product = await prisma.product.create({
    data: {
      name: body.name,
      slug,
      description: body.description ?? "",
      price: Number(body.price),
      images: stringifyImages(body.images ?? []),
      featured: Boolean(body.featured),
      published: body.published !== false,
      categoryId: body.categoryId,
    },
  });

  revalidatePath("/");
  revalidatePath("/catalog");
  revalidatePath(`/product/${product.slug}`);

  return NextResponse.json(product, { status: 201 });
}
