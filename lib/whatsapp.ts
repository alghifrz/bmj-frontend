export function getWhatsAppNumber() {
  return (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").trim();
}

export function whatsAppHref(message?: string | null, number?: string | null) {
  const digits = (number?.trim() || getWhatsAppNumber()).replace(/\D/g, "");
  if (!digits) {
    return null;
  }

  const text = message?.trim();
  if (!text) {
    return `https://wa.me/${digits}`;
  }

  const params = new URLSearchParams({ text });
  return `https://wa.me/${digits}?${params.toString()}`;
}

export function productWhatsAppMessage(template: string | null | undefined, productName: string) {
  const text = template?.trim();
  if (!text) {
    return null;
  }

  return text.replaceAll("{nama_produk}", productName);
}
