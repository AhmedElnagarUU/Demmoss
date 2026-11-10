import type { Locale } from "@/shared/i18n/config";
import { landingT } from "../translate";
import { Section } from "./section";

const products = ["website", "system", "saas"] as const;

export function Deliver({ locale }: { locale: Locale }) {
  const t = landingT(locale);
  const pad = new Intl.NumberFormat(locale, { minimumIntegerDigits: 2, useGrouping: false });

  return (
    <Section
      id="deliver-title"
      anchor="build"
      index={pad.format(3)}
      label={t("deliver.label")}
      aside={t("deliver.aside")}
      lead={t("deliver.titleLead")}
      rest={t("deliver.titleRest")}
      intro={t("deliver.intro")}
    >
      <ul className="grid gap-4 md:grid-cols-3">
        {products.map((product) => (
          <li
            key={product}
            className={`studio-card flex flex-col p-6 sm:p-8 ${
              product === "system" ? "border-accent/30 shadow-[0_0_60px_-20px_var(--color-site-glow)]" : ""
            }`}
          >
            <div className="font-mono-label flex items-center justify-between gap-3 text-faint">
              <span>{t(`deliver.${product}.tag`)}</span>
              {product === "system" ? (
                <span className="rounded-full border border-accent/40 px-2.5 py-1 text-[10px] text-accent">
                  {t("deliver.system.badge")}
                </span>
              ) : null}
            </div>
            <h3 className="mt-10 text-2xl font-normal leading-tight text-text">
              {t(`deliver.${product}.title`)}
            </h3>
            <p className="mt-3 text-sm font-medium text-accent">{t(`deliver.${product}.value`)}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{t(`deliver.${product}.text`)}</p>
            <p className="mt-auto pt-8 text-xs text-faint">
              <span className="block border-t border-white/[0.08] pt-5">
                {t(`deliver.${product}.bestFor`)}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
