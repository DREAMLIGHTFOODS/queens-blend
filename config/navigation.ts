export const NAVIGATION = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Products",
    href: "/products",
  },
  {
    title: "Tea Solutions for Business",
    href: "/business",
  },
  {
    title: "Tea Guide",
    href: "/tea-guide",
  },
  {
    title: "Contact",
    href: "/contact",
  },
] as const;

export type NavigationItem = (typeof NAVIGATION)[number];
