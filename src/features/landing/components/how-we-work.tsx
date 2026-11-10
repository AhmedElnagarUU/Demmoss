import type { Locale } from "@/shared/i18n/config";
import { landingT } from "../translate";
import { Section } from "./section";

const steps = ["step1", "step2", "step3", "step4"] as const;

export function HowWeWork({ locale }: { locale: Locale }) {
  const t = landingT(locale);
  const number = new Intl.NumberFormat(locale, { minimumIntegerDigits: 2, useGrouping: false });

  return (
    <Section
      id="how-title"
      anchor="how"
      index={number.format(1)}
      label={t("how.label")}
      aside={t("how.aside")}
      lead={t("how.titleLead")}
      rest={t("how.titleAccent")}
      intro={t("how.intro")}
    >
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step} className="studio-card flex min-h-[16rem] flex-col p-6 sm:p-7">
            <p
              aria-hidden="true"
              className="text-[3.5rem] font-light leading-none tracking-tight text-text rtl:tracking-normal"
            >
              {number.format(index + 1)}
            </p>
            <h3 className="mt-8 text-xl font-normal text-text">{t(`how.${step}.title`)}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t(`how.${step}.text`)}</p>
            <p className="font-mono-label mt-auto pt-8 text-faint">{t(`how.${step}.tag`)}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
