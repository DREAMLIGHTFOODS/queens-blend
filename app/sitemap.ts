import type { MetadataRoute } from "next";

import { PRODUCT_CATALOG } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thequeensblend.com";

  const staticRoutes = ["", "/about", "/contact", "/products", "/tea-guide"];

  const businessRoutes = [
    "/business",
    "/business/horeca",
    "/business/private-label",
    "/business/bulk-supply",
    "/business/export",
    "/business/contact",
  ];

  const collectionRoutes = [
    "/products/category/heritage",
    "/products/category/mystique",
    "/products/category/full-bodied",
    "/products/category/serenity",
    "/products/category/infusions",
    "/products/category/cold-brew",
    "/products/category/gift-pack",
  ];

  const productRoutes = PRODUCT_CATALOG.products
    .filter((product) => product.productType === "tea")
    .map((product) => `/products/${product.slug}`);

  const routes = [...staticRoutes, ...businessRoutes, ...collectionRoutes, ...productRoutes];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency:
      route.includes("products") || route.startsWith("/business") ? "weekly" : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/products" || route === "/business"
          ? 0.9
          : route.includes("products") || route.startsWith("/business")
            ? 0.8
            : 0.7,
  }));
}
