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

  if (product.media.formatCardImages && typeof product.media.formatCardImages === "object") {
    for (const [formatId, pair] of Object.entries(product.media.formatCardImages)) {
      const nextIngredientUrl = `/images/products/${slug}/formats/${formatId}/ingredient.png`;
      const nextProductUrl = `/images/products/${slug}/formats/${formatId}/product.png`;

      const formatIngredientPath = path.join(
        productsRoot,
        slug,
        "formats",
        formatId,
        "ingredient.png",
      );
      const formatProductPath = path.join(productsRoot, slug, "formats", formatId, "product.png");

      const oldIngredientPath =
        pair && typeof pair === "object" && typeof pair.ingredient === "string"
          ? path.join(rootDir, "public", ...pair.ingredient.replace(/^\/+/, "").split("/"))
          : null;
      const oldProductPath =
        pair && typeof pair === "object" && typeof pair.product === "string"
          ? path.join(rootDir, "public", ...pair.product.replace(/^\/+/, "").split("/"))
          : null;

      if (
        oldIngredientPath &&
        fs.existsSync(oldIngredientPath) &&
        !fs.existsSync(formatIngredientPath)
      ) {
        fs.mkdirSync(path.dirname(formatIngredientPath), { recursive: true });
        fs.copyFileSync(oldIngredientPath, formatIngredientPath);
      }

      if (oldProductPath && fs.existsSync(oldProductPath) && !fs.existsSync(formatProductPath)) {
        fs.mkdirSync(path.dirname(formatProductPath), { recursive: true });
        fs.copyFileSync(oldProductPath, formatProductPath);
      }

      if (!fs.existsSync(formatIngredientPath)) {
        copyIfMissing(globalDefaultIngredient, formatIngredientPath);
      }

      if (!fs.existsSync(formatProductPath)) {
        copyIfMissing(globalDefaultProduct, formatProductPath);
      }

      product.media.formatCardImages[formatId] = {
        ingredient: nextIngredientUrl,
        product: nextProductUrl,
      };
    }
  }
}

fs.writeFileSync(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`Migrated image structure for ${catalog.products.length} products.`);
