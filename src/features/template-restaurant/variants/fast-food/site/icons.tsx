// Small line icons for the promises, the info strip and the cards. Decorative: the text next to them says everything.
const paths = {
  oven: "M3 20V11a9 9 0 0 1 18 0v9zM9 20v-4a3 3 0 0 1 6 0v4",
  pasta: "M4 8c4-3 12-3 16 0M4 12c4-3 12-3 16 0M4 16c4-3 12-3 16 0",
  produce: "M12 8c-4 0-7 3-7 7s3 6 7 6 7-2 7-6-3-7-7-7zM12 8c0-3 1-5 4-5-.5 3-1.5 4.5-4 5z",
  flame: "M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z",
  leaf: "M5 19c0-8 5-14 15-14 0 10-6 15-14 15M5 19l8-8",
  bike: "M6 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15l4-8h5l3 8M10 7 8 4H6",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  pin: "M12 21s-6-5.5-6-11a6 6 0 1 1 12 0c0 5.5-6 11-6 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  cart: "M3 4h2l2.4 11h10l2-8H6M9 19.5a1 1 0 1 0 0-.01M17 19.5a1 1 0 1 0 0-.01",
  heart: "M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z",
  arrow: "M4 12h15M13 6l6 6-6 6",
} as const;

export type IconName = keyof typeof paths;

export function Icon({
  name,
  className = "size-6",
  filled = false,
}: {
  name: IconName;
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`${className} shrink-0 ${filled ? "fill-current" : "fill-none"} stroke-current stroke-[1.7]`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}

// The green sun beside the logo (source logo mark: a circle with eight rays).
export function SunMark({ className = "size-[30px]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={`${className} shrink-0 fill-none stroke-current stroke-[1.8]`}
      strokeLinecap="round"
    >
      <circle cx="16" cy="16" r="5.5" />
      <path d="M16 3v4M16 25v4M3 16h4M25 16h4M6.8 6.8l2.8 2.8M22.4 22.4l2.8 2.8M25.2 6.8l-2.8 2.8M9.6 22.4l-2.8 2.8" />
    </svg>
  );
}

// A basil leaf from the source hero. The leaf greens are deliberate one-off colors of the source.
export function Leaf({ className = "", fill, stem }: { className?: string; fill: string; stem?: string }) {
  return (
    <svg viewBox="0 0 60 60" aria-hidden="true" className={className}>
      <path d="M8 52C6 24 24 6 54 6c0 30-18 48-46 46z" fill={fill} />
      {stem ? <path d="M8 52C20 36 32 24 48 12" stroke={stem} strokeWidth="2" fill="none" /> : null}
    </svg>
  );
}
