import type { Locale } from "@/shared/i18n/config";
import { landingT } from "../translate";
import { Section } from "./section";

const steps = ["step1", "step2", "step3", "step4"] as const;

export function HowWeWork({ locale }: { locale: Locale }) {
  const t = landingT(locale);

  return (
    <Section id="how-title" title={t("how.title")} tone="soft">
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step} className="rounded-control border border-border bg-bg p-5">
            <p aria-hidden="true" className="text-sm font-bold text-primary">
              {(index + 1).toLocaleString(locale)}
            </p>
            <h3 className="mt-1 text-lg font-bold text-text">{t(`how.${step}.title`)}</h3>
            <p className="mt-2 text-base text-muted">{t(`how.${step}.text`)}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
