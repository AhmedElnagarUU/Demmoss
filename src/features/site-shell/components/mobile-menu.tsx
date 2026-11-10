"use client";

import Link from "next/link";
import { useState } from "react";
import type { NavItem } from "./nav-items";

type Props = {
  items: NavItem[];
  navLabel: string;
  openLabel: string;
  closeLabel: string;
  ctaHref: string;
  ctaLabel: string;
};

export function MobileMenu({ items, navLabel, openLabel, closeLabel, ctaHref, ctaLabel }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
        className="studio-pill min-h-10 focus-visible:outline-2 focus-visible:outline-focus"
      >
        {open ? closeLabel : openLabel}
      </button>
      {open && (
        <nav
          id="mobile-menu"
          aria-label={navLabel}
          className="absolute inset-x-4 top-full z-30 mt-1 rounded-[1.375rem] border border-white/10 bg-surface p-3 shadow-2xl shadow-black/60 sm:inset-x-8"
        >
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base text-muted transition-colors hover:bg-white/5 hover:text-text focus-visible:outline-2 focus-visible:outline-focus"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={ctaHref}
            onClick={() => setOpen(false)}
            className="studio-pill-primary mt-2 w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {ctaLabel}
          </Link>
        </nav>
      )}
    </div>
  );
}
