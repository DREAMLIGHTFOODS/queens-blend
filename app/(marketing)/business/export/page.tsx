import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileCheck2, Globe2, Ship } from "lucide-react";

import { Container } from "@/components/core/layout/Container";
import { Grid } from "@/components/core/layout/Grid";
import { Section } from "@/components/core/layout/Section";
import { Stack } from "@/components/core/layout/Stack";
import { Surface } from "@/components/core/layout/Surface";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Tea Export from India",
  description:
    "Export premium Indian tea with Queen's Blend. International supply support, documentation guidance, and scalable format options for global buyers.",
  keywords: [
    "tea export India",
    "Indian tea exporter",
    "bulk tea export",
    "Darjeeling export",
    "Assam tea export",
    "tea export documentation",
    "international tea supplier",
    "Queen's Blend",
  ],
  alternates: {
    canonical: "https://thequeensblend.com/business/export",
  },
  openGraph: {
    title: "Tea Export from India | Queen's Blend",
    description:
      "International tea supply support with export readiness, documentation guidance, and scalable fulfillment.",
    url: "https://thequeensblend.com/business/export",
    siteName: "Queen's Blend",
    type: "website",
    images: [
      {
        url: "https://thequeensblend.com/images/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tea Export Support by Queen's Blend",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tea Export from India | Queen's Blend",
    description:
      "Export-ready premium tea sourcing with international support, format flexibility, and scalable dispatch.",
    creator: "@queensblend",
    images: ["https://thequeensblend.com/images/og/og-image.png"],
  },
};

const exportSupport = [
  {
    icon: Globe2,
    title: "Global-ready portfolio",
    detail: "50+ tea varieties with multiple packaging formats suitable for export markets.",
  },
  {
    icon: FileCheck2,
    title: "Documentation support",
    detail: "Guidance for commercial documents and process coordination for shipments.",
  },
  {
    icon: Ship,
    title: "Scalable dispatch",
    detail: "Plan volume, lead time, and packaging format based on destination requirements.",
  },
];

export default function ExportPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Business", item: `${SITE.url}/business` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Export",
        item: `${SITE.url}/business/export`,
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
              <p className="text-primary mb-3 text-xs tracking-[0.2em] uppercase">Export</p>
              <h1 className="font-(family-name:--font-heading) text-4xl tracking-tight md:text-5xl">
                Export Premium Tea from India
              </h1>
              <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
                Work with a reliable tea partner for international business supply, quality
                consistency, and practical export coordination.
              </p>
            </div>

            <Grid columns={3} gap="lg" minItemWidth="280px">
              {exportSupport.map((item, index) => {
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
                  Ready to discuss your market?
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                  Share your destination country, preferred formats, and expected volume. We will
                  help define a practical export supply approach.
                </p>
                <Button asChild className="w-full rounded-full sm:w-fit">
                  <Link href="/business/contact" className="inline-flex items-center gap-2">
                    Request Export Information
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
