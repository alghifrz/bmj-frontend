"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";

import { BrandLogo } from "@/components/layout/brand-logo";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { NavLinks } from "@/components/navigation/nav-links";
import { cn } from "@/lib/cn";
import { usePathname } from "next/navigation";

const ease = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState(pathname);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 12;
    setScrolled((current) => (current === next ? current : next));
  });

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) {
      return;
    }

    const started = performance.now();
    let frame = 0;

    function tick() {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
        return;
      }

      if (performance.now() - started < 3000) {
        frame = window.requestAnimationFrame(tick);
      }
    }

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, reduce]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }
      setOpen(false);
      buttonRef.current?.focus();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40">
      <AnimatePresence>
        {open ? (
          <motion.button
            key="nav-scrim"
            type="button"
            aria-label="Tutup menu"
            className="fixed inset-0 bg-ink/30 lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            onClick={() => setOpen(false)}
          />
        ) : null}
      </AnimatePresence>
      <div className="relative z-10 px-4 pt-3 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl">
          <div
            className={cn(
              "relative flex h-20 items-center gap-2 rounded-2xl border border-border bg-background/75 backdrop-blur-sm px-2.5 transition-shadow duration-300 sm:px-3.5",
              scrolled || open
                ? "shadow-[0_16px_40px_-20px_rgba(20,28,36,0.45)]"
                : "shadow-[0_8px_24px_-18px_rgba(20,28,36,0.35)]",
            )}
          >
            <BrandLogo />
            <nav aria-label="Utama" className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
              <NavLinks />
            </nav>
            <div className="ml-auto hidden shrink-0 lg:block">
              <WhatsAppButton size="sm" className="rounded-md! px-4 text-white" />
            </div>
            <button
              ref={buttonRef}
              type="button"
              className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface lg:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Tutup menu" : "Menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <MenuIcon open={open} reduce={reduce} />
            </button>
          </div>
          <AnimatePresence>
            {open ? (
              <motion.div
                id={menuId}
                key="mobile-menu"
                initial={reduce ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: reduce ? 0 : 0.28, ease }}
                className="absolute inset-x-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-2xl border border-border bg-background/75 backdrop-blur-sm px-3 pt-1 pb-4 shadow-[0_24px_50px_-24px_rgba(20,28,36,0.45)] lg:hidden"
              >
                <nav aria-label="Menu">
                  <NavLinks orientation="vertical" onNavigate={() => setOpen(false)} />
                  <WhatsAppButton className="mt-4 w-full rounded-md! text-white" />
                </nav>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

function MenuIcon({ open, reduce }: { open: boolean; reduce: boolean | null }) {
  const transition = { duration: reduce ? 0 : 0.28, ease };

  return (
    <span className="relative block h-3.5 w-4">
      <motion.span
        className="absolute left-0 h-px w-4 bg-current"
        initial={false}
        animate={open ? { top: 6, rotate: 45 } : { top: 1, rotate: 0 }}
        transition={transition}
      />
      <motion.span
        className="absolute left-0 top-1.5 h-px w-4 bg-current"
        initial={false}
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={transition}
      />
      <motion.span
        className="absolute left-0 h-px w-4 bg-current"
        initial={false}
        animate={open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }}
        transition={transition}
      />
    </span>
  );
}
