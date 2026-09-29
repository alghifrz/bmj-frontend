import { cache } from "react";

import { apiRoutes, apiUrl } from "@/lib/api";
import { asNumber, asRecord, asString } from "@/lib/api/json";
import { whatsAppHref } from "@/lib/whatsapp";

export type PublicLocation = {
  id: string;
  name: string;
  address: string;
  mapsUrl: string;
  embedUrl: string;
};

export type PublicSocialLink = {
  label: string;
  href: string;
};

export type PublicStore = {
  email: string | null;
  operatingHours: string | null;
  whatsappNumber: string | null;
  whatsappHref: string | null;
  messageTemplate: string | null;
  footerText: string | null;
  aboutTitle: string | null;
  aboutSummary: string | null;
  aboutBody: string | null;
  socials: PublicSocialLink[];
  locations: PublicLocation[];
};

function asLatitude(value: unknown) {
  const latitude = asNumber(value);
  if (latitude == null || latitude < -90 || latitude > 90) {
    return null;
  }

  return latitude;
}

function asLongitude(value: unknown) {
  const longitude = asNumber(value);
  if (longitude == null || longitude < -180 || longitude > 180) {
    return null;
  }

  return longitude;
}

function httpsUrl(value: unknown) {
  const url = asString(value);
  if (!url || !url.startsWith("https://")) {
    return null;
  }

  return url;
}

function mapLocation(value: unknown): PublicLocation | null {
  const row = asRecord(value);
  if (!row) {
    return null;
  }

  const id = asString(row.id);
  const name = asString(row.name);
  const address = asString(row.address);
  if (!id || !name || !address) {
    return null;
  }

  const latitude = asLatitude(row.latitude);
  const longitude = asLongitude(row.longitude);
  const query =
    latitude != null && longitude != null ? `${latitude},${longitude}` : `${name}, ${address}`;
  const mapsUrl = httpsUrl(row.google_maps_url) ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return {
    id,
    name,
    address,
    mapsUrl,
    embedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&hl=id&output=embed`,
  };
}

function socialLinks(data: Record<string, unknown>): PublicSocialLink[] {
  const channels = [
    ["Instagram", data.instagram_url],
    ["Facebook", data.facebook_url],
    ["TikTok", data.tiktok_url],
  ] as const;

  return channels.flatMap(([label, value]) => {
    const href = httpsUrl(value);
    return href ? [{ label, href }] : [];
  });
}

function parseStore(body: unknown): PublicStore | null {
  const record = asRecord(body);
  const data = record && "data" in record ? asRecord(record.data) : record;
  if (!data || !Array.isArray(data.locations)) {
    return null;
  }

  const whatsappNumber = asString(data.whatsapp_number);

  return {
    email: asString(data.email),
    operatingHours: asString(data.operating_hours),
    whatsappNumber,
    whatsappHref: whatsAppHref(null, whatsappNumber),
    messageTemplate: asString(data.whatsapp_message_template),
    footerText: asString(data.footer_text),
    aboutTitle: asString(data.about_title),
    aboutSummary: asString(data.about_summary),
    aboutBody: asString(data.about_body),
    socials: socialLinks(data),
    locations: data.locations.flatMap((item) => {
      const location = mapLocation(item);
      return location ? [location] : [];
    }),
  };
}

export const getPublicStore = cache(async (): Promise<PublicStore | null> => {
  const url = apiUrl(apiRoutes.store);
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

    return parseStore(await response.json());
  } catch {
    return null;
  }
});
