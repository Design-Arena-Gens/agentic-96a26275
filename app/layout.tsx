"use client";

import "../app/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-slate-950">
      <head>
        <title>Marketplace Growth Agent</title>
        <meta
          name="description"
          content="AI agent that supercharges Facebook Marketplace product reach with smart ads, lead gen, and growth insights."
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-12 pt-8 md:px-8">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}
