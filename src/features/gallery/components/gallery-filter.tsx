"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { isCategorySlug } from "../categories";

type Chip = { slug: string; label: string };
type Section = { slug: string; content: ReactNode };
type Props = {
  basePath: string;
  label: string;
  allLabel: string;
  chips: Chip[];
  sections: Section[];
  empty: ReactNode;
};

const chipBase =
  "inline-flex min-h-9 items-center rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";
const chipOn = "border-primary bg-primary text-on-primary";
const chipOff =
  "border-border bg-white/[0.03] text-muted hover:border-primary/40 hover:bg-white/[0.06] hover:text-text";

// The page is static and shows every category. In the browser, ?category=slug narrows it.
export function GalleryFilter(props: Props) {
  const requested = useSearchParams().get("category");
  return <GalleryFilterView {...props} selected={isCategorySlug(requested) ? requested : undefined} />;
}

// Also the server-rendered fallback (no category chosen), so every card is in the static HTML.
export function GalleryFilterView({
  basePath,
  label,
  allLabel,
  chips,
  sections,
  empty,
  selected,
}: Props & { selected: string | undefined }) {
  const visible = selected ? sections.filter((section) => section.slug === selected) : sections;

  return (
    <>
      {chips.length > 0 && (
        <nav aria-label={label} className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <ul className="flex flex-wrap gap-2">
            <li>
              <Link
                href={basePath}
                aria-current={selected ? undefined : "page"}
                className={`${chipBase} ${selected ? chipOff : chipOn}`}
              >
                {allLabel}
              </Link>
            </li>
            {chips.map((chip) => (
              <li key={chip.slug}>
                <Link
                  href={`${basePath}?category=${chip.slug}`}
                  aria-current={selected === chip.slug ? "page" : undefined}
                  className={`${chipBase} ${selected === chip.slug ? chipOn : chipOff}`}
                >
                  {chip.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {visible.length > 0 ? visible.map((section) => section.content) : empty}
    </>
  );
}
