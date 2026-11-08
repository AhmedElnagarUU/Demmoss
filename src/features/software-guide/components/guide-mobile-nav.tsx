"use client";

import { useEffect, useRef, useState } from "react";
import type { GuideNav } from "../guide-nav";
import { useActiveSection } from "../hooks/use-active-section";
import type { GuideContent } from "../types";
import { GuideNavPanel } from "./guide-nav-panel";
import { ReadingProgress } from "./reading-progress";

type Props = { nav: GuideNav; menu: GuideContent["menu"]; startHref: string; startLabel: string };

const focusable = "a[href], button:not([disabled]), input:not([disabled])";

export function GuideMobileNav({ nav, menu, startHref, startLabel }: Props) {
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection(
    nav.items.map((item) => item.id),
    ["cta"],
  );
  const activeLabel = nav.items.find((item) => item.id === activeId)?.label ?? "";
  const button = useRef<HTMLButtonElement>(null);
  const drawer = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  function close() {
    document.body.style.overflow = "";
    setOpen(false);
    button.current?.focus({ preventScroll: true });
  }

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== "Tab" || !drawer.current) return;
    const items = [...drawer.current.querySelectorAll<HTMLElement>(focusable)];
    const firstItem = items[0];
    const lastItem = items[items.length - 1];
    if (!firstItem || !lastItem) return;
    if (event.shiftKey && document.activeElement === firstItem) {
      event.preventDefault();
      lastItem.focus();
    } else if (!event.shiftKey && document.activeElement === lastItem) {
      event.preventDefault();
      firstItem.focus();
    }
  }

  return (
    <>
      <div className="guide-mobile-bar sticky z-20 border-b border-white/10 bg-black/85 backdrop-blur-xl lg:hidden">
        <button
          ref={button}
          type="button"
          aria-expanded={open}
          aria-controls="guide-drawer"
          onClick={() => setOpen(true)}
          className="flex min-h-11 w-full items-center gap-2 px-4 text-start text-sm font-medium text-text focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus sm:px-6"
        >
          <span className="text-muted">{menu.sectionsButton}</span>
          <span aria-hidden="true" className="text-muted">
            ·
          </span>
          <span className="truncate text-primary">{activeLabel}</span>
        </button>
        <ReadingProgress />
      </div>
      {open ? (
        <div className="fixed inset-0 z-[60] lg:hidden" onKeyDown={onKeyDown}>
          <div aria-hidden="true" onClick={close} className="absolute inset-0 bg-black/70" />
          <div
            id="guide-drawer"
            ref={drawer}
            role="dialog"
            aria-modal="true"
            aria-label={menu.label}
            className="absolute inset-y-0 start-0 flex w-[min(22rem,88vw)] flex-col gap-4 overflow-y-auto border-e border-border bg-black p-4"
          >
            <button
              ref={closeButton}
              type="button"
              onClick={close}
              className="site-pill site-btn-ghost self-end focus-visible:outline-2 focus-visible:outline-focus"
            >
              {menu.close}
            </button>
            <GuideNavPanel
              nav={nav}
              menu={menu}
              activeId={activeId}
              startHref={startHref}
              startLabel={startLabel}
              showProgress={false}
              onNavigate={close}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
