import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Globe, Package, Palette } from "lucide-react";

import { Container } from "@/components/core/layout/Container";
import { Grid } from "@/components/core/layout/Grid";
import { Section } from "@/components/core/layout/Section";
import { Stack } from "@/components/core/layout/Stack";
import { Surface } from "@/components/core/layout/Surface";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Tea Solutions for Business",
  description:
    "Bulk tea supply and wholesale tea solutions for hotels, cafes, restaurants, offices, retailers, and distributors. Private label and export-ready support.",
  keywords: [
    "tea solutions for business",
    "bulk tea supplier",
    "wholesale tea supplier",
    "tea supplier India",
    "tea for hotels",
    "tea for cafes",
    "tea for restaurants",
    "private label tea",
    "tea export India",
    "Queen's Blend",
  ],
  alternates: {
    canonical: "https://thequeensblend.com/business",
  },
  openGraph: {
    title: "Tea Solutions for Business | Queen's Blend",
    description:
      "Partner with Queen's Blend for bulk tea supply, wholesale formats, private label programs, and export support.",
    url: "https://thequeensblend.com/business",
    siteName: "Queen's Blend",
    type: "website",
    images: [
      {
        url: "https://thequeensblend.com/images/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tea Solutions for Business by Queen's Blend",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tea Solutions for Business | Queen's Blend",
    description:
      "Bulk tea supply and private label programs for hospitality, retail, and distribution partners.",
    creator: "@queensblend",
    images: ["https://thequeensblend.com/images/og/og-image.png"],
  },
};

const solutionCards = [
  {
    icon: Building2,
    title: "HORECA Supply",
    description: "Dedicated tea programs for hotels, restaurants, cafes, and food service.",
    href: "/business/horeca",
    cta: "Explore HORECA",
  },
  {
    icon: Palette,
    title: "Private Label",
    description: "Custom blends and branded tea packaging tailored to your business.",
    href: "/business/private-label",
    cta: "Explore Private Label",
  },
  {
    icon: Package,
    title: "Bulk Supply",
    description: "Flexible MOQ, multiple formats, and reliable recurring fulfillment.",
    href: "/business/bulk-supply",
    cta: "Explore Bulk Supply",
  },
  {
    icon: Globe,
    title: "Export Support",
    description: "International shipping readiness, documentation support, and scale.",
    href: "/business/export",
    cta: "Explore Export",
  },
];

export default function BusinessPage() {
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
        name: "Business",
        item: `${SITE.url}/business`,
      },
    ],
  };

  const businessPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE.url}/business#webpage`,
    name: "Tea Solutions for Business",
    description:
      "Bulk tea supply and wholesale tea solutions for hospitality, retail, and distribution partners.",
    url: `${SITE.url}/business`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={businessPageSchema} />
      <Section>
        <Container size="xl">
          <Stack gap="xl">
            <div className="reveal-up grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-primary mb-3 text-xs tracking-[0.2em] uppercase">Business</p>
                <h1 className="font-(family-name:--font-heading) text-4xl tracking-tight md:text-5xl">
                  Tea Solutions for Business
                </h1>
                <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
                  Build your tea program with premium sourcing, scalable formats, and dependable
                  supply support from Queen&apos;s Blend.
                </p>
              </div>
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/business/contact">Request a Business Quote</Link>
              </Button>
            </div>

            <Grid columns={2} gap="lg" minItemWidth="320px">
              {solutionCards.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Surface
                    key={item.title}
                    elevation="sm"
                    className={`reveal-up border-border/70 hover:border-primary/35 rounded-2xl border p-6 transition-colors stagger-${Math.min(index + 1, 6)}`}
                  >
                    <Stack gap="md">
                      <div className="bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-lg">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold tracking-tight">{item.title}</h2>
                        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <Button asChild variant="outline" className="mt-2 w-fit rounded-full">
                        <Link href={item.href} className="inline-flex items-center gap-2">
                          {item.cta}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      </Button>
                    </Stack>
                  </Surface>
                );
              })}
            </Grid>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
