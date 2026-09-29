import Link from "next/link";

import { catalogPath } from "@/lib/catalog";
import type { CatalogPagination, CatalogQuery } from "@/types/product";

function pageWindow(page: number, totalPages: number) {
  const size = 5;
  let start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + size - 1);
  start = Math.max(1, end - size + 1);
  const pages: number[] = [];

  for (let current = start; current <= end; current += 1) {
    pages.push(current);
  }

  return pages;
}

export function ProductPagination({
  query,
  pagination,
}: {
  query: CatalogQuery;
  pagination: CatalogPagination;
}) {
  if (pagination.page <= 1 && pagination.totalPages <= 1) {
    return null;
  }

  const pages = pageWindow(pagination.page, Math.max(pagination.totalPages, pagination.page));

  return (
    <nav aria-label="Paginasi produk" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {pagination.page > 1 ? (
        <Link
          href={catalogPath(query, { page: pagination.page - 1 })}
          rel="prev"
          aria-label="Halaman sebelumnya"
          className="inline-flex h-10 items-center px-2 text-sm text-foreground"
        >
          Sebelumnya
        </Link>
      ) : (
        <span aria-disabled="true" className="inline-flex h-10 items-center px-2 text-sm text-muted">
          Sebelumnya
        </span>
      )}
      <ol className="flex flex-wrap items-center justify-center gap-2">
        {pages.map((page) => {
          const current = page === pagination.page;

          return (
            <li key={page}>
              {current ? (
                <span
                  aria-current="page"
                  className="inline-flex h-10 min-w-10 items-center justify-center border-b border-foreground px-2 text-sm text-foreground"
                >
                  {page}
                </span>
              ) : (
                <Link
                  href={catalogPath(query, { page })}
                  aria-label={`Halaman ${page}`}
                  className="inline-flex h-10 min-w-10 items-center justify-center px-2 text-sm text-muted hover:text-foreground"
                >
                  {page}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      {pagination.page < pagination.totalPages ? (
        <Link
          href={catalogPath(query, { page: pagination.page + 1 })}
          rel="next"
          aria-label="Halaman berikutnya"
          className="inline-flex h-10 items-center px-2 text-sm text-foreground"
        >
          Berikutnya
        </Link>
      ) : (
        <span aria-disabled="true" className="inline-flex h-10 items-center px-2 text-sm text-muted">
          Berikutnya
        </span>
      )}
    </nav>
  );
}
