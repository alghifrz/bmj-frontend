import type { Metadata } from "next";
import { Suspense } from "react";

import { CatalogHeader } from "@/components/products/catalog-header";
import { CatalogListing } from "@/components/products/catalog-listing";
import { BrandFilter, CatalogActiveFilters, CategoryFilter } from "@/components/products/filter-data";
import { Container } from "@/components/layout/container";
import { ProductControls } from "@/components/products/product-controls";
import { CatalogResultsSkeleton, ControlsSkeleton, FieldSkeleton } from "@/components/products/product-skeleton";
import type { SearchParams } from "@/lib/catalog";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Produk Alat Kesehatan",
  description:
    "Telusuri katalog peralatan dan produk kesehatan Buana Medika Jaya. Cari produk dan saring berdasarkan kategori.",
  ...(siteUrl ? { alternates: { canonical: "/produk" } } : {}),
};

export default function ProdukPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <>
      <CatalogHeader />
      <Container className="pb-16">
        <Suspense fallback={<ControlsSkeleton />}>
          <ProductControls
            categorySlot={
              <Suspense fallback={<FieldSkeleton label="Kategori" />}>
                <CategoryFilter />
              </Suspense>
            }
            brandSlot={
              <Suspense fallback={<FieldSkeleton label="Merek" />}>
                <BrandFilter searchParams={searchParams} />
              </Suspense>
            }
          />
        </Suspense>
        <Suspense fallback={null}>
          <CatalogActiveFilters searchParams={searchParams} />
        </Suspense>
        <Suspense fallback={<CatalogResultsSkeleton />}>
          <CatalogListing searchParams={searchParams} />
        </Suspense>
      </Container>
    </>
  );
}
