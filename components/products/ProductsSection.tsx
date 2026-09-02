/**
 * ============================================================================
 * Queen's Blend
 * File: components/products/ProductsSection.tsx
 * Purpose: Main content section for Products page
 * ============================================================================
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  Flower2,
  Flame,
  Leaf,
  Search,
  Shield,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/core/layout/Container";
import { Section } from "@/components/core/layout/Section";
import { Stack } from "@/components/core/layout/Stack";
import { Grid } from "@/components/core/layout/Grid";
import { Surface } from "@/components/core/layout/Surface";
import { Button } from "@/components/ui/button";
import {
  CATALOG_FORMATS,
  PRODUCT_CATEGORIES,
  TEA_COLLECTIONS,
  type DiscoverableTeaProduct,
  filterTeaProducts,
  getDiscoverableProductCardImages,
  inferFormatFromQuery,
  type ProductCategoryKey,
} from "@/data/products";

const categoryIcons: Record<ProductCategoryKey, LucideIcon> = {
  green: Leaf,
  black: Flame,
  oolong: Sparkles,
  white: Flower2,
  herbal: Shield,
  limited: Sparkles,
};

type ProductCardProps = {
  product: DiscoverableTeaProduct;
  activeFormat?: string;
  isPreviewActive: boolean;
  staggerIndex: number;
  onPreviewStart: (productId: string) => void;
  onPreviewEnd: (productId: string) => void;
  onTogglePreview: (productId: string) => void;
};

const ProductCard = memo(function ProductCard({
  product,
  activeFormat,
  isPreviewActive,
  staggerIndex,
  onPreviewStart,
  onPreviewEnd,
  onTogglePreview,
}: ProductCardProps) {
  const cardImages = useMemo(
    () => getDiscoverableProductCardImages(product, activeFormat),
    [product, activeFormat],
  );
  const detailHref =
    activeFormat && product.availability.includes(activeFormat)
      ? `/products/${product.slug}?format=${encodeURIComponent(activeFormat)}`
      : `/products/${product.slug}`;

  return (
    <Surface
      elevation="sm"
      className={`group border-border/70 reveal-up hover:border-primary/35 rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 stagger-${staggerIndex}`}
    >
      <Stack gap="md">
        <div className="text-muted-foreground text-xs tracking-[0.16em] uppercase">
          {product.categoryLabel}
        </div>

        <button
          type="button"
          className="border-border/70 relative block aspect-4/3 w-full overflow-hidden rounded-xl border text-left"
          onMouseEnter={() => onPreviewStart(product.id)}
          onMouseLeave={() => onPreviewEnd(product.id)}
          onFocus={() => onPreviewStart(product.id)}
          onBlur={() => onPreviewEnd(product.id)}
          onClick={() => onTogglePreview(product.id)}
          aria-label={`Toggle ${product.name} ingredient and product image`}
        >
          <Image
            src={cardImages.ingredient}
            alt={`${product.name} ingredient preview`}
            fill
            quality={58}
            className={`object-cover transition-all duration-500 ease-out group-focus-within:opacity-0 group-hover:scale-105 ${isPreviewActive ? "opacity-0" : "opacity-100"}`}
            sizes="(max-width: 768px) 92vw, (max-width: 1280px) 44vw, 360px"
          />
          {isPreviewActive ? (
            <Image
              src={cardImages.product}
              alt={`${product.name} product preview`}
              fill
              quality={58}
              className="object-cover opacity-100 transition-all duration-500 ease-out group-focus-within:opacity-100"
              sizes="(max-width: 768px) 92vw, (max-width: 1280px) 44vw, 360px"
            />
          ) : null}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
        </button>

        <div>
          <h3 className="text-xl font-semibold tracking-tight">{product.name}</h3>
          <p className="text-muted-foreground mt-1 text-sm">{product.description}</p>
        </div>

        <div className="text-muted-foreground space-y-1 text-sm">
          <p>
            <span className="font-medium">Tasting notes:</span> {product.tastingNotes}
          </p>
          <p>
            <span className="font-medium">Brew time:</span> {product.brewTime}
          </p>
        </div>

        <div className="border-border flex items-center justify-between border-t pt-4">
          <span className="text-muted-foreground text-xs">
            {product.availability.length} formats
          </span>
          <Button asChild size="sm" variant="outline" className="rounded-full">
            <Link href={detailHref} prefetch={false} className="inline-flex items-center gap-2">
              View Details
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </Stack>
    </Surface>
  );
});

export function ProductsSection({
  initialQuery = "",
  initialFormat = "all",
  initialCollection = "all",
}: {
  initialQuery?: string;
  initialFormat?: string;
  initialCollection?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const querySyncTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [query, setQuery] = useState(initialQuery);
  const [selectedFormat, setSelectedFormat] = useState(initialFormat);
  const [selectedCollection] = useState(initialCollection);
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);
  const handlePreviewStart = useCallback((productId: string) => {
    setActivePreviewId(productId);
  }, []);
  const handlePreviewEnd = useCallback((productId: string) => {
    setActivePreviewId((current) => (current === productId ? null : current));
  }, []);
  const handlePreviewToggle = useCallback((productId: string) => {
    setActivePreviewId((current) => (current === productId ? null : productId));
  }, []);

  const inferredFormat = useMemo(() => inferFormatFromQuery(query), [query]);
  const activeFormat = selectedFormat !== "all" ? selectedFormat : inferredFormat;
  const activeCollection = selectedCollection !== "all" ? selectedCollection : undefined;

  const filteredProducts = useMemo(
    () => filterTeaProducts({ query, formatId: activeFormat, collectionId: activeCollection }),
    [query, activeFormat, activeCollection],
  );

  const activeFormatLabel = activeFormat
    ? CATALOG_FORMATS.find((format) => format.id === activeFormat)?.name
    : undefined;

  const activeCollectionLabel = activeCollection
    ? TEA_COLLECTIONS.find((collection) => collection.id === activeCollection)?.name
    : undefined;

  const updateUrl = (nextQuery: string, nextFormat: string, nextCollection: string) => {
    const params =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams();

    if (nextQuery.trim()) {
      params.set("q", nextQuery.trim());
    } else {
      params.delete("q");
    }

    if (nextFormat && nextFormat !== "all") {
      params.set("format", nextFormat);
    } else {
      params.delete("format");
    }

    if (nextCollection && nextCollection !== "all") {
      params.set("collection", nextCollection);
    } else {
      params.delete("collection");
    }

    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;
    if (typeof window !== "undefined") {
      const currentUrl = `${window.location.pathname}${window.location.search}`;
      if (nextUrl === currentUrl) {
        return;
      }
    }

    router.replace(nextUrl, { scroll: false });
  };

  const scheduleQueryUrlUpdate = (
    nextQuery: string,
    nextFormat: string,
    nextCollection: string,
    delay = 220,
  ) => {
    if (querySyncTimeoutRef.current) {
      clearTimeout(querySyncTimeoutRef.current);
    }

    querySyncTimeoutRef.current = setTimeout(() => {
      updateUrl(nextQuery, nextFormat, nextCollection);
      querySyncTimeoutRef.current = null;
    }, delay);
  };

  const handleQueryChange = (nextQuery: string) => {
    setQuery(nextQuery);
    scheduleQueryUrlUpdate(nextQuery, selectedFormat, selectedCollection);
  };

  const handleFormatChange = (nextFormat: string) => {
    setSelectedFormat(nextFormat);
    updateUrl(query, nextFormat, selectedCollection);
  };

  const clearSearch = () => {
    if (querySyncTimeoutRef.current) {
      clearTimeout(querySyncTimeoutRef.current);
      querySyncTimeoutRef.current = null;
    }
    setQuery("");
    setSelectedFormat("all");
    updateUrl("", "all", selectedCollection);
  };

  useEffect(() => {
    return () => {
      if (querySyncTimeoutRef.current) {
        clearTimeout(querySyncTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Section>
      <Container size="xl">
        <Stack gap="xl">
          {/* Introduction */}
          <div className="reveal-up grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="text-primary mb-3 text-xs tracking-[0.2em] uppercase">
                Collection Index
              </p>
              <h2 className="font-(family-name:--font-heading) text-4xl tracking-tight md:text-5xl">
                Choose by style, mood, and brew ritual
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed md:text-base">
              From crisp green infusions to bold morning blends, each category is curated for
              consistent flavor and character.
            </p>
          </div>

          {/* Product Categories */}
          <Grid columns={3} gap="lg" minItemWidth="280px">
            {PRODUCT_CATEGORIES.map((category, index) => {
              const CategoryIcon = categoryIcons[category.key];

              return (
                <Surface
                  key={category.name}
                  elevation="sm"
                  className={`group border-border/70 reveal-up hover:border-primary/35 rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 stagger-${Math.min(index + 1, 6)}`}
                >
                  <Stack gap="md">
                    <div className={`inline-flex w-fit rounded-full p-2 ${category.accentClass}`}>
                      <CategoryIcon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">{category.name}</h3>
                      <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </Stack>
                </Surface>
              );
            })}
          </Grid>

          <Surface elevation="sm" className="reveal-up rounded-2xl border p-5 md:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-primary text-xs tracking-[0.18em] uppercase">Search Products</p>
                <h3 className="mt-1 text-2xl font-semibold tracking-tight">
                  Find by tea name or format
                </h3>
              </div>
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" aria-hidden="true" />
                Reset
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-[1fr_260px]">
              <label className="border-border bg-background focus-within:ring-ring/40 relative flex items-center gap-2 rounded-xl border px-3 focus-within:ring-2">
                <Search className="text-muted-foreground h-4 w-4" aria-hidden="true" />
                <input
                  value={query}
                  onChange={(event) => handleQueryChange(event.target.value)}
                  placeholder="Search e.g. tea pods, darjeeling, chamomile"
                  className="placeholder:text-muted-foreground h-11 w-full bg-transparent text-sm outline-none"
                  aria-label="Search products"
                />
              </label>

              <label className="border-border bg-background focus-within:ring-ring/40 rounded-xl border px-3 focus-within:ring-2">
                <span className="sr-only">Filter by format</span>
                <select
                  value={selectedFormat}
                  onChange={(event) => handleFormatChange(event.target.value)}
                  className="h-11 w-full bg-transparent text-sm outline-none"
                  aria-label="Filter by format"
                >
                  <option value="all">All Formats</option>
                  {CATALOG_FORMATS.map((format) => (
                    <option key={format.id} value={format.id}>
                      {format.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-muted-foreground">Results:</span>
              <span className="bg-muted rounded-full px-3 py-1 font-medium">
                {filteredProducts.length} products
              </span>
              {activeFormatLabel ? (
                <span className="bg-primary/10 text-primary rounded-full px-3 py-1 font-medium">
                  Format intent: {activeFormatLabel}
                </span>
              ) : null}
              {activeCollectionLabel ? (
                <span className="bg-secondary/20 text-foreground rounded-full px-3 py-1 font-medium">
                  Collection: {activeCollectionLabel}
                </span>
              ) : null}
            </div>
          </Surface>

          {filteredProducts.length === 0 ? (
            <Surface elevation="sm" className="reveal-up rounded-2xl border p-8 text-center">
              <p className="text-lg font-semibold">No products matched your search.</p>
              <p className="text-muted-foreground mt-2 text-sm">
                Try a different product name or choose another format.
              </p>
            </Surface>
          ) : (
            <Grid columns={3} gap="lg" minItemWidth="290px">
              {filteredProducts.map((product, index) => {
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    activeFormat={activeFormat}
                    isPreviewActive={activePreviewId === product.id}
                    staggerIndex={Math.min(index + 1, 6)}
                    onPreviewStart={handlePreviewStart}
                    onPreviewEnd={handlePreviewEnd}
                    onTogglePreview={handlePreviewToggle}
                  />
                );
              })}
            </Grid>
          )}

          {/* CTA */}
          <Surface
            elevation="md"
            className="reveal-up stagger-2 from-primary/12 to-secondary/20 rounded-2xl bg-linear-to-r p-8 md:p-10"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-(family-name:--font-heading) text-3xl tracking-tight md:text-4xl">
                  Ready to find your perfect tea match?
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed md:text-base">
                  Browse full tasting notes and brew guides, or speak with us for personalized
                  recommendations.
                </p>
              </div>

              <Button asChild size="lg" className="rounded-full px-7">
                <Link href="/contact" prefetch={false} className="inline-flex items-center gap-2">
                  Get Recommendations
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Surface>
        </Stack>
      </Container>
    </Section>
  );
}
