import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export default function Loading() {
  return (
    <Section>
      <Container>
        <p role="status" className="text-sm text-muted">
          Memuat halaman…
        </p>
      </Container>
    </Section>
  );
}
