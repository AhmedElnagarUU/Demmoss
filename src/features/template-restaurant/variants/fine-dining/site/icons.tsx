// Small line icons for the promise strip. Decorative: the text next to them says everything.
const paths = {
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  flame: "M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z",
  leaf: "M5 19c0-8 5-14 15-14 0 10-6 15-14 15M5 19l8-8",
  star: "M12 3l2.5 5.5 5.5 1-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1z",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name }: { name: IconName }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="size-7 shrink-0 fill-none stroke-(--fd-accent) stroke-[1.5]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}
