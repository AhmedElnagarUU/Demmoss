// The decorations and icons of the source design, drawn in SVG. All are decorative (aria-hidden) except where noted.

const decoBase = "pointer-events-none absolute";

// Source #leaf symbol: a green stem with four leaves.
export function Leaf({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 60 60" className={`${decoBase} ${className}`}>
      <path d="M30 58 C30 40 28 28 30 6" stroke="#8fae6b" strokeWidth="2" fill="none" />
      <path
        d="M30 20 C14 18 8 8 12 4 C22 4 30 10 30 20Z M30 30 C46 28 52 18 48 14 C38 14 30 20 30 30Z M30 42 C16 42 8 34 10 28 C20 28 30 32 30 42Z M30 36 C44 38 52 32 52 26 C42 26 32 28 30 36Z"
        fill="#7ea05b"
      />
    </svg>
  );
}

// Source #dots symbol: scattered copper seeds.
export function Dots({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 60 60" className={`${decoBase} ${className}`}>
      <g fill="#c8864a">
        <circle cx="8" cy="10" r="3" />
        <circle cx="26" cy="6" r="2" />
        <circle cx="44" cy="14" r="3.5" />
        <circle cx="16" cy="30" r="2.5" />
        <circle cx="38" cy="34" r="2" />
        <circle cx="52" cy="48" r="3" />
        <circle cx="24" cy="50" r="3.5" />
        <circle cx="6" cy="52" r="2" />
      </g>
    </svg>
  );
}

// The silver fork between the two gallery plates.
export function Fork({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 220" className={className}>
      <path
        d="M6 4v50c0 10 6 14 10 16v4c-2 30-4 60-3 90 0 20 3 40 7 52 4-12 7-32 7-52 1-30-1-60-3-90v-4c4-2 10-6 10-16V4h-3v40h-3V4h-3v40h-3V4h-3v40H9V4Z"
        fill="#cfd2cc"
        stroke="#8d938b"
        strokeWidth="1"
      />
    </svg>
  );
}

// The torn paper edge at the bottom of a section. Each of the three source edges has its own outline;
// `fillClass` paints it with the color of the next section.
const edges = {
  hero: "M0 50V22l30 6 40-8 50 10 45-12 60 8 55-10 70 12 50-8 60 6 55-12 65 10 60-6 55 8 70-10 60 10 60-8 70 8 55-10 65 8 55-6V50Z",
  signature:
    "M0 50V26l40-8 55 10 50-10 60 8 45-12 65 10 55-6 60 10 50-10 65 8 55-10 60 8 50-6 70 10 60-8 55 6 65-10 55 8 45-4V50Z",
  gallery:
    "M0 50V28l50-10 55 12 45-8 60 6 50-12 70 10 45-6 60 10 55-10 60 8 55-8 65 10 50-8 60 8 70-10 55 8 60-4V50Z",
} as const;

export function TornEdge({ shape, fillClass }: { shape: keyof typeof edges; fillClass: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 50"
      preserveAspectRatio="none"
      className={`${decoBase} start-0 -bottom-px block h-[50px] w-full`}
    >
      <path d={edges[shape]} className={fillClass} />
    </svg>
  );
}

// Footer social icons (source paths).
const socialPaths = {
  instagram:
    "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm5 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm5.5-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z",
  facebook: "M14 8V6c0-1 .3-1.5 1.6-1.5H17V1h-2.7C11 1 10 3 10 5.5V8H7v3.5h3V23h4V11.5h3l.5-3.5Z",
  x: "M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h6l4 6Z",
} as const;

export type SocialName = keyof typeof socialPaths;

export function SocialIcon({ name }: { name: SocialName }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="w-4 fill-text group-hover:fill-on-primary">
      <path d={socialPaths[name]} />
    </svg>
  );
}

// The gold map pin of the source map block.
export function MapPin() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="w-[30px] fill-primary">
      <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

// The three-line menu icon of the mobile burger button.
export function BurgerIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="14"
      viewBox="0 0 20 14"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M0 1h20M0 7h20M0 13h20" />
    </svg>
  );
}
