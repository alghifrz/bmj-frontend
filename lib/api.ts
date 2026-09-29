export const apiRoutes = {
  products: "/api/v1/products",
  categories: "/api/v1/categories",
  reviews: "/api/v1/reviews",
  store: "/api/v1/store",
  analyticsEvents: "/api/v1/analytics/events",
} as const;

export function getApiBaseUrl() {
  const configured = process.env.NEXT_PUBLIC_API_URL?.trim() ?? "";
  if (!configured) {
    return null;
  }

  return configured.replace(/\/$/, "");
}

export function apiUrl(path: string) {
  const base = getApiBaseUrl();
  if (!base) {
    return null;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
