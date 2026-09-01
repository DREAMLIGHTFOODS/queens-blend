import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/core/layout/Container";
import { Section } from "@/components/core/layout/Section";
import { Stack } from "@/components/core/layout/Stack";
import { Surface } from "@/components/core/layout/Surface";
import { CategoryProductsSection } from "@/components/products/category/CategoryProductsSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { CategoryHero } from "@/components/products/category/CategoryHero";
import { SITE } from "@/config/site";
import { filterTeaProducts, isTeaCollectionId, TEA_COLLECTIONS } from "@/data/products";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> => {
  const resolvedParams = await params;

  if (!isTeaCollectionId(resolvedParams.collection)) {
    return {
      title: "Tea Collection Not Found",
      description: "The requested tea collection could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const collection = TEA_COLLECTIONS.find((item) => item.id === resolvedParams.collection);

  if (!collection) {
    return {
      title: "Tea Collection Not Found",
      description: "The requested tea collection could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${collection.name} Tea Collection`;
  const description = `${collection.description} Explore premium ${collection.name.toLowerCase()} teas for both personal brewing and business bulk sourcing, with private label and export support.`;

  return {
    title,
    description,
    keywords: [
      `${collection.name} tea`,
      `${collection.name.toLowerCase()} tea collection`,
      "premium tea",
      "Queen's Blend",
      "tea blends",
      "buy tea online",
      `${collection.name.toLowerCase()} tea wholesale`,
      `${collection.name.toLowerCase()} tea bulk supply`,
      "tea supplier for cafes and hotels",
      "private label tea India",
    ],
    alternates: {
      canonical: `https://thequeensblend.com/products/category/${resolvedParams.collection}`,
    },
    openGraph: {
      title,
      description,
      url: `https://thequeensblend.com/products/category/${resolvedParams.collection}`,
      siteName: "Queen's Blend",
      type: "website",
      images: [
        {
          url: "https://thequeensblend.com/images/og/og-image.png",
          width: 1200,
          height: 630,
          alt: `${collection.name} Tea Collection`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${collection.name} Tea Collection`,
      description,
      creator: "@queensblend",
      images: ["https://thequeensblend.com/images/og/og-image.png"],
    },
  };
};

type CategoryProductsPageProps = {
  params: Promise<{
    collection: string;
  }>;
  searchParams?: Promise<{
    q?: string;
    format?: string;
  }>;
};

export default async function CategoryProductsPage({
  params,
  searchParams,
}: CategoryProductsPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  if (!isTeaCollectionId(resolvedParams.collection)) {
    notFound();
  }

  const collection = TEA_COLLECTIONS.find((item) => item.id === resolvedParams.collection);
  if (!collection) {
    notFound();
  }

  const collectionProducts = filterTeaProducts({ query: "", collectionId: collection.id });
  const categoryFaqsByCollection: Record<
    string,
    Array<{
      question: string;
      answer: string;
    }>
  > = {
    heritage: [
      {
        question: "What defines a heritage tea profile?",
        answer:
          "Heritage teas typically emphasize classic origin-forward character, balanced structure, and familiar everyday drinkability.",
      },
      {
        question: "Which formats are best for heritage teas in cafes?",
        answer:
          "Loose leaf for table service and premium menus, plus tea bags for speed-focused service lines and room programs.",
      },
      {
        question: "Can heritage teas work for private label?",
        answer:
          "Yes. Heritage profiles are often strong candidates for private label due to broad market familiarity and repeat demand.",
      },
    ],
    serenity: [
      {
        question: "Who is the Serenity collection best for?",
        answer:
          "Serenity suits drinkers and wellness-focused menus looking for softer, calmer cups and gentle aromatic profiles.",
      },
      {
        question: "How should I brew Serenity teas for smoothness?",
        answer:
          "Use slightly lower water temperature with controlled steeping to preserve delicate notes and avoid over-extraction.",
      },
      {
        question: "Do Serenity teas fit hospitality menus?",
        answer:
          "Yes. They perform well in spa, boutique hotel, and premium cafe menus where lighter flavor experiences are preferred.",
      },
    ],
    infusions: [
      {
        question: "Are infusions caffeine-free?",
        answer:
          "Many botanical infusions are naturally caffeine-free, but always check each product profile for ingredient-specific details.",
      },
      {
        question: "What food pairings work with infusion blends?",
        answer:
          "Fruit-led and floral infusions pair well with light desserts, breakfast pastries, and low-spice savory dishes.",
      },
      {
        question: "Can infusions be used for iced tea menus?",
        answer:
          "Yes. Infusions are highly suitable for cold-serve menus and can be adapted into signature iced tea offerings.",
      },
    ],
  };

  const defaultCategoryFaqs = [
    {
      question: "How do I choose the right tea from this collection?",
      answer:
        "Start with desired intensity, aroma, and brew style, then compare tasting notes and available formats on each product page.",
    },
    {
      question: "Can I order this collection in bulk for business?",
      answer:
        "Yes. Most collections support bulk sourcing for hospitality, retail, distribution, and private label programs.",
    },
    {
      question: "Where can I request wholesale or private label support?",
      answer:
        "Use the business contact page to share your volume, format preference, and destination so the team can propose a supply plan.",
    },
  ];

  const faqItems = categoryFaqsByCollection[collection.id] ?? defaultCategoryFaqs;

  const collectionUrl = `${SITE.url}/products/category/${collection.id}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${SITE.url}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${collection.name} Tea Collection`,
        item: collectionUrl,
      },
    ],
  };

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${collection.name} Tea Collection | Queen's Blend`,
    description: `${collection.description} Discover curated teas for retail and business sourcing.`,
    url: collectionUrl,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      numberOfItems: collectionProducts.length,
      itemListElement: collectionProducts.slice(0, 12).map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE.url}/products/${product.slug}`,
        name: product.name,
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionPageSchema} />
      <JsonLd data={faqSchema} />
      <div id="category-top" className="scroll-mt-28">
        <CategoryHero collectionId={collection.id} />
      </div>
      <CategoryProductsSection
        initialQuery={typeof resolvedSearchParams?.q === "string" ? resolvedSearchParams.q : ""}
        initialFormat={
          typeof resolvedSearchParams?.format === "string" ? resolvedSearchParams.format : "all"
        }
        initialCollection={collection.id}
      />
      <Section className="pt-0">
        <Container size="xl">
          <Surface elevation="sm" className="rounded-2xl border p-6 md:p-8">
            <Stack gap="md">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                How to choose from the {collection.name} collection
              </h2>
              <p className="text-sm">
                <Link href="#category-faq" className="text-primary hover:underline">
                  Jump to FAQ
                </Link>
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                Start with flavor notes and brew style, then narrow by format and pack size. For
                at-home tea drinkers, compare tasting notes and brew time on each product page. For
                business buyers, shortlist SKUs by service model and discuss recurring supply
                through our business team.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                Explore our full{" "}
                <Link href="/products" className="text-primary hover:underline">
                  products catalog
                </Link>
                , improve cup consistency with the{" "}
                <Link href="/tea-guide" className="text-primary hover:underline">
                  tea guide
                </Link>
                , and request support for hotels, cafes, retail, or private label via
                <Link href="/business/contact" className="text-primary hover:underline">
                  {" "}
                  business contact
                </Link>
                .
              </p>
            </Stack>
          </Surface>
        </Container>
      </Section>
      <Section className="pt-0">
        <Container size="xl">
          <Surface
            id="category-faq"
            elevation="sm"
            className="scroll-mt-28 rounded-2xl border p-6 md:p-8"
          >
            <Stack gap="md">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Frequently Asked Questions about {collection.name}
              </h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={item.question} className="border-border/70 rounded-xl border p-4">
                    <p className="text-sm font-semibold tracking-tight">
                      {index + 1}. {item.question}
                    </p>
                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-right text-sm">
                <Link href="#category-top" className="text-primary hover:underline">
                  Back to top
                </Link>
              </p>
            </Stack>
          </Surface>
        </Container>
      </Section>
    </>
  );
}
