/**
 * Queen's Blend Design Tokens
 * Typography
 */

export const FONT_SIZE = {
  hero: {
    min: "3.5rem",
    max: "5.5rem",
  },

  h1: "3rem",
  h2: "2.5rem",
  h3: "2rem",
  h4: "1.75rem",
  h5: "1.5rem",
  h6: "1.25rem",

  bodyLg: "1.125rem",
  body: "1rem",
  bodySm: "0.875rem",
} as const;

export const LINE_HEIGHT = {
  tight: 1.1,
  heading: 1.2,
  body: 1.7,
} as const;

export const LETTER_SPACING = {
  tighter: "-0.04em",
  tight: "-0.02em",
  normal: "0",
  wide: "0.04em",
} as const;
