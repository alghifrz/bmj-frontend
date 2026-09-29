"use client";

import Image from "next/image";
import { useState } from "react";

import type { ProductImage } from "@/lib/api/products";
import { cn } from "@/lib/cn";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const image = images[active] ?? images[0];

  return (
    <div>
      <div className="relative aspect-4/3 overflow-hidden bg-surface">
        {image ? (
          <Image src={image.url} alt={image.alt} fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center px-6 text-sm text-muted">Gambar belum tersedia</span>
        )}
      </div>
      {images.length > 1 ? (
        <ul className="mt-3 grid grid-cols-4 gap-3">
          {images.map((item, index) => {
            const selected = index === active;

            return (
              <li key={`${item.url}-${index}`}>
                <button
                  type="button"
                  aria-label={`Lihat gambar ${index + 1}`}
                  aria-pressed={selected}
                  onClick={() => setActive(index)}
                  className={cn(
                    "relative block aspect-square w-full overflow-hidden bg-surface",
                    selected ? "ring-2 ring-secondary" : "ring-1 ring-border",
                  )}
                >
                  <Image src={item.url} alt="" fill sizes="20vw" className="object-cover" />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
