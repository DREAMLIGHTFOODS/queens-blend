/**
 * ============================================================================
 * Queen's Blend
 * File: components/core/layout/PageHeader.tsx
 * Purpose: Page header with title, description, and breadcrumb support
 * ============================================================================
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Container } from "./Container";

const pageHeaderVariants = cva("relative w-full", {
  variants: {
    spacing: {
      sm: "py-8 md:py-12",
      md: "py-12 md:py-16",
      lg: "py-16 md:py-24",
      xl: "py-24 md:py-32",
    },

    variant: {
      default: "bg-background text-foreground",
      muted: "bg-muted text-foreground",
      surface: "bg-surface text-surface-foreground",
    },
  },

  defaultVariants: {
    spacing: "lg",
    variant: "default",
  },
});

export interface PageHeaderProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "title">,
    VariantProps<typeof pageHeaderVariants> {
  title: React.ReactNode;
  description?: React.ReactNode;
  containerSize?: React.ComponentProps<typeof Container>["size"];
}

export function PageHeader({
  title,
  description,
  spacing,
  variant,
  containerSize = "lg",
  className,
  children,
  ...props
}: PageHeaderProps) {
  return (
    <header className={cn(pageHeaderVariants({ spacing, variant }), className)} {...props}>
      <Container size={containerSize} className="flex flex-col gap-4">
        {typeof title === "string" ? <h1 className="text-4xl md:text-5xl font-bold">{title}</h1> : title}

        {description &&
          (typeof description === "string" ? (
            <p className="text-lg text-muted-foreground">{description}</p>
          ) : (
            description
          ))}

        {children}
      </Container>
    </header>
  );
}
