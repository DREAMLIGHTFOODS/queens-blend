/**
 * ============================================================================
 * Queen's Blend
 * File: components/home/FeaturedProducts.tsx
 * Purpose: Showcase featured tea collections on homepage
 * ============================================================================
 */

import Link from "next/link";
import { Grid } from "@/components/core/layout/Grid";
import { Surface } from "@/components/core/layout/Surface";
import { Container } from "@/components/core/layout/Container";
import { Stack } from "@/components/core/layout/Stack";
import { Button } from "@/components/ui/button";

const featuredProducts = [
  {
    name: "Darjeeling Premium",
    category: "Black Tea",
    color: "emerald",
    description: "The 'Champagne of Teas' from the misty Darjeeling mountains. Floral notes with golden appearance.",
    price: "₹450",
  },
  {
    name: "Assam Bold",
    category: "Black Tea",
    color: "amber",
    description: "Robust and malty, perfect for breakfast. Rich, full-bodied with natural sweetness.",
    price: "₹380",
  },
  {
    name: "Nilgiri Blend",
    category: "Black Tea",
    color: "sapphire",
    description: "Smooth and aromatic from the Blue Mountains. Refreshing with subtle floral notes.",
    price: "₹420",
  },
  {
    name: "Green Harmony",
    category: "Green Tea",
    color: "jade",
    description: "Delicate green tea with jasmine flowers. Light, fragrant, and rejuvenating.",
    price: "₹390",
  },
  {
    name: "White Serenity",
    category: "White Tea",
    color: "pearl",
    description: "The purest form of tea. Subtle, natural sweetness with a silky mouthfeel.",
    price: "₹520",
  },
  {
    name: "Herbal Escape",
    category: "Herbal Blend",
    color: "rose",
    description: "Caffeine-free blend of chamomile, mint, and rose petals. Calming and aromatic.",
    price: "₹360",
  },
];

export function FeaturedProducts() {
  return (
    <section id="products" className="w-full py-24 md:py-32 bg-muted">
      <Container size="2xl">
        <Stack gap="xl">
          {/* Section Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Collections</h2>
              <p className="text-lg text-muted-foreground">
                Explore our curated selection of premium tea blends
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/products">View All</Link>
            </Button>
          </div>

          {/* Products Grid */}
          <Grid columns={3} gap="lg" minItemWidth="300px">
            {featuredProducts.map((product) => (
              <Surface
                key={product.name}
                elevation="sm"
                className="overflow-hidden transition-all hover:shadow-lg hover:scale-105 duration-300 cursor-pointer group"
              >
                {/* Product Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">
                  🍵
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <Stack gap="md">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-primary font-semibold">
                        {product.category}
                      </p>
                      <h3 className="text-lg font-bold mt-2">{product.name}</h3>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-lg font-bold text-primary">{product.price}</span>
                      <Button size="sm" variant="outline">
                        View
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
