/**
 * ============================================================================
 * Queen's Blend
 * File: app/(marketing)/about/page.tsx
 * Purpose: About page
 * ============================================================================
 */

import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutSection } from "@/components/about/AboutSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Queen's Blend's mission, heritage, and commitment to premium estate teas. Discover our core values and story.",
  keywords: ["About Queen's Blend", "Tea Heritage", "Premium Tea Company", "Sustainable Teas"],
  openGraph: {
    title: "About Queen's Blend",
    description:
      "Learn about Queen's Blend's mission, heritage, and commitment to premium estate teas.",
    url: "https://queensblend.com/about",
    siteName: "Queen's Blend",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutSection />
    </>
  );
}
