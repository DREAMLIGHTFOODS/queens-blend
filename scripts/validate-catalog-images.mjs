import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const catalogPath = path.join(rootDir, "data", "product-catalog.json");
const publicDir = path.join(rootDir, "public");

const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const formatIds = new Set(catalog.formats.map((format) => format.id));

const errors = [];

function expectedDefaultIngredientUrl(slug) {
  return `/images/products/${slug}/default/ingredient.png`;
}

function expectedDefaultProductUrl(slug) {
  return `/images/products/${slug}/default/product.png`;
}

function expectedFormatIngredientUrl(slug, formatId) {
  return `/images/products/${slug}/formats/${formatId}/ingredient.png`;
}

function expectedFormatProductUrl(slug, formatId) {
  return `/images/products/${slug}/formats/${formatId}/product.png`;
}

function toPublicFilePath(publicUrlPath) {
  if (typeof publicUrlPath !== "string" || !publicUrlPath.startsWith("/")) {
    return null;
  }

  const clean = publicUrlPath.replace(/^\/+/, "");
  return path.join(publicDir, ...clean.split("/"));
}

function assertPublicAssetExists(productId, fieldPath, publicUrlPath) {
  const fullPath = toPublicFilePath(publicUrlPath);

  if (!fullPath) {
    errors.push(`[${productId}] ${fieldPath} must be an absolute public path like /images/...`);
    return;
  }

  if (!fs.existsSync(fullPath)) {
    errors.push(`[${productId}] ${fieldPath} points to missing file: ${publicUrlPath}`);
  }
}

for (const product of catalog.products) {
  const slug = product.slug || product.id;
  const media = product.media ?? {};

  const expectedDefaultIngredient = expectedDefaultIngredientUrl(slug);
  const expectedDefaultProduct = expectedDefaultProductUrl(slug);

  if (media.cardIngredientImage !== expectedDefaultIngredient) {
    errors.push(
      `[${product.id}] media.cardIngredientImage must be ${expectedDefaultIngredient}, got ${String(media.cardIngredientImage)}.`,
    );
  }

  if (media.cardProductImage !== expectedDefaultProduct) {
    errors.push(
      `[${product.id}] media.cardProductImage must be ${expectedDefaultProduct}, got ${String(media.cardProductImage)}.`,
    );
  }

  assertPublicAssetExists(product.id, "media.cardIngredientImage", media.cardIngredientImage);
  assertPublicAssetExists(product.id, "media.cardProductImage", media.cardProductImage);

  if (!media.formatCardImages) {
    continue;
  }

  for (const [formatId, pair] of Object.entries(media.formatCardImages)) {
    if (!formatIds.has(formatId)) {
      errors.push(
        `[${product.id}] media.formatCardImages.${formatId} references unknown format id.`,
      );
      continue;
    }

    if (!product.availability.includes(formatId)) {
      errors.push(
        `[${product.id}] media.formatCardImages.${formatId} exists but product availability does not include ${formatId}.`,
      );
    }

    const expectedFormatIngredient = expectedFormatIngredientUrl(slug, formatId);
    const expectedFormatProduct = expectedFormatProductUrl(slug, formatId);

    if (pair?.ingredient !== expectedFormatIngredient) {
      errors.push(
        `[${product.id}] media.formatCardImages.${formatId}.ingredient must be ${expectedFormatIngredient}, got ${String(pair?.ingredient)}.`,
      );
    }

    if (pair?.product !== expectedFormatProduct) {
      errors.push(
        `[${product.id}] media.formatCardImages.${formatId}.product must be ${expectedFormatProduct}, got ${String(pair?.product)}.`,
      );
    }

    assertPublicAssetExists(
      product.id,
      `media.formatCardImages.${formatId}.ingredient`,
      pair?.ingredient,
    );
    assertPublicAssetExists(
      product.id,
      `media.formatCardImages.${formatId}.product`,
      pair?.product,
    );
  }
}

if (errors.length > 0) {
  console.error("Catalog image validation failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(
  `Catalog image validation passed for ${catalog.products.length} products and ${catalog.formats.length} formats.`,
);
