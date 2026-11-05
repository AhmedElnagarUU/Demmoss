import type { ValueTipData } from "@/features/demo-engine/dashboard-shell/value-tip";
import type { Locale } from "@/shared/i18n/config";
import { timeKey } from "@/features/demo-engine/format/dates";
import { formatNumber, formatTime } from "@/features/demo-engine/format/format";
import type { RestaurantTranslate } from "../messages";
import type { TipFact } from "../value-tips";

export function tipTexts(facts: readonly TipFact[], locale: Locale, t: RestaurantTranslate): ValueTipData[] {
  return facts.map((fact) => {
    const name = typeof fact.label === "string" ? fact.label : (fact.label?.[locale] ?? "");
    const time = fact.at ? formatTime(timeKey(new Date(fact.at)), locale) : "";
    const count = formatNumber(fact.count ?? 0, locale);
    return { id: fact.id, text: t(`tips.${fact.key}`, { name, time, count }) };
  });
}
