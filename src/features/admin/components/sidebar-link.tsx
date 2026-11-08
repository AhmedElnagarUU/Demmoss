"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { href: string; label: string; exact?: boolean; unread?: number; unreadLabel?: string };

export function SidebarLink({ href, label, exact = false, unread = 0, unreadLabel = "" }: Props) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex min-h-11 items-center justify-between gap-2 rounded-control px-3 py-2 text-base font-semibold focus-visible:outline-2 focus-visible:outline-focus ${
        active ? "bg-primary text-on-primary" : "text-text hover:bg-white/[0.06]"
      }`}
    >
      <span>{label}</span>
      {unread > 0 ? (
        <>
          <span
            aria-hidden="true"
            className="min-w-6 rounded-full bg-danger px-2 text-center text-sm text-on-primary"
          >
            {unread}
          </span>
          <span className="sr-only">{unreadLabel}</span>
        </>
      ) : null}
    </Link>
  );
}
