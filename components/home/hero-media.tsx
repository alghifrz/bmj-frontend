"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, type PointerEvent } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const pointerSpring = { stiffness: 140, damping: 22, mass: 0.35 };

type HeroMediaProps = {
  src: string;
  alt: string;
};

export function HeroMedia({ src, alt }: HeroMediaProps) {
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const shiftX = useSpring(pointerX, pointerSpring);
  const shiftY = useSpring(pointerY, pointerSpring);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start start", "end start"],
  });
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, 14]);

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduce || event.pointerType !== "mouse") {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5;
    pointerX.set(relativeX * 8);
    pointerY.set(relativeY * 6);
  }

  function onPointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.div
      ref={frameRef}
      className="relative"
      initial={reduce ? false : { opacity: 0, x: 28, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      style={reduce ? { opacity: 1 } : undefined}
      transition={{ duration: reduce ? 0 : 0.8, delay: reduce ? 0 : 0.22, ease }}
    >
      <div className="relative flex items-stretch gap-4">

        <div className="min-w-0 flex-1" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
          <div className="relative">
            <div aria-hidden="true" className="absolute top-3 left-3 hidden h-full w-full border border-border lg:block" />
            <div className="relative aspect-[4/3] overflow-hidden border border-border bg-surface sm:aspect-[16/10] lg:aspect-[5/4]">
              <motion.div className="absolute inset-0" style={reduce ? undefined : { y: scrollY }}>
                <motion.div className="absolute -inset-6" style={reduce ? undefined : { x: shiftX, y: shiftY }}>
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
