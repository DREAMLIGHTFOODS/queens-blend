/**
 * ============================================================================
 * Queen's Blend
 * File: components/home/Hero.tsx
 * Purpose: Landing page hero section with compelling headline and CTA
 * ============================================================================
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/core/layout/Container";
import { Stack } from "@/components/core/layout/Stack";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-background via-background to-muted py-24 md:py-32 lg:py-40">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Content */}
      <Container size="lg" className="relative z-10">
        <Stack gap="lg" align="center" className="text-center">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
            <span className="text-sm font-medium text-primary">🍵 Premium Estate Teas</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Elevate Your
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Tea Experience
            </span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground">
            Discover hand-picked, estate-grown teas from the world&apos;s finest tea regions. Each blend
            is carefully curated to deliver exceptional flavour, aroma, and heritage in every cup.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="#products">Explore Collections</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/tea-guide">Learn More</Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-xl">⭐</span>
              <span>Trusted by tea enthusiasts worldwide</span>
            </div>
          </div>
        </Stack>
      </Container>
    </section>
  );
}
