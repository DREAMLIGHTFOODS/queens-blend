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

  return {
    title: product.name,
    description,
    keywords: [
      product.name,
      product.categoryLabel,
      `${product.teaType} tea`,
      "Premium tea",
      "Tea collection",
      "Queen's Blend",
    ],
    openGraph: {
      title: `${product.name} | Queen's Blend`,
      description,
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

  return <ProductDetailPage product={product} relatedProducts={relatedProducts} />;
}
