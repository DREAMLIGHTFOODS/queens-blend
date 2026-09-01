import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Hotel, Store, UtensilsCrossed } from "lucide-react";

import { Container } from "@/components/core/layout/Container";
import { Grid } from "@/components/core/layout/Grid";
import { Section } from "@/components/core/layout/Section";
import { Stack } from "@/components/core/layout/Stack";
import { Surface } from "@/components/core/layout/Surface";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Tea Supply for Hotels, Restaurants and Cafes",
  description:
    "Premium bulk tea supply for HORECA businesses. Build signature tea menus with flexible formats, reliable quality, and recurring fulfillment.",
  keywords: [
    "tea supplier horeca",
    "tea for hotels",
    "tea for restaurants",
    "tea for cafes",
    "bulk tea bags horeca",
    "hospitality tea supplier",
    "hotel tea program",
    "restaurant tea wholesale",
    "Queen's Blend",
  ],
  alternates: {
    canonical: "https://thequeensblend.com/business/horeca",
  },
  openGraph: {
    title: "HORECA Tea Supply | Queen's Blend",
    description:
      "Bulk tea supply tailored for hotels, restaurants, and cafes with format flexibility and dependable quality.",
    url: "https://thequeensblend.com/business/horeca",
    siteName: "Queen's Blend",
    type: "website",
    images: [
      {
        url: "https://thequeensblend.com/images/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "HORECA Tea Supply by Queen's Blend",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HORECA Tea Supply | Queen's Blend",
    description:
      "Bulk tea supply for hotels, restaurants, and cafes with dependable quality and flexible formats.",
    creator: "@queensblend",
    images: ["https://thequeensblend.com/images/og/og-image.png"],
  },
};

const horecaSegments = [
  {
    icon: Hotel,
    title: "Hotels & Resorts",
    description: "Room service, breakfast buffets, and premium in-room tea programs.",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants",
    description: "Menu-ready teas to pair with cuisine and elevate dining experiences.",
  },
  {
    icon: Store,
    title: "Cafes & Tea Bars",
    description: "Specialty teas for recurring high-volume service with consistent flavor.",
  },
];

export default function HorecaPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Business", item: `${SITE.url}/business` },
      {
        "@type": "ListItem",
        position: 3,
        name: "HORECA",
        item: `${SITE.url}/business/horeca`,
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
              <p className="text-primary mb-3 text-xs tracking-[0.2em] uppercase">HORECA</p>
              <h1 className="font-(family-name:--font-heading) text-4xl tracking-tight md:text-5xl">
                Tea Programs for Hospitality
              </h1>
              <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
                Designed for hotels, restaurants, and cafes that require consistency, scalability,
                and premium quality across every service.
              </p>
            </div>

            <Grid columns={3} gap="lg" minItemWidth="280px">
              {horecaSegments.map((segment, index) => {
                const Icon = segment.icon;
                return (
                  <Surface
                    key={segment.title}
                    elevation="sm"
                    className={`reveal-up rounded-2xl border p-6 stagger-${Math.min(index + 1, 6)}`}
                  >
                    <Stack gap="md">
                      <div className="bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-lg">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h2 className="text-lg font-semibold tracking-tight">{segment.title}</h2>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {segment.description}
                      </p>
                    </Stack>
                  </Surface>
                );
              })}
            </Grid>

            <Surface elevation="sm" className="reveal-up rounded-2xl border p-6 md:p-8">
              <Stack gap="md">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Formats and service support
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                  Available in loose leaf, tea bags, pods, premix, and bulk packaging with support
                  for menu planning and recurring fulfillment.
                </p>
                <Button asChild className="w-full rounded-full sm:w-fit">
                  <Link href="/business/contact" className="inline-flex items-center gap-2">
                    Request a HORECA Quote
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
