import { prisma } from "@/lib/prisma";

export default async function AdminOrdersPage() {
  const orders = await prisma.orderRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Заявки</h1>
        <p className="mt-1 text-slate-500">Всего: {orders.length}</p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-pink-200 bg-white p-12 text-center text-slate-500">
          Заявок пока нет — они появятся, когда клиенты отправят форму на сайте.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-slate-900">{order.name}</div>
                  <a
                    href={`tel:${order.phone.replace(/\D/g, "")}`}
                    className="mt-1 inline-block text-pink-600 hover:underline"
                  >
                    {order.phone}
                  </a>
                </div>
                <div className="text-sm text-slate-500">
                  {new Date(order.createdAt).toLocaleString("ru-RU")}
                </div>
              </div>
              {order.product ? (
                <p className="mt-3 text-sm text-slate-700">
                  <span className="font-medium">Товар:</span> {order.product}
                </p>
              ) : null}
              {order.message ? (
                <p className="mt-2 text-sm text-slate-600">{order.message}</p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
