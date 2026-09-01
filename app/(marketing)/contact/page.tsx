/**
 * ============================================================================
 * Queen's Blend
 * File: app/(marketing)/contact/page.tsx
 * Purpose: Contact page
 * ============================================================================
 */

import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/config/site";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactSection } from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Queen's Blend. Send us your questions, feedback, or partnership inquiries. We'd love to hear from you!",
  keywords: ["Contact", "Support", "Customer Service", "Partnership", "Inquiry"],
  alternates: {
    canonical: "https://thequeensblend.com/contact",
  },
  openGraph: {
    title: "Contact Queen's Blend",
    description: "Reach out to our team with any questions or inquiries.",
    url: "https://thequeensblend.com/contact",
    siteName: "Queen's Blend",
    type: "website",
    images: [
      {
        url: "https://thequeensblend.com/images/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact The Queen's Blend",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Queen's Blend",
    description: "Reach out to our team with any questions or inquiries.",
    creator: "@queensblend",
    images: ["https://thequeensblend.com/images/og/og-image.png"],
  },
};

export default function ContactPage() {
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
        name: "Contact",
        item: `${SITE.url}/contact`,
      },
    ],
  };

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE.url}/contact#webpage`,
    name: "Contact Us | Queen's Blend",
    description: "Reach out to Queen's Blend for support, feedback, or partnership inquiries.",
    url: `${SITE.url}/contact`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={contactPageSchema} />
      <ContactHero />
      <ContactSection />
    </>
  );
}
