"use client";

import Link from "next/link";
import { useState } from "react";
import type { NavItem } from "./nav-items";

type Props = { items: NavItem[]; navLabel: string; openLabel: string; closeLabel: string };

export function MobileMenu({ items, navLabel, openLabel, closeLabel }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
        className="min-h-10 rounded-control border border-border px-3 text-sm font-semibold text-text hover:bg-surface focus-visible:outline-2 focus-visible:outline-focus"
      >
        {open ? closeLabel : openLabel}
      </button>
      {open && (
        <nav
          id="mobile-menu"
          aria-label={navLabel}
          className="absolute inset-x-0 top-full z-30 border-b border-border bg-bg px-4 py-3 shadow-sm"
        >
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-semibold text-text focus-visible:outline-2 focus-visible:outline-focus"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
