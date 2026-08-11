import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const catalogPath = path.join(rootDir, "data", "product-catalog.json");
const productsRoot = path.join(rootDir, "public", "images", "products");

const globalDefaultIngredient = path.join(productsRoot, "card-ingredient-default.png");
const globalDefaultProduct = path.join(productsRoot, "card-product-default.png");

if (!fs.existsSync(globalDefaultIngredient) || !fs.existsSync(globalDefaultProduct)) {
  throw new Error("Global default image files are missing in public/images/products.");
}

const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const formatsById = new Map(catalog.formats.map((format) => [format.id, format]));

function normalizePackSizeToken(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function pickExistingPackPair(existingPackMap, packSize) {
  if (!existingPackMap || typeof existingPackMap !== "object") {
    return null;
  }

  const normalizedPackSize = normalizePackSizeToken(packSize);
  return (
    existingPackMap[packSize] ||
    existingPackMap[normalizedPackSize] ||
    Object.entries(existingPackMap).find(
      ([key]) => normalizePackSizeToken(key) === normalizedPackSize,
    )?.[1] ||
    null
  );
}

function publicUrlToAbsolutePath(publicUrlPath) {
  if (typeof publicUrlPath !== "string" || !publicUrlPath.startsWith("/")) {
    return null;
  }

  return path.join(rootDir, "public", ...publicUrlPath.replace(/^\/+/, "").split("/"));
}

function copyIfMissing(sourcePath, targetPath) {
  if (!fs.existsSync(sourcePath) || fs.existsSync(targetPath)) {
    return;
  }

  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.copyFileSync(sourcePath, targetPath);
}

for (const product of catalog.products) {
  const slug = product.slug || product.id;
  const productRoot = path.join(productsRoot, slug);

  const legacyIngredient = path.join(productRoot, "ingredient.png");
  const legacyProduct = path.join(productRoot, "product.png");

  const defaultIngredient = path.join(productRoot, "default", "ingredient.png");
  const defaultProduct = path.join(productRoot, "default", "product.png");

  copyIfMissing(legacyIngredient, defaultIngredient);
  copyIfMissing(legacyProduct, defaultProduct);

  if (!fs.existsSync(defaultIngredient)) {
    copyIfMissing(globalDefaultIngredient, defaultIngredient);
  }

  if (!fs.existsSync(defaultProduct)) {
    copyIfMissing(globalDefaultProduct, defaultProduct);
  }

  if (!product.media || typeof product.media !== "object") {
    product.media = { heroVideo: null, heroImage: null, gallery: [] };
  }

  if (!Array.isArray(product.media.gallery)) {
    product.media.gallery = [];
  }

  if (product.media.heroVideo === undefined) {
    product.media.heroVideo = null;
  }

  if (product.media.heroImage === undefined) {
    product.media.heroImage = null;
  }

  product.media.cardIngredientImage = `/images/products/${slug}/default/ingredient.png`;
  product.media.cardProductImage = `/images/products/${slug}/default/product.png`;

  if (
    !product.media.formatPackCardImages ||
    typeof product.media.formatPackCardImages !== "object"
  ) {
    product.media.formatPackCardImages = {};
  }

  for (const formatId of product.availability ?? []) {
    const format = formatsById.get(formatId);
    if (!format) {
      continue;
    }

    const existingPackMap = product.media.formatPackCardImages[formatId];
    const firstExistingPair =
      existingPackMap && typeof existingPackMap === "object"
        ? Object.values(existingPackMap).find(
            (pair) => pair && typeof pair === "object" && pair.ingredient && pair.product,
          )
        : null;

    const legacyPair =
      product.media.formatCardImages && typeof product.media.formatCardImages === "object"
        ? product.media.formatCardImages[formatId]
        : null;

    const sourceIngredientPath = publicUrlToAbsolutePath(
      firstExistingPair?.ingredient || legacyPair?.ingredient,
    );
    const sourceProductPath = publicUrlToAbsolutePath(
      firstExistingPair?.product || legacyPair?.product,
    );

    const packMap = {};
    for (const packSize of format.packSizes) {
      const packToken = normalizePackSizeToken(packSize);
      const packIngredientPath = path.join(
        productsRoot,
        slug,
        "formats",
        formatId,
        "packs",
        packToken,
        "ingredient.png",
      );
      const packProductPath = path.join(
        productsRoot,
        slug,
        "formats",
        formatId,
        "packs",
        packToken,
        "product.png",
      );

      const packPair = pickExistingPackPair(existingPackMap, packSize);
      const pairSourceIngredientPath = publicUrlToAbsolutePath(packPair?.ingredient);
      const pairSourceProductPath = publicUrlToAbsolutePath(packPair?.product);
      const finalSourceIngredientPath = pairSourceIngredientPath || sourceIngredientPath;
      const finalSourceProductPath = pairSourceProductPath || sourceProductPath;

      if (
        finalSourceIngredientPath &&
        fs.existsSync(finalSourceIngredientPath) &&
        !fs.existsSync(packIngredientPath)
      ) {
        fs.mkdirSync(path.dirname(packIngredientPath), { recursive: true });
        fs.copyFileSync(finalSourceIngredientPath, packIngredientPath);
      }

      if (
        finalSourceProductPath &&
        fs.existsSync(finalSourceProductPath) &&
        !fs.existsSync(packProductPath)
      ) {
        fs.mkdirSync(path.dirname(packProductPath), { recursive: true });
        fs.copyFileSync(finalSourceProductPath, packProductPath);
      }

      if (!fs.existsSync(packIngredientPath)) {
        copyIfMissing(globalDefaultIngredient, packIngredientPath);
      }

      if (!fs.existsSync(packProductPath)) {
        copyIfMissing(globalDefaultProduct, packProductPath);
      }

      const nextIngredientUrl = `/images/products/${slug}/formats/${formatId}/packs/${packToken}/ingredient.png`;
      const nextProductUrl = `/images/products/${slug}/formats/${formatId}/packs/${packToken}/product.png`;

      packMap[packSize] = {
        ingredient: nextIngredientUrl,
        product: nextProductUrl,
      };
    }

    product.media.formatPackCardImages[formatId] = packMap;
  }

  delete product.media.formatCardImages;
}

fs.writeFileSync(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Migrated image structure for ${catalog.products.length} products.`);
