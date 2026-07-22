import { breakpoints } from "./breakpoints";
import { colors } from "./colors";
import { elevation } from "./elevation";
import { motion } from "./motion";
import { radius } from "./radius";
import { spacing } from "./spacing";
import { typography } from "./typography";

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  elevation,
  motion,
  breakpoints,
} as const;

export type Theme = typeof theme;
