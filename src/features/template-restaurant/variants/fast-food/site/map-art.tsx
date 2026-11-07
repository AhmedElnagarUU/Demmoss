import type { ReactNode } from "react";

// The CSS-drawn street map of the source: warm paper base, a 36px grid, two white roads, a green park blob.
const layers =
  "bg-[linear-gradient(90deg,transparent_48%,#ffffff_48%,#ffffff_52%,transparent_52%),linear-gradient(0deg,transparent_60%,#ffffff_60%,#ffffff_64%,transparent_64%),repeating-linear-gradient(0deg,#e6dcc6_0_1px,transparent_1px_36px),repeating-linear-gradient(90deg,#e6dcc6_0_1px,transparent_1px_36px),#efe6d3]";

export function MapArt({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative grid h-[200px] place-items-center overflow-hidden rounded-[22px] shadow-(--sl-shadow) ${layers} ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute start-[8%] top-[12%] h-2/5 w-[22%] rounded-[14px] bg-[#cfe0c3]"
      />
      {children}
    </div>
  );
}
