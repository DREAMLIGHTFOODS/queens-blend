/**
 * ============================================================================
 * Queen's Blend
 * File: app/(marketing)/page.tsx
 * Purpose: Homepage showcasing brand, featured products, and value proposition
 * ============================================================================
 */

import { Hero } from "@/components/home/Hero";
import { AboutPreviewSection } from "@/components/home/AboutPreviewSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreviewSection />
      <FeaturesSection />
      <FeaturedProducts />
      <CTASection />
    </>
  );
}
