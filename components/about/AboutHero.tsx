/**
 * ============================================================================
 * Queen's Blend
 * File: components/about/AboutHero.tsx
 * Purpose: Hero section for About page
 * ============================================================================
 */

import { Container } from "@/components/core/layout/Container";
import { Stack } from "@/components/core/layout/Stack";
import { BadgeCheck, Leaf } from "lucide-react";

export function AboutHero() {
  return (
    <section className="from-background via-muted/35 to-background relative w-full overflow-hidden bg-linear-to-b py-24 md:py-32 lg:py-36">
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
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Our Story
          </div>

          <h1 className="reveal-up stagger-1 font-(family-name:--font-heading) text-4xl leading-tight tracking-tight text-balance md:text-6xl">
            A Heritage of Craft,
            <span className="text-primary block">Steeped With Intention</span>
          </h1>

          <p className="reveal-up stagger-2 text-muted-foreground max-w-2xl text-base leading-relaxed md:text-lg">
            Queen&apos;s Blend was built to preserve provenance, honor estate growers, and turn tea
            drinking into a calm, meaningful ritual.
          </p>

          <div className="reveal-up stagger-3 text-muted-foreground inline-flex items-center gap-2 text-sm">
            <Leaf className="text-primary h-4 w-4" aria-hidden="true" />
            Sourced directly from trusted estates across India and beyond
          </div>
        </Stack>
      </Container>
    </section>
  );
}
