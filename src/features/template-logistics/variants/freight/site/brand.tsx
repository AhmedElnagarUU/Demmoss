import { Fragment } from "react";
import { getFreightT } from "../messages";
import type { Locale } from "@/shared/i18n/config";
import { MarkIcon } from "./icons";
import { rtlSafe } from "./styles";

// The logo of the source: the box mark, the name in bold .04em, and the small .2em tagline under it.
export function BrandLogo({
  locale,
  name,
  mutedClassName = "text-muted",
}: {
  locale: Locale;
  name: string;
  mutedClassName?: string;
}) {
  const t = getFreightT(locale);
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <MarkIcon className="size-9 shrink-0" />
      <span className="min-w-0">
        <b
          className={`block truncate text-base font-bold leading-[1.1] tracking-[0.04em] max-[640px]:text-sm ${rtlSafe}`}
        >
          {name}
        </b>
        <small
          aria-hidden="true"
          className={`block truncate text-[8.5px] font-medium uppercase leading-[1.2] tracking-[0.2em] max-[640px]:text-[8px] ${mutedClassName} ${rtlSafe}`}
        >
          {t("brand.tagline")}
        </small>
      </span>
    </span>
  );
}

// Text with a line feed shows as lines. A space stays before every break so the heading still reads as one sentence.
export function Lines({ text }: { text: string }) {
  const parts = text.split("\n");
  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={part}>
          {part}
          {index < parts.length - 1 ? (
            <>
              {" "}
              <br />
            </>
          ) : null}
        </Fragment>
      ))}
    </>
  );
}

// A heading whose last line is the muted span of the source ("We move your business / further").
export function MutedTail({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split("\n");
  const head = parts.slice(0, -1).join(" ");
  const tail = parts[parts.length - 1] ?? "";
  if (!head) return <>{tail}</>;
  return (
    <>
      {head} <span className={`block text-muted ${className}`}>{tail}</span>
    </>
  );
}
