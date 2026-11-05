import type { Locale } from "@/shared/i18n/config";
import { landingT } from "../translate";
import { Section } from "./section";

const products = ["website", "system", "saas"] as const;

export function Deliver({ locale }: { locale: Locale }) {
  const t = landingT(locale);

  return (
    <Section id="deliver-title" title={t("deliver.title")} intro={t("deliver.intro")}>
      <ul className="grid gap-4 md:grid-cols-3">
        {products.map((product) => (
          <li key={product} className="flex flex-col gap-2 rounded-control border border-border p-5">
            <h3 className="text-lg font-bold text-text">{t(`deliver.${product}.title`)}</h3>
            <p className="text-base font-semibold text-primary">{t(`deliver.${product}.value`)}</p>
            <p className="text-base text-muted">{t(`deliver.${product}.text`)}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
