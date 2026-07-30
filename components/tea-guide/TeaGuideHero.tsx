/**
 * ============================================================================
 * Queen's Blend
 * File: components/tea-guide/TeaGuideHero.tsx
 * Purpose: Hero section for Tea Guide page
 * ============================================================================
 */

import { Container } from "@/components/core/layout/Container";
import { Stack } from "@/components/core/layout/Stack";
import { BookMarked, Sparkles } from "lucide-react";

export function TeaGuideHero() {
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
            <BookMarked className="h-3.5 w-3.5" aria-hidden="true" />
            Learn And Explore
          </div>

          <h1 className="reveal-up stagger-1 font-[family-name:var(--font-heading)] text-4xl leading-tight tracking-tight text-balance md:text-6xl">
            Learn the Language,
            <span className="text-primary block">Ritual, and Craft of Tea</span>
          </h1>

          <p className="reveal-up stagger-2 text-muted-foreground max-w-2xl text-base leading-relaxed md:text-lg">
            Build confidence in brewing, tasting, and storage with practical guidance designed for
            both new drinkers and seasoned connoisseurs.
          </p>

          <div className="reveal-up stagger-3 text-muted-foreground inline-flex items-center gap-2 text-sm">
            <Sparkles className="text-primary h-4 w-4" aria-hidden="true" />
            Practical tips grounded in real tasting-room workflows
          </div>
        </Stack>
      </Container>
    </section>
  );
}
