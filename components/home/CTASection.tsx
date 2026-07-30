/**
 * ============================================================================
 * Queen's Blend
 * File: components/home/CTASection.tsx
 * Purpose: Newsletter signup and engagement call-to-action
 * ============================================================================
 */

"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/core/layout/Container";
import { Stack } from "@/components/core/layout/Stack";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="relative w-full py-24 md:py-32">
      <div
        className="bg-primary/15 absolute inset-0 [mask-image:radial-gradient(circle_at_center,black_42%,transparent_78%)]"
        aria-hidden="true"
      />
      <Container size="lg">
        <div className="from-primary to-accent reveal-up relative overflow-hidden rounded-3xl bg-gradient-to-br p-8 md:p-16">
          {/* Decorative elements */}
          <div
            className="absolute -top-28 -right-16 h-56 w-56 rounded-full bg-white/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-white/12 blur-3xl"
            aria-hidden="true"
          />

          {/* Content */}
          <Stack gap="lg" align="center" className="relative z-10 text-center text-white">
            <p className="reveal-up text-xs tracking-[0.2em] text-white/80 uppercase">
              Private Tasting Circle
            </p>

            <h2 className="reveal-up stagger-1 font-[family-name:var(--font-heading)] text-4xl leading-tight tracking-tight md:text-5xl">
              Join the Tea Connoisseur Community
            </h2>

            <p className="reveal-up stagger-2 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
              Receive monthly tasting notes, early access to limited harvests, and detailed brewing
              guides from our tea masters.
            </p>

            {/* Newsletter Form */}
            <form
              className="reveal-up stagger-3 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="flex-1 rounded-full border border-white/35 bg-white/15 px-5 py-3 text-white backdrop-blur placeholder:text-white/60 focus:ring-2 focus:ring-white/60 focus:outline-none"
                required
              />
              <Button
                size="lg"
                variant="outline"
                className="text-primary rounded-full bg-white px-6 hover:bg-white/90"
              >
                <span className="inline-flex items-center gap-2">
                  Subscribe
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Button>
            </form>

            {isSubmitted ? (
              <p className="rounded-full bg-white/15 px-4 py-2 text-sm text-white/95">
                Thank you. You are now on the Queen&apos;s Blend journal list.
              </p>
            ) : (
              <p className="text-sm text-white/75">We respect your privacy. Unsubscribe anytime.</p>
            )}
          </Stack>
        </div>
      </Container>
    </section>
  );
}
