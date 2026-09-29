import { CatalogHeader } from "@/components/products/catalog-header";
import { CatalogPageSkeleton } from "@/components/products/product-skeleton";

export default function ProdukLoading() {
  return (
    <>
      <CatalogHeader />
      <CatalogPageSkeleton />
    </>
  );
}
