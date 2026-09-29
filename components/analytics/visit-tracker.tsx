"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { trackPageView } from "@/lib/analytics";

export function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || !pathname.startsWith("/")) {
      return;
    }

    trackPageView(pathname);
  }, [pathname]);

  return null;
}
