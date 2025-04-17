"use client";

import { ClipboardList, LayoutGrid, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import React from "react";

import BackButton from "@/components/ui/backbutton";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard/feedbacks", label: "Feedbacks", icon: ClipboardList },
  { href: "/dashboard/products", label: "Products", icon: LayoutGrid },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isProductDetail = /^\/dashboard\/products\/[^/]+$/.test(pathname);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:flex flex-col border-r bg-zinc-900 text-white p-4">
        <Link
          href={"/dashboard/products"}
          className="mb-4 text-center text-lg font-semibold tracking-wide"
        >
          Disruptail Feedback
        </Link>
        <hr className="border-zinc-700 mb-4" />

        <nav className="flex flex-col gap-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-800",
                pathname.startsWith(href) && "bg-zinc-800 font-semibold",
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className="flex w-full items-center gap-2 px-3 py-2 rounded-md text-sm text-zinc-400 hover:bg-zinc-800"
            >
              <LogOut className="w-4 h-4" />
              Log out
            </button>
          </form>
        </div>
      </aside>
      <main className="p-6 lg:p-10">
        {isProductDetail && <BackButton />}
        <SessionProvider>{children}</SessionProvider>
      </main>
    </div>
  );
}
