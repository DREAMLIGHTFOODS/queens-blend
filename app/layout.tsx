import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";

import { cn } from "@/lib/utils";
import { NewHeader } from "@/components/layout/header/NewHeader";
import { Footer } from "@/components/layout/footer/Footer";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Queen's Blend",
    template: "%s | Queen's Blend",
  },
  description: "Premium Estate Tea Collection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        geistSans.variable,
        geistMono.variable,
        cormorant.variable,
      )}
    >
      <body className="bg-background text-foreground flex min-h-screen flex-col font-sans">
        <NewHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
