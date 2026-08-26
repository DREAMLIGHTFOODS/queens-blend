export type NewNavigationItem = {
  title: string;
  href: string;
};

export type NewProductCollectionItem = {
  id:
    "serenity" | "infusions" | "heritage" | "mystique" | "full-bodied" | "cold-brew" | "gift-pack";
  title: string;
  href: string;
};

export const NEW_NAVIGATION: NewNavigationItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Tea Guide",
    href: "/tea-guide",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export const NEW_ALL_PRODUCTS_LINK = {
  title: "All Products",
  href: "/products",
} as const;

export const NEW_PRODUCT_COLLECTIONS: NewProductCollectionItem[] = [
  {
    id: "heritage",
    title: "Heritage",
    href: "/products/category/heritage",
  },
  {
    id: "mystique",
    title: "Mystique",
    href: "/products/category/mystique",
  },
  {
    id: "full-bodied",
    title: "Full-Bodied",
    href: "/products/category/full-bodied",
  },
  {
    id: "serenity",
    title: "Serenity",
    href: "/products/category/serenity",
  },
  {
    id: "infusions",
    title: "Infusions",
    href: "/products/category/infusions",
  },
  {
    id: "cold-brew",
    title: "Cold Brew",
    href: "/products/category/cold-brew",
  },
  {
    id: "gift-pack",
    title: "Gift Pack",
    href: "/products/category/gift-pack",
  },
];
