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
const formatsById = new Map(catalog.formats.map((format) => [format.id, format]));

const errors = [];

function expectedDefaultIngredientUrl(slug) {
  return `/images/products/${slug}/default/ingredient.png`;
}

function expectedDefaultProductUrl(slug) {
  return `/images/products/${slug}/default/product.png`;
}

function normalizePackSizeToken(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function expectedPackIngredientUrl(slug, formatId, packSize) {
  const packToken = normalizePackSizeToken(packSize);
  return `/images/products/${slug}/formats/${formatId}/packs/${packToken}/ingredient.png`;
}

function expectedPackProductUrl(slug, formatId, packSize) {
  const packToken = normalizePackSizeToken(packSize);
  return `/images/products/${slug}/formats/${formatId}/packs/${packToken}/product.png`;
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

  const formatPackCardImages = media.formatPackCardImages ?? {};

  for (const [formatId, packMap] of Object.entries(formatPackCardImages)) {
    if (!formatIds.has(formatId)) {
      errors.push(
        `[${product.id}] media.formatPackCardImages.${formatId} references unknown format id.`,
      );
      continue;
    }

    if (!product.availability.includes(formatId)) {
      errors.push(
        `[${product.id}] media.formatPackCardImages.${formatId} exists but product availability does not include ${formatId}.`,
      );
    }

    if (!packMap || typeof packMap !== "object") {
      errors.push(`[${product.id}] media.formatPackCardImages.${formatId} must be an object.`);
      continue;
    }

    for (const [packSize, pair] of Object.entries(packMap)) {
      if (!pair || typeof pair !== "object") {
        errors.push(
          `[${product.id}] media.formatPackCardImages.${formatId}.${packSize} must be an object with ingredient/product paths.`,
        );
        continue;
      }

      assertPublicAssetExists(
        product.id,
        `media.formatPackCardImages.${formatId}.${packSize}.ingredient`,
        pair.ingredient,
      );
      assertPublicAssetExists(
        product.id,
        `media.formatPackCardImages.${formatId}.${packSize}.product`,
        pair.product,
      );
    }
  }

  for (const formatId of product.availability) {
    const format = formatsById.get(formatId);
    if (!format) {
      errors.push(`[${product.id}] availability includes unknown format id: ${formatId}.`);
      continue;
    }

    const packMap = formatPackCardImages[formatId];
    if (!packMap || typeof packMap !== "object") {
      errors.push(`[${product.id}] missing media.formatPackCardImages.${formatId}.`);
      continue;
    }

    for (const packSize of format.packSizes) {
      const pair = packMap[packSize];
      if (!pair) {
        errors.push(`[${product.id}] missing media.formatPackCardImages.${formatId}.${packSize}.`);
        continue;
      }

      const expectedFormatIngredient = expectedPackIngredientUrl(slug, formatId, packSize);
      const expectedFormatProduct = expectedPackProductUrl(slug, formatId, packSize);

      if (pair.ingredient !== expectedFormatIngredient) {
        errors.push(
          `[${product.id}] media.formatPackCardImages.${formatId}.${packSize}.ingredient must be ${expectedFormatIngredient}, got ${String(pair.ingredient)}.`,
        );
      }

      if (pair.product !== expectedFormatProduct) {
        errors.push(
          `[${product.id}] media.formatPackCardImages.${formatId}.${packSize}.product must be ${expectedFormatProduct}, got ${String(pair.product)}.`,
        );
      }
    }
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
