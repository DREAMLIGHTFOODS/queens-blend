import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type WithChildren = {
  children?: ReactNode;
};

export type WithClassName = {
  className?: string;
};

export type CommonProps = WithChildren & WithClassName;

export type DivProps = ComponentPropsWithoutRef<"div">;

export type SectionProps = ComponentPropsWithoutRef<"section">;

export type ButtonProps = ComponentPropsWithoutRef<"button">;

export interface HeadingProps extends CommonProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
