/**
 * ============================================================================
 * Queen's Blend
 * File: components/tea-guide/TeaGuideSection.tsx
 * Purpose: Main content section for Tea Guide page
 * ============================================================================
 */

import { Container } from "@/components/core/layout/Container";
import { Section } from "@/components/core/layout/Section";
import { Stack } from "@/components/core/layout/Stack";

export function TeaGuideSection() {
  const guides = [
    {
      title: "Brewing Tips",
      description:
        "Learn the optimal water temperature, steeping time, and quantity for each tea type to extract maximum flavor and aroma.",
    },
    {
      title: "Flavor Profiles",
      description:
        "Discover the unique tasting notes and characteristics that define different teas and regions.",
    },
    {
      title: "Tea Terminology",
      description:
        "Understand the vocabulary used by tea experts to describe colors, aromas, and flavors.",
    },
    {
      title: "Storage & Freshness",
      description:
        "Proper storage techniques to keep your teas fresh, aromatic, and flavorful for months.",
    },
    {
      title: "Tea & Food Pairing",
      description: "Explore how different teas complement and enhance various cuisines and dishes.",
    },
    {
      title: "Health Benefits",
      description:
        "Learn about the remarkable health benefits and nutritional properties of premium teas.",
    },
  ];

  return (
    <Section>
      <Container size="lg">
        <Stack gap="xl">
          {/* Introduction */}
          <Stack gap="md">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Your Complete Tea Guide
              </h2>
              <div className="bg-primary mt-2 h-1 w-20 rounded-full" />
            </div>
            <p className="text-muted-foreground max-w-3xl text-lg">
              Whether you&apos;re a tea novice or a seasoned connoisseur, our comprehensive guide
              will help you deepen your appreciation and enjoyment of premium teas. Learn expert
              techniques, understand flavor profiles, and discover the best practices for brewing
              and storage.
            </p>
          </Stack>

          {/* Guide Topics */}
          <div className="grid gap-6 md:grid-cols-2">
            {guides.map((guide, index) => (
              <div key={index} className="border-border rounded-lg border p-6">
                <Stack gap="md">
                  <h3 className="text-lg font-bold">{guide.title}</h3>
                  <p className="text-muted-foreground text-sm">{guide.description}</p>
                </Stack>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="bg-primary/10 rounded-lg p-8">
            <Stack gap="md">
              <h3 className="text-xl font-bold">Expert Tips</h3>
              <ul className="text-muted-foreground space-y-3 text-sm">
                <li>• Always use filtered water for the best flavor extraction</li>
                <li>• Store tea in airtight containers away from light and odors</li>
                <li>• Premium teas can often be steeped multiple times</li>
                <li>• Temperature matters: green teas need cooler water than black teas</li>
              </ul>
            </Stack>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
