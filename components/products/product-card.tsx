"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowIcon } from "@/components/home/icons";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { formatProductPrice } from "@/lib/catalog";
import { productWhatsAppMessage } from "@/lib/whatsapp";
import type { Product } from "@/types/product";

export function ProductCard({
  product,
  priority = false,
  whatsappNumber = null,
  messageTemplate = null,
}: {
  product: Product;
  priority?: boolean;
  whatsappNumber?: string | null;
  messageTemplate?: string | null;
}) {
  const meta = [product.brand, product.model].filter(Boolean).join(" · ");
  const message = productWhatsAppMessage(messageTemplate, product.name);
  const href = `/produk/${product.slug}`;

  return (
    <article className="group flex h-full flex-col border border-border bg-background transition-colors duration-300 hover:border-secondary">
      <Link href={href} className="relative block aspect-4/3 overflow-hidden bg-surface">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 30vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transform-none"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center px-4 text-xs text-muted">
            Gambar belum tersedia
          </span>
        )}
        {product.category ? (
          <span className="absolute bottom-2 left-2 max-w-[calc(100%-1rem)] truncate bg-secondary-soft px-2 py-1 text-[11px] text-secondary sm:bottom-3 sm:left-3 sm:px-2.5 sm:text-xs">
            {product.category}
          </span>
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <h2 className="text-base leading-snug sm:text-xl">
          <Link href={href} className="transition-colors hover:text-secondary">
            {product.name}
          </Link>
        </h2>
        {meta ? <p className="mt-1 line-clamp-1 text-sm text-muted">{meta}</p> : null}
        <div className="mt-auto pt-4">
          <p className="text-[11px] tracking-[0.14em] text-muted uppercase sm:text-xs">Harga</p>
          <p className="mt-1 font-heading text-base text-ink sm:text-lg">{formatProductPrice(product.price, product.priceVisible)}</p>
          <div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:gap-3">
            <WhatsAppButton
              size="sm"
              className="w-full px-2 text-center"
              label="Tanya via WhatsApp"
              message={message}
              number={whatsappNumber}
              track={{ source: "product_card", productSlug: product.slug }}
            >
              <span className="text-white">Tanya via WhatsApp</span>
            </WhatsAppButton>
            <Link
              href={href}
              className="inline-flex items-center justify-center gap-2 text-sm font-medium text-ink transition-colors hover:text-secondary"
            >
              Lihat produk
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
