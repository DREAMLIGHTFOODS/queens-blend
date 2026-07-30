/**
 * ============================================================================
 * Queen's Blend
 * File: components/contact/ContactSection.tsx
 * Purpose: Main content section for Contact page
 * ============================================================================
 */

import { Container } from "@/components/core/layout/Container";
import { Section } from "@/components/core/layout/Section";
import { Stack } from "@/components/core/layout/Stack";
import { Grid } from "@/components/core/layout/Grid";
import { ContactForm } from "@/components/forms/ContactForm";

export function ContactSection() {
  const contactMethods = [
    {
      icon: "📧",
      title: "Email",
      details: "info@queensblend.com",
      description: "For general inquiries and support",
    },
    {
      icon: "📱",
      title: "Phone",
      details: "+91 (XXX) XXX-XXXX",
      description: "Available Monday to Friday, 9 AM - 6 PM IST",
    },
    {
      icon: "📍",
      title: "Location",
      details: "India",
      description: "Headquarters and tea sourcing operations",
    },
  ];

  return (
    <Section>
      <Container size="lg">
        <Stack gap="xl">
          {/* Contact Methods */}
          <Stack gap="lg">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Contact Us</h2>
              <div className="bg-primary mt-2 h-1 w-20 rounded-full" />
            </div>

            <Grid columns={3} gap="lg" minItemWidth="280px">
              {contactMethods.map((method, index) => (
                <div key={index} className="bg-muted rounded-lg p-6">
                  <Stack gap="md">
                    <span className="text-4xl">{method.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold">{method.title}</h3>
                      <p className="text-primary font-semibold">{method.details}</p>
                      <p className="text-muted-foreground text-sm">{method.description}</p>
                    </div>
                  </Stack>
                </div>
              ))}
            </Grid>
          </Stack>

          {/* Contact Form */}
          <Stack gap="md">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Send us a Message</h3>
            </div>
            <div className="bg-muted rounded-lg p-8">
              <ContactForm />
            </div>
          </Stack>

          {/* Response Time */}
          <div className="bg-primary/10 rounded-lg p-8">
            <Stack gap="md">
              <h3 className="text-lg font-bold">We&apos;re Here to Help</h3>
              <p className="text-muted-foreground">
                Our customer service team typically responds within 24 business hours. We&apos;re
                committed to providing prompt, helpful support for all your tea-related questions.
              </p>
            </Stack>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
