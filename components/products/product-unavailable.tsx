"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export function ProductUnavailable({ reason }: { reason: "unconfigured" | "error" }) {
  const router = useRouter();
  const detail =
    reason === "unconfigured"
      ? "Sumber data katalog belum tersedia. Daftar produk akan muncul setelah katalog terhubung."
      : "Terjadi kendala saat mengambil data produk.";

  return (
    <div className="px-2 py-16 text-center" role="status">
      <h2 className="text-xl">Produk belum dapat dimuat</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">{detail}</p>
      <div className="mt-6">
        <Button type="button" variant="outline" onClick={() => router.refresh()}>
          Coba lagi
        </Button>
      </div>
    </div>
  );
}
