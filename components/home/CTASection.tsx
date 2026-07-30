/**
 * ============================================================================
 * Queen's Blend
 * File: components/home/CTASection.tsx
 * Purpose: Newsletter signup and engagement call-to-action
 * ============================================================================
 */

"use client";

import { Container } from "@/components/core/layout/Container";
import { Stack } from "@/components/core/layout/Stack";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Handle newsletter subscription
    console.log("Newsletter subscription submitted");
  };

  return (
    <section className="from-primary/10 via-accent/10 to-primary/10 w-full bg-gradient-to-r py-24 md:py-32">
      <Container size="lg">
        <div className="from-primary to-accent relative overflow-hidden rounded-2xl bg-gradient-to-br p-8 md:p-16">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

          {/* Content */}
          <Stack gap="lg" align="center" className="relative z-10 text-center text-white">
            <h2 className="text-3xl font-bold md:text-4xl">Join the Tea Connoisseur Community</h2>

            <p className="max-w-2xl text-lg text-white/90">
              Subscribe to our newsletter for exclusive tea releases, brewing tips, and special
              discounts reserved for our community members.
            </p>

            {/* Newsletter Form */}
            <form
              className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-white/30 bg-white/20 px-4 py-3 text-white backdrop-blur placeholder:text-white/50 focus:ring-2 focus:ring-white/50 focus:outline-none"
                required
              />
              <Button
                size="lg"
                variant="outline"
                className="text-primary bg-white hover:bg-white/90"
              >
                Subscribe
              </Button>
            </form>

            <p className="text-sm text-white/70">We respect your privacy. Unsubscribe anytime.</p>
          </Stack>
        </div>
      </Container>
    </section>
  );
}
