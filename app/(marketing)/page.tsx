/**
 * ============================================================================
 * Queen's Blend
 * File: app/(marketing)/page.tsx
 * Purpose: Homepage showcasing brand, featured products, and value proposition
 * ============================================================================
 */

import type { Metadata } from "next";

import { Hero } from "@/components/home/Hero";
import { AboutPreviewSection } from "@/components/home/AboutPreviewSection";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CTASection } from "@/components/home/CTASection";
import { TeaSolutionsForBusiness } from "@/components/home/TeaSolutionsForBusiness";
import { CustomPrivateLabelSection } from "@/components/home/CustomPrivateLabelSection";
import { WhyPartnerWithUsSection } from "@/components/home/WhyPartnerWithUsSection";
import { BusinessCTASection } from "@/components/home/BusinessCTASection";

export const metadata: Metadata = {
  title: "Premium Tea Online and Bulk Tea Supply",
  description:
    "Shop premium estate teas and explore bulk tea supply for hotels, cafes, restaurants, and retail businesses. Queen's Blend offers private label and export-ready tea solutions.",
  keywords: [
    "premium tea online",
    "buy tea online",
    "tea shop",
    "bulk tea supplier",
    "tea solutions for business",
    "wholesale tea supplier",
    "tea exporter India",
    "private label tea",
    "estate tea",
    "premium tea India",
    "loose leaf tea",
    "tea blends",
    "Darjeeling tea",
    "Assam tea",
    "green tea",
    "black tea",
    "white tea",
    "oolong tea",
    "herbal tea",
    "Queen's Blend",
  ],
  alternates: {
    canonical: "https://thequeensblend.com/",
  },
  openGraph: {
    title: "Queen's Blend | Premium Tea and Business Tea Supply",
    description:
      "Explore premium estate teas and business tea supply with private label and export-ready support.",
    url: "https://thequeensblend.com/",
    siteName: "Queen's Blend",
    type: "website",
    images: [
      {
        url: "https://thequeensblend.com/images/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Queen's Blend - Premium Estate Teas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Queen's Blend | Premium Tea and Business Tea Supply",
    description:
      "Shop premium estate teas and request business tea supply quotes for wholesale, private label, and export support.",
    creator: "@queensblend",
    images: ["https://thequeensblend.com/images/og/og-image.png"],
  },
};

export default function Home() {
  return (
    <>
      {/* ===== B2C Content (Existing Sections) ===== */}
      <Hero />
      <AboutPreviewSection />
      <StatsSection />
      <FeaturesSection />
      <FeaturedProducts />
      <CTASection />

      {/* ===== B2B Content (New Sections) ===== */}
      <TeaSolutionsForBusiness />
      <CustomPrivateLabelSection />
      <WhyPartnerWithUsSection />
      <BusinessCTASection />
    </>
  );
}
