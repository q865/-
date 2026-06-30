import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [productsCount, categoriesCount, ordersCount, recentOrders] =
    await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.orderRequest.count(),
      prisma.orderRequest.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
    ]);

  const stats = [
    { label: "Товары", value: productsCount, href: "/admin/products" },
    { label: "Категории", value: categoriesCount, href: "/admin/categories" },
    { label: "Заявки", value: ordersCount, href: "/admin/orders" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Обзор</h1>
        <p className="mt-2 text-slate-500">Управление каталогом Air Cloud MSK</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-md"
          >
            <div className="text-3xl font-bold text-pink-600">{stat.value}</div>
            <div className="mt-2 font-medium text-slate-600">{stat.label}</div>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Последние заявки</h2>
        {recentOrders.length === 0 ? (
          <p className="mt-4 text-slate-500">Заявок пока нет</p>
        ) : (
          <div className="mt-4 space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border border-pink-50 bg-pink-50/40 p-4"
              >
                <div className="font-medium text-slate-900">
                  {order.name} · {order.phone}
                </div>
                {order.product ? (
                  <div className="mt-1 text-sm text-slate-600">{order.product}</div>
                ) : null}
                {order.message ? (
                  <div className="mt-1 text-sm text-slate-500">{order.message}</div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
