import type { Locale } from "@/shared/i18n/config";
import { landingT } from "../translate";
import { Section } from "./section";

const products = ["website", "system", "saas"] as const;

const icons = {
  website: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18M7 7h.01M10 7h.01" />
    </>
  ),
  system: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="8" height="7" rx="2" />
      <path d="M15 16.5h6M18 13.5v6" />
    </>
  ),
  saas: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
    </>
  ),
} as const;

export function Deliver({ locale }: { locale: Locale }) {
  const t = landingT(locale);

  return (
    <Section
      id="deliver-title"
      badge={t("deliver.badge")}
      title={t("deliver.title")}
      intro={t("deliver.intro")}
    >
      <ul className="grid gap-4 md:grid-cols-3">
        {products.map((product) => (
          <li key={product} className="site-tile flex flex-col gap-4 p-6 sm:p-7">
            <span className="flex size-11 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5"
              >
                {icons[product]}
              </svg>
            </span>
            <div>
              <h3 className="text-lg font-semibold text-text">{t(`deliver.${product}.title`)}</h3>
              <p className="mt-1 text-sm font-semibold text-primary">{t(`deliver.${product}.value`)}</p>
            </div>
            <p className="text-base leading-relaxed text-muted">{t(`deliver.${product}.text`)}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
