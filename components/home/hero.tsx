"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { HeroMedia } from "@/components/home/hero-media";
import { ArrowIcon } from "@/components/home/icons";
import { Container } from "@/components/layout/container";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { Button } from "@/components/ui/button";
import { hero } from "@/lib/home-content";

const ease = [0.22, 1, 0.36, 1] as const;

const heroVisual = {
  src: "/home/bmj-diagnostik.png",
  alt: "Stetoskop, termometer, dan pulse oximeter di atas meja terang",
} as const;

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.86]);

  return (
    <section ref={sectionRef} className="overflow-x-clip border-b border-border lg:min-h-[680px]">
      <Container className="grid items-center gap-10 py-12 sm:py-16 lg:min-h-[680px] lg:grid-cols-12 lg:gap-12 lg:py-16">
        <motion.div
          className="lg:col-span-6"
          style={reduce ? undefined : { opacity: contentOpacity }}
        >
          <motion.h1
            className="mt-5 max-w-xl text-[2.35rem] leading-[1.04] sm:text-5xl lg:text-[3.45rem]"
            {...reveal(reduce, 0.12)}
          >
            <span className="block ">Solusi Kebutuhan</span>
            <span className="block text-secondary  italic">Alat Kesehatan</span>
            <span className="block ">Anda</span>
          </motion.h1>
          <motion.p className="mt-5 max-w-md text-base leading-7 text-muted" {...reveal(reduce, 0.22)}>
            {hero.supporting}
          </motion.p>
          <motion.div className="mt-8 flex flex-wrap items-center gap-3" {...reveal(reduce, 0.32)}>
            <Button href={hero.primaryHref} className="group text-white">
              {hero.primaryCta}
              <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
            <WhatsAppButton variant="outline" label={hero.secondaryCta} className="group">
              {hero.secondaryCta}
              <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </WhatsAppButton>
          </motion.div>
          <motion.div
            className="mt-10 hidden items-center gap-4 border-t border-border pt-4 text-xs tracking-[0.14em] text-muted uppercase lg:flex"
            {...reveal(reduce, 0.44)}
          >
            <span>BMJ</span>
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            <span>Peralatan medis</span>
          </motion.div>
        </motion.div>
        <div className="lg:col-span-6">
          <HeroMedia src={heroVisual.src} alt={heroVisual.alt} />
        </div>
      </Container>
    </section>
  );
}

function reveal(reduce: boolean | null, delay: number) {
  if (reduce) {
    return {
      initial: false as const,
      animate: { opacity: 1, y: 0 },
      style: { opacity: 1 },
      transition: { duration: 0 },
    };
  }

  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.72, delay, ease },
  };
}
