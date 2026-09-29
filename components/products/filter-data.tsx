import { ActiveFilters } from "@/components/products/active-filters";
import { ProductBrandSelect, ProductCategorySelect } from "@/components/products/product-filters";
import { getCatalogCategories } from "@/lib/api/categories";
import { loadCatalog } from "@/lib/api/products";
import { parseCatalogQuery, type SearchParams } from "@/lib/catalog";

export async function CategoryFilter() {
  const categories = await getCatalogCategories();
  return <ProductCategorySelect categories={categories} />;
}

export async function BrandFilter({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const query = parseCatalogQuery(await searchParams);
  const catalog = await loadCatalog(query);
  const brands = catalog.status === "ready" ? catalog.brands : [];
  return <ProductBrandSelect brands={brands} />;
}

export async function CatalogActiveFilters({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const [params, categories] = await Promise.all([searchParams, getCatalogCategories()]);
  return <ActiveFilters query={parseCatalogQuery(params)} categories={categories} />;
}
