import type { Locale } from "@/shared/i18n/config";
import { landingT } from "../translate";
import { Section } from "./section";

const benefits = ["customers", "time", "trust", "languages"] as const;

export function Value({ locale }: { locale: Locale }) {
  const t = landingT(locale);

  return (
    <Section id="value-title" title={t("value.title")} tone="soft">
      <ul className="grid gap-4 sm:grid-cols-2">
        {benefits.map((benefit) => (
          <li key={benefit} className="rounded-control border border-border bg-bg p-5">
            <h3 className="text-lg font-bold text-text">{t(`value.${benefit}.title`)}</h3>
            <p className="mt-2 text-base text-muted">{t(`value.${benefit}.text`)}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
