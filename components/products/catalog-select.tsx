import type { SelectHTMLAttributes } from "react";

import { catalogFieldClass } from "@/components/products/fields";
import { cn } from "@/lib/cn";

export function CatalogSelect({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select className={cn(catalogFieldClass, "appearance-none pr-9", className)} {...props}>
        {children}
      </select>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted"
      >
        <path d="M6 9.5 12 15.5 18 9.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </div>
  );
}
