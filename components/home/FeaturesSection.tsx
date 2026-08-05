/**
 * ============================================================================
 * Queen's Blend
 * File: components/home/FeaturesSection.tsx
 * Purpose: Highlight key brand benefits and differentiators
 * ============================================================================
 */

import { Grid } from "@/components/core/layout/Grid";
import { Surface } from "@/components/core/layout/Surface";
import { Container } from "@/components/core/layout/Container";
import { Stack } from "@/components/core/layout/Stack";
import {
  Award,
  BookOpenCheck,
  Leaf,
  PackageCheck,
  ShieldCheck,
  Sprout,
  type LucideIcon,
} from "lucide-react";

const features = [
  {
    icon: Leaf,
    label: "01",
    title: "Premium Estate Tea",
    description:
      "Sourced from the world's finest tea estates, each blend represents years of expertise.",
  },
  {
    icon: Sprout,
    label: "02",
    title: "Authentic Blends",
    description:
      "Carefully curated flavors that honor traditional brewing methods and modern tastes.",
  },
  {
    icon: ShieldCheck,
    label: "03",
    title: "Sustainable Sourcing",
    description:
      "We partner with estates that prioritize environmental conservation and fair practices.",
  },
  {
    icon: Award,
    label: "04",
    title: "Premium Quality",
    description:
      "Every tea is hand-selected and tested to ensure exceptional taste and aroma standards.",
  },
  {
    icon: BookOpenCheck,
    label: "05",
    title: "Tea Education",
    description: "Learn brewing techniques, blending secrets, and the heritage behind each blend.",
  },
  {
    icon: PackageCheck,
    label: "06",
    title: "Fast Delivery",
    description: "Your tea arrives fresh within days, packaged to preserve flavor and aroma.",
  },
] satisfies Array<{ icon: LucideIcon; label: string; title: string; description: string }>;

export function FeaturesSection() {
  return (
    <section className="bg-background relative w-full overflow-hidden py-24 md:py-32">
      <div
        className="bg-secondary/20 absolute top-20 left-0 h-72 w-72 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <Container size="2xl">
        <Stack gap="xl">
          {/* Section Header */}
          <div className="reveal-up grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-primary mb-4 text-xs tracking-[0.2em] uppercase">
                The Queen&apos;s Standard
              </p>
              <h2 className="font-(family-name:--font-heading) text-4xl leading-tight tracking-tight text-balance md:text-5xl">
                Why Connoisseurs Choose Queen&apos;s Blend
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed md:text-base">
              From leaf selection to final packing, each step is designed to preserve aroma,
              clarity, and character in every cup.
            </p>
          </div>

          {/* Features Grid */}
          <Grid columns={3} gap="lg" minItemWidth="280px">
            {features.map((feature, index) => (
              <Surface
                key={feature.title}
                elevation="md"
                className={`bg-primary text-ring group border-border/80 reveal-up relative overflow-hidden rounded-2xl border p-6 transition-transform duration-300 hover:-translate-y-1 stagger-${Math.min(index + 1, 6)}`}
              >
                <div className="from-secondary/35 to-primary/10 pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-linear-to-br blur-2xl" />
                <Stack gap="md">
                  <div className="flex items-center justify-between">
                    <span className="text-ring text-xs tracking-[0.2em] uppercase">
                      {feature.label}
                    </span>
                    <div className="bg-primary/10 text-ring rounded-full p-2">
                      <feature.icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold tracking-tight">{feature.title}</h3>
                    <p className="text-primary-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Stack>
              </Surface>
            ))}
          </Grid>
        </Stack>
      </Container>
    </section>
  );
}
