/**
 * Queen's Blend Design Tokens
 * Motion
 */

export const DURATION = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.6,
} as const;

export const EASING = {
  standard: [0.22, 1, 0.36, 1],
  smooth: [0.4, 0, 0.2, 1],
} as const;

export const VIEWPORT = {
  once: true,
  amount: 0.2,
} as const;
