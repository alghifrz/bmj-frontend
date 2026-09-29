"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { CatalogSelect } from "@/components/products/catalog-select";
import { catalogPath, parseCatalogQuery } from "@/lib/catalog";
import type { CategoryOption } from "@/types/product";

export function ProductCategorySelect({ categories }: { categories: CategoryOption[] }) {
  const router = useRouter();
  const query = parseCatalogQuery(useSearchParams());
  const known = categories.some((category) => category.slug === query.category);

  return (
    <label className="min-w-0">
      <span className="mb-1.5 block text-sm text-foreground">Kategori</span>
      <CatalogSelect
        value={query.category}
        onChange={(event) => {
          router.push(catalogPath(query, { category: event.target.value, page: 1 }), { scroll: false });
        }}
      >
        <option value="">Semua kategori</option>
        {query.category && !known ? <option value={query.category}>{query.category}</option> : null}
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </CatalogSelect>
    </label>
  );
}

export function ProductBrandSelect({ brands }: { brands: string[] }) {
  const router = useRouter();
  const query = parseCatalogQuery(useSearchParams());
  const matched = brands.find(
    (brand) => brand.toLocaleLowerCase("id") === query.brand.toLocaleLowerCase("id"),
  );
  const options = query.brand && !matched ? [query.brand, ...brands] : brands;
  const disabled = options.length === 0;

  return (
    <label className="min-w-0">
      <span className="mb-1.5 block text-sm text-foreground">Merek</span>
      <CatalogSelect
        value={matched ?? query.brand}
        disabled={disabled}
        aria-describedby={disabled ? "merek-kosong" : undefined}
        onChange={(event) => {
          router.push(catalogPath(query, { brand: event.target.value, page: 1 }), { scroll: false });
        }}
      >
        <option value="">Semua merek</option>
        {options.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </CatalogSelect>
      {disabled ? (
        <p id="merek-kosong" className="mt-1.5 text-xs text-muted">
          Belum ada data merek.
        </p>
      ) : null}
    </label>
  );
}
