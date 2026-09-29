import { cache } from "react";

import { apiRoutes, apiUrl } from "@/lib/api";
import { asNumber, asRecord, asString } from "@/lib/api/json";
import { formatProductPrice } from "@/lib/catalog";
import type { CatalogQuery, CatalogResult, CatalogSort, Product } from "@/types/product";

const apiSort: Record<CatalogSort, string> = {
  relevance: "featured",
  name_asc: "name_asc",
  name_desc: "name_desc",
  newest: "newest",
  price_asc: "price_asc",
  price_desc: "price_desc",
};

function uniqueBrands(values: string[]) {
  const seen = new Map<string, string>();

  for (const value of values) {
    const key = value.toLocaleLowerCase("id");
    if (!seen.has(key)) {
      seen.set(key, value);
    }
  }

  return [...seen.values()].sort((a, b) => a.localeCompare(b, "id"));
}

function mapProduct(value: unknown): Product | null {
  const item = asRecord(value);
  if (!item) {
    return null;
  }

  const id = asString(item.id);
  const slug = asString(item.slug);
  const name = asString(item.name);
  if (!id || !slug || !name) {
    return null;
  }

  const category = asRecord(item.category);
  const image = asRecord(item.image);
  const priceVisible = item.price_visible === true;

  return {
    id,
    slug,
    name,
    category: category ? (asString(category.name) ?? undefined) : undefined,
    categorySlug: category ? (asString(category.slug) ?? undefined) : undefined,
    brand: asString(item.brand) ?? undefined,
    model: asString(item.model) ?? undefined,
    imageUrl: image ? (asString(image.image_url) ?? undefined) : undefined,
    imageAlt: image ? (asString(image.alt_text) ?? name) : name,
    price: priceVisible ? asNumber(item.price) : null,
    priceVisible,
    availability: asString(item.availability) ?? undefined,
  };
}

function readBrands(data: Record<string, unknown>, products: Product[]) {
  const facet = Array.isArray(data.brands)
    ? data.brands.flatMap((item) => {
        const brand = asString(item);
        return brand ? [brand] : [];
      })
    : [];
  const fromProducts = products.flatMap((product) => (product.brand ? [product.brand] : []));

  return uniqueBrands([...facet, ...fromProducts]);
}

function toResult(query: CatalogQuery, body: unknown): CatalogResult | null {
  const record = asRecord(body);
  const data = record && "data" in record ? asRecord(record.data) : record;
  if (!data || !Array.isArray(data.items)) {
    return null;
  }

  const products = data.items.flatMap((item) => {
    const product = mapProduct(item);
    return product ? [product] : [];
  });
  const limit = asNumber(data.limit) ?? query.limit;
  const total = asNumber(data.total) ?? products.length;
  const page = asNumber(data.page) ?? query.page;
  const safeLimit = limit > 0 ? limit : query.limit;

  return {
    status: "ready",
    products,
    brands: readBrands(data, products),
    pagination: {
      page: page > 0 ? page : query.page,
      limit: safeLimit,
      total: total >= 0 ? total : 0,
      totalPages: total > 0 ? Math.ceil(total / safeLimit) : 0,
    },
  };
}

function requestUrl(query: CatalogQuery) {
  const base = apiUrl(apiRoutes.products);
  if (!base) {
    return null;
  }

  const params = new URLSearchParams();
  params.set("page", String(query.page));
  params.set("limit", String(query.limit));
  if (query.search) {
    params.set("search", query.search);
  }
  if (query.category) {
    params.set("category", query.category);
  }
  if (query.brand) {
    params.set("brand", query.brand);
  }
  params.set("sort", apiSort[query.sort]);

  return `${base}?${params.toString()}`;
}

const getProductCatalog = cache(async (key: string): Promise<CatalogResult> => {
  const query = JSON.parse(key) as CatalogQuery;
  const url = requestUrl(query);
  if (!url) {
    return { status: "unavailable", reason: "unconfigured" };
  }

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      return { status: "unavailable", reason: "error" };
    }

    const result = toResult(query, await response.json());
    return result ?? { status: "unavailable", reason: "error" };
  } catch {
    return { status: "unavailable", reason: "error" };
  }
});

export function loadCatalog(query: CatalogQuery) {
  return getProductCatalog(JSON.stringify(query));
}

export type FeaturedCatalogProduct = {
  slug: string;
  name: string;
  category: string | null;
  brand: string | null;
  imageUrl: string | null;
  imageAlt: string;
  priceLabel: string;
  href: string;
  shortDescription: string | null;
};

const featuredLimit = 6;

function mapFeaturedProduct(value: unknown): FeaturedCatalogProduct | null {
  const item = asRecord(value);
  if (!item || item.is_featured !== true) {
    return null;
  }

  const slug = asString(item.slug);
  const name = asString(item.name);
  if (!slug || !name) {
    return null;
  }

  const category = asRecord(item.category);
  const image = asRecord(item.image);
  const priceVisible = item.price_visible === true;
  const imageAlt = image ? (asString(image.alt_text) ?? name) : name;

  return {
    slug,
    name,
    category: category ? asString(category.name) : null,
    brand: asString(item.brand),
    imageUrl: image ? asString(image.image_url) : null,
    imageAlt,
    priceLabel: formatProductPrice(priceVisible ? asNumber(item.price) : null, priceVisible),
    href: `/produk/${slug}`,
    shortDescription: asString(item.short_description),
  };
}

export const getFeaturedProducts = cache(async (): Promise<FeaturedCatalogProduct[] | null> => {
  const base = apiUrl(apiRoutes.products);
  if (!base) {
    return null;
  }

  const params = new URLSearchParams({
    featured: "true",
    page: "1",
    limit: String(featuredLimit),
    sort: "featured",
  });

  try {
    const response = await fetch(`${base}?${params.toString()}`, {
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      return null;
    }

    const body = asRecord(await response.json());
    const data = body && "data" in body ? asRecord(body.data) : body;
    if (!data || !Array.isArray(data.items)) {
      return null;
    }

    return data.items.flatMap((item) => {
      const product = mapFeaturedProduct(item);
      return product ? [product] : [];
    });
  } catch {
    return null;
  }
});

export type ProductImage = {
  url: string;
  alt: string;
};

export type ProductDetail = {
  slug: string;
  name: string;
  category: string | null;
  categorySlug: string | null;
  brand: string | null;
  model: string | null;
  shortDescription: string | null;
  description: string | null;
  material: string | null;
  size: string | null;
  functionName: string | null;
  includedComponents: string | null;
  specifications: string | null;
  additionalInformation: string | null;
  availability: string | null;
  priceLabel: string;
  images: ProductImage[];
};

function mapDetail(body: unknown): ProductDetail | null {
  const record = asRecord(body);
  const item = record && "data" in record ? asRecord(record.data) : record;
  if (!item) {
    return null;
  }

  const slug = asString(item.slug);
  const name = asString(item.name);
  if (!slug || !name) {
    return null;
  }

  const category = asRecord(item.category);
  const priceVisible = item.price_visible === true;
  const images = Array.isArray(item.images)
    ? item.images.flatMap((value) => {
        const image = asRecord(value);
        const url = image ? asString(image.image_url) : null;
        if (!image || !url) {
          return [];
        }

        return [{ url, alt: asString(image.alt_text) ?? name }];
      })
    : [];

  return {
    slug,
    name,
    category: category ? asString(category.name) : null,
    categorySlug: category ? asString(category.slug) : null,
    brand: asString(item.brand),
    model: asString(item.model),
    shortDescription: asString(item.short_description),
    description: asString(item.description),
    material: asString(item.material),
    size: asString(item.size),
    functionName: asString(item.function),
    includedComponents: asString(item.included_components),
    specifications: asString(item.specifications),
    additionalInformation: asString(item.additional_information),
    availability: asString(item.availability),
    priceLabel: formatProductPrice(priceVisible ? asNumber(item.price) : null, priceVisible),
    images,
  };
}

export const getPublishedProduct = cache(async (slug: string): Promise<ProductDetail | null> => {
  const base = apiUrl(`${apiRoutes.products}/${encodeURIComponent(slug)}`);
  if (!base) {
    return null;
  }

  try {
    const response = await fetch(base, {
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 60 },
    });
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      return null;
    }

    return mapDetail(await response.json());
  } catch {
    return null;
  }
});
