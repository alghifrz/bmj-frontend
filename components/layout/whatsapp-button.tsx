"use client";

import type { ReactNode } from "react";

import { useWhatsAppNumber } from "@/components/layout/whatsapp-number";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick } from "@/lib/analytics";
import { siteConfig } from "@/lib/site";
import { whatsAppHref } from "@/lib/whatsapp";

type WhatsAppTrack = {
  source: "product_card" | "product_page" | "featured";
  productSlug: string;
};

type WhatsAppButtonProps = {
  label?: string;
  message?: string | null;
  number?: string | null;
  className?: string;
  children?: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "quiet";
  size?: "sm" | "md";
  track?: WhatsAppTrack;
};

const unavailableLabel = "Nomor WhatsApp belum dikonfigurasi";

export function WhatsAppButton({
  label = siteConfig.navCtaLabel,
  message,
  number,
  className,
  children,
  variant = "primary",
  size = "md",
  track,
}: WhatsAppButtonProps) {
  const storeNumber = useWhatsAppNumber();
  const href = whatsAppHref(message, number ?? storeNumber);
  const content = children ?? label;

  if (!href) {
    return (
      <Button
        type="button"
        variant={variant}
        size={size}
        className={className}
        aria-disabled="true"
        title={unavailableLabel}
        aria-label={`${label}. ${unavailableLabel}.`}
      >
        {content}
      </Button>
    );
  }

  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      className={className}
      data-wa-source={track?.source}
      data-wa-product={track?.productSlug}
      onClick={() => {
        if (track) trackWhatsAppClick(track.source, track.productSlug);
      }}
    >
      {content}
    </Button>
  );
}
