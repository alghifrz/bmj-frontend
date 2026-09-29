import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "quiet";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-on-primary hover:bg-primary-hover",
  secondary: "bg-secondary text-on-secondary hover:bg-secondary-hover",
  outline: "border border-border bg-transparent text-foreground hover:border-foreground",
  quiet: "bg-transparent px-0 text-foreground hover:text-secondary",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

type ButtonProps = ButtonAsButton | ButtonAsLink;

function buttonClasses(variant: Variant, size: Size, className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-sm font-medium transition-colors duration-200",
    variants[variant],
    sizes[size],
    className,
  );
}

function isLinkButton(props: ButtonProps): props is ButtonAsLink {
  return typeof props.href === "string";
}

export function Button(props: ButtonProps) {
  if (isLinkButton(props)) {
    return <LinkButton {...props} />;
  }

  return <NativeButton {...props} />;
}

function LinkButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  onClick,
  ...anchorProps
}: ButtonAsLink) {
  const classes = buttonClasses(variant, size, className);

  if (href.startsWith("http://") || href.startsWith("https://")) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" onClick={onClick} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

function NativeButton({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...buttonProps
}: ButtonAsButton) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...buttonProps}>
      {children}
    </button>
  );
}
