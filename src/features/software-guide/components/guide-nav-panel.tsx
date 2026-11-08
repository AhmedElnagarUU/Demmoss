"use client";

import Link from "next/link";
import { filterGuideNav, type GuideNav } from "../guide-nav";
import { setGuideQuery, useGuideQuery } from "../hooks/use-guide-search";
import type { GuideContent } from "../types";
import { ReadingProgress } from "./reading-progress";

type Props = {
  nav: GuideNav;
  menu: GuideContent["menu"];
  activeId: string;
  startHref: string;
  startLabel: string;
  showProgress: boolean;
  onNavigate?: () => void;
};

const linkBase =
  "flex min-h-11 items-center rounded-lg border-s-2 border-transparent px-3 py-1.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-text focus-visible:outline-2 focus-visible:outline-focus lg:min-h-9";
const linkActive =
  "aria-[current=location]:border-primary aria-[current=location]:bg-primary/10 aria-[current=location]:font-medium aria-[current=location]:text-primary";

export function GuideNavPanel({
  nav,
  menu,
  activeId,
  startHref,
  startLabel,
  showProgress,
  onNavigate,
}: Props) {
  const query = useGuideQuery();
  const searching = query.trim() !== "";
  const { groups, terms } = filterGuideNav(nav, query);

  return (
    <nav aria-label={menu.label} className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-text">{menu.title}</p>
        {showProgress ? <ReadingProgress /> : null}
        <div>
          <label htmlFor={`guide-search-${showProgress ? "side" : "drawer"}`} className="sr-only">
            {menu.searchLabel}
          </label>
          <input
            id={`guide-search-${showProgress ? "side" : "drawer"}`}
            type="search"
            value={query}
            onChange={(event) => setGuideQuery(event.target.value)}
            placeholder={menu.searchPlaceholder}
            className="min-h-11 w-full rounded-lg border border-border bg-white/[0.03] px-3 text-sm text-text placeholder:text-muted focus-visible:outline-2 focus-visible:outline-focus lg:min-h-9"
          />
        </div>
      </div>

      {groups.length === 0 && terms.length === 0 ? (
        <p role="status" className="px-3 text-sm text-muted">
          {menu.noMatch}
        </p>
      ) : null}

      {groups.map((group) => (
        <div key={group.id} className="flex flex-col gap-1">
          <p className="px-3 text-xs font-semibold text-muted">{group.label}</p>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const isActive = item.id === activeId;
              const showChildren = item.children.length > 0 && (isActive || searching);
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    onClick={onNavigate}
                    className={`${linkBase} ${linkActive}`}
                  >
                    {item.label}
                  </a>
                  {showChildren ? (
                    <ul className="ps-4">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <a href={`#${child.id}`} onClick={onNavigate} className={linkBase}>
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      {terms.length > 0 ? (
        <div className="flex flex-col gap-1">
          <p className="px-3 text-xs font-semibold text-muted">{menu.glossaryResults}</p>
          <ul className="flex flex-col gap-0.5">
            {terms.map((term) => (
              <li key={term.id}>
                <a href={`#${term.id}`} onClick={onNavigate} className={linkBase}>
                  {term.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 rounded-xl border border-border bg-white/[0.03] p-4">
        <p className="text-sm font-semibold text-text">{menu.helpTitle}</p>
        <p className="text-sm leading-relaxed text-muted">{menu.helpText}</p>
        <div className="flex flex-col gap-2 text-sm font-semibold">
          <a
            href="#quiz"
            onClick={onNavigate}
            className="flex min-h-11 items-center rounded-lg text-primary underline decoration-primary/40 underline-offset-4 hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-focus"
          >
            {menu.helpQuiz}
          </a>
          <Link
            href={startHref}
            className="flex min-h-11 items-center rounded-lg text-text underline decoration-white/30 underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-focus"
          >
            {startLabel}
          </Link>
        </div>
      </div>
    </nav>
  );
}
