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

  keywords: [
    "Premium Tea",
    "Loose Leaf Tea",
    "Tea Bags",
    "Indian Tea",
    "Darjeeling Tea",
    "Queen's Blend",
  ],

  authors: [{ name: SITE.company }],
};
