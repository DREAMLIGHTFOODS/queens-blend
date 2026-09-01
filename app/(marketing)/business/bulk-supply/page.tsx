import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Boxes, Repeat, Scale } from "lucide-react";

import { Container } from "@/components/core/layout/Container";
import { Grid } from "@/components/core/layout/Grid";
import { Section } from "@/components/core/layout/Section";
import { Stack } from "@/components/core/layout/Stack";
import { Surface } from "@/components/core/layout/Surface";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Bulk Tea Supply and Wholesale Formats",
  description:
    "Scale your tea program with Queen's Blend bulk supply solutions. Flexible MOQ, recurring fulfillment, and multi-format packaging for business buyers.",
  keywords: [
    "bulk tea supply",
    "bulk tea supplier India",
    "wholesale tea formats",
    "tea bags bulk",
    "loose leaf bulk tea",
    "bulk tea pricing",
    "tea supplier for business",
    "Queen's Blend",
  ],
  alternates: {
    canonical: "https://thequeensblend.com/business/bulk-supply",
  },
  openGraph: {
    title: "Bulk Tea Supply | Queen's Blend",
    description:
      "Bulk tea supply with flexible MOQ, recurring fulfillment, and packaging options for business growth.",
    url: "https://thequeensblend.com/business/bulk-supply",
    siteName: "Queen's Blend",
    type: "website",
    images: [
      {
        url: "https://thequeensblend.com/images/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bulk Tea Supply by Queen's Blend",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulk Tea Supply | Queen's Blend",
    description:
      "Scale business tea sourcing with flexible MOQ, multi-format packaging, and recurring supply support.",
    creator: "@queensblend",
    images: ["https://thequeensblend.com/images/og/og-image.png"],
  },
};

const capabilities = [
  {
    icon: Boxes,
    title: "Multi-format availability",
    detail: "Tea bags, pods, loose leaf, premix, and bulk packaging options.",
  },
  {
    icon: Scale,
    title: "Flexible MOQ",
    detail: "Plan procurement according to your demand cycle and growth stage.",
  },
  {
    icon: Repeat,
    title: "Recurring fulfillment",
    detail: "Reliable repeat supply for long-term business continuity.",
  },
];

export default function BulkSupplyPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Business", item: `${SITE.url}/business` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Bulk Supply",
        item: `${SITE.url}/business/bulk-supply`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Section>
        <Container size="xl">
          <Stack gap="xl">
            <div className="reveal-up">
              <p className="text-primary mb-3 text-xs tracking-[0.2em] uppercase">Bulk Supply</p>
              <h1 className="font-(family-name:--font-heading) text-4xl tracking-tight md:text-5xl">
                Bulk Tea Supply for Growing Businesses
              </h1>
              <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
                Source premium teas in scalable quantities with format flexibility and predictable
                fulfillment support.
              </p>
            </div>

            <Grid columns={3} gap="lg" minItemWidth="280px">
              {capabilities.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Surface
                    key={item.title}
                    elevation="sm"
                    className={`reveal-up rounded-2xl border p-6 stagger-${Math.min(index + 1, 6)}`}
                  >
                    <Stack gap="md">
                      <div className="bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-lg">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h2 className="text-lg font-semibold tracking-tight">{item.title}</h2>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.detail}</p>
                    </Stack>
                  </Surface>
                );
              })}
            </Grid>

            <Surface elevation="sm" className="reveal-up rounded-2xl border p-6 md:p-8">
              <Stack gap="md">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Need pricing and MOQ details?
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                  Tell us your format preference, expected volume, and destination. Our team will
                  share a tailored quote and supply plan.
                </p>
                <Button asChild className="w-full rounded-full sm:w-fit">
                  <Link href="/business/contact" className="inline-flex items-center gap-2">
                    Request Bulk Pricing
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </Stack>
            </Surface>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
