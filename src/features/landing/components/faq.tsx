import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { landingT } from "../translate";
import { Section } from "./section";

const faqKeys = ["price", "time", "update", "phone", "which", "after"] as const;

export function Faq({ locale }: { locale: Locale }) {
  const t = landingT(locale);
  const pad = new Intl.NumberFormat(locale, { minimumIntegerDigits: 2, useGrouping: false });

  return (
    <Section
      id="faq-title"
      anchor="faq"
      index={pad.format(5)}
      label={t("faq.label")}
      aside={t("faq.aside")}
      lead={t("faq.titleLead")}
      rest={t("faq.titleRest")}
      intro={t("faq.intro")}
    >
      <div className="mx-auto max-w-4xl border-t border-white/[0.08]">
        {faqKeys.map((key) => (
          <details key={key} className="group border-b border-white/[0.08] py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-lg py-5 text-lg font-normal text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus">
              {t(`faq.${key}.q`)}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 shrink-0 text-muted transition-transform group-open:rotate-45"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </summary>
            <p className="max-w-2xl pb-6 text-sm leading-relaxed text-muted">
              {t(`faq.${key}.a`)}
              {key === "which" ? (
                <>
                  {" "}
                  <Link href={`/${locale}/guide`} className="text-text underline underline-offset-4">
                    {t("faq.which.link")}
                  </Link>
                </>
              ) : null}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
