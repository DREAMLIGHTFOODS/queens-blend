/**
 * ============================================================================
 * Queen's Blend
 * File: components/products/ProductsSection.tsx
 * Purpose: Main content section for Products page
 * ============================================================================
 */

import Link from "next/link";
import { ArrowRight, Flower2, Flame, Leaf, Shield, Sparkles, type LucideIcon } from "lucide-react";

import { Container } from "@/components/core/layout/Container";
import { Section } from "@/components/core/layout/Section";
import { Stack } from "@/components/core/layout/Stack";
import { Grid } from "@/components/core/layout/Grid";
import { Surface } from "@/components/core/layout/Surface";
import { Button } from "@/components/ui/button";

export function ProductsSection() {
  const categories = [
    {
      icon: Leaf,
      accentClass:
        "bg-[color-mix(in_oklch,var(--product-green-soft),var(--surface)_45%)] text-[var(--product-green-foreground)]",
      name: "Green Teas",
      description:
        "Fresh, delicate, and full of antioxidants. Perfect for a light, refreshing cup.",
    },
    {
      icon: Flame,
      accentClass:
        "bg-[color-mix(in_oklch,var(--product-assam-soft),var(--surface)_45%)] text-[var(--product-assam-foreground)]",
      name: "Black Teas",
      description: "Rich, bold, and full-bodied. The classic choice for a robust tea experience.",
    },
    {
      icon: Sparkles,
      accentClass:
        "bg-[color-mix(in_oklch,var(--product-oolong-soft),var(--surface)_45%)] text-[var(--product-oolong-foreground)]",
      name: "Oolong Teas",
      description: "Aromatic and complex. The perfect balance between green and black teas.",
    },
    {
      icon: Flower2,
      accentClass:
        "bg-[color-mix(in_oklch,var(--product-white-soft),var(--surface)_45%)] text-[var(--product-white-foreground)]",
      name: "White Teas",
      description: "Subtle, smooth, and naturally sweet. The finest and most delicate teas.",
    },
    {
      icon: Shield,
      accentClass:
        "bg-[color-mix(in_oklch,var(--product-herbal-soft),var(--surface)_45%)] text-[var(--product-herbal-foreground)]",
      name: "Herbal Blends",
      description: "Caffeine-free infusions blended with botanicals and natural flavors.",
    },
    {
      icon: Sparkles,
      accentClass:
        "bg-[color-mix(in_oklch,var(--product-saffron-soft),var(--surface)_45%)] text-[var(--product-saffron-foreground)]",
      name: "Limited Edition",
      description: "Exclusive, small-batch releases from rare estates around the world.",
    },
  ] satisfies Array<{ icon: LucideIcon; accentClass: string; name: string; description: string }>;

  return (
    <Section>
      <Container size="xl">
        <Stack gap="xl">
          {/* Introduction */}
          <div className="reveal-up grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-primary mb-3 text-xs tracking-[0.2em] uppercase">
                Collection Index
              </p>
              <h2 className="font-[family-name:var(--font-heading)] text-4xl tracking-tight md:text-5xl">
                Choose by style, mood, and brew ritual
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed md:text-base">
              From crisp green infusions to bold morning blends, each category is curated for
              consistent flavor and character.
            </p>
          </div>

          {/* Product Categories */}
          <Grid columns={3} gap="lg" minItemWidth="280px">
            {categories.map((category, index) => (
              <Surface
                key={category.name}
                elevation="sm"
                className={`group border-border/70 reveal-up hover:border-primary/35 rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 stagger-${Math.min(index + 1, 6)}`}
              >
                <Stack gap="md">
                  <div className={`inline-flex w-fit rounded-full p-2 ${category.accentClass}`}>
                    <category.icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{category.name}</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                </Stack>
              </Surface>
            ))}
          </Grid>

          {/* CTA */}
          <Surface
            elevation="md"
            className="reveal-up stagger-2 from-primary/12 to-secondary/20 rounded-2xl bg-gradient-to-r p-8 md:p-10"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-[family-name:var(--font-heading)] text-3xl tracking-tight md:text-4xl">
                  Ready to find your perfect tea match?
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed md:text-base">
                  Browse full tasting notes and brew guides, or speak with us for personalized
                  recommendations.
                </p>
              </div>

              <Button asChild size="lg" className="rounded-full px-7">
                <Link href="/contact" className="inline-flex items-center gap-2">
                  Get Recommendations
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Surface>
        </Stack>
      </Container>
    </Section>
  );
}
