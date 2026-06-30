import { prisma } from "@/lib/prisma";

export default async function AdminOrdersPage() {
  const orders = await prisma.orderRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#3d3a36]">Заявки</h1>
        <p className="mt-1 text-[#9c9590]">Всего: {orders.length}</p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-rose-dusty-light bg-cream-card p-12 text-center text-[#9c9590]">
          Заявок пока нет — они появятся, когда клиенты отправят форму на сайте.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-rose-dusty-light/50 bg-cream-card p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-[#3d3a36]">{order.name}</div>
                  <a
                    href={`tel:${order.phone.replace(/\D/g, "")}`}
                    className="mt-1 inline-block text-rose-dusty-dark hover:underline"
                  >
                    {order.phone}
                  </a>
                </div>
                <div className="text-sm text-[#9c9590]">
                  {new Date(order.createdAt).toLocaleString("ru-RU")}
                </div>
              </div>
              {order.product ? (
                <p className="mt-3 text-sm text-[#5c5651]">
                  <span className="font-medium">Товар:</span> {order.product}
                </p>
              ) : null}
              {order.message ? (
                <p className="mt-2 text-sm text-[#6b6560]">{order.message}</p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
