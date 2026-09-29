"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  BadgePercent,
  LayoutGrid,
  MessagesSquare,
  Stethoscope,
  Truck,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { benefits } from "@/lib/home-content";

const ease = [0.22, 1, 0.36, 1] as const;

const icons: Record<string, LucideIcon> = {
  "Kualitas produk": BadgeCheck,
  "Ragam produk": LayoutGrid,
  "Layanan profesional": Stethoscope,
  "Harga kompetitif": BadgePercent,
  "Konsultasi produk": MessagesSquare,
  Pengiriman: Truck,
};

export function WhyChoose() {
  const reduce = useReducedMotion();

  return (
    <Section id="mengapa-bmj" className="scroll-mt-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            title="Mengapa memilih Buana Medika Jaya"
            description="Enam hal yang dapat pelanggan gunakan saat mempertimbangkan Buana Medika Jaya."
          />
        </div>

        <motion.ul
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6"
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.08 } } }}
        >
          {benefits.map((benefit) => {
            const Icon = icons[benefit.title] ?? BadgeCheck;
            return (
              <motion.li
                key={benefit.title}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.6, ease } },
                }}
                className="group relative overflow-hidden border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:shadow-[0_20px_40px_-24px_rgba(20,28,36,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-secondary transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none"
                />
                <span className="flex size-12 items-center justify-center rounded-xl bg-surface text-secondary transition-colors duration-300 group-hover:bg-secondary group-hover:text-white">
                  <Icon className="size-6" strokeWidth={1.6} aria-hidden />
                </span>
                <h3 className="mt-5 font-heading text-lg text-ink sm:text-xl">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{benefit.description}</p>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </Section>
  );
}