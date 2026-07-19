import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { safeEqual } from "@/lib/auth-utils";

const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        const email = credentials?.email?.toString() ?? "";
        const password = credentials?.password?.toString() ?? "";
        const adminEmail = process.env.ADMIN_EMAIL ?? "";
        const adminPassword = process.env.ADMIN_PASSWORD ?? "";

        if (!adminEmail || !adminPassword) {
          console.error("[auth] ADMIN_EMAIL или ADMIN_PASSWORD не заданы");
          return null;
        }

        if (safeEqual(email, adminEmail) && safeEqual(password, adminPassword)) {
          return { id: "1", name: "Admin", email: adminEmail };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request }) {
      const path = request.nextUrl.pathname;
      // Публичный сайт не требует сессии (нужно для matcher шире /admin)
      if (!path.startsWith("/admin")) return true;

      const isLoginPage = path === "/admin/login";
      if (isLoginPage) return true;
      return !!auth?.user;
    },
  },
  trustHost: true,
} satisfies NextAuthConfig;

export default authConfig;
