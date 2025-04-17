import "./globals.css";

import React from "react";

export const metadata = {
  title: {
    default: "Disruptail Feedback App",
    template: "%s | Disruptail",
  },
  description:
    "Disruptail Feedback App is a full-stack web platform to collect, manage, and review feedback on products using a modern, modular architecture.",
  keywords: [
    "feedback",
    "next.js",
    "tailwindcss",
    "shadcn",
    "product review",
    "disruptail",
    "prisma",
    "typescript",
    "postgresql",
  ],
  authors: [{ name: "FrigoDev", url: "https://github.com/FrigoDev" }],
  creator: "FrigoDev",
  applicationName: "Disruptail Feedback App",
  generator: "Next.js 15",
  themeColor: "#0f172a",
  openGraph: {
    title: "Disruptail Feedback App",
    description:
      "Modular feedback platform to collect, manage, and review product opinions with admin moderation.",
    siteName: "Disruptail",
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
