import type { Metadata } from "next";

import { SITE } from "./site";

export const DEFAULT_METADATA: Metadata = {
  metadataBase: new URL(SITE.url),

  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },

  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.company }],
  creator: SITE.company,
  publisher: SITE.company,
  category: "Tea and Beverages",
  classification: "Premium Tea Brand",

  keywords: [
    "Queen's Blend",
    "premium tea",
    "loose leaf tea",
    "Indian tea",
    "Darjeeling tea",
    "Assam tea",
    "green tea",
    "black tea",
    "oolong tea",
    "white tea",
    "herbal tea",
    "tea blends",
    "tea gifts",
    "tea subscription",
    "tea guide",
    "tea tasting notes",
    "buy tea online",
    "estate tea",
    "premium tea online India",
    "tea shop",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE.name} premium tea collection`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
    creator: "@queensblend",
    images: [SITE.ogImage],
  },

  alternates: {
    canonical: "/",
  },
};
