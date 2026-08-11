/**
 * ============================================================================
 * Queen's Blend
 * File: app/(marketing)/products/page.tsx
 * Purpose: Products page
 * ============================================================================
 */

import type { Metadata } from "next";
import { ProductsHero } from "@/components/products/ProductsHero";
import { ProductsSection } from "@/components/products/ProductsSection";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse Queen's Blend's premium tea collections including green, black, oolong, white, and herbal teas from around the world.",
  keywords: [
    "Premium Teas",
    "Loose Leaf Tea",
    "Green Tea",
    "Black Tea",
    "Oolong Tea",
    "White Tea",
    "Buy Tea Online",
  ],
  openGraph: {
    title: "Our Premium Tea Collections",
    description:
      "Discover our carefully curated collections of estate-grown teas from renowned tea regions.",
    url: "https://queensblend.com/products",
    siteName: "Queen's Blend",
    type: "website",
  },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    q?: string;
    format?: string;
    collection?: string;
  }>;
}) {
  const params = await searchParams;

  return (
    <>
      <ProductsHero />
      <ProductsSection
        initialQuery={typeof params?.q === "string" ? params.q : ""}
        initialFormat={typeof params?.format === "string" ? params.format : "all"}
        initialCollection={typeof params?.collection === "string" ? params.collection : "all"}
      />
    </>
  );
}
