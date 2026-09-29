import { Button } from "@/components/ui/button";
import { hasCatalogConstraints } from "@/lib/catalog";
import type { CatalogQuery } from "@/types/product";

export function ProductEmptyState({ query }: { query: CatalogQuery }) {
  const filtered = hasCatalogConstraints(query);

  return (
    <div className="px-2 py-16 text-center" role="status">
      <h2 className="text-xl">{filtered ? "Produk tidak ditemukan" : "Belum ada produk"}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
        {filtered
          ? "Coba gunakan kata kunci lain atau ubah filter pencarian Anda."
          : "Katalog belum menampilkan produk yang dipublikasikan."}
      </p>
      {filtered ? (
        <div className="mt-6">
          <Button href="/produk" variant="outline">
            Hapus semua filter
          </Button>
        </div>
      ) : null}
    </div>
  );
}
