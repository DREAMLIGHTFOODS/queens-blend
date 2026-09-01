import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";

import { DEFAULT_METADATA } from "@/config/seo";
import { SITE } from "@/config/site";
import { cn } from "@/lib/utils";
import { NewHeader } from "@/components/layout/header/NewHeader";
import { Footer } from "@/components/layout/footer/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  title: {
    default: "The Queen's Blend",
    template: "%s | The Queen's Blend",
  },
  description:
    "Experience the finest estate-grown teas, thoughtfully crafted to deliver exceptional flavour, aroma, and heritage in every cup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}${SITE.logo}`,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.line1,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.state,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    sameAs: [
      SITE.social.instagram,
      SITE.social.facebook,
      SITE.social.twitter,
      SITE.social.linkedin,
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        contactType: "customer support",
        email: SITE.email,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        contactType: "sales",
        email: "b2b@thequeensblend.com",
        areaServed: "Worldwide",
        availableLanguage: ["English"],
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: SITE.locale,
    publisher: {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/products?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        geistSans.variable,
        geistMono.variable,
        cormorant.variable,
      )}
    >
      <body className="bg-background text-foreground flex min-h-screen flex-col font-sans">
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <NewHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
