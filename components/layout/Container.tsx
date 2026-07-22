import { cn } from "@/lib/utils";
import type { DivProps } from "@/types";

export function Container({ className, children, ...props }: DivProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-(--container-width) px-(--container-padding)", className)}
      {...props}
    >
      {children}
    </div>
  );
}
