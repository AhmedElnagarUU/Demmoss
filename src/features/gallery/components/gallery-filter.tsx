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

const chipBase = "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium";
const chipOn = "border-primary bg-primary text-on-primary";
const chipOff = "border-border text-text";

// The page is static and shows every category. In the browser, ?category=slug narrows it.
export function GalleryFilter({ basePath, label, allLabel, chips, sections, empty }: Props) {
  const requested = useSearchParams().get("category");
  const selected = isCategorySlug(requested) ? requested : undefined;
  const visible = selected ? sections.filter((section) => section.slug === selected) : sections;

  return (
    <>
      {chips.length > 0 && (
        <nav aria-label={label} className="mx-auto w-full max-w-5xl px-4">
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
