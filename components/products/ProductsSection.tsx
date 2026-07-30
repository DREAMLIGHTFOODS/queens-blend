/**
 * ============================================================================
 * Queen's Blend
 * File: components/products/ProductsSection.tsx
 * Purpose: Main content section for Products page
 * ============================================================================
 */

import { Container } from "@/components/core/layout/Container";
import { Section } from "@/components/core/layout/Section";
import { Stack } from "@/components/core/layout/Stack";
import { Grid } from "@/components/core/layout/Grid";

export function ProductsSection() {
  const categories = [
    {
      icon: "🌿",
      name: "Green Teas",
      description:
        "Fresh, delicate, and full of antioxidants. Perfect for a light, refreshing cup.",
    },
    {
      icon: "🍂",
      name: "Black Teas",
      description: "Rich, bold, and full-bodied. The classic choice for a robust tea experience.",
    },
    {
      icon: "🌺",
      name: "Oolong Teas",
      description: "Aromatic and complex. The perfect balance between green and black teas.",
    },
    {
      icon: "🌸",
      name: "White Teas",
      description: "Subtle, smooth, and naturally sweet. The finest and most delicate teas.",
    },
    {
      icon: "🍵",
      name: "Herbal Blends",
      description: "Caffeine-free infusions blended with botanicals and natural flavors.",
    },
    {
      icon: "✨",
      name: "Limited Edition",
      description: "Exclusive, small-batch releases from rare estates around the world.",
    },
  ];

  return (
    <Section>
      <Container size="lg">
        <Stack gap="xl">
          {/* Introduction */}
          <Stack gap="md">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Our Collections</h2>
              <div className="bg-primary mt-2 h-1 w-20 rounded-full" />
            </div>
            <p className="text-muted-foreground max-w-3xl text-lg">
              From vibrant green teas to deep, complex black teas, our diverse collections cater to
              every palate and preference. Each tea is hand-selected from renowned estates that
              share our commitment to quality and sustainability.
            </p>
          </Stack>

          {/* Product Categories */}
          <Grid columns={3} gap="lg" minItemWidth="280px">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-muted rounded-lg p-6 transition-transform hover:scale-105"
              >
                <Stack gap="md">
                  <span className="text-4xl">{category.icon}</span>
                  <div>
                    <h3 className="text-lg font-bold">{category.name}</h3>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                  </div>
                </Stack>
              </div>
            ))}
          </Grid>

          {/* CTA */}
          <div className="bg-primary/10 rounded-lg p-8 text-center">
            <h3 className="text-xl font-bold">Ready to Explore?</h3>
            <p className="text-muted-foreground mt-2">
              Browse our complete collection and find your perfect tea match.
            </p>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
