import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-24 lg:py-28", className)}>
      {children}
    </section>
  );
}
