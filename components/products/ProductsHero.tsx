/**
 * ============================================================================
 * Queen's Blend
 * File: components/products/ProductsHero.tsx
 * Purpose: Hero section for Products page
 * ============================================================================
 */

import { Container } from "@/components/core/layout/Container";
import { Stack } from "@/components/core/layout/Stack";
import { BadgeCheck, ShoppingBag } from "lucide-react";

export function ProductsHero() {
  return (
    <section className="from-background via-muted/35 to-background relative w-full overflow-hidden bg-gradient-to-b py-24 md:py-32 lg:py-36">
      <div
        className="bg-secondary/25 absolute -top-32 -right-24 h-72 w-72 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="bg-primary/12 absolute -bottom-36 -left-20 h-80 w-80 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <Container size="xl" className="relative z-10">
        <Stack gap="lg" align="center" className="text-center">
          <div className="reveal-up bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs tracking-[0.16em] uppercase">
            <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
            Our Collections
          </div>

          <h1 className="reveal-up stagger-1 font-[family-name:var(--font-heading)] text-4xl leading-tight tracking-tight text-balance md:text-6xl">
            Explore Rare Leaves,
            <span className="text-primary block">Curated by Origin</span>
          </h1>

          <p className="reveal-up stagger-2 text-muted-foreground max-w-2xl text-base leading-relaxed md:text-lg">
            Discover estate-grown teas selected for flavor clarity, aromatic depth, and brewing
            consistency across every harvest.
          </p>

          <div className="reveal-up stagger-3 text-muted-foreground inline-flex items-center gap-2 text-sm">
            <BadgeCheck className="text-primary h-4 w-4" aria-hidden="true" />
            Traceable sourcing with seasonal quality checks
          </div>
        </Stack>
      </Container>
    </section>
  );
}
