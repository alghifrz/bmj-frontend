"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { ArrowIcon } from "@/components/home/icons";
import { Container } from "@/components/layout/container";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { homeCta } from "@/lib/home-content";

const ease = [0.22, 1, 0.36, 1] as const;

export function HomeCta() {
  const reduce = useReducedMotion();
  const reduceMotion = reduce === true;

  return (
    <section className="bg-secondary-hover">
      <Container className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16 lg:py-0">
        <motion.div
          className="lg:col-span-6 lg:py-24"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease }}
          style={reduceMotion ? { opacity: 1 } : undefined}
        >
          <div className="h-px w-8 bg-primary" />
          <h2 className="mt-6 max-w-xl text-3xl leading-[1.12] text-white sm:text-5xl">{homeCta.headline}</h2>
          <p className="mt-5 max-w-md text-base leading-7 text-white/75">{homeCta.description}</p>
          <div className="mt-8">
            <WhatsAppButton label={homeCta.label} className="text-white">
              {homeCta.label}
              <ArrowIcon className="h-4 w-4" />
            </WhatsAppButton>
          </div>
        </motion.div>

        <div className="relative aspect-4/3 overflow-hidden lg:col-span-6 lg:aspect-auto lg:min-h-128">
          <Image
            src="/home/bmj-lab.png"
            alt="Mikroskop dan peralatan gelas di meja laboratorium"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
