"use client";

import { useEffect, useState } from "react";
import type { GuideNav, NavLink } from "../guide-nav";
import { useActiveSection } from "../hooks/use-active-section";
import type { GuideContent } from "../types";

type Props = { nav: GuideNav; menu: GuideContent["menu"] };

export function OnThisPage({ nav, menu }: Props) {
  const sectionId = useActiveSection(
    nav.items.map((item) => item.id),
    ["cta"],
  );
  const headings = nav.toc[sectionId];
  const links: NavLink[] = headings ?? nav.items;
  const [currentHeading, setCurrentHeading] = useState("");

  useEffect(() => {
    if (!headings) return;
    let frame = 0;
    function update() {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = "";
      for (const heading of headings ?? []) {
        const element = document.getElementById(heading.id);
        if (element && element.getBoundingClientRect().top <= line) current = heading.id;
      }
      setCurrentHeading(current);
    }
    function onScroll() {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [headings]);

  const activeLinkId = headings ? currentHeading : sectionId;

  return (
    <div className="guide-sidebar hidden xl:sticky xl:block xl:self-start xl:overflow-y-auto xl:py-10">
      <nav aria-label={menu.onThisPage}>
        <p className="mb-3 text-xs font-semibold text-muted">{menu.onThisPage}</p>
        <ul className="flex flex-col border-s border-border">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={link.id === activeLinkId ? "location" : undefined}
                className="-ms-px line-clamp-2 border-s border-transparent py-1 ps-3 text-[13px] leading-snug text-muted transition-colors hover:text-text focus-visible:outline-2 focus-visible:outline-focus aria-[current=location]:border-primary aria-[current=location]:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
