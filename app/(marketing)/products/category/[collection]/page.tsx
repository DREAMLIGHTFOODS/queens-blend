import { notFound } from "next/navigation";

import { CategoryProductsSection } from "@/components/products/category/CategoryProductsSection";
import { isTeaCollectionId, TEA_COLLECTIONS } from "@/data/products";
import { CategoryHero } from "@/components/products/category/CategoryHero";

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

  return (
    <>
      <CategoryHero collectionId={collection.id} />
      <CategoryProductsSection
        initialQuery={typeof resolvedSearchParams?.q === "string" ? resolvedSearchParams.q : ""}
        initialFormat={
          typeof resolvedSearchParams?.format === "string" ? resolvedSearchParams.format : "all"
        }
        initialCollection={collection.id}
      />
    </>
  );
}
