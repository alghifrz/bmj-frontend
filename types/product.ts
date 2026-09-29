export type Product = {
  id: string;
  slug: string;
  name: string;
  category?: string;
  categorySlug?: string;
  brand?: string;
  model?: string;
  imageUrl?: string;
  imageAlt?: string;
  price?: number | null;
  priceVisible?: boolean;
  availability?: string;
};

export type CatalogSort = "relevance" | "name_asc" | "name_desc" | "newest" | "price_asc" | "price_desc";

export type CatalogQuery = {
  search: string;
  category: string;
  brand: string;
  sort: CatalogSort;
  page: number;
  limit: number;
};

export type CatalogPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type CatalogSuccess = {
  status: "ready";
  products: Product[];
  brands: string[];
  pagination: CatalogPagination;
};

export type CatalogUnavailable = {
  status: "unavailable";
  reason: "unconfigured" | "error";
};

export type CatalogResult = CatalogSuccess | CatalogUnavailable;

export type CategoryOption = {
  slug: string;
  name: string;
};
