"use client";

import { useState } from "react";
import type { Locale } from "@/shared/i18n/config";
import { getClinicT } from "../messages";
import type { Result } from "../types";
import { SmileIllustration } from "./smile-illustration";

// Before / after slider. The range input does the work, so it is keyboard and screen reader friendly.
// The picture area is left to right in both languages: it is a spatial control, not text.
export function BeforeAfter({ result, locale }: { result: Result; locale: Locale }) {
  const t = getClinicT(locale);
  const [position, setPosition] = useState(50);

  return (
    <figure className="mx-auto max-w-3xl space-y-3">
      <div
        dir="ltr"
        className="relative aspect-video overflow-hidden rounded-[30px] bg-surface shadow-xl has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-focus"
      >
        <SmileIllustration stage="before" look={result.look} className="absolute inset-0 size-full" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
          <SmileIllustration stage="after" look={result.look} className="absolute inset-0 size-full" />
        </div>
        <span className="absolute top-4 start-4 rounded-full bg-text/75 px-3.5 py-1.5 text-xs font-medium text-bg">
          {t("site.ba.before")}
        </span>
        <span className="absolute top-4 end-4 rounded-full bg-text/75 px-3.5 py-1.5 text-xs font-medium text-bg">
          {t("site.ba.after")}
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          aria-label={`${t("site.ba.slider")}: ${result.title[locale]}`}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="absolute inset-0 size-full cursor-ew-resize opacity-0"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white"
          style={{ insetInlineStart: `${position}%` }}
        >
          <span className="absolute top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-lg text-on-primary shadow-[0_0_0_6px_rgba(255,255,255,0.5)]">
            ⇄
          </span>
        </div>
      </div>
      <figcaption className="text-center text-sm text-muted">
        <span className="font-medium text-text">{result.title[locale]}</span> · {result.caption[locale]} ·{" "}
        {t("site.ba.illustration")}
      </figcaption>
    </figure>
  );
}
