import { cache } from "react";

import { apiRoutes, apiUrl } from "@/lib/api";
import { asNumber, asRecord, asString } from "@/lib/api/json";

export type PublicReview = {
  id: string;
  customerName: string;
  role: string | null;
  text: string;
  rating: number | null;
  imageUrl: string | null;
  date: string | null;
};

const reviewDate = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Asia/Jakarta",
});

function asRating(value: unknown) {
  const rating = asNumber(value);
  if (rating == null) {
    return null;
  }

  const rounded = Math.round(rating);
  if (rounded < 1 || rounded > 5) {
    return null;
  }

  return rounded;
}

function formatReviewDate(value: unknown) {
  const raw = asString(value);
  if (!raw) {
    return null;
  }

  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return reviewDate.format(date);
}

function parseReviews(body: unknown): PublicReview[] | null {
  const record = asRecord(body);
  const data = record && "data" in record ? record.data : body;
  if (!Array.isArray(data)) {
    return null;
  }

  return data.flatMap((item) => {
    const row = asRecord(item);
    if (!row) {
      return [];
    }

    const id = asString(row.id);
    const customerName = asString(row.customer_name);
    const text = asString(row.review_text);
    if (!id || !customerName || !text) {
      return [];
    }

    return [
      {
        id,
        customerName,
        role: asString(row.customer_role_or_organization),
        text,
        rating: asRating(row.rating),
        imageUrl: asString(row.customer_image),
        date: formatReviewDate(row.created_at),
      },
    ];
  });
}

export const getPublicReviews = cache(async (): Promise<PublicReview[] | null> => {
  const url = apiUrl(apiRoutes.reviews);
  if (!url) {
    return null;
  }

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 60 },
    });
    if (!response.ok) {
      return null;
    }

    return parseReviews(await response.json());
  } catch {
    return null;
  }
});
