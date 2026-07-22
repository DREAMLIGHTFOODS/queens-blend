/**
 * ============================================================================
 * Queen's Blend
 * File: components/core/layout/Section.tsx
 * Purpose: Semantic page section with configurable spacing and optional
 *          container wrapper.
 * ============================================================================
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Container } from "./Container";

const sectionVariants = cva("relative w-full", {
  variants: {
    spacing: {
      none: "py-0",
      xs: "py-8",
      sm: "py-12",
      md: "py-16",
      lg: "py-24",
      xl: "py-32",
    },

    variant: {
      default: "bg-background text-foreground",
      surface: "bg-surface text-surface-foreground",
      muted: "bg-muted text-foreground",
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
    },
  },

  defaultVariants: {
    spacing: "lg",
    variant: "default",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof sectionVariants> {
  /**
   * Wrap children with Container.
   */
  contained?: boolean;

  /**
   * Container size.
   */
  containerSize?: React.ComponentProps<typeof Container>["size"];
}

export function Section({
  className,
  spacing,
  variant,
  contained = false,
  containerSize,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(sectionVariants({ spacing, variant }), className)} {...props}>
      {contained ? <Container size={containerSize}>{children}</Container> : children}
    </section>
  );
}
