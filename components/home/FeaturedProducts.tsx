/**
 * ============================================================================
 * Queen's Blend
 * File: components/home/FeaturedProducts.tsx
 * Purpose: Showcase featured tea collections on homepage
 * ============================================================================
 */
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Sparkles, Timer } from "lucide-react";

import { Grid } from "@/components/core/layout/Grid";
import { Surface } from "@/components/core/layout/Surface";
import { Container } from "@/components/core/layout/Container";
import { Stack } from "@/components/core/layout/Stack";
import { Button } from "@/components/ui/button";
import { FEATURED_PRODUCTS } from "@/data/products";

export function FeaturedProducts() {
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);

  return (
    <section
      id="products"
      className="from-muted via-background to-muted relative w-full bg-linear-to-b py-24 md:py-32"
    >
      <Container size="2xl">
        <Stack gap="xl">
          {/* Section Header */}
          <div className="reveal-up flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-primary mb-3 text-xs tracking-[0.2em] uppercase">
                Signature Selections
              </p>
              <h2 className="mb-2 font-(family-name:--font-heading) text-4xl leading-tight tracking-tight md:text-5xl">
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
            {FEATURED_PRODUCTS.map((product, index) => (
              <Surface
                key={product.id}
                elevation="sm"
                className={`group border-border/70 reveal-up hover:border-primary/40 relative overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:cursor-pointer stagger-${Math.min(index + 1, 6)}`}
              >
                <div className="p-5 pb-0">
                  <div className="text-muted-foreground text-xs tracking-[0.16em] uppercase">
                    {product.categoryLabel}
                  </div>
                </div>

                <div className="px-5 pt-4">
                  <button
                    type="button"
                    className="border-border/70 relative block aspect-4/3 w-full overflow-hidden rounded-xl border text-left"
                    onClick={() =>
                      setActivePreviewId((current) => (current === product.id ? null : product.id))
                    }
                    aria-label={`Toggle ${product.name} ingredient and product image`}
                  >
                    <Image
                      src={product.cardIngredientImage}
                      alt={`${product.name} ingredient preview`}
                      fill
                      className={`object-cover transition-all duration-500 ease-out group-focus-within:opacity-0 group-hover:scale-105 group-hover:opacity-0 ${activePreviewId === product.id ? "opacity-0" : "opacity-100"}`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <Image
                      src={product.cardProductImage}
                      alt={`${product.name} product preview`}
                      fill
                      className={`object-cover transition-all duration-500 ease-out group-focus-within:opacity-100 group-hover:scale-100 group-hover:opacity-100 ${activePreviewId === product.id ? "opacity-100" : "opacity-0"}`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
                  </button>
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

                    <div className="border-border flex items-center justify-end border-t pt-4">
                      <Button asChild size="sm" variant="outline" className="rounded-full">
                        <Link
                          href={`/products/${product.slug}`}
                          className="inline-flex items-center gap-1"
                        >
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
