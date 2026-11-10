import { publicEnv } from "@/shared/env";
import type { Locale } from "@/shared/i18n/config";
import { landingT } from "../translate";

export function Principle({ locale }: { locale: Locale }) {
  const t = landingT(locale);
  const brand = publicEnv.NEXT_PUBLIC_BRAND_NAME;
  const initials = brand.slice(0, 2).toUpperCase();

  return (
    <section
      aria-labelledby="principle-label"
      className="mx-auto max-w-[1100px] px-5 py-20 text-center sm:px-8 sm:py-28"
    >
      <p id="principle-label" className="font-mono-label text-faint">
        {t("principle.label")}
      </p>
      <blockquote className="studio-display mt-10 text-balance text-[clamp(1.6rem,3.4vw,2.9rem)] leading-[1.2] text-text">
        {t("principle.quoteLead")} <span className="text-muted">{t("principle.quoteRest")}</span>
      </blockquote>
      <div className="mt-10 inline-flex items-center gap-3 text-start">
        <span
          aria-hidden="true"
          className="font-mono-label flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-[10px] text-text"
        >
          {initials}
        </span>
        <span>
          <span className="block text-sm font-medium text-text">{brand}</span>
          <span className="block text-xs text-faint">{t("principle.role")}</span>
        </span>
      </div>
    </section>
  );
}
