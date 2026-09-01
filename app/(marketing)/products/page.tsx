/**
 * ============================================================================
 * Queen's Blend
 * File: app/(marketing)/products/page.tsx
 * Purpose: Products page
 * ============================================================================
 */

import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/config/site";
import { ProductsHero } from "@/components/products/ProductsHero";
import { ProductsSection } from "@/components/products/ProductsSection";

export const metadata: Metadata = {
  title: "Tea Collection for Retail and Bulk Supply",
  description:
    "Browse Queen's Blend tea collections including green, black, oolong, white, and herbal teas for personal shopping and business bulk sourcing.",
  keywords: [
    "Premium Teas",
    "Loose Leaf Tea",
    "Green Tea",
    "Black Tea",
    "Oolong Tea",
    "White Tea",
    "Buy Tea Online",
    "bulk tea supplier",
    "wholesale tea collection",
    "tea for hotels and cafes",
    "private label tea",
  ],
  alternates: {
    canonical: "https://thequeensblend.com/products",
  },
  openGraph: {
    title: "Tea Collections for Retail and Business | Queen's Blend",
    description:
      "Discover curated estate-grown tea collections for individual buyers and business bulk sourcing.",
    url: "https://thequeensblend.com/products",
    siteName: "Queen's Blend",
    type: "website",
    images: [
      {
        url: "https://thequeensblend.com/images/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "Queen's Blend Tea Products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tea Collections for Retail and Business | Queen's Blend",
    description:
      "Explore premium tea collections for online shopping, wholesale, private label, and export-ready sourcing.",
    creator: "@queensblend",
    images: ["https://thequeensblend.com/images/og/og-image.png"],
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
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${SITE.url}/products`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <ProductsHero />
      <ProductsSection
        initialQuery={typeof params?.q === "string" ? params.q : ""}
        initialFormat={typeof params?.format === "string" ? params.format : "all"}
        initialCollection={typeof params?.collection === "string" ? params.collection : "all"}
      />
    </>
  );
}
