"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { TrackedLanguageSwitch } from "@/features/tracking/components/tracked-language-switch";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { sessionKey } from "../fake-auth/auth";
import { getEngineT } from "../messages";
import { setSessionFlag } from "../storage/session-flag";

export type NavItem = { href: string; label: string };

type Props = {
  slug: string;
  locale: Locale;
  businessName: string;
  navItems: NavItem[];
  children: ReactNode;
};

export function DashboardShell({ slug, locale, businessName, navItems, children }: Props) {
  const t = getEngineT(locale);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const sidebar = (
    <nav aria-label={t("shell.navigation")} className="flex flex-col gap-1 p-4">
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
            className={`rounded-control px-3 py-2.5 font-semibold focus-visible:outline-2 focus-visible:outline-focus ${
              active ? "bg-primary text-on-primary" : "text-text hover:bg-surface"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-bg text-text">
      <aside className="hidden w-64 shrink-0 border-e border-border md:block">{sidebar}</aside>

      {menuOpen ? (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <aside className="w-64 max-w-[80%] overflow-y-auto border-e border-border bg-bg">{sidebar}</aside>
          <button
            type="button"
            aria-label={t("shell.closeMenu")}
            onClick={() => setMenuOpen(false)}
            className="grow bg-text/40"
          />
        </div>
      ) : null}

      <div className="flex min-w-0 grow flex-col">
        <header className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Button variant="secondary" className="md:hidden" onClick={() => setMenuOpen(true)}>
            {t("shell.openMenu")}
          </Button>
          <p className="grow truncate text-lg font-bold">{businessName}</p>
          <TrackedLanguageSwitch locale={locale} label={t("shell.switchLanguage")} />
          <Button variant="secondary" onClick={() => setSessionFlag(sessionKey(slug), false)}>
            {t("shell.logout")}
          </Button>
        </header>
        <main className="grow p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
