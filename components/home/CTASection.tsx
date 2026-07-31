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
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus({ type: "loading" });

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, website }),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus({
          type: "error",
          message: data.message ?? "Unable to subscribe right now.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: data.message ?? "You are subscribed.",
      });
      setEmail("");
      setWebsite("");
    } catch {
      setStatus({
        type: "error",
        message: "Unable to subscribe right now. Please try again later.",
      });
    }
  };

  return (
    <section className="relative w-full py-24 md:py-32">
      <div
        className="bg-primary/15 absolute inset-0 mask-[radial-gradient(circle_at_center,black_42%,transparent_78%)]"
        aria-hidden="true"
      />
      <Container size="lg">
        <div className="from-primary to-accent reveal-up relative overflow-hidden rounded-3xl bg-linear-to-br p-8 md:p-16">
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

            <h2 className="reveal-up stagger-1 font-(family-name:--font-heading) text-4xl leading-tight tracking-tight md:text-5xl">
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
              noValidate
            >
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 rounded-full border border-white/35 bg-white/15 px-5 py-3 text-white backdrop-blur placeholder:text-white/60 focus:ring-2 focus:ring-white/60 focus:outline-none"
                disabled={status.type === "loading"}
                required
                suppressHydrationWarning
              />
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
                suppressHydrationWarning
              />
              <Button
                type="submit"
                size="lg"
                variant="outline"
                className="text-primary rounded-full bg-white px-6 hover:bg-white/90"
                disabled={status.type === "loading"}
                suppressHydrationWarning
              >
                <span className="inline-flex items-center gap-2">
                  {status.type === "loading" ? "Subscribing..." : "Subscribe"}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Button>
            </form>

            {status.type === "success" ? (
              <p className="rounded-full bg-white/15 px-4 py-2 text-sm text-white/95">
                {status.message}
              </p>
            ) : status.type === "error" ? (
              <p className="rounded-full bg-red-900/30 px-4 py-2 text-sm text-white">
                {status.message}
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
