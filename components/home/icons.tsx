import type { ReactNode } from "react";

type IconProps = {
  className?: string;
};

function IconBase({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className ?? "h-5 w-5"} fill="none">
      {children}
    </svg>
  );
}

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ArrowIcon({ className }: IconProps) {
  return (
    <IconBase className={className ?? "h-4 w-4"}>
      <path {...stroke} d="M5 12h14M13 6l6 6-6 6" />
    </IconBase>
  );
}

export function BenefitIcon({ index, className }: IconProps & { index: number }) {
  const paths = [
    "M12 3.5 14.2 8l4.8.4-3.6 3.2 1.1 4.7L12 14.8 7.5 16.3 8.6 11.6 5 8.4 9.8 8 12 3.5Z",
    "M4 7h16M4 12h16M4 17h10",
    "M8 11a4 4 0 1 1 5.7 3.6L12 20l-1.7-5.4A4 4 0 0 1 8 11Z",
    "M12 4v16M7 8h7.5a3 3 0 0 1 0 6H7",
    "M8 10a4 4 0 1 1 8 0c0 2.5-2 3.2-2 5.5M12 19.5h.01",
    "M4 16.5 8 8l4 5 3-3 5 6.5",
  ];

  return (
    <IconBase className={className}>
      <path {...stroke} d={paths[index] ?? paths[0]} />
    </IconBase>
  );
}

export function EquipmentMark({ className }: IconProps) {
  return (
    <svg viewBox="20 28 276 300" className={className} aria-hidden="true" fill="none">
      <rect x="28" y="36" width="180" height="220" stroke="#015caa" strokeWidth="1.25" />
      <path
        d="M78 118c18-28 46-28 64 0 10 16 10 36 0 52-16 26-48 26-64 0-10-16-10-36 0-52Z"
        stroke="#015caa"
        strokeWidth="1.25"
      />
      <path d="M110 96v96" stroke="#015caa" strokeWidth="1.25" />
      <circle cx="110" cy="118" r="10" stroke="#81bf16" strokeWidth="1.25" />
      <rect x="168" y="92" width="92" height="128" stroke="#015caa" strokeWidth="1.25" />
      <path d="M184 128h60M184 148h40" stroke="#015caa" strokeWidth="1.25" />
      <circle cx="214" cy="184" r="14" stroke="#81bf16" strokeWidth="1.25" />
      <path d="M236 248c18 8 28 24 28 46" stroke="#015caa" strokeWidth="1.25" />
      <rect x="248" y="292" width="18" height="36" stroke="#015caa" strokeWidth="1.25" />
      <path d="M40 300h120" stroke="#d7e1e7" strokeWidth="1.25" />
    </svg>
  );
}
