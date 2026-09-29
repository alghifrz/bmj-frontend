"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { MouseEvent } from "react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { cn } from "@/lib/cn";
import { services } from "@/lib/home-content";

const ease = [0.22, 1, 0.36, 1] as const;

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none" as const,
};

function ServiceIcon({ title, className }: { title: string; className?: string }) {
  const common = { viewBox: "0 0 24 24", className: cn("size-6", className), "aria-hidden": true as const };

  if (title.startsWith("Penyediaan")) {
    return (
      <svg {...common}>
        <path {...stroke} d="M12 3.5 20 8v8L12 20.5 4 16V8l8-4.5Z" />
        <path {...stroke} d="M12 12.2 20 8M12 12.2V20.5M12 12.2 4 8" />
      </svg>
    );
  }

  if (title.startsWith("Pengadaan")) {
    return (
      <svg {...common}>
        <path {...stroke} d="M8 3.5h8l1.2 3H6.8L8 3.5Z" />
        <path {...stroke} d="M6.8 6.5h10.4V20H6.8V6.5Z" />
        <path {...stroke} d="m9.2 12.2 1.6 1.6 3.4-3.6" />
      </svg>
    );
  }

  if (title.startsWith("Konsultasi")) {
    return (
      <svg {...common}>
        <path {...stroke} d="M5 5.5h14v8.2H8.2L5 17.2v-3.5H5V5.5Z" />
        <path {...stroke} d="M8.5 9h7M8.5 11.8h4.5" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path {...stroke} d="M3 8h11v7H3V8Z" />
      <path {...stroke} d="M14 11h3.5L20.5 14v1H14" />
      <circle {...stroke} cx="7" cy="17.5" r="1.5" />
      <circle {...stroke} cx="17" cy="17.5" r="1.5" />
    </svg>
  );
}

// Sorotan cahaya yang mengikuti kursor di dalam baris
function trackPointer(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
}

export function Services() {
  const reduce = useReducedMotion();
  const reduceMotion = reduce === true;

  return (
    <Section id="layanan" className="scroll-mt-20 border-t border-border">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Kiri: judul menempel saat daftar layanan di-scroll */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                title="Layanan"
                description="Penyediaan, pengadaan, konsultasi, serta pemesanan dan pengiriman alat kesehatan."
              />
            </div>
          </div>

          {/* Kanan: daftar layanan besar dengan sorotan kursor */}
          <motion.ul
            className="lg:col-span-8"
            initial={reduceMotion ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: reduceMotion ? 0 : 0.1 } } }}
          >
            {services.map((service) => (
              <motion.li
                key={service.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.7, ease } },
                }}
                onMouseMove={trackPointer}
                className="group relative overflow-hidden border-b border-border first:border-t"
              >
                {/* Sorotan cahaya */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none"
                  style={{
                    background:
                      "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(20,28,36,0.06), transparent 70%)",
                  }}
                />

                {/* Ikon besar sebagai latar di kanan */}
                <ServiceIcon
                  title={service.title}
                  className="pointer-events-none absolute -right-4 top-1/2 hidden size-40 -translate-y-1/2 text-secondary opacity-[0.07] transition-all duration-700 ease-out group-hover:-translate-x-4 group-hover:opacity-[0.14] motion-reduce:transition-none sm:block"
                />

                <div className="relative flex items-start gap-5 py-8 sm:gap-8 sm:py-10">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-surface text-secondary ring-1 ring-border transition-all duration-500 group-hover:scale-105 group-hover:bg-secondary group-hover:text-white group-hover:ring-secondary motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                    <ServiceIcon title={service.title} className="size-7" />
                  </span>

                  <div className="min-w-0 sm:pr-32">
                    <h3 className="font-heading text-2xl leading-snug text-ink transition-transform duration-500 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 sm:text-3xl">
                      {service.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-sm leading-7 text-muted sm:text-base">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </Section>
  );
}