"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ArrowIcon } from "@/components/home/icons";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { Button } from "@/components/ui/button";
import type { FeaturedCatalogProduct } from "@/lib/api/products";
import { cn } from "@/lib/cn";
import { productWhatsAppMessage } from "@/lib/whatsapp";

const ease = [0.22, 1, 0.36, 1] as const;

function productMeta(product: FeaturedCatalogProduct) {
  return [product.category, product.brand].filter(Boolean).join(" · ");
}

function ProductPhoto({
  product,
  sizes,
  priority = false,
}: {
  product: FeaturedCatalogProduct;
  sizes: string;
  priority?: boolean;
}) {
  if (!product.imageUrl) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-surface px-6">
        <span className="text-xs text-muted">Gambar belum tersedia</span>
      </div>
    );
  }

  return (
    <Image
      src={product.imageUrl}
      alt={product.imageAlt}
      fill
      priority={priority}
      sizes={sizes}
      className="object-cover"
    />
  );
}

function ProductActions({
  product,
  whatsappNumber,
  messageTemplate,
}: {
  product: FeaturedCatalogProduct;
  whatsappNumber: string | null;
  messageTemplate: string | null;
}) {
  const message = productWhatsAppMessage(messageTemplate, product.name);

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <Button href={product.href} variant="secondary" className="text-white">
        Lihat produk
      </Button>
      <WhatsAppButton
        variant="outline"
        label="Tanya via WhatsApp"
        message={message}
        number={whatsappNumber}
        track={{ source: "featured", productSlug: product.slug }}
      >
        Tanya via WhatsApp
      </WhatsAppButton>
    </div>
  );
}

export function FeaturedProductsView({
  products,
  whatsappNumber,
  messageTemplate,
}: {
  products: FeaturedCatalogProduct[] | null;
  whatsappNumber: string | null;
  messageTemplate: string | null;
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const reduceMotion = reduce === true;
  const selected = products && products.length > 0 ? products[Math.min(active, products.length - 1)] : null;

  return (
    <Section id="produk-unggulan" className="scroll-mt-20 border-t border-border bg-surface">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <SectionHeading
              title="Produk Unggulan"
              description="Pilihan produk yang ditampilkan dari katalog BMJ."
            />
          </div>
          <Link
            href="/produk"
            className="group inline-flex items-center gap-2 self-start text-sm font-medium text-ink transition-colors duration-300 hover:text-secondary sm:self-auto"
          >
            Lihat katalog
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
          </Link>
        </div>

        {products === null ? (
          <p className="mt-12 text-sm text-muted">Produk unggulan belum dapat dimuat.</p>
        ) : products.length === 0 ? (
          <p className="mt-12 text-sm text-muted">Belum ada produk unggulan yang dipublikasikan.</p>
        ) : selected ? (
          <>
            <motion.div
              className="mt-12 hidden gap-8 lg:grid lg:grid-cols-12 lg:gap-10"
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: reduceMotion ? 0 : 0.8, ease }}
              style={reduceMotion ? { opacity: 1 } : undefined}
            >
              <div className="relative min-h-136 overflow-hidden bg-background lg:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selected.slug}
                    className="absolute inset-0"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.45, ease }}
                    style={reduceMotion ? { opacity: 1 } : undefined}
                  >
                    <ProductPhoto product={selected} sizes="(min-width: 1024px) 55vw, 100vw" />
                  </motion.div>
                </AnimatePresence>
                <p className="absolute top-5 left-5 bg-secondary-dark/80 px-3 py-1.5 text-xs tracking-[0.16em] text-white">
                  {String(Math.min(active, products.length - 1) + 1).padStart(2, "0")}
                  <span className="text-white/70"> / {String(products.length).padStart(2, "0")}</span>
                </p>
              </div>

              <div className="flex flex-col lg:col-span-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selected.slug}
                    initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: reduceMotion ? 0 : 0.4, ease }}
                    style={reduceMotion ? { opacity: 1 } : undefined}
                  >
                    {productMeta(selected) ? (
                      <p className="text-sm text-secondary">{productMeta(selected)}</p>
                    ) : null}
                    <h3 className="mt-3 text-4xl leading-[1.05] text-ink">{selected.name}</h3>
                    {selected.shortDescription ? (
                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-muted">{selected.shortDescription}</p>
                    ) : null}
                    <p className="mt-6 text-xs tracking-[0.14em] text-muted uppercase">Harga</p>
                    <p className="mt-1 font-heading text-2xl text-ink">{selected.priceLabel}</p>
                    <ProductActions product={selected} whatsappNumber={whatsappNumber} messageTemplate={messageTemplate} />
                  </motion.div>
                </AnimatePresence>

                <ul className="mt-8 grid gap-2" aria-label="Produk unggulan">
                  {products.map((product, index) => {
                    const isActive = product.slug === selected.slug;

                    return (
                      <li key={product.slug}>
                        <button
                          type="button"
                          aria-pressed={isActive}
                          onMouseEnter={() => setActive(index)}
                          onFocus={() => setActive(index)}
                          onClick={() => setActive(index)}
                          className={cn(
                            "flex w-full items-center gap-4 border px-3 py-2.5 text-left transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-secondary",
                            isActive
                              ? "border-secondary bg-background"
                              : "border-transparent bg-background/60 hover:border-border",
                          )}
                        >
                          <span className="relative size-14 shrink-0 overflow-hidden bg-surface">
                            {product.imageUrl ? (
                              <Image src={product.imageUrl} alt="" fill sizes="56px" className="object-cover" />
                            ) : null}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-ink">{product.name}</span>
                            <span className="block truncate text-xs text-muted">
                              {productMeta(product) || "\u00a0"}
                            </span>
                          </span>
                          <span className="max-w-36 shrink-0 truncate text-right text-sm text-ink">{product.priceLabel}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>

            <ul className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:hidden">
              {products.map((product) => (
                <li key={product.slug} className="w-[84%] shrink-0 snap-start bg-background">
                  <div className="relative aspect-4/3 overflow-hidden bg-surface">
                    <ProductPhoto product={product} sizes="84vw" />
                  </div>
                  <div className="p-5">
                    {productMeta(product) ? <p className="text-sm text-secondary">{productMeta(product)}</p> : null}
                    <h3 className="mt-2 text-2xl text-ink">{product.name}</h3>
                    {product.shortDescription ? (
                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">{product.shortDescription}</p>
                    ) : null}
                    <p className="mt-5 text-xs tracking-[0.14em] text-muted uppercase">Harga</p>
                    <p className="mt-1 font-heading text-xl text-ink">{product.priceLabel}</p>
                    <ProductActions product={product} whatsappNumber={whatsappNumber} messageTemplate={messageTemplate} />
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </Container>
    </Section>
  );
}
