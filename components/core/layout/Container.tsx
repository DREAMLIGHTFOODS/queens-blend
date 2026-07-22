/**
 * ============================================================================
 * Queen's Blend
 * File: components/primitives/Container.tsx
 * Purpose: Responsive page container.
 * ============================================================================
 */

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-(--layout-padding-inline)", {
  variants: {
    size: {
      sm: "max-w-(--layout-container-sm)",
      md: "max-w-(--layout-container-md)",
      lg: "max-w-(--layout-container-lg)",
      xl: "max-w-(--layout-container-xl)",
      "2xl": "max-w-(--layout-container-2xl)",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    size: "xl",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof containerVariants> {
  as?: keyof HTMLElementTagNameMap;
}

export function Container({ as = "div", size, className, ...props }: ContainerProps) {
  const Component = as;

  return <Component className={cn(containerVariants({ size }), className)} {...props} />;
}
