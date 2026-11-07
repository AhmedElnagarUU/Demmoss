// The small line icons of the source design (24x24, drawn as strokes).
type IconProps = { className?: string };

const stroke = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "aria-hidden": true } as const;

export function BedIcon({ className }: IconProps) {
  return (
    <svg {...stroke} strokeWidth={1.4} className={className}>
      <path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 00-3-3h-7v5" />
      <circle cx="7" cy="11" r="1.5" />
    </svg>
  );
}

export function BathIcon({ className }: IconProps) {
  return (
    <svg {...stroke} strokeWidth={1.4} className={className}>
      <path d="M3 12h18v3a4 4 0 01-4 4H7a4 4 0 01-4-4zM6 12V6a2 2 0 013.5-1.3M6 19l-1 2M18 19l1 2" />
    </svg>
  );
}

export function AreaIcon({ className }: IconProps) {
  return (
    <svg {...stroke} strokeWidth={1.4} className={className}>
      <path d="M4 4h16v16H4zM4 10h6v10M14 4v6h6" />
    </svg>
  );
}

// Arrows that point toward the start (previous) or the end (next); they flip in RTL.
export function ArrowIcon({ direction, className }: IconProps & { direction: "start" | "end" }) {
  return (
    <svg {...stroke} strokeWidth={1.4} strokeLinecap="round" className={`${className ?? ""} rtl:rotate-180`}>
      <path d={direction === "start" ? "M19 12H5M11 6l-6 6 6 6" : "M5 12h14M13 6l6 6-6 6"} />
    </svg>
  );
}

const social = {
  ...stroke,
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg {...social} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".6" />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg {...social} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 014 0v4M12 10v7" />
    </svg>
  );
}

export function PinterestIcon({ className }: IconProps) {
  return (
    <svg {...social} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M11 8c3-1 5 1 4 4s-3 2-3 .5M11 12l-2 8" />
    </svg>
  );
}

export function YouTubeIcon({ className }: IconProps) {
  return (
    <svg {...social} className={className}>
      <rect x="2.5" y="5" width="19" height="14" rx="4" />
      <path d="M10 9l5 3-5 3z" />
    </svg>
  );
}
