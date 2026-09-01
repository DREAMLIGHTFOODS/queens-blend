import { Container } from "@/components/core/layout/Container";
import { Section } from "@/components/core/layout/Section";
import { Stack } from "@/components/core/layout/Stack";

export default function CategoryLoading() {
  return (
    <Section>
      <Container size="xl">
        <Stack gap="xl">
          <div className="bg-muted h-10 w-64 animate-pulse rounded" />
          <div className="bg-muted h-14 w-full animate-pulse rounded-2xl" />
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-muted aspect-4/3 animate-pulse rounded-2xl" />
            <div className="bg-muted aspect-4/3 animate-pulse rounded-2xl" />
            <div className="bg-muted aspect-4/3 animate-pulse rounded-2xl" />
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
