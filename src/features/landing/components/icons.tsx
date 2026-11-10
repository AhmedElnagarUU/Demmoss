// Small line icons shared by the landing sections. All decorative (aria-hidden).
type IconProps = { className?: string };

function Svg({ className = "size-4", children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <Svg className={`${className ?? "size-4"} rtl:rotate-180`}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </Svg>
  );
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <Svg className={`${className ?? "size-4"} rtl:-scale-x-100`}>
      <path d="M7 17 17 7M8 7h9v9" />
    </Svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Svg>
  );
}

export function EyeIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </Svg>
  );
}

export function EyeOffIcon({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 4l16 16M9.9 5.8A9 9 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a16 16 0 0 1-3 3.8M6.3 7.5A15 15 0 0 0 2.5 12S6 18.5 12 18.5a8.7 8.7 0 0 0 3.6-.8M10 10a2.8 2.8 0 0 0 4 4" />
    </Svg>
  );
}

const categoryIcons: Record<string, React.ReactNode> = {
  restaurant: (
    <>
      <path d="M7 3v8M4.5 3v5a2.5 2.5 0 0 0 5 0V3M7 11v10" />
      <path d="M17 3c-2 1.5-3 4-3 7h3v11" />
    </>
  ),
  cafe: (
    <>
      <path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z" />
      <path d="M16 10h2.5a2.5 2.5 0 0 1 0 5H16M8 3v2M12 3v2" />
    </>
  ),
  "real-estate": (
    <>
      <path d="M4 20V9l8-5 8 5v11" />
      <path d="M9.5 20v-6h5v6" />
    </>
  ),
  clinic: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M12 8.5v7M8.5 12h7" />
    </>
  ),
  logistics: (
    <>
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  "marketing-agency": (
    <>
      <path d="M4 14V9l11-4v13L4 14Z" />
      <path d="M7 15l1.5 5h2.5L10 15.5M18 9.5a3 3 0 0 1 0 4" />
    </>
  ),
  "online-store": (
    <>
      <path d="M5 8h14l-1 12H6L5 8Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </>
  ),
  fitness: (
    <>
      <path d="M3 10v4M6 8v8M18 8v8M21 10v4M6 12h12" />
    </>
  ),
  education: (
    <>
      <path d="M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9Z" />
      <path d="M6.5 11.5V16c0 1.2 2.5 2.5 5.5 2.5s5.5-1.3 5.5-2.5v-4.5" />
    </>
  ),
  services: (
    <>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M9 8V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v2M3 13h18" />
    </>
  ),
};

export function CategoryIcon({ slug, className }: IconProps & { slug: string }) {
  return (
    <Svg className={className}>
      {categoryIcons[slug] ?? (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l3 2" />
        </>
      )}
    </Svg>
  );
}
