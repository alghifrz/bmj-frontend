"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ArrowIcon } from "@/components/home/icons";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import type { PublicCategory } from "@/lib/api/categories";
import { cn } from "@/lib/cn";

const ease = [0.22, 1, 0.36, 1] as const;

export function CategoryShowcaseView({ categories }: { categories: PublicCategory[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  return (
    <Section id="kategori" className="scroll-mt-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            title="Kategori produk"
            description="Mulai dari peralatan diagnostik hingga perlengkapan klinik dan laboratorium."
          />
        </div>

        {categories.length === 0 ? (
          <p className="mt-12 text-center text-sm text-muted">Kategori belum tersedia.</p>
        ) : (
          <motion.div
            className="mt-12 lg:mt-16"
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: reduce ? 0 : 0.9, ease }}
          >
            <ul
              className="hidden h-[32rem] gap-2 lg:flex"
              aria-label="Kategori produk"
              onMouseLeave={() => setActive(null)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setActive(null);
                }
              }}
            >
              {categories.map((category, index) => {
                const isActive = index === active;
                const dimmed = active !== null && !isActive;

                return (
                  <li
                    key={category.slug}
                    className={cn(
                      "relative min-w-0 basis-0 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                      isActive ? "grow-[5]" : "grow",
                    )}
                  >
                    <Link
                      href={category.href}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      aria-label={category.name}
                      className="absolute inset-0 overflow-hidden bg-surface outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <CategoryPhoto category={category} sizes={isActive ? "55vw" : "16vw"} active={isActive} />
                      {category.imageUrl ? (
                        <>
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-gradient-to-t from-secondary-dark/75 via-secondary-dark/10 to-transparent"
                          />
                          <span
                            aria-hidden
                            className={cn(
                              "absolute inset-0 bg-black/30 transition-opacity duration-700",
                              dimmed ? "opacity-100" : "opacity-0",
                            )}
                          />
                        </>
                      ) : null}
                      <span
                        className={cn(
                          "absolute top-5 right-5 flex size-11 items-center justify-center rounded-full bg-white text-ink transition-all duration-500",
                          isActive ? "scale-100 opacity-100 delay-300" : "scale-75 opacity-0",
                        )}
                      >
                        <ArrowIcon className="h-4 w-4" />
                      </span>
                      <span
                        className={cn(
                          "absolute bottom-7 left-1/2 -translate-x-1/2 font-heading text-lg whitespace-nowrap transition-opacity duration-300",
                          category.imageUrl ? "text-white" : "text-ink",
                          isActive ? "opacity-0" : "opacity-100 delay-300",
                        )}
                      >
                        {category.name}
                      </span>
                      <span
                        className={cn(
                          "absolute bottom-0 left-0 block w-[28rem] p-8 transition-all duration-500",
                          category.imageUrl ? "text-white" : "text-ink",
                          isActive ? "translate-y-0 opacity-100 delay-300" : "translate-y-3 opacity-0",
                        )}
                      >
                        <span className="block font-heading text-3xl leading-tight font-black">{category.name}</span>
                        {category.description ? (
                          <span
                            className={cn(
                              "mt-3 block max-w-sm text-sm leading-6",
                              category.imageUrl ? "text-white/80" : "text-muted",
                            )}
                          >
                            {category.description}
                          </span>
                        ) : null}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
              {categories.map((category) => (
                <li key={category.slug} className="w-[68%] shrink-0 snap-start sm:w-[38%]">
                  <Link
                    href={category.href}
                    className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-surface outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <CategoryPhoto category={category} sizes="(min-width: 640px) 38vw, 68vw" />
                    {category.imageUrl ? (
                      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                    ) : null}
                    <span className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur-md">
                      <ArrowIcon className="h-4 w-4" />
                    </span>
                    <span className={cn("absolute inset-x-0 bottom-0 block p-4", category.imageUrl ? "text-white" : "text-ink")}>
                      <span className="block font-heading text-lg">{category.name}</span>
                      {category.description ? (
                        <span
                          className={cn(
                            "mt-1 line-clamp-2 block text-xs leading-5",
                            category.imageUrl ? "text-white/75" : "text-muted",
                          )}
                        >
                          {category.description}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </Container>
    </Section>
  );
}

function CategoryPhoto({
  category,
  sizes,
  active = false,
}: {
  category: PublicCategory;
  sizes: string;
  active?: boolean;
}) {
  if (!category.imageUrl) {
    return null;
  }

  return (
    <Image
      src={category.imageUrl}
      alt=""
      fill
      sizes={sizes}
      className={cn(
        "object-cover transition-transform duration-[1200ms] ease-out motion-reduce:transition-none",
        active ? "scale-100" : "scale-110",
      )}
    />
  );
}
