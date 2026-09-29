import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  title: string;
  description?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ title, description, as: Title = "h2", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-full", className)}>
      <div className="h-px w-8 bg-primary mx-auto" />
      <Title className="mt-5 text-3xl leading-tight sm:text-4xl">{title}</Title>
      {description ? <p className="mt-5 text-base leading-7 text-muted">{description}</p> : null}
    </div>
  );
}
