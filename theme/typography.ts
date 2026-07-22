/**
 * Typed references to the typography tokens defined in tokens.css.
 */
export const typography = {
  fontFamily: {
    sans: "var(--font-sans)",
    mono: "var(--font-mono)",
  },

  fontSize: {
    displayXl: "var(--text-display-xl)",
    display: "var(--text-display)",
    h1: "var(--text-h1)",
    h2: "var(--text-h2)",
    h3: "var(--text-h3)",
    h4: "var(--text-h4)",
    lead: "var(--text-lead)",
    bodyLarge: "var(--text-body-large)",
    body: "var(--text-body)",
    small: "var(--text-small)",
    caption: "var(--text-caption)",
    overline: "var(--text-overline)",
  },

  lineHeight: {
    display: "var(--leading-display)",
    heading: "var(--leading-heading)",
    body: "var(--leading-body)",
    compact: "var(--leading-compact)",
  },

  fontWeight: {
    regular: "var(--weight-regular)",
    medium: "var(--weight-medium)",
    semibold: "var(--weight-semibold)",
    bold: "var(--weight-bold)",
  },

  letterSpacing: {
    tight: "var(--tracking-tight)",
    normal: "var(--tracking-normal)",
    wide: "var(--tracking-wide)",
    overline: "var(--tracking-overline)",
  },
} as const;
