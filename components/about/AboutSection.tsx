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

export function AboutSection() {
  const values = [
    {
      icon: "🌱",
      title: "Sustainability",
      description: "Sourced from eco-friendly estates that prioritize environmental stewardship.",
    },
    {
      icon: "🎯",
      title: "Quality",
      description: "Rigorous selection process ensures only the finest teas make it to your cup.",
    },
    {
      icon: "🤝",
      title: "Fair Trade",
      description: "We support farmers with fair prices and ethical trading practices.",
    },
    {
      icon: "✨",
      title: "Authenticity",
      description: "Direct relationships with estates preserve the true essence of each blend.",
    },
  ];

  return (
    <Section>
      <Container size="lg">
        <Stack gap="xl">
          {/* Our Mission */}
          <Stack gap="md">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Our Mission</h2>
              <div className="bg-primary mt-2 h-1 w-20 rounded-full" />
            </div>
            <p className="text-muted-foreground max-w-3xl text-lg">
              At Queen&apos;s Blend, we believe exceptional tea transcends geography and time. Our
              mission is to connect tea enthusiasts worldwide with authentic, premium estate teas
              that tell stories of heritage, craftsmanship, and passion. We&apos;re committed to
              sustainable practices and fair trade partnerships that benefit both farmers and
              consumers.
            </p>
          </Stack>

          {/* Core Values */}
          <Stack gap="lg">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Our Core Values</h3>
            </div>
            <Grid columns={2} gap="lg" minItemWidth="280px">
              {values.map((value, index) => (
                <div key={index} className="bg-muted rounded-lg p-6">
                  <Stack gap="md">
                    <span className="text-4xl">{value.icon}</span>
                    <div>
                      <h4 className="font-bold">{value.title}</h4>
                      <p className="text-muted-foreground text-sm">{value.description}</p>
                    </div>
                  </Stack>
                </div>
              ))}
            </Grid>
          </Stack>

          {/* Heritage */}
          <Stack gap="md">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Heritage & Expertise</h3>
              <div className="bg-primary mt-2 h-1 w-20 rounded-full" />
            </div>
            <p className="text-muted-foreground max-w-3xl text-lg">
              With decades of experience in the tea industry, our founders bring unparalleled
              expertise and passion to every blend. We&apos;ve traveled to the world&apos;s most
              renowned tea estates, building lasting relationships and understanding the intricate
              art of tea cultivation and production.
            </p>
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
