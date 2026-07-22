import { cn } from "@/lib/utils";

type Props = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

export function Heading({
  as: Tag = "h2",
  className,
  children,
}: Props) {
  return (
    <Tag
      className={cn(
        "font-serif tracking-tight text-4xl md:text-5xl lg:text-6xl",
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function Paragraph({
  as: Tag = "p",
  className,
  children,
}: Props) {
  return (
    <Tag
      className={cn(
        "text-base md:text-lg leading-8 text-muted-foreground",
        className
      )}
    >
      {children}
    </Tag>
  );
}