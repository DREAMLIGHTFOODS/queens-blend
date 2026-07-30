/**
 * ============================================================================
 * Queen's Blend
 * File: components/home/FeaturedProducts.tsx
 * Purpose: Showcase featured tea collections on homepage
 * ============================================================================
 */

import Link from "next/link";
import { ArrowUpRight, Leaf, Sparkles, Timer } from "lucide-react";

import { Grid } from "@/components/core/layout/Grid";
import { Surface } from "@/components/core/layout/Surface";
import { Container } from "@/components/core/layout/Container";
import { Stack } from "@/components/core/layout/Stack";
import { Button } from "@/components/ui/button";

const featuredProducts = [
  {
    name: "Darjeeling Premium",
    category: "Black Tea",
    accentClass:
      "bg-[color-mix(in_oklch,var(--product-darjeeling-soft),var(--surface)_45%)] text-[var(--product-darjeeling-foreground)]",
    description:
      "The 'Champagne of Teas' from the misty Darjeeling mountains. Floral notes with golden appearance.",
    tastingNotes: "Muscatel, honeyed finish",
    brewTime: "3-4 min",
    price: "₹450",
  },
  {
    name: "Assam Bold",
    category: "Black Tea",
    accentClass:
      "bg-[color-mix(in_oklch,var(--product-assam-soft),var(--surface)_45%)] text-[var(--product-assam-foreground)]",
    description:
      "Robust and malty, perfect for breakfast. Rich, full-bodied with natural sweetness.",
    tastingNotes: "Malt, cocoa, warm spice",
    brewTime: "4-5 min",
    price: "₹380",
  },
  {
    name: "Nilgiri Blend",
    category: "Black Tea",
    accentClass:
      "bg-[color-mix(in_oklch,var(--product-nilgiri-soft),var(--surface)_45%)] text-[var(--product-nilgiri-foreground)]",
    description:
      "Smooth and aromatic from the Blue Mountains. Refreshing with subtle floral notes.",
    tastingNotes: "Bright, floral, clean",
    brewTime: "3 min",
    price: "₹420",
  },
  {
    name: "Green Harmony",
    category: "Green Tea",
    accentClass:
      "bg-[color-mix(in_oklch,var(--product-green-soft),var(--surface)_45%)] text-[var(--product-green-foreground)]",
    description: "Delicate green tea with jasmine flowers. Light, fragrant, and rejuvenating.",
    tastingNotes: "Jasmine, soft vegetal",
    brewTime: "2-3 min",
    price: "₹390",
  },
  {
    name: "White Serenity",
    category: "White Tea",
    accentClass:
      "bg-[color-mix(in_oklch,var(--product-white-soft),var(--surface)_45%)] text-[var(--product-white-foreground)]",
    description: "The purest form of tea. Subtle, natural sweetness with a silky mouthfeel.",
    tastingNotes: "Pear blossom, silk",
    brewTime: "2-3 min",
    price: "₹520",
  },
  {
    name: "Herbal Escape",
    category: "Herbal Blend",
    accentClass:
      "bg-[color-mix(in_oklch,var(--product-rose-soft),var(--surface)_45%)] text-[var(--product-rose-foreground)]",
    description: "Caffeine-free blend of chamomile, mint, and rose petals. Calming and aromatic.",
    tastingNotes: "Floral, mint, chamomile",
    brewTime: "5 min",
    price: "₹360",
  },
];

export function FeaturedProducts() {
  return (
    <section
      id="products"
      className="from-muted via-background to-muted relative w-full bg-gradient-to-b py-24 md:py-32"
    >
      <Container size="2xl">
        <Stack gap="xl">
          {/* Section Header */}
          <div className="reveal-up flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-primary mb-3 text-xs tracking-[0.2em] uppercase">
                Signature Selections
              </p>
              <h2 className="mb-2 font-[family-name:var(--font-heading)] text-4xl leading-tight tracking-tight md:text-5xl">
                Featured Collections
              </h2>
              <p className="text-muted-foreground max-w-2xl text-base leading-relaxed md:text-lg">
                Curated seasonal picks from our most requested estates and small-batch blends.
              </p>
            </div>
            <Button asChild variant="outline" className="self-start rounded-full px-6 md:self-auto">
              <Link href="/products">View All</Link>
            </Button>
          </div>

          {/* Products Grid */}
          <Grid columns={3} gap="lg" minItemWidth="300px">
            {featuredProducts.map((product, index) => (
              <Surface
                key={product.name}
                elevation="sm"
                className={`group border-border/70 reveal-up hover:border-primary/40 relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 stagger-${Math.min(index + 1, 6)}`}
              >
                <div className="p-5 pb-0">
                  <div className="text-muted-foreground text-xs tracking-[0.16em] uppercase">
                    {product.category}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <Stack gap="md">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight">{product.name}</h3>
                    </div>

                    <div className={`rounded-xl p-4 ${product.accentClass}`}>
                      <p className="text-sm leading-relaxed">{product.description}</p>
                    </div>

                    <div className="text-muted-foreground space-y-2 text-sm">
                      <p className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" aria-hidden="true" />
                        <span>{product.tastingNotes}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Timer className="h-4 w-4" aria-hidden="true" />
                        <span>Brew time {product.brewTime}</span>
                      </p>
                    </div>

                    <div className="border-border flex items-center justify-between border-t pt-4">
                      <span className="text-primary inline-flex items-center gap-2 text-xl font-bold">
                        <Leaf className="h-4 w-4" aria-hidden="true" />
                        {product.price}
                      </span>
                      <Button asChild size="sm" variant="outline" className="rounded-full">
                        <Link href="/products" className="inline-flex items-center gap-1">
                          Explore
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>
                      </Button>
                    </div>
                  </Stack>
                </div>
              </Surface>
            ))}
          </Grid>
        </Stack>
      </Container>
    </section>
  );
}
