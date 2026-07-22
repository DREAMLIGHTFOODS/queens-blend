/**
 * ============================================================================
 * Queen's Blend
 * File: components/core/layout/Stack.tsx
 * Purpose: Vertical layout primitive.
 * ============================================================================
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const stackVariants = cva("flex flex-col", {
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

    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },

    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
  },

  defaultVariants: {
    gap: "md",
    align: "stretch",
    justify: "start",
  },
});

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof stackVariants> {}

export function Stack({ className, gap, align, justify, ...props }: StackProps) {
  return (
    <div
      className={cn(
        stackVariants({
          gap,
          align,
          justify,
        }),
        className,
      )}
      {...props}
    />
  );
}
