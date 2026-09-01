/**
 * ============================================================================
 * Queen's Blend
 * File: app/(marketing)/about/page.tsx
 * Purpose: About page
 * ============================================================================
 */

import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/config/site";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutSection } from "@/components/about/AboutSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Queen's Blend's mission, heritage, and commitment to premium estate teas. Discover our core values and story.",
  keywords: ["About Queen's Blend", "Tea Heritage", "Premium Tea Company", "Sustainable Teas"],
  alternates: {
    canonical: "https://thequeensblend.com/about",
  },
  openGraph: {
    title: "About Queen's Blend",
    description:
      "Learn about Queen's Blend's mission, heritage, and commitment to premium estate teas.",
    url: "https://thequeensblend.com/about",
    siteName: "Queen's Blend",
    type: "website",
    images: [
      {
        url: "https://thequeensblend.com/images/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "About The Queen's Blend",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Queen's Blend",
    description:
      "Learn about Queen's Blend's mission, heritage, and commitment to premium estate teas.",
    creator: "@queensblend",
    images: ["https://thequeensblend.com/images/og/og-image.png"],
  },
};

export default function AboutPage() {
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
        name: "About",
        item: `${SITE.url}/about`,
      },
    ],
  };

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE.url}/about#webpage`,
    name: "About Us | Queen's Blend",
    description:
      "Learn about Queen's Blend mission, heritage, and commitment to premium estate teas.",
    url: `${SITE.url}/about`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={aboutPageSchema} />
      <AboutHero />
      <AboutSection />
    </>
  );
}
