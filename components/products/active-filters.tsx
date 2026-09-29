import Link from "next/link";

import { catalogPath } from "@/lib/catalog";
import type { CatalogQuery, CategoryOption } from "@/types/product";

export function ActiveFilters({
  query,
  categories,
}: {
  query: CatalogQuery;
  categories: CategoryOption[];
}) {
  const categoryName = categories.find((category) => category.slug === query.category)?.name ?? query.category;
  const items = [
    query.search
      ? { key: "search", label: query.search, href: catalogPath(query, { search: "", page: 1 }) }
      : null,
    query.category
      ? { key: "category", label: categoryName, href: catalogPath(query, { category: "", page: 1 }) }
      : null,
    query.brand ? { key: "brand", label: query.brand, href: catalogPath(query, { brand: "", page: 1 }) } : null,
  ].flatMap((item) => (item ? [item] : []));

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <p className="text-sm text-muted">Filter aktif:</p>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item.key} className="max-w-full">
            <Link
              href={item.href}
              aria-label={`Hapus filter ${item.label}`}
              className="inline-flex max-w-full items-center gap-2 bg-surface px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-secondary-soft"
            >
              <span className="truncate">{item.label}</span>
              <span aria-hidden="true">×</span>
            </Link>
          </li>
        ))}
      </ul>
      {items.length > 1 ? (
        <Link href="/produk" className="text-sm font-medium text-secondary">
          Hapus semua
        </Link>
      ) : null}
    </div>
  );
}
