// The Stackwell hexagon mark, drawn in the primary colour with a stack of nodes inside.
export function BrandMark({ className = "size-[26px]" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className={className}>
      <path d="M16 2l12.1 7v14L16 30 3.9 23V9z" fill="var(--color-primary)" />
      <path
        d="M11 12.5l5-2.9 5 2.9v5.8l-5 2.9-5-2.9z"
        fill="none"
        stroke="var(--color-on-primary)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
