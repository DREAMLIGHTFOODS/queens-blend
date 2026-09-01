/**
 * ============================================================================
 * Queen's Blend
 * File: app/(marketing)/tea-guide/page.tsx
 * Purpose: Tea Guide page
 * ============================================================================
 */

import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/config/site";
import { TeaGuideHero } from "@/components/tea-guide/TeaGuideHero";
import { TeaGuideSection, teaGuideFaqItems } from "@/components/tea-guide/TeaGuideSection";

export const metadata: Metadata = {
  title: "Tea Guide for Brewing, Tasting, and Service",
  description:
    "Learn tea brewing, tasting, storage, and service fundamentals. Practical guidance for home tea drinkers, cafes, restaurants, and hospitality teams.",
  keywords: [
    "Tea Guide",
    "How to Brew Tea",
    "Tea Tasting",
    "Tea Tips",
    "Tea Education",
    "Premium Tea Knowledge",
    "tea training for cafes",
    "tea service standards",
    "tea menu planning",
    "horeca tea guide",
  ],
  alternates: {
    canonical: "https://thequeensblend.com/tea-guide",
  },
  openGraph: {
    title: "Tea Guide for Brewing, Tasting, and Service",
    description:
      "Master tea brewing and tasting with practical guidance for both personal rituals and hospitality service quality.",
    url: "https://thequeensblend.com/tea-guide",
    siteName: "Queen's Blend",
    type: "website",
    images: [
      {
        url: "https://thequeensblend.com/images/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Complete Tea Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tea Guide for Brewing, Tasting, and Service",
    description:
      "Practical tea brewing and tasting guidance for home use, cafes, restaurants, and hospitality teams.",
    creator: "@queensblend",
    images: ["https://thequeensblend.com/images/og/og-image.png"],
  },
};

export default function TeaGuidePage() {
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
        name: "Tea Guide",
        item: `${SITE.url}/tea-guide`,
      },
    ],
  };

  const teaGuideSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE.url}/tea-guide#webpage`,
    name: "Tea Guide for Brewing, Tasting, and Service",
    description:
      "Practical tea education covering brewing, tasting, storage, pairing, and service quality.",
    url: `${SITE.url}/tea-guide`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
    },
    about: [
      { "@type": "Thing", name: "Tea brewing" },
      { "@type": "Thing", name: "Tea tasting" },
      { "@type": "Thing", name: "Tea storage" },
      { "@type": "Thing", name: "Tea service standards" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: teaGuideFaqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={teaGuideSchema} />
      <JsonLd data={faqSchema} />
      <TeaGuideHero />
      <TeaGuideSection />
    </>
  );
}
