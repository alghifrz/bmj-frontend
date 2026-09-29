"use client";

import { useEffect } from "react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function ProdukError({
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
    <Container className="py-16">
      <h1 className="text-[1.75rem] leading-tight">Produk belum dapat dimuat</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted">Terjadi kendala saat mengambil data produk.</p>
      <div className="mt-8">
        <Button type="button" variant="outline" onClick={() => retry()}>
          Coba lagi
        </Button>
      </div>
    </Container>
  );
}
