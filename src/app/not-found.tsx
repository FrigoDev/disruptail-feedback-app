// src/app/not-found.tsx
"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-zinc-900">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-lg text-gray-200 mb-6">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button className="bg-gray-600" asChild>
        <Link className="text-" href="/login">
          Back to login
        </Link>
      </Button>
    </div>
  );
}
