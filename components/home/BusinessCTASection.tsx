/**
 * ============================================================================
 * Queen's Blend
 * File: components/home/BusinessCTASection.tsx
 * Purpose: Combined CTA section for both B2C and B2B audiences
 * ============================================================================
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/core/layout/Container";
import { Stack } from "@/components/core/layout/Stack";
import { Button } from "@/components/ui/button";

export function BusinessCTASection() {
  return (
    <section className="bg-background relative w-full overflow-hidden py-20 md:py-28">
      <div
        className="bg-primary/10 absolute -top-32 -right-32 h-96 w-96 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <Container size="lg">
        <Stack gap="xl">
          <div className="reveal-up flex flex-col items-center gap-6 text-center">
            <div>
              <h2 className="mb-4 font-(family-name:--font-heading) text-4xl leading-tight tracking-tight md:text-5xl">
                Let&apos;s Talk Tea
              </h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-base leading-relaxed md:text-lg">
                Whether you&apos;re looking for your next favourite tea or sourcing tea for your
                business, we&apos;re here to help.
              </p>
            </div>

            {/* Dual CTAs */}
            <div className="reveal-up flex flex-col gap-3 sm:flex-row sm:gap-4">
              {/* B2C CTA */}
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 font-semibold"
                asChild
              >
                <Link href="/products" className="inline-flex items-center gap-2">
                  Explore Tea
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>

              {/* B2B CTA */}
              <Button size="lg" className="rounded-full px-8 font-semibold" asChild>
                <Link href="/business" className="inline-flex items-center gap-2">
                  Request Business Quote
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="border-border/30 border-t pt-6">
              <div className="text-muted-foreground flex flex-col items-center gap-2 text-sm md:flex-row">
                <span>Questions? Email us:</span>
                <a
                  href="mailto:b2b@thequeensblend.com"
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  b2b@thequeensblend.com
                </a>
              </div>
              <p className="text-muted-foreground/60 mt-2 text-xs">Response within 24 hours</p>
            </div>
          </div>
        </Stack>
      </Container>
    </section>
  );
}
