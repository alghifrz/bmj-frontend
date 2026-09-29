"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function CatalogTransition({
  transitionKey,
  children,
}: {
  transitionKey: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      key={transitionKey}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
