/**
 * ============================================================================
 * Queen's Blend
 * File: components/about/AboutHero.tsx
 * Purpose: Hero section for About page
 * ============================================================================
 */

import { Container } from "@/components/core/layout/Container";
import { Stack } from "@/components/core/layout/Stack";

export function AboutHero() {
  return (
    <section className="from-background via-background to-muted relative w-full overflow-hidden bg-linear-to-br py-24 md:py-32 lg:py-40">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-primary/5 absolute -top-40 -right-40 h-80 w-80 rounded-full blur-3xl" />
        <div className="bg-primary/5 absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <Container size="lg" className="relative z-10">
        <Stack gap="lg" align="center" className="text-center">
          {/* Tagline */}
          <div className="bg-primary/10 inline-flex items-center gap-2 rounded-full px-4 py-2">
            <span className="text-primary text-sm font-medium">📖 Our Story</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            About
            <br />
            <span className="from-primary to-accent bg-linear-to-r bg-clip-text text-transparent">
              Queen&apos;s Blend
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-muted-foreground max-w-2xl text-lg md:text-xl">
            Discover the passion, heritage, and commitment behind every cup of tea we craft for you.
          </p>
        </Stack>
      </Container>
    </section>
  );
}
