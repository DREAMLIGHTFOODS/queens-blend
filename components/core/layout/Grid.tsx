/**
 * ============================================================================
 * Queen's Blend
 * File: components/core/layout/Grid.tsx
 * Purpose: Responsive grid primitive.
 * ============================================================================
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const gridVariants = cva("grid", {
  variants: {
    gap: {
      none: "gap-0",
      xs: "gap-2",
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8",
      xl: "gap-12",
      "2xl": "gap-16",
    },

    columns: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
    },
  },

  defaultVariants: {
    gap: "lg",
    columns: 1,
  },
});

export interface GridProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof gridVariants> {
  as?: keyof HTMLElementTagNameMap;

  minItemWidth?: string;
}

export function Grid({
  as = "div",
  className,
  columns,
  gap,
  minItemWidth,
  style,
  ...props
}: GridProps) {
  const Component = as;

  const gridStyle = minItemWidth
    ? ({
        "--grid-min-item-width": minItemWidth,
        ...style,
      } as React.CSSProperties)
    : style;

  return (
    <Component
      className={cn(
        gridVariants({ columns, gap }),
        minItemWidth && "[grid-template-columns:repeat(auto-fit,minmax(var(--grid-min-item-width),1fr))]",
        className,
      )}
      style={gridStyle}
      {...props}
    />
  );
}
