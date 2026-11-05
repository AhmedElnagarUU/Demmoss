import type { ValueTipData } from "@/features/demo-engine/dashboard-shell/value-tip";
import type { Locale } from "@/shared/i18n/config";
import { formatNumber } from "../format";
import type { LogisticsTranslate } from "../messages";
import type { TipFact } from "../value-tips";

export function tipTexts(facts: readonly TipFact[], locale: Locale, t: LogisticsTranslate): ValueTipData[] {
  return facts.map((fact) => {
    const name = typeof fact.label === "string" ? fact.label : (fact.label?.[locale] ?? "");
    const time = fact.at
      ? new Intl.DateTimeFormat(locale === "ar" ? "ar-SA-u-ca-gregory" : "en-US", {
          hour: "numeric",
          minute: "2-digit",
        }).format(new Date(fact.at))
      : "";
    const amount = formatNumber(fact.amount ?? 0, locale);
    return {
      id: fact.id,
      text: t(`tips.${fact.key}`, { name, time, hours: amount, days: amount, percent: amount }),
    };
  });
}
