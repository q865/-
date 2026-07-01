import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/queries/settings";

export default async function AdminDashboardPage() {
  const settings = await getSettings();
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
        <h1 className="text-3xl font-bold text-[#3d3a36]">Обзор</h1>
        <p className="mt-2 text-[#9c9590]">Управление каталогом {settings.siteName}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-rose-dusty-light/50 bg-cream-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-rose-dusty-light hover:shadow-md"
          >
            <div className="text-3xl font-bold text-rose-dusty-dark">{stat.value}</div>
            <div className="mt-2 font-medium text-[#6b6560]">{stat.label}</div>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-rose-dusty-light/50 bg-cream-card p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#3d3a36]">Последние заявки</h2>
        {recentOrders.length === 0 ? (
          <p className="mt-4 text-[#9c9590]">Заявок пока нет</p>
        ) : (
          <div className="mt-4 space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border border-rose-dusty-light/40 bg-rose-dusty-light/20 p-4"
              >
                <div className="font-medium text-[#3d3a36]">
                  {order.name} · {order.phone}
                </div>
                {order.product ? (
                  <div className="mt-1 text-sm text-[#6b6560]">{order.product}</div>
                ) : null}
                {order.message ? (
                  <div className="mt-1 text-sm text-[#9c9590]">{order.message}</div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
