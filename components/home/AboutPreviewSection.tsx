/**
 * ============================================================================
 * Queen's Blend
 * File: components/home/AboutPreviewSection.tsx
 * Purpose: Concise About Us preview section for homepage
 * ============================================================================
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/core/layout/Container";
import { Stack } from "@/components/core/layout/Stack";
import { Button } from "@/components/ui/button";

export function AboutPreviewSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f4efe7] py-20 md:py-28">
      <div
        className="bg-primary/8 absolute top-14 -left-10 h-64 w-64 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <Container size="xl">
        <Stack gap="xl">
          <div className="reveal-up grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-primary mb-4 text-xs tracking-[0.2em] uppercase">About Us</p>
              <h2 className="font-(family-name:--font-heading) text-4xl leading-tight tracking-tight text-balance md:text-5xl">
                Crafted by Tea Lovers, Shared with Tea Connoisseurs
              </h2>
            </div>

            <div className="max-w-md space-y-5 md:text-right">
              <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                Queen&apos;s Blend is built on a simple belief: every cup should tell a story.
                Rooted in the heritage of fine tea and inspired by modern tastes, we create
                distinctive blends crafted for flavour, aroma and memorable brewing experiences.
                From carefully selected origins to thoughtful blending and packaging, every cup
                reflects our passion for exceptional tea.
              </p>
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href="/about" className="inline-flex items-center gap-2">
                  Learn more about us
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </Stack>
      </Container>
    </section>
  );
}
