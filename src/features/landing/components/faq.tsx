import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { landingT } from "../translate";
import { Section } from "./section";

const faqKeys = ["price", "time", "update", "phone", "which", "after"] as const;

export function Faq({ locale }: { locale: Locale }) {
  const t = landingT(locale);

  return (
    <Section id="faq-title" badge={t("faq.badge")} title={t("faq.title")} intro={t("faq.intro")} tone="soft">
      <div className="mx-auto max-w-3xl space-y-3">
        {faqKeys.map((key) => (
          <details key={key} className="group site-panel p-5 sm:p-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg font-semibold text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              {t(`faq.${key}.q`)}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 shrink-0 text-primary transition-transform group-open:rotate-45"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {t(`faq.${key}.a`)}
              {key === "which" ? (
                <>
                  {" "}
                  <Link href={`/${locale}/guide`} className="text-primary underline">
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
