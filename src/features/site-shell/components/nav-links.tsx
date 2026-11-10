"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "./nav-items";

// The centred capsule of the header. Only page links can be active; section links (#how, #build) never are.
export function NavLinks({ items, label }: { items: NavItem[]; label: string }) {
  const pathname = usePathname();

  function isActive(href: string): boolean {
    if (href.includes("#")) return false;
    const isHome = items[0]?.href === href;
    return isHome ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <nav
      aria-label={label}
      className="hidden rounded-full border border-white/10 bg-white/[0.04] p-1 lg:block"
    >
      <ul className="flex items-center gap-0.5">
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`block rounded-full px-4 py-2 text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
                  active ? "bg-primary text-on-primary" : "text-muted hover:text-text"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
