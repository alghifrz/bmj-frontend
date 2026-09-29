import type { CatalogQuery, CatalogSort } from "@/types/product";

export const CATALOG_PAGE_SIZE = 12;

export const priceInquiryLabel = "Hubungi Kami untuk Informasi Harga";

export const catalogSortOptions: Array<{ value: CatalogSort; label: string }> = [
  { value: "relevance", label: "Relevansi" },
  { value: "name_asc", label: "Nama A-Z" },
  { value: "name_desc", label: "Nama Z-A" },
  { value: "newest", label: "Terbaru" },
  { value: "price_asc", label: "Harga terendah" },
  { value: "price_desc", label: "Harga tertinggi" },
];

const sorts = new Set<string>(catalogSortOptions.map((option) => option.value));

export type SearchParams = Record<string, string | string[] | undefined>;

type QueryInput = SearchParams | { get: (key: string) => string | null };

function readParam(input: QueryInput, key: string) {
  if ("get" in input && typeof input.get === "function") {
    return input.get(key)?.trim() ?? "";
  }

  const raw = (input as SearchParams)[key];
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value?.trim() ?? "";
}

function clip(value: string, max: number) {
  return value.slice(0, max);
}

function isSort(value: string): value is CatalogSort {
  return sorts.has(value);
}

export function parseCatalogQuery(input: QueryInput): CatalogQuery {
  const sortValue = readParam(input, "sort");
  const pageValue = Number.parseInt(readParam(input, "page"), 10);
  const page = Number.isFinite(pageValue) && pageValue > 0 ? Math.min(pageValue, 10000) : 1;

  return {
    search: clip(readParam(input, "search"), 100),
    category: clip(readParam(input, "category"), 200),
    brand: clip(readParam(input, "brand"), 200),
    sort: isSort(sortValue) ? sortValue : "relevance",
    page,
    limit: CATALOG_PAGE_SIZE,
  };
}

export function catalogPath(query: CatalogQuery, patch: Partial<CatalogQuery> = {}) {
  const next = { ...query, ...patch };
  const params = new URLSearchParams();

  if (next.search) {
    params.set("search", next.search);
  }
  if (next.category) {
    params.set("category", next.category);
  }
  if (next.brand) {
    params.set("brand", next.brand);
  }
  if (next.sort !== "relevance") {
    params.set("sort", next.sort);
  }
  if (next.page > 1) {
    params.set("page", String(next.page));
  }

  const qs = params.toString();
  return qs ? `/produk?${qs}` : "/produk";
}

export function hasCatalogConstraints(query: CatalogQuery) {
  return Boolean(query.search || query.category || query.brand || query.sort !== "relevance" || query.page > 1);
}

export function formatProductPrice(price: number | null | undefined, visible: boolean | undefined) {
  if (!visible || price == null) {
    return priceInquiryLabel;
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}
