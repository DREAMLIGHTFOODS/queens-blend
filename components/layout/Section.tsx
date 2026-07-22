import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function Section({
  children,
  className,
}: Props) {
  return (
    <section
      className={cn(
        "py-16 md:py-24 lg:py-32",
        className
      )}
    >
      {children}
    </section>
  );
}