/**
 * ============================================================================
 * Queen's Blend
 * File: components/products/ProductDetailPage.tsx
 * Purpose: Product details template for product slug pages
 * ============================================================================
 */

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, Sparkles, Tags } from "lucide-react";

import { Container } from "@/components/core/layout/Container";
import { Grid } from "@/components/core/layout/Grid";
import { Section } from "@/components/core/layout/Section";
import { Stack } from "@/components/core/layout/Stack";
import { Surface } from "@/components/core/layout/Surface";
import { Button } from "@/components/ui/button";
import type { DiscoverableTeaProduct, TeaProductDetail } from "@/data/products";

type ProductDetailPageProps = {
  product: TeaProductDetail;
  relatedProducts: DiscoverableTeaProduct[];
};

function formatCurrencyInr(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ProductDetailPage({ product, relatedProducts }: ProductDetailPageProps) {
  return (
    <Section>
      <Container size="xl">
        <Stack gap="xl">
          <div className="reveal-up flex items-center gap-2 text-sm">
            <Link
              href="/products"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Products
            </Link>
            <span className="text-muted-foreground" aria-hidden="true">
              /
            </span>
            <span className="font-medium">{product.name}</span>
          </div>

          <Grid columns={2} gap="xl" minItemWidth="320px">
            <Surface
              elevation="sm"
              className="reveal-up border-border/70 overflow-hidden rounded-2xl border"
            >
              <div className="relative aspect-4/3 w-full">
                <Image
                  src={product.heroImage}
                  alt={`${product.name} product image`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
              </div>
            </Surface>

            <div className="reveal-up stagger-2">
              <Stack gap="lg">
                <div>
                  <p className="text-primary mb-2 text-xs tracking-[0.16em] uppercase">
                    Tea Profile
                  </p>
                  <h1 className="font-(family-name:--font-heading) text-4xl tracking-tight md:text-5xl">
                    {product.name}
                  </h1>
                  <p className="text-muted-foreground mt-3 text-base leading-relaxed md:text-lg">
                    {product.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${product.accentClass}`}
                  >
                    {product.categoryLabel}
                  </span>
                  {product.selectedFormatName ? (
                    <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold">
                      Format: {product.selectedFormatName}
                    </span>
                  ) : null}
                  <span className="bg-muted text-muted-foreground inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium">
                    <Tags className="h-3.5 w-3.5" aria-hidden="true" />
                    {product.teaType}
                  </span>
                  <span className="bg-muted text-muted-foreground inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium">
                    <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                    Brew {product.brewTime}
                  </span>
                  {typeof product.startingPriceInr === "number" ? (
                    <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-semibold">
                      Starts at {formatCurrencyInr(product.startingPriceInr)}
                    </span>
                  ) : null}
                </div>

                <div>
                  <h2 className="text-lg font-semibold tracking-tight">Tasting Notes</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.tastingNotes.map((note) => (
                      <span
                        key={note}
                        className="bg-muted text-muted-foreground rounded-full px-3 py-1 text-xs font-medium"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <Button asChild className="w-full rounded-full sm:w-fit">
                  <Link href="/contact" className="inline-flex items-center gap-2">
                    Enquire This Tea
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </Stack>
            </div>
          </Grid>

          <Grid columns={2} gap="lg" minItemWidth="300px">
            <Surface elevation="sm" className="reveal-up rounded-2xl border p-6">
              <h2 className="text-xl font-semibold tracking-tight">Available Formats</h2>
              <Stack gap="sm" className="mt-4">
                {product.availabilityFormats.map((format) => (
                  <div key={format.id} className="border-border bg-muted/35 rounded-xl border p-4">
                    <p className="font-medium">{format.name}</p>
                    {format.packSizes.length > 0 ? (
                      <p className="text-muted-foreground mt-1 text-sm">
                        Pack sizes: {format.packSizes.join(", ")}
                      </p>
                    ) : null}
                    {format.variants.length > 0 ? (
                      <p className="text-muted-foreground mt-1 text-sm">
                        Variants: {format.variants.join(", ")}
                      </p>
                    ) : null}
                  </div>
                ))}
              </Stack>
            </Surface>

            <Surface elevation="sm" className="reveal-up stagger-2 rounded-2xl border p-6">
              <h2 className="text-xl font-semibold tracking-tight">Visual Story</h2>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {product.selectedFormatName
                  ? `Ingredient and product previews for the ${product.selectedFormatName} format.`
                  : "Ingredient and product previews for this blend."}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="border-border/70 relative aspect-square overflow-hidden rounded-xl border">
                  <Image
                    src={product.ingredientImage}
                    alt={`${product.name} ingredient image`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="border-border/70 relative aspect-square overflow-hidden rounded-xl border">
                  <Image
                    src={product.productImage}
                    alt={`${product.name} product pack image`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
            </Surface>
          </Grid>

          {relatedProducts.length > 0 ? (
            <div>
              <div className="reveal-up mb-5 flex items-center gap-2">
                <Sparkles className="text-primary h-4 w-4" aria-hidden="true" />
                <h2 className="text-2xl font-semibold tracking-tight">Related Teas</h2>
              </div>

              <Grid columns={3} gap="lg" minItemWidth="250px">
                {relatedProducts.map((item, index) => (
                  <Surface
                    key={item.id}
                    elevation="sm"
                    className={`border-border/70 reveal-up hover:border-primary/35 rounded-2xl border p-5 transition-colors stagger-${Math.min(index + 1, 6)}`}
                  >
                    <Stack gap="sm">
                      <div className="border-border/70 relative aspect-4/3 overflow-hidden rounded-xl border">
                        <Image
                          src={item.cardProductImage}
                          alt={`${item.name} product preview`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>

                      <span className="text-muted-foreground text-xs tracking-[0.14em] uppercase">
                        {item.categoryLabel}
                      </span>

                      <h3 className="text-lg font-semibold tracking-tight">{item.name}</h3>

                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="mt-1 w-fit rounded-full"
                      >
                        <Link
                          href={
                            product.selectedFormatId &&
                            item.availability.includes(product.selectedFormatId)
                              ? `/products/${item.slug}?format=${encodeURIComponent(product.selectedFormatId)}`
                              : `/products/${item.slug}`
                          }
                        >
                          View Details
                        </Link>
                      </Button>
                    </Stack>
                  </Surface>
                ))}
              </Grid>
            </div>
          ) : null}
        </Stack>
      </Container>
    </Section>
  );
}
