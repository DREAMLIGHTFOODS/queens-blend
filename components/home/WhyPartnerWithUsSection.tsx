/**
 * ============================================================================
 * Queen's Blend
 * File: components/home/WhyPartnerWithUsSection.tsx
 * Purpose: Highlight key reasons to partner with Queen's Blend for B2B
 * ============================================================================
 */

import { Grid } from "@/components/core/layout/Grid";
import { Surface } from "@/components/core/layout/Surface";
import { Container } from "@/components/core/layout/Container";
import { Stack } from "@/components/core/layout/Stack";
import {
  Zap,
  Award,
  Globe,
  HandshakeIcon,
  TrendingUp,
  ShieldCheckIcon,
  type LucideIcon,
} from "lucide-react";

const reasons = [
  {
    icon: TrendingUp,
    title: "Scale & Capacity",
    description: "Supply bulk orders of any size with consistent quality and reliable delivery.",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description: "Premium estate teas with rigorous testing standards across every batch.",
  },
  {
    icon: Zap,
    title: "Format Flexibility",
    description: "11 format options per variety. Mix, match, and customize your order.",
  },
  {
    icon: Globe,
    title: "Export Ready",
    description: "International compliance, shipping expertise, and documentation support.",
  },
  {
    icon: HandshakeIcon,
    title: "Dedicated Support",
    description: "Personal account manager for your business and custom solutions.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Reliable Partnership",
    description: "Consistent availability, competitive pricing, and long-term commitment.",
  },
] satisfies Array<{ icon: LucideIcon; title: string; description: string }>;

export function WhyPartnerWithUsSection() {
  return (
    <section className="bg-primary relative w-full overflow-hidden py-20 md:py-28">
      <div
        className="bg-ring/15 pointer-events-none absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <Container size="xl">
        <Stack gap="xl">
          {/* Section Header */}
          <div className="reveal-up flex flex-col gap-4 text-center">
            <div>
              <p className="text-ring mb-3 text-xs tracking-[0.2em] uppercase">
                Partnership Benefits
              </p>
              <h2 className="mb-4 font-(family-name:--font-heading) text-4xl leading-tight tracking-tight text-white md:text-5xl">
                Why Partner With Queen&apos;s Blend?
              </h2>
              <p className="text-ring/80 mx-auto max-w-2xl text-base leading-relaxed md:text-lg">
                We&apos;re more than a supplier. We&apos;re your dedicated partner for growth and
                success.
              </p>
            </div>
          </div>

          {/* Reasons Grid */}
          <Grid columns={3} gap="lg" minItemWidth="300px">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <Surface
                  key={reason.title}
                  elevation="sm"
                  className={`reveal-up border-ring/20 group rounded-2xl border bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 stagger-${Math.min(index + 1, 6)}`}
                >
                  <Stack gap="md">
                    <div className="bg-ring/20 text-ring flex h-12 w-12 items-center justify-center rounded-lg">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-white">{reason.title}</h3>
                      <p className="text-ring/80 text-sm leading-relaxed">{reason.description}</p>
                    </div>
                  </Stack>
                </Surface>
              );
            })}
          </Grid>
        </Stack>
      </Container>
    </section>
  );
}
