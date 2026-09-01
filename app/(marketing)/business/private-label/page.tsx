import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FlaskConical, Palette, Tag } from "lucide-react";

import { Container } from "@/components/core/layout/Container";
import { Grid } from "@/components/core/layout/Grid";
import { Section } from "@/components/core/layout/Section";
import { Stack } from "@/components/core/layout/Stack";
import { Surface } from "@/components/core/layout/Surface";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Private Label Tea and Custom Blending",
  description:
    "Launch your own tea line with Queen's Blend private label and custom blending services. Flexible MOQ, multiple formats, and dedicated B2B support.",
  keywords: [
    "private label tea",
    "white label tea",
    "custom tea blending",
    "private label tea supplier India",
    "bulk private label tea",
    "tea brand manufacturing",
    "custom tea bags",
    "Queen's Blend",
  ],
  alternates: {
    canonical: "https://thequeensblend.com/business/private-label",
  },
  openGraph: {
    title: "Private Label Tea | Queen's Blend",
    description:
      "Build your tea brand with custom blends, private label packaging, and dependable bulk fulfillment.",
    url: "https://thequeensblend.com/business/private-label",
    siteName: "Queen's Blend",
    type: "website",
    images: [
      {
        url: "https://thequeensblend.com/images/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "Private Label Tea by Queen's Blend",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Label Tea | Queen's Blend",
    description:
      "Launch your tea brand with custom blending, private label packaging, and dependable bulk fulfillment.",
    creator: "@queensblend",
    images: ["https://thequeensblend.com/images/og/og-image.png"],
  },
};

const programSteps = [
  {
    icon: FlaskConical,
    title: "Blend Development",
    detail: "Define flavor direction, tea base, and tasting profile with our team.",
  },
  {
    icon: Palette,
    title: "Branding & Packaging",
    detail: "Apply your visual identity across selected formats and pack sizes.",
  },
  {
    icon: Tag,
    title: "Scale & Fulfillment",
    detail: "Produce in bulk with reliable quality controls and delivery timelines.",
  },
];

export default function PrivateLabelPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Business", item: `${SITE.url}/business` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Private Label",
        item: `${SITE.url}/business/private-label`,
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
              <p className="text-primary mb-3 text-xs tracking-[0.2em] uppercase">Private Label</p>
              <h1 className="font-(family-name:--font-heading) text-4xl tracking-tight md:text-5xl">
                Your Brand. Your Blend. Your Tea.
              </h1>
              <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
                Create a market-ready tea line with custom blending and private label production
                across multiple packaging formats.
              </p>
            </div>

            <Grid columns={3} gap="lg" minItemWidth="280px">
              {programSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Surface
                    key={step.title}
                    elevation="sm"
                    className={`reveal-up rounded-2xl border p-6 stagger-${Math.min(index + 1, 6)}`}
                  >
                    <Stack gap="md">
                      <div className="bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-lg">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h2 className="text-lg font-semibold tracking-tight">{step.title}</h2>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.detail}</p>
                    </Stack>
                  </Surface>
                );
              })}
            </Grid>

            <Surface elevation="sm" className="reveal-up rounded-2xl border p-6 md:p-8">
              <Stack gap="md">
                <h2 className="text-2xl font-semibold tracking-tight">Program highlights</h2>
                <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                  Flexible MOQ, dedicated account support, and access to tea bag, loose leaf, pod,
                  premix, and custom pack options.
                </p>
                <Button asChild className="w-full rounded-full sm:w-fit">
                  <Link href="/business/contact" className="inline-flex items-center gap-2">
                    Start Private Label Program
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
