import type { ValueTipData } from "@/features/demo-engine/dashboard-shell/value-tip";
import { formatNumber } from "@/features/demo-engine/format/format";
import type { Locale } from "@/shared/i18n/config";
import type { ClinicTranslate } from "../messages";
import type { TipFact } from "../value-tips";

export function tipTexts(facts: readonly TipFact[], locale: Locale, t: ClinicTranslate): ValueTipData[] {
  return facts.map((fact) => {
    const name = typeof fact.label === "string" ? fact.label : (fact.label?.[locale] ?? "");
    return {
      id: fact.id,
      text: t(`tips.${fact.key}`, {
        name,
        count: formatNumber(fact.count ?? 0, locale),
        percent: formatNumber(fact.percent ?? 0, locale),
      }),
    };
  });
}
