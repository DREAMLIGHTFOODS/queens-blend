/**
 * ============================================================================
 * Queen's Blend
 * File: components/home/CustomPrivateLabelSection.tsx
 * Purpose: Showcase custom blending and private label capabilities
 * ============================================================================
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/core/layout/Container";
import { Stack } from "@/components/core/layout/Stack";
import { Button } from "@/components/ui/button";

export function CustomPrivateLabelSection() {
  return (
    <section className="bg-background relative w-full overflow-hidden py-20 md:py-28">
      <div
        className="bg-accent/10 absolute bottom-0 left-0 h-96 w-96 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <Container size="xl">
        <Stack gap="xl">
          <div className="reveal-up grid gap-8 md:grid-cols-[1fr_1fr] md:items-center">
            {/* Left: Content */}
            <div>
              <p className="text-primary mb-3 text-xs tracking-[0.2em] uppercase">
                White Label & Custom
              </p>
              <h2 className="mb-6 font-(family-name:--font-heading) text-4xl leading-tight tracking-tight md:text-5xl">
                Your Brand. Your Blend. Your Tea.
              </h2>
              <p className="text-muted-foreground mb-6 text-base leading-relaxed md:text-lg">
                Create a unique tea experience tailored to your brand. From custom blending to white
                label packaging, we handle every detail.
              </p>

              <Stack gap="md">
                <div>
                  <h3 className="mb-2 font-semibold">What We Offer:</h3>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1 font-bold">✓</span>
                      <span>Custom tea blending to your exact specifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1 font-bold">✓</span>
                      <span>White label packaging with your branding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1 font-bold">✓</span>
                      <span>Flexible minimum order quantities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1 font-bold">✓</span>
                      <span>Recipe development and tasting support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1 font-bold">✓</span>
                      <span>Dedicated account manager for your program</span>
                    </li>
                  </ul>
                </div>
              </Stack>

              <div className="mt-8">
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link href="/business/private-label" className="inline-flex items-center gap-2">
                    Create Your Custom Blend
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right: Visual/Stats */}
            <div className="reveal-up relative">
              <div className="bg-primary/5 rounded-3xl p-8 md:p-12">
                <Stack gap="lg">
                  <div className="border-border/50 border-b pb-6">
                    <p className="text-primary mb-2 text-xs tracking-[0.2em] uppercase">
                      Minimum Order
                    </p>
                    <p className="font-(family-name:--font-heading) text-3xl font-bold">
                      As Low As 5kg
                    </p>
                    <p className="text-muted-foreground text-sm">No massive commitments required</p>
                  </div>

                  <div className="border-border/50 border-b pb-6">
                    <p className="text-primary mb-2 text-xs tracking-[0.2em] uppercase">
                      Turnaround Time
                    </p>
                    <p className="font-(family-name:--font-heading) text-3xl font-bold">
                      2-4 Weeks
                    </p>
                    <p className="text-muted-foreground text-sm">From order to delivery</p>
                  </div>

                  <div>
                    <p className="text-primary mb-2 text-xs tracking-[0.2em] uppercase">Support</p>
                    <p className="font-(family-name:--font-heading) text-3xl font-bold">
                      100% Dedicated
                    </p>
                    <p className="text-muted-foreground text-sm">Personalized account management</p>
                  </div>
                </Stack>
              </div>
            </div>
          </div>
        </Stack>
      </Container>
    </section>
  );
}
