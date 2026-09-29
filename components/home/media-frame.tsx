import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type MediaFrameProps = {
  src?: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  children?: ReactNode;
};

export function MediaFrame({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 28vw, 100vw",
  priority = false,
  children,
}: MediaFrameProps) {
  return (
    <div className={cn("relative overflow-hidden bg-surface", className)}>
      {src ? (
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} priority={priority} />
      ) : (
        <div className="absolute inset-0" aria-hidden="true">
          {children}
        </div>
      )}
    </div>
  );
}
