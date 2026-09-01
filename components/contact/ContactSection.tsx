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
      details: "info@thequeensblend.com",
      description: "For general inquiries and support",
    },
    {
      icon: Phone,
      label: "Phone",
      title: "Phone",
      details: "+91 (33) 3151-5892",
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
                <h2 className="font-(family-name:--font-heading) text-4xl tracking-tight md:text-5xl">
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
                  elevation="md"
                  className={`bg-primary text-ring group border-border/80 reveal-up relative overflow-hidden rounded-2xl border p-6 transition-transform duration-300 hover:-translate-y-1 stagger-${Math.min(index + 1, 6)}`}
                >
                  <div className="from-secondary/35 to-primary/10 pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-linear-to-br blur-2xl" />
                  <Stack gap="md">
                    <div className="flex items-center justify-between">
                      <span className="text-ring text-xs tracking-[0.2em] uppercase">
                        {method.label}
                      </span>
                      <div className="bg-ring text-primary rounded-full p-2">
                        <method.icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold tracking-tight">{method.title}</h3>
                      <p className="text-primary-foreground mt-1 font-medium">{method.details}</p>
                      <p className="text-primary-foreground mt-2 text-sm leading-relaxed opacity-90">
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
              <h3 className="font-(family-name:--font-heading) text-3xl tracking-tight md:text-4xl">
                Send us a message
              </h3>
            </div>
            <Grid columns={2} gap="lg" className="items-stretch">
              <Surface
                elevation="md"
                className="reveal-up stagger-2 bg-muted/45 border-border/80 rounded-2xl border p-8 md:p-10"
              >
                <ContactForm />
              </Surface>
              <Surface
                elevation="md"
                className="reveal-up stagger-3 border-border/80 relative overflow-hidden rounded-2xl border p-0"
              >
                <div className="from-secondary/10 to-primary/5 pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-r opacity-80" />
                <div className="relative h-full min-h-105">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d921.4034815258897!2d88.36480776951718!3d22.518663937573024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277006bb0c4fd%3A0xa04853c297749dd4!2sTHE%20QUEEN'S%20BLEND!5e0!3m2!1sen!2sin!4v1787916431859!5m2!1sen!2sin"
                    title="Queen's Blend location on Google Maps"
                    className="h-full min-h-105 w-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </Surface>
            </Grid>
          </Stack>

          {/* Response Time */}
          <Surface
            elevation="md"
            className="bg-primary text-ring group reveal-up stagger-3 border-border/80 relative overflow-hidden rounded-2xl border p-8 md:p-10"
          >
            <div className="from-secondary/35 to-primary/10 pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-linear-to-br blur-2xl" />
            <Stack gap="md" className="relative z-10">
              <div className="inline-flex items-center gap-2 text-sm">
                <Clock3 className="text-ring h-4 w-4" aria-hidden="true" />
                <span className="text-ring tracking-[0.16em] uppercase">Support Promise</span>
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-white">
                We&apos;re here to help
              </h3>
              <p className="text-primary-foreground opacity-90">
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
