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
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
        className="site-pill site-btn-ghost min-h-10 px-4 text-sm font-semibold text-text focus-visible:outline-2 focus-visible:outline-focus"
      >
        {open ? closeLabel : openLabel}
      </button>
      {open && (
        <nav
          id="mobile-menu"
          aria-label={navLabel}
          className="absolute inset-x-0 top-full z-30 border-b border-white/10 bg-black/95 px-4 py-4 shadow-2xl backdrop-blur-xl"
        >
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base text-muted transition-colors hover:bg-white/5 hover:text-text focus-visible:outline-2 focus-visible:outline-focus"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={ctaHref}
            onClick={() => setOpen(false)}
            className="site-pill mt-3 flex items-center justify-center bg-primary text-sm font-semibold text-on-primary hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {ctaLabel}
          </Link>
        </nav>
      )}
    </div>
  );
}
