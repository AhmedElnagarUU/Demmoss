"use client";

import type { Locale } from "@/shared/i18n/config";
import type { LogisticsStore } from "../logistics-store";

type Props = { store: LogisticsStore; locale: Locale; itemClassName?: string };

// The FAQ the owner edits in the dashboard. Native <details>: keyboard usable, no script needed.
export function FaqAccordion({ store, locale, itemClassName = "" }: Props) {
  const faq = store((state) => state.faq);
  return (
    <div className="space-y-3">
      {faq.map((item) => (
        <details key={item.id} className={`group border border-border bg-surface p-4 ${itemClassName}`}>
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-text focus-visible:outline-2 focus-visible:outline-focus [&::-webkit-details-marker]:hidden">
            {item.question[locale]}
            <span aria-hidden="true" className="text-2xl leading-none text-primary group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-2 text-muted">{item.answer[locale]}</p>
        </details>
      ))}
    </div>
  );
}
