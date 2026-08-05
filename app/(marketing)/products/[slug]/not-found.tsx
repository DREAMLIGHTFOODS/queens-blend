/**
 * ============================================================================
 * Queen's Blend
 * File: app/(marketing)/products/[slug]/not-found.tsx
 * Purpose: Product-specific not found experience
 * ============================================================================
 */

import Link from "next/link";

import { Container } from "@/components/core/layout/Container";
import { Section } from "@/components/core/layout/Section";
import { Stack } from "@/components/core/layout/Stack";
import { Surface } from "@/components/core/layout/Surface";
import { Button } from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <Section>
      <Container size="lg">
        <Surface elevation="sm" className="reveal-up rounded-2xl border p-8 text-center md:p-12">
          <Stack gap="lg" align="center">
            <p className="text-primary text-xs tracking-[0.2em] uppercase">Product Lookup</p>

            <h1 className="font-(family-name:--font-heading) text-4xl tracking-tight md:text-5xl">
              This Tea Could Not Be Found
            </h1>

            <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed md:text-base">
              The product link may be outdated, moved, or unavailable. Browse our full tea
              collection or contact us for recommendations.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild className="rounded-full px-7">
                <Link href="/products">Browse Products</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-7">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>

            <Link
              href="/"
              className="text-muted-foreground hover:text-primary text-sm font-medium underline-offset-4 transition-colors hover:underline"
            >
              Back to Home
            </Link>
          </Stack>
        </Surface>
      </Container>
    </Section>
  );
}
