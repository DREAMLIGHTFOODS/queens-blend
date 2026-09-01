/**
 * ============================================================================
 * Queen's Blend
 * File: components/home/TeaSolutionsForBusiness.tsx
 * Purpose: Introduce tea solutions for various business segments
 * ============================================================================
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Hotel,
  UtensilsCrossed,
  Store,
  Building2,
  ShoppingCart,
  Globe,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/core/layout/Container";
import { Grid } from "@/components/core/layout/Grid";
import { Stack } from "@/components/core/layout/Stack";
import { Surface } from "@/components/core/layout/Surface";
import { Button } from "@/components/ui/button";

const businessSegments = [
  {
    icon: Hotel,
    segment: "Hotels & Resorts",
    description: "Premium tea service for guests, minibars, and room service programs.",
  },
  {
    icon: UtensilsCrossed,
    segment: "Cafés & Restaurants",
    description: "Specialty tea programs for dining experiences and beverage menus.",
  },
  {
    icon: Store,
    segment: "Retail & Tea Shops",
    description: "Wholesale tea supply for retail stores and specialty shops.",
  },
  {
    icon: Building2,
    segment: "Corporate & Offices",
    description: "Tea solutions for corporate break rooms and office hospitality.",
  },
  {
    icon: ShoppingCart,
    segment: "E-commerce & Subscriptions",
    description: "Bulk supply for online retailers and subscription box services.",
  },
  {
    icon: Globe,
    segment: "Distributors & Exporters",
    description: "International distribution and export-ready tea supply.",
  },
] satisfies Array<{ icon: LucideIcon; segment: string; description: string }>;

export function TeaSolutionsForBusiness() {
  return (
    <section className="bg-muted/30 relative w-full overflow-hidden py-20 md:py-28">
      <div
        className="bg-primary/8 absolute -top-32 right-0 h-96 w-96 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <Container size="xl">
        <Stack gap="xl">
          {/* Section Header */}
          <div className="reveal-up flex flex-col gap-4">
            <div>
              <p className="text-primary mb-3 text-xs tracking-[0.2em] uppercase">
                Business Solutions
              </p>
              <h2 className="font-(family-name:--font-heading) text-4xl leading-tight tracking-tight text-balance md:text-5xl">
                Exceptional Tea for Hotels, Cafés, Restaurants & More
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
                Whether you&apos;re a hotel, café, retailer, or distributor, we supply premium bulk
                tea tailored to your business needs.
              </p>
            </div>
          </div>

          {/* Business Segments Grid */}
          <Grid columns={3} gap="lg" minItemWidth="300px">
            {businessSegments.map((item, index) => {
              const Icon = item.icon;
              return (
                <Surface
                  key={item.segment}
                  elevation="sm"
                  className={`reveal-up border-border/70 hover:border-primary/40 group rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 stagger-${Math.min(index + 1, 6)}`}
                >
                  <Stack gap="md">
                    <div className="bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-lg">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">{item.segment}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </Stack>
                </Surface>
              );
            })}
          </Grid>

          {/* CTA */}
          <div className="reveal-up flex justify-center pt-4">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/business" className="inline-flex items-center gap-2">
                Explore Business Solutions
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </Stack>
      </Container>
    </section>
  );
}
