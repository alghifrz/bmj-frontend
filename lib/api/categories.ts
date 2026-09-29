import { cache } from "react";

import { apiRoutes, apiUrl } from "@/lib/api";
import { asRecord, asString } from "@/lib/api/json";
import type { CategoryOption } from "@/types/product";

export type PublicCategory = {
  slug: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  href: string;
};

function parseCategories(body: unknown): PublicCategory[] {
  const record = asRecord(body);
  const data = record && "data" in record ? record.data : body;
  if (!Array.isArray(data)) {
    return [];
  }

  return data.flatMap((item) => {
    const row = asRecord(item);
    if (!row) {
      return [];
    }

    const slug = asString(row.slug);
    const name = asString(row.name);
    if (!slug || !name) {
      return [];
    }

    return [
      {
        slug,
        name,
        description: asString(row.description),
        imageUrl: asString(row.image_url),
        href: `/produk?category=${encodeURIComponent(slug)}`,
      },
    ];
  });
}

export const getPublicCategories = cache(async (): Promise<PublicCategory[]> => {
  const url = apiUrl(apiRoutes.categories);
  if (!url) {
    return [];
  }

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      return [];
    }

    return parseCategories(await response.json());
  } catch {
    return [];
  }
});

export const getCatalogCategories = cache(async (): Promise<CategoryOption[]> => {
  const categories = await getPublicCategories();
  return categories.map((category) => ({
    slug: category.slug,
    name: category.name,
  }));
});
