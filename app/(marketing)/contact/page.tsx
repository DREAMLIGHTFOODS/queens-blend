/**
 * ============================================================================
 * Queen's Blend
 * File: app/(marketing)/contact/page.tsx
 * Purpose: Contact page
 * ============================================================================
 */

import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactSection } from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Queen's Blend. Send us your questions, feedback, or partnership inquiries. We'd love to hear from you!",
  keywords: ["Contact", "Support", "Customer Service", "Partnership", "Inquiry"],
  openGraph: {
    title: "Contact Queen's Blend",
    description: "Reach out to our team with any questions or inquiries.",
    url: "https://queensblend.com/contact",
    siteName: "Queen's Blend",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSection />
    </>
  );
}
