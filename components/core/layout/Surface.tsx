/**
 * ============================================================================
 * Queen's Blend
 * File: components/core/surface/Surface.tsx
 * ============================================================================
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const surfaceVariants = cva("rounded-xl border bg-surface text-surface-foreground", {
  variants: {
    elevation: {
      none: "",
      sm: "shadow-xs",
      md: "shadow-md",
      lg: "shadow-lg",
      xl: "shadow-xl",
    },
  },

  defaultVariants: {
    elevation: "sm",
  },
});

export interface SurfaceProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof surfaceVariants> {
  as?: keyof HTMLElementTagNameMap;
}

export function Surface({ as = "div", className, elevation, ...props }: SurfaceProps) {
  const Component = as;

  return <Component className={cn(surfaceVariants({ elevation }), className)} {...props} />;
}
