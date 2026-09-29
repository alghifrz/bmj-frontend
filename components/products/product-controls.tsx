"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";

import { CatalogSelect } from "@/components/products/catalog-select";
import { catalogPath, catalogSortOptions, parseCatalogQuery } from "@/lib/catalog";
import type { CatalogSort } from "@/types/product";

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted"
    >
      <circle cx="11" cy="11" r="6.25" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 16.5 20 20.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ProductControls({
  categorySlot,
  brandSlot,
}: {
  categorySlot: ReactNode;
  brandSlot: ReactNode;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const query = parseCatalogQuery(params);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(query.search);
  const [syncedSearch, setSyncedSearch] = useState(query.search);

  if (syncedSearch !== query.search) {
    setSyncedSearch(query.search);
    setDraft(query.search);
  }

  const { search, category, brand, sort, page, limit } = query;

  useEffect(() => {
    const next = draft.trim();
    if (next === search) {
      return;
    }

    const timer = window.setTimeout(() => {
      router.push(catalogPath({ search, category, brand, sort, page, limit }, { search: next, page: 1 }), {
        scroll: false,
      });
    }, 300);

    return () => window.clearTimeout(timer);
  }, [draft, search, category, brand, sort, page, limit, router]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = draft.trim();
    if (next === query.search) {
      return;
    }

    router.push(catalogPath(query, { search: next, page: 1 }), { scroll: false });
  }

  function updateSort(sort: CatalogSort) {
    router.push(catalogPath(query, { sort, page: 1 }), { scroll: false });
  }

  const filterCount =
    Number(Boolean(query.category)) + Number(Boolean(query.brand)) + Number(query.sort !== "relevance");
  const fields = (
    <div className="grid gap-4 md:grid-cols-3">
      {categorySlot}
      {brandSlot}
      <label className="min-w-0">
        <span className="mb-1.5 block text-sm text-foreground">Urutkan</span>
        <CatalogSelect value={query.sort} onChange={(event) => updateSort(event.target.value as CatalogSort)}>
          {catalogSortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </CatalogSelect>
      </label>
    </div>
  );

  return (
    <div className="mt-8 border border-border bg-surface p-4 sm:p-5">
      <form role="search" onSubmit={submit}>
        <label htmlFor="product-search" className="sr-only">
          Cari produk
        </label>
        <div className="relative">
          <SearchIcon />
          <input
            id="product-search"
            name="search"
            type="search"
            value={draft}
            maxLength={100}
            autoComplete="off"
            placeholder="Cari nama, merek, atau model..."
            onChange={(event) => setDraft(event.target.value)}
            className="h-12 w-full border border-border bg-background pr-3 pl-10 text-base text-foreground placeholder:text-muted"
          />
        </div>
        <button type="submit" className="sr-only">
          Cari
        </button>
      </form>

      <div className="mt-3 md:hidden">
        <button
          type="button"
          className="flex h-11 w-full items-center justify-between border border-border bg-background px-3 text-sm text-foreground"
          aria-expanded={open}
          aria-controls="katalog-filter"
          onClick={() => setOpen((value) => !value)}
        >
          Filter dan urutan{filterCount > 0 ? ` (${filterCount})` : ""}
          <span aria-hidden="true" className="text-muted">
            {open ? "−" : "+"}
          </span>
        </button>
      </div>

      <div id="katalog-filter" className={open ? "mt-4" : "mt-4 hidden md:block"}>
        {fields}
      </div>
    </div>
  );
}
