/**
 * ============================================================================
 * Queen's Blend
 * File: components/contact/ContactSection.tsx
 * Purpose: Main content section for Contact page
 * ============================================================================
 */

import { Clock3, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";

import { Container } from "@/components/core/layout/Container";
import { Section } from "@/components/core/layout/Section";
import { Stack } from "@/components/core/layout/Stack";
import { Grid } from "@/components/core/layout/Grid";
import { ContactForm } from "@/components/forms/ContactForm";
import { Surface } from "@/components/core/layout/Surface";

export function ContactSection() {
  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      title: "Email",
      details: "info@queensblend.com",
      description: "For general inquiries and support",
    },
    {
      icon: Phone,
      label: "Phone",
      title: "Phone",
      details: "+91 (XXX) XXX-XXXX",
      description: "Available Monday to Friday, 9 AM - 6 PM IST",
    },
    {
      icon: MapPin,
      label: "Location",
      title: "Location",
      details: "India",
      description: "Headquarters and tea sourcing operations",
    },
  ] satisfies Array<{
    icon: LucideIcon;
    label: string;
    title: string;
    details: string;
    description: string;
  }>;

  return (
    <Section>
      <Container size="xl">
        <Stack gap="xl">
          {/* Contact Methods */}
          <Stack gap="lg">
            <div className="reveal-up grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-primary mb-3 text-xs tracking-[0.2em] uppercase">
                  Contact Channels
                </p>
                <h2 className="font-[family-name:var(--font-heading)] text-4xl tracking-tight md:text-5xl">
                  Reach us your way
                </h2>
              </div>
              <p className="text-muted-foreground max-w-md text-sm leading-relaxed md:text-base">
                For personal assistance, gifting inquiries, or trade conversations, choose the
                channel that fits you best.
              </p>
            </div>

            <Grid columns={3} gap="lg" minItemWidth="280px">
              {contactMethods.map((method, index) => (
                <Surface
                  key={method.title}
                  elevation="sm"
                  className={`reveal-up rounded-2xl p-6 stagger-${Math.min(index + 1, 6)}`}
                >
                  <Stack gap="md">
                    <div className="flex items-center justify-between">
                      <span className="text-primary text-xs tracking-[0.2em] uppercase">
                        {method.label}
                      </span>
                      <div className="bg-primary/10 text-primary rounded-full p-2">
                        <method.icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">{method.title}</h3>
                      <p className="text-primary mt-1 font-medium">{method.details}</p>
                      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        {method.description}
                      </p>
                    </div>
                  </Stack>
                </Surface>
              ))}
            </Grid>
          </Stack>

          {/* Contact Form */}
          <Stack gap="md">
            <div>
              <h3 className="font-[family-name:var(--font-heading)] text-3xl tracking-tight md:text-4xl">
                Send us a message
              </h3>
            </div>
            <Surface
              elevation="md"
              className="reveal-up stagger-2 bg-muted/45 rounded-2xl p-8 md:p-10"
            >
              <ContactForm />
            </Surface>
          </Stack>

          {/* Response Time */}
          <Surface
            elevation="sm"
            className="reveal-up stagger-3 from-primary/10 to-secondary/20 rounded-2xl bg-gradient-to-r p-8 md:p-10"
          >
            <Stack gap="md">
              <div className="inline-flex items-center gap-2 text-sm">
                <Clock3 className="text-primary h-4 w-4" aria-hidden="true" />
                <span className="text-primary tracking-[0.16em] uppercase">Support Promise</span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight">We&apos;re here to help</h3>
              <p className="text-muted-foreground">
                Our customer service team typically responds within 24 business hours. We&apos;re
                committed to providing prompt, helpful support for all your tea-related questions.
              </p>
            </Stack>
          </Surface>
        </Stack>
      </Container>
    </Section>
  );
}
