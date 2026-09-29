"use client";

import { useWhatsAppNumber } from "@/components/layout/whatsapp-number";
import { siteConfig } from "@/lib/site";
import { whatsAppHref } from "@/lib/whatsapp";

const unavailableLabel = "Nomor WhatsApp belum dikonfigurasi";

export function FloatingWhatsApp() {
  const label = siteConfig.floatingWhatsAppLabel;
  const href = whatsAppHref(null, useWhatsAppNumber());

  const className =
    "group fixed bottom-4 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-200 hover:bg-[#20BA5A] hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:bottom-6 sm:right-6";

  const content = (
    <>
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-foreground px-3 py-2 text-sm font-medium text-background shadow-lg group-hover:inline-flex group-focus-visible:inline-flex">
        {label}
      </span>

      <WhatsAppIcon />

      <span className="sr-only">{label}</span>
    </>
  );

  if (!href) {
    return (
      <button
        type="button"
        className={className}
        aria-disabled="true"
        title={unavailableLabel}
        aria-label={`${label}. ${unavailableLabel}.`}
      >
        {content}
      </button>
    );
  }

  return (
    <a
      href={href}
      className={className}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
    >
      {content}
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-7 w-7"
    >
      {/* WhatsApp logo circle */}
      <path
        fill="white"
        d="M12.04 2C6.52 2 2.04 6.48 2.04 12c0 1.77.46 3.5 1.34 5.03L2 22l5.12-1.34A9.94 9.94 0 0 0 12.04 22C17.56 22 22.04 17.52 22.04 12S17.56 2 12.04 2Zm0 18.18c-1.62 0-3.2-.43-4.58-1.25l-.33-.2-3.04.8.81-2.96-.21-.34A8.15 8.15 0 1 1 12.04 20.18Z"
      />

      {/* Telephone */}
      <path
        fill="white"
        d="M16.68 13.85c-.25-.13-1.47-.72-1.7-.8-.23-.09-.39-.13-.55.13-.16.25-.63.8-.77.96-.14.17-.28.19-.53.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.49-1.4-1.74-.15-.25-.02-.39.11-.52.11-.11.25-.28.37-.42.12-.14.16-.24.25-.4.08-.17.04-.31-.02-.44-.06-.13-.55-1.34-.75-1.84-.2-.49-.4-.42-.55-.43h-.47c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2s.86 2.32.98 2.48c.12.17 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.16 1.51.1.46-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.29Z"
      />
    </svg>
  );
}