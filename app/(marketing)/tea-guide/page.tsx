/**
 * ============================================================================
 * Queen's Blend
 * File: app/(marketing)/tea-guide/page.tsx
 * Purpose: Tea Guide page
 * ============================================================================
 */

import type { Metadata } from "next";
import { TeaGuideHero } from "@/components/tea-guide/TeaGuideHero";
import { TeaGuideSection } from "@/components/tea-guide/TeaGuideSection";

export const metadata: Metadata = {
  title: "Tea Guide",
  description:
    "Learn everything about tea - from brewing techniques and flavor profiles to storage tips and health benefits. Your complete tea education guide.",
  keywords: [
    "Tea Guide",
    "How to Brew Tea",
    "Tea Tasting",
    "Tea Tips",
    "Tea Education",
    "Premium Tea Knowledge",
  ],
  openGraph: {
    title: "The Complete Tea Guide",
    description:
      "Master the art of tea tasting with expert tips, brewing techniques, and flavor profiles.",
    url: "https://queensblend.com/tea-guide",
    siteName: "Queen's Blend",
    type: "website",
  },
};

export default function TeaGuidePage() {
  return (
    <>
      <TeaGuideHero />
      <TeaGuideSection />
    </>
  );
}
