export const SITE = {
  name: "Queen's Blend",

  shortName: "Queen's Blend",

  company: "Queen's Blend",

  tagline: "Premium Estate Tea Collection",

  description:
    "Experience the finest estate-grown teas, thoughtfully crafted to deliver exceptional flavour, aroma, and heritage in every cup.",

  url: "https://queensblend.com",

  locale: "en-IN",

  currency: "INR",

  copyright: `© ${new Date().getFullYear()} Queen's Blend. All rights reserved.`,
} as const;

export type SiteConfig = typeof SITE;
