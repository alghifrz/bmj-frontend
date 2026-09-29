import { CatalogTransition } from "@/components/products/catalog-transition";
import { ProductEmptyState } from "@/components/products/product-empty-state";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductPagination } from "@/components/products/product-pagination";
import { ProductUnavailable } from "@/components/products/product-unavailable";
import { loadCatalog } from "@/lib/api/products";
import { getPublicStore } from "@/lib/api/store";
import { catalogPath, parseCatalogQuery, type SearchParams } from "@/lib/catalog";

export async function CatalogListing({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const query = parseCatalogQuery(await searchParams);
  const [catalog, store] = await Promise.all([loadCatalog(query), getPublicStore()]);

  if (catalog.status === "unavailable") {
    return (
      <div className="mt-8">
        <ProductUnavailable reason={catalog.reason} />
      </div>
    );
  }

  const { pagination, products } = catalog;

  return (
    <CatalogTransition transitionKey={catalogPath(query)}>
      <div className="mt-8">
        <p className="text-sm text-muted" aria-live="polite" aria-atomic="true">
          <span className="font-medium text-ink">{pagination.total.toLocaleString("id-ID")}</span> produk ditemukan
        </p>
        <div className="mt-5">
          {products.length > 0 ? (
            <ProductGrid
              products={products}
              whatsappNumber={store?.whatsappNumber ?? null}
              messageTemplate={store?.messageTemplate ?? null}
            />
          ) : pagination.total > 0 ? (
            <p className="text-sm text-muted" role="status">
              Tidak ada produk di halaman ini.
            </p>
          ) : (
            <ProductEmptyState query={query} />
          )}
        </div>
        <ProductPagination query={query} pagination={pagination} />
      </div>
    </CatalogTransition>
  );
}
