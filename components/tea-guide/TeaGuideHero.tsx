/**
 * ============================================================================
 * Queen's Blend
 * File: components/tea-guide/TeaGuideHero.tsx
 * Purpose: Hero section for Tea Guide page
 * ============================================================================
 */

import { Container } from "@/components/core/layout/Container";
import { Stack } from "@/components/core/layout/Stack";

export function TeaGuideHero() {
  return (
    <section className="from-background via-background to-muted relative w-full overflow-hidden bg-gradient-to-br py-24 md:py-32 lg:py-40">
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
            <span className="text-primary text-sm font-medium">📚 Learn & Explore</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            The Art of
            <br />
            <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent">
              Tea Tasting
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-muted-foreground max-w-2xl text-lg md:text-xl">
            Master the techniques and knowledge to truly appreciate the complexity and beauty of
            premium teas from around the world.
          </p>
        </Stack>
      </Container>
    </section>
  );
}
