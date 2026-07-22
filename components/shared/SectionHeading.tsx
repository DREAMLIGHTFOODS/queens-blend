import { Heading, Paragraph } from "./Typography";

type Props = {
  title: string;
  subtitle?: string;
};

export function SectionHeading({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <Heading>{title}</Heading>

      {subtitle && (
        <Paragraph className="mt-5">
          {subtitle}
        </Paragraph>
      )}
    </div>
  );
}