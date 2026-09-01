import { Container } from "@/components/core/layout/Container";
import { Section } from "@/components/core/layout/Section";
import { Stack } from "@/components/core/layout/Stack";

export default function ProductLoading() {
  return (
    <Section>
      <Container size="xl">
        <Stack gap="xl">
          <div className="bg-muted h-4 w-48 animate-pulse rounded" />
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-muted aspect-4/3 w-full animate-pulse rounded-2xl" />
            <Stack gap="md">
              <div className="bg-muted h-8 w-3/4 animate-pulse rounded" />
              <div className="bg-muted h-4 w-full animate-pulse rounded" />
              <div className="bg-muted h-4 w-11/12 animate-pulse rounded" />
              <div className="bg-muted h-4 w-10/12 animate-pulse rounded" />
              <div className="bg-muted mt-2 h-11 w-44 animate-pulse rounded-full" />
            </Stack>
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
