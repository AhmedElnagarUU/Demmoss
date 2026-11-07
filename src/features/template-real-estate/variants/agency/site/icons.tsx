// The small line icons of the source design (24x24, drawn as strokes). Social icons are filled shapes.
type IconProps = { className?: string };

const stroke = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "aria-hidden": true } as const;

export function BedIcon({ className }: IconProps) {
  return (
    <svg {...stroke} strokeWidth={1.3} className={className}>
      <path d="M3 18V7M3 14h18v4M21 14v-3a3 3 0 0 0-3-3h-7v6" />
    </svg>
  );
}

export function BathIcon({ className }: IconProps) {
  return (
    <svg {...stroke} strokeWidth={1.3} className={className}>
      <path d="M3 12h18v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4zM6 12V6a2 2 0 0 1 4 0" />
    </svg>
  );
}

export function AreaIcon({ className }: IconProps) {
  return (
    <svg {...stroke} strokeWidth={1.3} className={className}>
      <path d="M4 4h16v16H4zM4 10h6v10" />
    </svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg {...stroke} strokeWidth={1.5} className={className}>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
    </svg>
  );
}

export function ChevronIcon({ direction, className }: IconProps & { direction: "start" | "end" }) {
  return (
    <svg {...stroke} strokeWidth={1.5} className={`${className ?? ""} rtl:rotate-180`}>
      <path d={direction === "start" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

const fill = { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true } as const;

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg {...fill} className={className}>
      <path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2zM17.2 5.5a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM12 3c-2.4 0-2.7 0-3.7.1-2.9.1-4.1 1.5-4.2 4.2C4 8.3 4 8.6 4 12s0 3.7.1 4.7c.1 2.7 1.3 4.1 4.2 4.2 1 .1 1.3.1 3.7.1s2.7 0 3.7-.1c2.9-.1 4.1-1.5 4.2-4.2.1-1 .1-1.3.1-4.7s0-3.7-.1-4.7c-.1-2.7-1.3-4.1-4.2-4.2C14.7 3 14.4 3 12 3zm0 1.6c2.4 0 2.7 0 3.6.1 2.1.1 3 1 3.1 3.1.1.9.1 1.2.1 3.6s0 2.7-.1 3.6c-.1 2.1-1 3-3.1 3.1-.9.1-1.2.1-3.6.1s-2.7 0-3.6-.1c-2.1-.1-3-1-3.1-3.1-.1-.9-.1-1.2-.1-3.6s0-2.7.1-3.6c.1-2.1 1-3 3.1-3.1.9-.1 1.2-.1 3.6-.1z" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg {...fill} className={className}>
      <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.7V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.4H7.7V13h2.7v8z" />
    </svg>
  );
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <svg {...fill} className={className}>
      <path d="M5.1 9h3.2v10.5H5.1zM6.7 4a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8zM10.3 9h3v1.4c.5-.9 1.6-1.7 3.2-1.7 3.3 0 3.9 2.2 3.9 5v5.8h-3.2v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7v5.2h-3.2z" />
    </svg>
  );
}

export function XIcon({ className }: IconProps) {
  return (
    <svg {...fill} className={className}>
      <path d="M17.8 3.5h3L14.2 11l7.8 9.5h-6.1l-4.8-5.8-5.5 5.8h-3l7.1-7.9L2.3 3.5h6.2l4.3 5.3zm-1.1 15.2h1.7L7.7 5.2H5.9z" />
    </svg>
  );
}
