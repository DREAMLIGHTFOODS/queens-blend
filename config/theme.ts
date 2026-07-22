export const THEME = {
  defaultTheme: "light",

  enableSystem: true,

  disableTransitionOnChange: true,

  radius: 10,

  container: 1320,
} as const;

export type ThemeConfig = typeof THEME;
