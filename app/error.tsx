"use client";

import { useEffect } from "react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section>
      <Container className="max-w-xl">
        <h1>Terjadi kendala</h1>
        <p className="mt-4 text-base leading-7 text-muted">
          Halaman tidak dapat ditampilkan saat ini. Silakan coba lagi.
        </p>
        <div className="mt-8">
          <Button type="button" onClick={() => retry()}>
            Coba lagi
          </Button>
        </div>
      </Container>
    </Section>
  );
}
