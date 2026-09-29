const visitorStorageKey = "bmj_visitor";
const visitorKeyPattern = /^[A-Za-z0-9-]{16,64}$/;

type WhatsAppSource = "product_card" | "product_page" | "featured";

type AnalyticsEvent = {
  kind: "page_view" | "whatsapp_click";
  source: "page" | WhatsAppSource;
  product_slug?: string;
  visitor_key: string;
  path: string;
};

export function trackPageView(path: string) {
  sendEvent({
    kind: "page_view",
    source: "page",
    visitor_key: visitorKey(),
    path,
  });
}

export function trackWhatsAppClick(source: WhatsAppSource, productSlug: string) {
  const path = window.location.pathname || "/";
  if (!markWhatsAppClick(source, productSlug, path)) {
    return;
  }

  sendEvent({
    kind: "whatsapp_click",
    source,
    product_slug: productSlug,
    visitor_key: visitorKey(),
    path,
  });
  window.gtag?.("event", "whatsapp_click", { source, product_slug: productSlug });
}

function markWhatsAppClick(source: string, productSlug: string, path: string) {
  const stamp = `${source}:${productSlug}:${path}`;
  const now = Date.now();
  if (window.__bmjWaStamp === stamp && now - (window.__bmjWaAt ?? 0) < 2000) {
    return false;
  }

  window.__bmjWaStamp = stamp;
  window.__bmjWaAt = now;
  return true;
}

function sendEvent(event: AnalyticsEvent) {
  if (!event.visitor_key) {
    return;
  }

  void fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
    keepalive: true,
  }).catch(() => undefined);
}

function visitorKey() {
  const fresh = fallbackVisitorKey();
  try {
    const existing = window.localStorage.getItem(visitorStorageKey);
    if (existing && visitorKeyPattern.test(existing)) {
      return existing;
    }

    window.localStorage.setItem(visitorStorageKey, fresh);
  } catch {
    return fresh;
  }

  return fresh;
}

function fallbackVisitorKey() {
  const hex = "0123456789abcdef";
  let id = "";
  for (let index = 0; index < 36; index += 1) {
    if (index === 8 || index === 13 || index === 18 || index === 23) id += "-";
    else if (index === 14) id += "4";
    else if (index === 19) id += "a";
    else id += hex[Math.floor(Math.random() * 16)];
  }
  return id;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    __bmjWaStamp?: string;
    __bmjWaAt?: number;
  }
}

