"use client";

import { ClipboardList, LayoutGrid, LogOut, Menu as MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import React from "react";

import BackButton from "@/components/ui/backbutton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard/feedbacks", label: "Feedbacks", icon: ClipboardList },
  { href: "/dashboard/products", label: "Products", icon: LayoutGrid },
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isProductDetail = /^\/dashboard\/products\/[^/]+$/.test(pathname);
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-[240px_1fr]">
      <div className="lg:hidden flex items-center justify-between bg-zinc-900 text-white p-4 border-b border-zinc-800">
        <Link href="/dashboard/products" className="text-lg font-semibold tracking-wide">
          Disruptail Feedback
        </Link>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTitle className="sr-only">Mobile Menu</DialogTitle>
          <DialogDescription className="sr-only">
            Use this menu to navigate through the admin dashboard sections.
          </DialogDescription>
          <DialogTrigger asChild>
            <button>
              <MenuIcon className="w-6 h-6" />
            </button>
          </DialogTrigger>
          <DialogContent
            aria-describedby="mobile dialog container"
            className="p-0 bg-zinc-900 border-zinc-800 text-white max-w-xs"
          >
            <div className="flex items-center justify-between p-4 border-b border-zinc-700">
              <span className="text-lg font-semibold">Menu</span>
            </div>
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md hover:bg-zinc-800",
                    pathname.startsWith(href) && "bg-zinc-800 font-semibold",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              ))}
              <form action="/api/auth/signout" method="post">
                <button
                  type="submit"
                  className="flex w-full items-center gap-2 px-3 py-2 rounded-md text-sm text-zinc-400 hover:bg-zinc-800"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </form>
            </nav>
          </DialogContent>
        </Dialog>
      </div>

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

      <main className="p-4 sm:p-6 lg:p-10">
        {isProductDetail && <BackButton />}
        <SessionProvider>{children}</SessionProvider>
      </main>
    </div>
  );
}
