/**
 * ============================================================================
 * Queen's Blend
 * File: components/core/layout/Cluster.tsx
 * Purpose: Horizontal layout primitive with wrapping.
 * ============================================================================
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const clusterVariants = cva("flex flex-wrap", {
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
      around: "justify-around",
      evenly: "justify-evenly",
    },
  },

  defaultVariants: {
    gap: "md",
    align: "center",
    justify: "start",
  },
});

export interface ClusterProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof clusterVariants> {
  as?: keyof HTMLElementTagNameMap;
}

export function Cluster({ as = "div", className, gap, align, justify, ...props }: ClusterProps) {
  const Component = as;

  return (
    <Component className={cn(clusterVariants({ gap, align, justify }), className)} {...props} />
  );
}
