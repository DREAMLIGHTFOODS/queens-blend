import productCatalog from "./product-catalog.json";

export type ProductCategoryKey = "green" | "black" | "oolong" | "white" | "herbal" | "limited";

export type ProductCategory = {
  key: ProductCategoryKey;
  name: string;
  description: string;
  accentClass: string;
};

export type CatalogFormat = {
  id: string;
  name: string;
  packSizes: string[];
  variants: string[];
  formatType: string;
};

export type CatalogProduct = {
  id: string;
  name: string;
  slug: string;
  productType: "tea" | "premix" | "ctc-blend" | "gift-set" | "accessory";
  family: string;
  teaType: string;
  featured: boolean;
  description: string;
  tastingNotes: string[];
  brewTime: string;
  startingPriceInr?: number;
  accentClass: string;
  searchAliases: string[];
  searchKeywords: string[];
  media: {
    heroVideo: string | null;
    heroImage: string | null;
    gallery: string[];
    cardIngredientImage?: string;
    cardProductImage?: string;
    formatCardImages?: Record<
      string,
      {
        ingredient: string;
        product: string;
      }
    >;
  };
  availability: string[];
};

export type ProductCatalog = {
  version: string;
  currency: string;
  formats: CatalogFormat[];
  products: CatalogProduct[];
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  categoryKey: ProductCategoryKey;
  categoryLabel: string;
  accentClass: string;
  description: string;
  tastingNotes: string;
  brewTime: string;
  cardIngredientImage: string;
  cardProductImage: string;
  featured: boolean;
};

export type ProductCardImagePair = {
  ingredient: string;
  product: string;
};

export type DiscoverableTeaProduct = {
  id: string;
  name: string;
  slug: string;
  categoryKey: ProductCategoryKey;
  categoryLabel: string;
  accentClass: string;
  description: string;
  tastingNotes: string;
  brewTime: string;
  featured: boolean;
  availability: string[];
  searchAliases: string[];
  searchKeywords: string[];
  cardIngredientImage: string;
  cardProductImage: string;
  formatCardImages: Record<string, ProductCardImagePair>;
};

export type TeaProductDetail = {
  id: string;
  name: string;
  slug: string;
  teaType: string;
  categoryKey: ProductCategoryKey;
  categoryLabel: string;
  accentClass: string;
  description: string;
  tastingNotes: string[];
  brewTime: string;
  featured: boolean;
  availability: string[];
  availabilityFormats: CatalogFormat[];
  selectedFormatId: string | null;
  selectedFormatName: string | null;
  startingPriceInr?: number;
  heroVideo: string | null;
  heroImage: string;
  ingredientImage: string;
  productImage: string;
  gallery: string[];
};

export const PRODUCT_CATALOG = productCatalog as ProductCatalog;

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    key: "green",
    name: "Green Teas",
    description: "Fresh, delicate, and full of antioxidants. Perfect for a light, refreshing cup.",
    accentClass:
      "bg-[color-mix(in_oklch,var(--product-green-soft),var(--surface)_45%)] text-[var(--product-green-foreground)]",
  },
  {
    key: "black",
    name: "Black Teas",
    description: "Rich, bold, and full-bodied. The classic choice for a robust tea experience.",
    accentClass:
      "bg-[color-mix(in_oklch,var(--product-assam-soft),var(--surface)_45%)] text-[var(--product-assam-foreground)]",
  },
  {
    key: "oolong",
    name: "Oolong Teas",
    description: "Aromatic and complex. The perfect balance between green and black teas.",
    accentClass:
      "bg-[color-mix(in_oklch,var(--product-oolong-soft),var(--surface)_45%)] text-[var(--product-oolong-foreground)]",
  },
  {
    key: "white",
    name: "White Teas",
    description: "Subtle, smooth, and naturally sweet. The finest and most delicate teas.",
    accentClass:
      "bg-[color-mix(in_oklch,var(--product-white-soft),var(--surface)_45%)] text-[var(--product-white-foreground)]",
  },
  {
    key: "herbal",
    name: "Herbal Blends",
    description: "Caffeine-free infusions blended with botanicals and natural flavors.",
    accentClass:
      "bg-[color-mix(in_oklch,var(--product-herbal-soft),var(--surface)_45%)] text-[var(--product-herbal-foreground)]",
  },
  {
    key: "limited",
    name: "Limited Edition",
    description: "Exclusive, small-batch releases and signature collections.",
    accentClass:
      "bg-[color-mix(in_oklch,var(--product-saffron-soft),var(--surface)_45%)] text-[var(--product-saffron-foreground)]",
  },
];

const FAMILY_TO_CATEGORY_KEY: Record<string, ProductCategoryKey> = {
  green: "green",
  black: "black",
  oolong: "oolong",
  white: "white",
  herbal: "herbal",
  floral: "herbal",
  spiced: "limited",
  specialty: "limited",
  functional: "limited",
  flavored: "limited",
  gift: "limited",
  accessory: "limited",
};

const CATEGORY_KEY_TO_LABEL: Record<ProductCategoryKey, string> = {
  green: "Green Tea",
  black: "Black Tea",
  oolong: "Oolong Tea",
  white: "White Tea",
  herbal: "Herbal Blend",
  limited: "Signature Collection",
};

const CATEGORY_KEY_TO_ACCENT: Record<ProductCategoryKey, string> = {
  green:
    "bg-[color-mix(in_oklch,var(--product-green-soft),var(--surface)_45%)] text-[var(--product-green-foreground)]",
  black:
    "bg-[color-mix(in_oklch,var(--product-assam-soft),var(--surface)_45%)] text-[var(--product-assam-foreground)]",
  oolong:
    "bg-[color-mix(in_oklch,var(--product-oolong-soft),var(--surface)_45%)] text-[var(--product-oolong-foreground)]",
  white:
    "bg-[color-mix(in_oklch,var(--product-white-soft),var(--surface)_45%)] text-[var(--product-white-foreground)]",
  herbal:
    "bg-[color-mix(in_oklch,var(--product-herbal-soft),var(--surface)_45%)] text-[var(--product-herbal-foreground)]",
  limited:
    "bg-[color-mix(in_oklch,var(--product-saffron-soft),var(--surface)_45%)] text-[var(--product-saffron-foreground)]",
};

const DEFAULT_CARD_INGREDIENT_IMAGE = "/images/products/card-ingredient-default.png";
const DEFAULT_CARD_PRODUCT_IMAGE = "/images/products/card-product-default.png";

const FORMAT_QUERY_SYNONYMS: Record<string, string[]> = {
  "tea-pods": ["tea pod", "tea pods", "pod", "pods"],
  "single-chamber-tea-bags": ["single chamber", "single chamber tea bags", "single tea bag"],
  "double-chamber-tea-bags": ["double chamber", "double chamber tea bags", "double tea bag"],
  "triangular-tea-bags": ["triangle tea bag", "triangular tea bag", "pyramid tea bag"],
  "metal-tin-caddy-square": ["square caddy", "square tin", "tin caddy square"],
  "metal-tin-caddy-round": ["round caddy", "round tin", "tin caddy round"],
  "premix-tea": ["premix", "instant tea"],
  "printed-box": ["printed box"],
  "printed-pouch": ["printed pouch"],
  "gift-box-collection": ["gift box", "gift collection"],
  "tea-accessories": ["accessories", "tea accessories"],
};

const FORMAT_BY_ID = new Map(PRODUCT_CATALOG.formats.map((format) => [format.id, format]));

const TEA_CATALOG_PRODUCTS = PRODUCT_CATALOG.products.filter(
  (product) => product.productType === "tea",
);

function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getDefaultCardImages(product: CatalogProduct): ProductCardImagePair {
  return {
    ingredient: product.media.cardIngredientImage ?? DEFAULT_CARD_INGREDIENT_IMAGE,
    product: product.media.cardProductImage ?? DEFAULT_CARD_PRODUCT_IMAGE,
  };
}

export function resolveProductCardImages(
  product: Pick<CatalogProduct, "availability" | "media">,
  preferredFormatId?: string,
): ProductCardImagePair {
  const defaultImages = {
    ingredient: product.media.cardIngredientImage ?? DEFAULT_CARD_INGREDIENT_IMAGE,
    product: product.media.cardProductImage ?? DEFAULT_CARD_PRODUCT_IMAGE,
  };

  if (!preferredFormatId) {
    return defaultImages;
  }

  if (!product.availability.includes(preferredFormatId)) {
    return defaultImages;
  }

  const formatSpecific = product.media.formatCardImages?.[preferredFormatId];
  if (!formatSpecific) {
    return defaultImages;
  }

  return {
    ingredient: formatSpecific.ingredient || defaultImages.ingredient,
    product: formatSpecific.product || defaultImages.product,
  };
}

export function inferFormatFromQuery(query: string): string | undefined {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) {
    return undefined;
  }

  for (const format of PRODUCT_CATALOG.formats) {
    const terms = [
      format.id,
      format.name,
      ...format.variants,
      ...(FORMAT_QUERY_SYNONYMS[format.id] ?? []),
    ].map(normalizeText);

    if (terms.some((term) => term && normalizedQuery.includes(term))) {
      return format.id;
    }
  }

  return undefined;
}

function getFormatSearchTerms(formatId: string): string[] {
  const format = FORMAT_BY_ID.get(formatId);
  if (!format) {
    return [];
  }

  return [format.id, format.name, ...format.variants, ...(FORMAT_QUERY_SYNONYMS[format.id] ?? [])];
}

export function filterTeaProducts(params: {
  query: string;
  formatId?: string;
  products?: DiscoverableTeaProduct[];
}): DiscoverableTeaProduct[] {
  const { query, formatId, products = TEA_PRODUCTS } = params;
  const normalizedQuery = normalizeText(query);
  const queryTokens = normalizedQuery ? normalizedQuery.split(" ") : [];

  return products.filter((product) => {
    if (formatId && !product.availability.includes(formatId)) {
      return false;
    }

    if (queryTokens.length === 0) {
      return true;
    }

    const formatTerms = product.availability.flatMap(getFormatSearchTerms);
    const haystack = normalizeText(
      [
        product.name,
        product.description,
        product.tastingNotes,
        product.searchAliases.join(" "),
        product.searchKeywords.join(" "),
        formatTerms.join(" "),
      ].join(" "),
    );

    return queryTokens.every((token) => haystack.includes(token));
  });
}

export function getDiscoverableProductCardImages(
  product: DiscoverableTeaProduct,
  preferredFormatId?: string,
): ProductCardImagePair {
  if (!preferredFormatId) {
    return {
      ingredient: product.cardIngredientImage,
      product: product.cardProductImage,
    };
  }

  if (!product.availability.includes(preferredFormatId)) {
    return {
      ingredient: product.cardIngredientImage,
      product: product.cardProductImage,
    };
  }

  const formatSpecific = product.formatCardImages[preferredFormatId];
  if (!formatSpecific) {
    return {
      ingredient: product.cardIngredientImage,
      product: product.cardProductImage,
    };
  }

  return {
    ingredient: formatSpecific.ingredient || product.cardIngredientImage,
    product: formatSpecific.product || product.cardProductImage,
  };
}

export const CATALOG_FORMATS = PRODUCT_CATALOG.formats;

export const TEA_PRODUCT_SLUGS = TEA_CATALOG_PRODUCTS.map((product) => product.slug);

export function getTeaProductBySlug(
  slug: string,
  preferredFormatId?: string,
): TeaProductDetail | undefined {
  const catalogProduct = TEA_CATALOG_PRODUCTS.find((product) => product.slug === slug);
  if (!catalogProduct) {
    return undefined;
  }

  const selectedFormatId =
    preferredFormatId &&
    catalogProduct.availability.includes(preferredFormatId) &&
    FORMAT_BY_ID.has(preferredFormatId)
      ? preferredFormatId
      : null;

  const selectedFormat = selectedFormatId ? FORMAT_BY_ID.get(selectedFormatId) : undefined;

  const resolvedImages = resolveProductCardImages(catalogProduct, selectedFormatId ?? undefined);
  const categoryKey = FAMILY_TO_CATEGORY_KEY[catalogProduct.family] ?? "limited";

  return {
    id: catalogProduct.id,
    name: catalogProduct.name,
    slug: catalogProduct.slug,
    teaType: catalogProduct.teaType,
    categoryKey,
    categoryLabel: CATEGORY_KEY_TO_LABEL[categoryKey],
    accentClass: catalogProduct.accentClass || CATEGORY_KEY_TO_ACCENT[categoryKey],
    description: catalogProduct.description,
    tastingNotes: catalogProduct.tastingNotes,
    brewTime: catalogProduct.brewTime,
    featured: catalogProduct.featured,
    availability: catalogProduct.availability,
    availabilityFormats: catalogProduct.availability
      .map((formatId) => FORMAT_BY_ID.get(formatId))
      .filter((format): format is CatalogFormat => Boolean(format)),
    selectedFormatId,
    selectedFormatName: selectedFormat?.name ?? null,
    startingPriceInr: catalogProduct.startingPriceInr,
    heroVideo: catalogProduct.media.heroVideo,
    heroImage: catalogProduct.media.heroImage ?? resolvedImages.product,
    ingredientImage: resolvedImages.ingredient,
    productImage: resolvedImages.product,
    gallery: catalogProduct.media.gallery,
  };
}

export function getRelatedTeaProducts(
  slug: string,
  categoryKey: ProductCategoryKey,
  limit = 3,
): DiscoverableTeaProduct[] {
  const sameCategory = TEA_PRODUCTS.filter(
    (product) => product.slug !== slug && product.categoryKey === categoryKey,
  ).slice(0, limit);

  if (sameCategory.length >= limit) {
    return sameCategory;
  }

  const filler = TEA_PRODUCTS.filter(
    (product) => product.slug !== slug && product.categoryKey !== categoryKey,
  ).slice(0, Math.max(limit - sameCategory.length, 0));

  return [...sameCategory, ...filler];
}

export const TEA_PRODUCTS: DiscoverableTeaProduct[] = PRODUCT_CATALOG.products
  .filter((product) => product.productType === "tea")
  .map((product) => {
    const categoryKey = FAMILY_TO_CATEGORY_KEY[product.family] ?? "limited";
    const defaultImages = getDefaultCardImages(product);

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      categoryKey,
      categoryLabel: CATEGORY_KEY_TO_LABEL[categoryKey],
      accentClass: product.accentClass || CATEGORY_KEY_TO_ACCENT[categoryKey],
      description: product.description,
      tastingNotes: product.tastingNotes.join(", "),
      brewTime: product.brewTime,
      featured: product.featured,
      availability: product.availability,
      searchAliases: product.searchAliases,
      searchKeywords: product.searchKeywords,
      cardIngredientImage: defaultImages.ingredient,
      cardProductImage: defaultImages.product,
      formatCardImages: product.media.formatCardImages ?? {},
    };
  });

export const PRODUCTS: Product[] = PRODUCT_CATALOG.products
  .filter((product) => product.productType === "tea" && product.featured)
  .map((product) => {
    const categoryKey = FAMILY_TO_CATEGORY_KEY[product.family] ?? "limited";
    const resolvedImages = resolveProductCardImages(product);

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      categoryKey,
      categoryLabel: CATEGORY_KEY_TO_LABEL[categoryKey],
      accentClass: product.accentClass || CATEGORY_KEY_TO_ACCENT[categoryKey],
      description: product.description,
      tastingNotes: product.tastingNotes.join(", "),
      brewTime: product.brewTime,
      cardIngredientImage: resolvedImages.ingredient,
      cardProductImage: resolvedImages.product,
      featured: product.featured,
    };
  });

export const FEATURED_PRODUCTS = PRODUCTS;
