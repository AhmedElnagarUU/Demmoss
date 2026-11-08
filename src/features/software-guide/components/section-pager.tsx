import type { NavItem } from "../guide-nav";
import type { GuideContent } from "../types";

type Props = { previous: NavItem | null; next: NavItem | null; menu: GuideContent["menu"] };

const card =
  "flex min-h-11 flex-1 flex-col gap-1 rounded-xl border border-border bg-white/[0.02] p-4 transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-focus sm:max-w-[calc(50%-0.375rem)]";

function Arrow({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`size-4 shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function SectionPager({ previous, next, menu }: Props) {
  if (!previous && !next) return null;
  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
      {previous ? (
        <a href={`#${previous.id}`} className={`${card} items-start`}>
          <span className="flex items-center gap-2 text-sm text-muted">
            <Arrow className="rotate-180 rtl:rotate-0" />
            {menu.previous}
          </span>
          <span className="font-semibold text-text">{previous.label}</span>
        </a>
      ) : null}
      {next ? (
        <a href={`#${next.id}`} className={`${card} items-end text-end sm:ms-auto`}>
          <span className="flex items-center gap-2 text-sm text-muted">
            {menu.next}
            <Arrow className="rtl:rotate-180" />
          </span>
          <span className="font-semibold text-text">{next.label}</span>
        </a>
      ) : null}
    </div>
  );
}
