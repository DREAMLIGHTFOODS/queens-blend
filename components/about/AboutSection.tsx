/**
 * ============================================================================
 * Queen's Blend
 * File: components/about/AboutSection.tsx
 * Purpose: Main content section for About page
 * ============================================================================
 */

import { Container } from "@/components/core/layout/Container";
import { Section } from "@/components/core/layout/Section";
import { Stack } from "@/components/core/layout/Stack";
import { Grid } from "@/components/core/layout/Grid";
import { Surface } from "@/components/core/layout/Surface";
import { Award, Globe2, Handshake, Leaf, type LucideIcon } from "lucide-react";

export function AboutSection() {
  const values = [
    {
      icon: Leaf,
      label: "01",
      title: "Sustainability",
      description: "Sourced from eco-friendly estates that prioritize environmental stewardship.",
    },
    {
      icon: Award,
      label: "02",
      title: "Quality",
      description: "Rigorous selection process ensures only the finest teas make it to your cup.",
    },
    {
      icon: Handshake,
      label: "03",
      title: "Fair Trade",
      description: "We support farmers with fair prices and ethical trading practices.",
    },
    {
      icon: Globe2,
      label: "04",
      title: "Authenticity",
      description: "Direct relationships with estates preserve the true essence of each blend.",
    },
  ] satisfies Array<{ icon: LucideIcon; label: string; title: string; description: string }>;

  return (
    <Section>
      <Container size="xl">
        <Stack gap="xl">
          {/* Our Mission */}
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <Surface elevation="md" className="reveal-up rounded-2xl p-8 md:p-10">
              <Stack gap="md">
                <p className="text-primary text-xs tracking-[0.2em] uppercase">Our Mission</p>
                <h2 className="font-(family-name:--font-heading) text-3xl leading-tight tracking-tight md:text-4xl">
                  Build trust through every leaf, every blend, and every conversation.
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  We connect tea enthusiasts with authentic estate teas that carry the stories of
                  their origin. Our partnerships are built on quality, transparency, and long-term
                  respect for growers and craft.
                </p>
              </Stack>
            </Surface>

            <Surface elevation="sm" className="reveal-up stagger-1 bg-muted/45 rounded-2xl p-8">
              <Stack gap="md">
                <p className="text-primary text-xs tracking-[0.2em] uppercase">At A Glance</p>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="text-2xl font-semibold tracking-tight">30+</p>
                    <p className="text-muted-foreground text-sm">Estate partners</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold tracking-tight">12</p>
                    <p className="text-muted-foreground text-sm">Sourcing regions</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold tracking-tight">100%</p>
                    <p className="text-muted-foreground text-sm">Traceable lots</p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold tracking-tight">Daily</p>
                    <p className="text-muted-foreground text-sm">Fresh dispatch</p>
                  </div>
                </div>
              </Stack>
            </Surface>
          </div>

          {/* Core Values */}
          <Stack gap="lg">
            <div className="reveal-up flex flex-wrap items-end justify-between gap-4">
              <h3 className="font-(family-name:--font-heading) text-3xl tracking-tight md:text-4xl">
                Our Core Values
              </h3>
              <p className="text-muted-foreground max-w-md text-sm leading-relaxed md:text-base">
                Principles that guide sourcing, blending, packaging, and how we support tea-growing
                communities.
              </p>
            </div>

            <Grid columns={2} gap="lg" minItemWidth="280px">
              {values.map((value, index) => (
                <Surface
                  key={value.title}
                  elevation="sm"
                  className={`reveal-up rounded-2xl p-6 stagger-${Math.min(index + 1, 6)}`}
                >
                  <Stack gap="md">
                    <div className="flex items-center justify-between">
                      <span className="text-primary text-xs tracking-[0.2em] uppercase">
                        {value.label}
                      </span>
                      <div className="bg-primary/10 text-primary rounded-full p-2">
                        <value.icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold tracking-tight">{value.title}</h4>
                      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </Stack>
                </Surface>
              ))}
            </Grid>
          </Stack>

          {/* Heritage */}
          <Surface
            elevation="sm"
            className="reveal-up stagger-2 from-muted/80 to-background rounded-2xl bg-linear-to-br p-8 md:p-10"
          >
            <Stack gap="md">
              <p className="text-primary text-xs tracking-[0.2em] uppercase">
                Heritage And Expertise
              </p>
              <h3 className="font-(family-name:--font-heading) text-3xl tracking-tight md:text-4xl">
                Rooted in tea culture, refined for modern rituals.
              </h3>
              <p className="text-muted-foreground max-w-4xl text-base leading-relaxed">
                With decades of field experience, our team has built lasting relationships across
                renowned tea regions. Every blend reflects careful tasting, respectful sourcing, and
                a commitment to preserving the origin character of the leaf.
              </p>
            </Stack>
          </Surface>
        </Stack>
      </Container>
    </Section>
  );
}
