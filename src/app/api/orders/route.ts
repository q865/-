import { requireAdminSession } from "@/lib/api/auth-guard";
import { jsonError, jsonFromError, jsonOk } from "@/lib/api/response";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { orderSchema } from "@/lib/validations";

const ORDER_RATE_LIMIT = 5;
const ORDER_WINDOW_MS = 15 * 60 * 1000;

export async function GET() {
  const { unauthorized } = await requireAdminSession();
  if (unauthorized) return unauthorized;

  const orders = await prisma.orderRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return jsonOk(orders);
}

export async function POST(request: Request) {
  const clientIp = getClientIp(request);

  if (!checkRateLimit(`orders:${clientIp}`, ORDER_RATE_LIMIT, ORDER_WINDOW_MS)) {
    return jsonError("Слишком много заявок. Попробуйте позже.", 429);
  }

  try {
    const body = orderSchema.parse(await request.json());
    const order = await prisma.orderRequest.create({ data: body });
    return jsonOk(order, 201);
  } catch (error) {
    return jsonFromError(error);
  }
}
