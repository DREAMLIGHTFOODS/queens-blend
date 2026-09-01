/**
 * ============================================================================
 * Queen's Blend
 * File: components/tea-guide/TeaGuideSection.tsx
 * Purpose: Main content section for Tea Guide page
 * ============================================================================
 */

import {
  BookOpenText,
  CheckCircle2,
  Flame,
  HeartPulse,
  Scale,
  Timer,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/core/layout/Container";
import { Section } from "@/components/core/layout/Section";
import { Stack } from "@/components/core/layout/Stack";
import { Surface } from "@/components/core/layout/Surface";

export function TeaGuideSection() {
  const guides = [
    {
      icon: Flame,
      title: "Brewing Tips",
      description:
        "Learn the optimal water temperature, steeping time, and quantity for each tea type to extract maximum flavor and aroma.",
    },
    {
      icon: BookOpenText,
      title: "Flavor Profiles",
      description:
        "Discover the unique tasting notes and characteristics that define different teas and regions.",
    },
    {
      icon: Scale,
      title: "Tea Terminology",
      description:
        "Understand the vocabulary used by tea experts to describe colors, aromas, and flavors.",
    },
    {
      icon: Timer,
      title: "Storage & Freshness",
      description:
        "Proper storage techniques to keep your teas fresh, aromatic, and flavorful for months.",
    },
    {
      icon: CheckCircle2,
      title: "Tea & Food Pairing",
      description: "Explore how different teas complement and enhance various cuisines and dishes.",
    },
    {
      icon: HeartPulse,
      title: "Health Benefits",
      description:
        "Learn about the remarkable health benefits and nutritional properties of premium teas.",
    },
  ] satisfies Array<{ icon: LucideIcon; title: string; description: string }>;

  const faqs = [
    {
      question: "How long should I steep black tea?",
      answer:
        "For most black teas, start at 3 to 5 minutes and adjust based on leaf size and desired strength.",
    },
    {
      question: "Why can green tea become bitter?",
      answer:
        "Green tea turns bitter when brewed too hot or too long. Use cooler water and shorter steeping time.",
    },
    {
      question: "Can I re-steep loose leaf tea?",
      answer:
        "Yes. Many premium loose leaf teas can be brewed multiple times, with evolving flavor notes each infusion.",
    },
    {
      question: "How do hospitality teams keep tea service consistent?",
      answer:
        "Use brew cards with fixed dose, temperature, steep time, and service SOPs for repeatable quality across staff shifts.",
    },
  ];

  return (
    <Section>
      <Container size="xl">
        <Stack gap="xl">
          {/* Introduction */}
          <div className="reveal-up grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-primary mb-3 text-xs tracking-[0.2em] uppercase">Guide Library</p>
              <h2 className="font-(family-name:--font-heading) text-4xl tracking-tight md:text-5xl">
                Your Complete Tea Guide
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed md:text-base">
              Build better cups with clear, practical foundations that improve flavor consistency
              from first steep to final sip.
            </p>
          </div>

          {/* Guide Topics */}
          <div className="grid gap-6 md:grid-cols-2">
            {guides.map((guide, index) => (
              <Surface
                key={guide.title}
                elevation="sm"
                className={`reveal-up rounded-2xl border p-6 stagger-${Math.min(index + 1, 6)}`}
              >
                <Stack gap="md">
                  <div className="flex items-center justify-between">
                    <span className="text-primary text-xs tracking-[0.2em] uppercase">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="bg-primary/10 text-primary rounded-full p-2">
                      <guide.icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{guide.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {guide.description}
                  </p>
                </Stack>
              </Surface>
            ))}
          </div>

          {/* Additional Info */}
          <Surface
            elevation="md"
            className="reveal-up stagger-2 from-primary/10 to-secondary/20 rounded-2xl bg-linear-to-r p-8 md:p-10"
          >
            <Stack gap="md">
              <h3 className="font-(family-name:--font-heading) text-2xl tracking-tight md:text-3xl">
                Expert Tips
              </h3>
              <ul className="text-muted-foreground space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    className="text-primary mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>Always use filtered water for cleaner flavor extraction.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    className="text-primary mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>Store tea in airtight containers away from light and strong odors.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    className="text-primary mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    Many premium teas can be steeped multiple times with evolving profiles.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    className="text-primary mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    Use cooler water for green teas than for black teas to avoid bitterness.
                  </span>
                </li>
              </ul>
            </Stack>
          </Surface>

          <Surface elevation="sm" className="reveal-up rounded-2xl border p-6 md:p-8">
            <Stack gap="md">
              <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Put this guide into practice
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                Apply these principles while exploring our tea lineup. Compare flavor families in
                the{" "}
                <Link href="/products" className="text-primary hover:underline">
                  {" "}
                  products catalog
                </Link>
                , then review a focused set inside each
                <Link href="/products/category/heritage" className="text-primary hover:underline">
                  {" "}
                  tea collection
                </Link>
                .
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                If you are building tea service for hospitality or retail, continue to
                <Link href="/business/horeca" className="text-primary hover:underline">
                  {" "}
                  HORECA solutions
                </Link>
                or request a tailored quote through
                <Link href="/business/contact" className="text-primary hover:underline">
                  {" "}
                  business contact
                </Link>
                .
              </p>
            </Stack>
          </Surface>

          <Surface
            id="tea-guide-faq"
            elevation="sm"
            className="reveal-up scroll-mt-28 rounded-2xl border p-6 md:p-8"
          >
            <Stack gap="md">
              <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={faq.question} className="border-border/70 rounded-xl border p-4">
                    <p className="text-sm font-semibold tracking-tight">
                      {index + 1}. {faq.question}
                    </p>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-right text-sm">
                <Link href="#tea-guide-top" className="text-primary hover:underline">
                  Back to top
                </Link>
              </p>
            </Stack>
          </Surface>
        </Stack>
      </Container>
    </Section>
  );
}
