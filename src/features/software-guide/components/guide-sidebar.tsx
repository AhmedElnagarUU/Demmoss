"use client";

import type { GuideNav } from "../guide-nav";
import { useActiveSection } from "../hooks/use-active-section";
import type { GuideContent } from "../types";
import { GuideNavPanel } from "./guide-nav-panel";

type Props = { nav: GuideNav; menu: GuideContent["menu"]; startHref: string; startLabel: string };

export function GuideSidebar({ nav, menu, startHref, startLabel }: Props) {
  const activeId = useActiveSection(
    nav.items.map((item) => item.id),
    ["cta"],
  );

  return (
    <div className="guide-sidebar hidden lg:sticky lg:block lg:self-start lg:overflow-y-auto lg:py-10 lg:pe-2">
      <GuideNavPanel
        nav={nav}
        menu={menu}
        activeId={activeId}
        startHref={startHref}
        startLabel={startLabel}
        showProgress
      />
    </div>
  );
}
