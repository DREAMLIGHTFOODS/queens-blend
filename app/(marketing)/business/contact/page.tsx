import type { Metadata } from "next";
import { Mail, Phone, type LucideIcon } from "lucide-react";

import { Container } from "@/components/core/layout/Container";
import { Grid } from "@/components/core/layout/Grid";
import { Section } from "@/components/core/layout/Section";
import { Stack } from "@/components/core/layout/Stack";
import { Surface } from "@/components/core/layout/Surface";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Request a Business Quote",
  description:
    "Submit your bulk tea requirement, format preference, and private label needs. Queen's Blend B2B team responds within 24 business hours.",
  keywords: [
    "request business tea quote",
    "bulk tea inquiry",
    "private label tea inquiry",
    "tea supplier contact",
    "business tea partnership",
    "Queen's Blend",
  ],
  alternates: {
    canonical: "https://thequeensblend.com/business/contact",
  },
  openGraph: {
    title: "Request a Business Quote | Queen's Blend",
    description:
      "Connect with our B2B team for bulk tea supply, private label programs, and export-ready sourcing.",
    url: "https://thequeensblend.com/business/contact",
    siteName: "Queen's Blend",
    type: "website",
    images: [
      {
        url: "https://thequeensblend.com/images/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "Request a Business Quote - Queen's Blend",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Request a Business Quote | Queen's Blend",
    description:
      "Contact our B2B team for bulk tea supply, private label programs, and export-ready sourcing.",
    creator: "@queensblend",
    images: ["https://thequeensblend.com/images/og/og-image.png"],
  },
};

const channels = [
  {
    icon: Mail,
    title: "Business Email",
    value: "b2b@thequeensblend.com",
    description: "Share product, format, and expected volume details.",
  },
  {
    icon: Phone,
    title: "Business Phone",
    value: "+91 (33) 3151-5892",
    description: "Available Monday to Friday, 9 AM - 6 PM IST.",
  },
] satisfies Array<{
  icon: LucideIcon;
  title: string;
  value: string;
  description: string;
}>;

export default function BusinessContactPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Business", item: `${SITE.url}/business` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Business Contact",
        item: `${SITE.url}/business/contact`,
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
              <p className="text-primary mb-3 text-xs tracking-[0.2em] uppercase">
                Business Contact
              </p>
              <h1 className="font-(family-name:--font-heading) text-4xl tracking-tight md:text-5xl">
                Request a Business Quote
              </h1>
              <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
                Tell us your tea requirement, preferred formats, and delivery volume. Our B2B team
                will respond with a tailored supply plan.
              </p>
            </div>

            <Grid columns={2} gap="lg" minItemWidth="320px">
              <Surface elevation="sm" className="reveal-up rounded-2xl border p-6 md:p-8">
                <Stack gap="md">
                  <h2 className="text-xl font-semibold tracking-tight">Before you submit</h2>
                  <ul className="text-muted-foreground list-disc space-y-2 pl-5 text-sm leading-relaxed">
                    <li>Tea varieties or flavor profile you need</li>
                    <li>Preferred formats (bags, loose leaf, pods, premix, bulk)</li>
                    <li>Estimated monthly or quarterly volume</li>
                    <li>Delivery region or export destination</li>
                    <li>Private label or custom blending requirements</li>
                  </ul>

                  <Stack gap="sm" className="pt-2">
                    {channels.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div
                          key={item.title}
                          className={`bg-muted/45 reveal-up rounded-xl border p-4 stagger-${Math.min(index + 1, 6)}`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="bg-primary/10 text-primary mt-0.5 rounded-full p-2">
                              <Icon className="h-4 w-4" aria-hidden="true" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold">{item.title}</p>
                              <p className="text-primary text-sm">{item.value}</p>
                              <p className="text-muted-foreground text-xs leading-relaxed">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </Stack>
                </Stack>
              </Surface>

              <Surface elevation="sm" className="reveal-up rounded-2xl border p-6 md:p-8">
                <ContactForm />
              </Surface>
            </Grid>
          </Stack>
        </Container>
      </Section>
    </>
  );
}
