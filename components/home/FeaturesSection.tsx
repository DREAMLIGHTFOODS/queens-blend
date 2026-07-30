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

const features = [
  {
    icon: "🌿",
    title: "Premium Estate Tea",
    description:
      "Sourced from the world's finest tea estates, each blend represents years of expertise.",
  },
  {
    icon: "🎯",
    title: "Authentic Blends",
    description:
      "Carefully curated flavors that honor traditional brewing methods and modern tastes.",
  },
  {
    icon: "♻️",
    title: "Sustainable Sourcing",
    description:
      "We partner with estates that prioritize environmental conservation and fair practices.",
  },
  {
    icon: "👑",
    title: "Premium Quality",
    description:
      "Every tea is hand-selected and tested to ensure exceptional taste and aroma standards.",
  },
  {
    icon: "📚",
    title: "Tea Education",
    description: "Learn brewing techniques, blending secrets, and the heritage behind each blend.",
  },
  {
    icon: "🚚",
    title: "Fast Delivery",
    description: "Your tea arrives fresh within days, packaged to preserve flavor and aroma.",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-background w-full py-24 md:py-32">
      <Container size="2xl">
        <Stack gap="xl">
          {/* Section Header */}
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Why Choose Queen&apos;s Blend</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              We&apos;re committed to bringing you the finest premium teas with exceptional service
              and authentic craftsmanship.
            </p>
          </div>

          {/* Features Grid */}
          <Grid columns={3} gap="lg" minItemWidth="280px">
            {features.map((feature, idx) => (
              <Surface
                key={idx}
                elevation="md"
                className="p-6 transition-transform duration-300 hover:scale-105"
              >
                <Stack gap="md">
                  <div className="text-4xl">{feature.icon}</div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
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
