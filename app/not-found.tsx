import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Section>
      <Container className="max-w-xl">
        <h1>Halaman tidak ditemukan</h1>
        <p className="mt-4 text-base leading-7 text-muted">
          Alamat yang Anda buka tidak tersedia. Silakan kembali ke beranda.
        </p>
        <div className="mt-8">
          <Button href="/" variant="secondary">
            Kembali ke beranda
          </Button>
        </div>
      </Container>
    </Section>
  );
}
