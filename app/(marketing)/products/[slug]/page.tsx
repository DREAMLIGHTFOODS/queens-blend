/**
 * ============================================================================
 * Queen's Blend
 * File: app/(marketing)/products/[slug]/page.tsx
 * Purpose: Dynamic product detail page by slug
 * ============================================================================
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetailPage } from "@/components/products/ProductDetailPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/config/site";
import { getRelatedTeaProducts, getTeaProductBySlug, TEA_PRODUCT_SLUGS } from "@/data/products";

type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
  searchParams?: Promise<{
    format?: string;
    pack?: string;
  }>;
};

export function generateStaticParams() {
  return TEA_PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const query = await searchParams;
  const preferredFormatId = typeof query?.format === "string" ? query.format : undefined;
  const preferredPackSize = typeof query?.pack === "string" ? query.pack : undefined;
  const product = getTeaProductBySlug(slug, preferredFormatId, preferredPackSize);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = `${product.description} Tasting notes: ${product.tastingNotes.join(", ")}. Brew time: ${product.brewTime}.`;
  const dualIntentDescription = `${description} Available for both individual purchase and business bulk supply, including private label options.`;

  return {
    title: product.name,
    description: dualIntentDescription,
    keywords: [
      product.name,
      product.categoryLabel,
      `${product.teaType} tea`,
      "Premium tea",
      "Tea collection",
      "Queen's Blend",
      `${product.name} bulk supply`,
      `${product.name} wholesale`,
      `${product.name} supplier`,
      `${product.name} for hotels`,
      "tea exporter India",
      "private label tea",
      "bulk tea supplier",
    ],
    alternates: {
      canonical: `${SITE.url}/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Queen's Blend`,
      description: dualIntentDescription,
      url: `${SITE.url}/products/${product.slug}`,
      siteName: SITE.name,
      images: [
        {
          url: product.heroImage,
          width: 1200,
          height: 630,
          alt: `${product.name} by Queen's Blend`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Queen's Blend`,
      description: dualIntentDescription,
      creator: "@queensblend",
      images: [product.heroImage],
    },
  };
}

export default async function ProductSlugPage({ params, searchParams }: ProductDetailPageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const preferredFormatId = typeof query?.format === "string" ? query.format : undefined;
  const preferredPackSize = typeof query?.pack === "string" ? query.pack : undefined;
  const product = getTeaProductBySlug(slug, preferredFormatId, preferredPackSize);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedTeaProducts(product.slug, product.categoryKey, 3);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [product.heroImage, product.productImage, product.ingredientImage].filter(Boolean),
    description: product.description,
    category: product.categoryLabel,
    brand: {
      "@type": "Brand",
      name: SITE.name,
    },
    sku: product.id,
    mpn: product.id,
    offers: {
      "@type": "Offer",
      url: `${SITE.url}/products/${product.slug}`,
      priceCurrency: SITE.currency,
      price: product.startingPriceInr ?? 0,
      availability:
        product.availability.length > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Bulk Supply",
        value: "Available",
      },
      {
        "@type": "PropertyValue",
        name: "Private Label",
        value: "Available",
      },
      {
        "@type": "PropertyValue",
        name: "Business Inquiry",
        value: `${SITE.url}/business/contact?product=${product.slug}`,
      },
    ],
  };

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
        name: product.name,
        item: `${SITE.url}/products/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={productSchema} />
      <ProductDetailPage product={product} relatedProducts={relatedProducts} />
    </>
  );
}
