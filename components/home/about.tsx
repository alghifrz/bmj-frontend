"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/layout/section-heading";
import { Button } from "@/components/ui/button";
import { audiences } from "@/lib/home-content";

const ease = [0.22, 1, 0.36, 1] as const;

export function About() {
  const reduce = useReducedMotion();
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const insetY = useTransform(scrollYProgress, [0, 1], ["24px", "-24px"]);

  return (
    <Section id="tentang" className="scroll-mt-20 border-t border-border">
      <Container className="grid items-center gap-16 lg:grid-cols-12 lg:gap-20">
        {/* Komposisi foto: foto utama + foto kecil yang menumpuk */}
        <div className="relative mb-10 lg:col-span-7 lg:mb-0">
          <motion.div
            ref={photoRef}
            className="relative aspect-[4/3] overflow-hidden bg-surface shadow-[0_40px_80px_-44px_rgba(20,28,36,0.5)]"
            initial={reduce ? false : { clipPath: "inset(8% 8% 8% 8% round 32px)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 32px)", opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: reduce ? 0 : 1.1, ease }}
          >
            <motion.div className="absolute inset-x-0 -top-[10%] h-[120%]" style={reduce ? undefined : { y }}>
              <Image
                src="/home/bmj-wide.png"
                alt="Koridor klinik yang terang dengan jendela besar"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </motion.div>
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
            />
          </motion.div>

          <motion.div
            className="absolute -bottom-10 right-4 w-36 sm:w-48 lg:-right-8 lg:w-52"
            style={reduce ? undefined : { y: insetY }}
          >
            <motion.div
              className="relative aspect-[4/5] overflow-hidden border-[6px] border-background bg-surface shadow-[0_28px_60px_-28px_rgba(20,28,36,0.55)]"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.35, ease }}
            >
              <Image
                src="/home/bmj-pemeriksaan.png"
                alt="Lampu pemeriksaan dan nampan instrumen"
                fill
                sizes="(min-width: 1024px) 14vw, 30vw"
                className="object-cover object-[center_35%]"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Teks */}
        <motion.div
          className="lg:col-span-5"
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.2 } } }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.8, ease } },
            }}
          >
            <SectionHeading title="Mengenal Buana Medika Jaya" />
          </motion.div>

          <motion.p
            className="mt-7 text-lg leading-8 text-ink sm:text-xl sm:leading-9"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.8, ease } },
            }}
          >
            Buana Medika Jaya adalah penyedia alat kesehatan untuk individu, tenaga kesehatan, klinik, fasilitas
            kesehatan, dan kebutuhan profesional.
          </motion.p>

          <motion.p
            className="mt-5 text-base leading-7 text-muted"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.8, ease } },
            }}
          >
            Fokusnya membantu pelanggan menemukan produk, membaca informasi yang tersedia, dan menghubungi BMJ bila
            dibutuhkan keterangan lebih lanjut.
          </motion.p>

          <motion.div
            className="mt-8"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.8, ease } },
            }}
          >
            <a href="/tentang-kami" className="text-sm text-muted">
              Selengkapnya &rarr;
            </a>
          </motion.div>

          <motion.div
            className="mt-10 border-t border-border pt-8"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.8, ease } },
            }}
          >
            <p className="text-sm text-muted">Melayani</p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {audiences.map((audience) => (
                <li
                  key={audience}
                  className="rounded-md bg-surface px-4 py-2 text-sm text-ink ring-1 ring-border"
                >
                  {audience}
                </li>
              ))}
            </ul>
          </motion.div>


        </motion.div>
      </Container>
    </Section>
  );
}