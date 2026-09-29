"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { navItems } from "@/lib/site";

type NavLinksProps = {
  orientation?: "horizontal" | "vertical";
  onNavigate?: () => void;
};

const links = navItems.filter((item) => item.label !== "Kategori" && item.label !== "Layanan");

const ease = [0.22, 1, 0.36, 1] as const;

export function NavLinks({ orientation = "horizontal", onNavigate }: NavLinksProps) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const vertical = orientation === "vertical";
  const [hovered, setHovered] = useState<string | null>(null);

  function follow(event: { preventDefault: () => void }, href: string) {
    onNavigate?.();
    const id = href.split("#")[1];
    if (!id || pathname !== "/") {
      return;
    }

    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    window.history.pushState(null, "", `/#${id}`);
  }

  if (vertical) {
    return (
      <ul className="flex flex-col">
        {links.map((item, index) => {
          const active = isActive(pathname, item.href);

          return (
            <motion.li
              key={item.href}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : index * 0.045, ease }}
            >
              <NavAnchor
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={(event) => follow(event, item.href)}
                className={cn(
                  "flex items-center justify-between border-b border-border px-2 py-3.5 text-lg font-medium tracking-tight",
                  active ? "text-secondary" : "text-muted",
                )}
              >
                {item.label}
                {active ? <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-secondary" /> : null}
              </NavAnchor>
            </motion.li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className="flex items-center" onMouseLeave={() => setHovered(null)}>
      {links.map((item) => {
        const active = isActive(pathname, item.href);
        const targeted = hovered ? hovered === item.href : active;
        const current = active && targeted;

        return (
          <li key={item.href} onMouseEnter={() => setHovered(item.href)}>
            <NavAnchor
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={(event) => follow(event, item.href)}
              className={cn(
                "relative block whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium transition-colors duration-200 xl:px-3.5",
                current ? "text-secondary" : targeted ? "text-ink" : "text-muted",
              )}
            >
              {targeted ? (
                <motion.span
                  layoutId="nav-highlight"
                  className={cn("absolute inset-0 rounded-md", current ? "bg-secondary-soft" : "bg-surface")}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 34, mass: 0.7 }
                  }
                />
              ) : null}
              <span className="relative z-10">{item.label}</span>
            </NavAnchor>
          </li>
        );
      })}
    </ul>
  );
}

function NavAnchor({
  href,
  className,
  children,
  onClick,
  "aria-current": current,
}: {
  href: string;
  className: string;
  children: ReactNode;
  onClick: (event: { preventDefault: () => void }) => void;
  "aria-current"?: "page";
}) {
  if (href.includes("#")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} aria-current={current} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
