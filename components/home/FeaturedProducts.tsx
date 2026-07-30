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
    description:
      "The 'Champagne of Teas' from the misty Darjeeling mountains. Floral notes with golden appearance.",
    price: "₹450",
  },
  {
    name: "Assam Bold",
    category: "Black Tea",
    color: "amber",
    description:
      "Robust and malty, perfect for breakfast. Rich, full-bodied with natural sweetness.",
    price: "₹380",
  },
  {
    name: "Nilgiri Blend",
    category: "Black Tea",
    color: "sapphire",
    description:
      "Smooth and aromatic from the Blue Mountains. Refreshing with subtle floral notes.",
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
    <section id="products" className="bg-muted w-full py-24 md:py-32">
      <Container size="2xl">
        <Stack gap="xl">
          {/* Section Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold md:text-4xl">Featured Collections</h2>
              <p className="text-muted-foreground text-lg">
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
                className="group cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                {/* Product Image Placeholder */}
                <div className="from-primary/10 to-accent/10 flex h-48 items-center justify-center bg-gradient-to-br text-5xl transition-transform duration-300 group-hover:scale-110">
                  🍵
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <Stack gap="md">
                    <div>
                      <p className="text-primary text-xs font-semibold tracking-wide uppercase">
                        {product.category}
                      </p>
                      <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
                    </div>

                    <p className="text-muted-foreground line-clamp-2 text-sm">
                      {product.description}
                    </p>

                    <div className="border-border flex items-center justify-between border-t pt-4">
                      <span className="text-primary text-lg font-bold">{product.price}</span>
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
