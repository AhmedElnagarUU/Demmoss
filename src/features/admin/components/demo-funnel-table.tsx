import type { Locale } from "@/shared/i18n/config";
import { formatNumber, formatPercent, templateName } from "../format";
import type { TemplateStats } from "../metrics";
import { adminT } from "../translate";
import { DataTable } from "./data-table";
import { cellClasses } from "./styles";

function Step({
  count,
  rate,
  locale,
  ofPrevious,
}: {
  count: number;
  rate: number | null;
  locale: Locale;
  ofPrevious: string;
}) {
  return (
    <>
      <span className="font-semibold text-text">{formatNumber(count, locale)}</span>
      {rate === null ? null : <span className="block text-xs text-muted">{ofPrevious}</span>}
    </>
  );
}

export function DemoFunnelTable({ stats, locale }: { stats: TemplateStats[]; locale: Locale }) {
  const t = adminT(locale);
  if (stats.length === 0) return <p className="text-base text-muted">{t("common.empty")}</p>;

  return (
    <DataTable
      caption={t("demos.caption")}
      headings={[
        t("demos.template"),
        t("demos.opened"),
        t("demos.registered"),
        t("demos.actions"),
        t("demos.edits"),
        t("demos.resets"),
      ]}
    >
      {stats.map((row) => (
        <tr key={row.template}>
          <th scope="row" className={`${cellClasses} font-semibold text-text`}>
            {templateName(row.template, locale)}
          </th>
          {row.funnel.map((step, index) => (
            <td key={index} className={cellClasses}>
              <Step
                count={step.count}
                rate={step.rateFromPrevious}
                locale={locale}
                ofPrevious={t("demos.ofPrevious", {
                  percent: formatPercent(step.rateFromPrevious ?? 0, locale),
                })}
              />
            </td>
          ))}
          <td className={cellClasses}>{formatNumber(row.contentEdits, locale)}</td>
          <td className={cellClasses}>{formatNumber(row.resets, locale)}</td>
        </tr>
      ))}
    </DataTable>
  );
}
