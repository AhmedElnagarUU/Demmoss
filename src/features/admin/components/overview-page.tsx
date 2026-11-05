import type { Locale } from "@/shared/i18n/config";
import { countryName, formatNumber, formatPercent } from "../format";
import type { Count } from "../metrics";
import { getOverview } from "../service";
import { adminT } from "../translate";
import { leadStatuses } from "@/features/wizard/types";
import { BarList } from "./bar-list";
import { DemoFunnelTable } from "./demo-funnel-table";
import { PageHeading } from "./page-heading";
import { StatCard } from "./stat-card";

export async function OverviewPage({ locale }: { locale: Locale }) {
  const t = adminT(locale);
  const overview = await getOverview();
  const count = (value: number) => formatNumber(value, locale);
  const rows = (counts: Count[], label: (value: string) => string) =>
    counts.map((row) => ({ label: label(row.value), count: row.count }));

  return (
    <>
      <PageHeading title={t("overview.title")} intro={t("overview.intro")} />
      <p className="mb-4 text-sm text-muted">{t("common.timesUtc")}</p>

      <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label={t("overview.visitorsToday")} value={count(overview.visitors.today)} />
        <StatCard label={t("overview.visitors7d")} value={count(overview.visitors.last7Days)} />
        <StatCard label={t("overview.visitors30d")} value={count(overview.visitors.last30Days)} />
        <StatCard label={t("overview.visitorsTotal")} value={count(overview.visitors.total)} />
      </dl>

      <dl className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label={t("overview.wizardStarted")} value={count(overview.wizard.started)} />
        <StatCard label={t("overview.wizardCompleted")} value={count(overview.wizard.completed)} />
        <StatCard
          label={t("overview.wizardRate")}
          value={
            overview.wizard.rate === null ? t("overview.noRate") : formatPercent(overview.wizard.rate, locale)
          }
        />
        <StatCard label={t("overview.whatsappClicks")} value={count(overview.whatsappClicks)} />
      </dl>

      <dl className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label={t("overview.feedbackTotal")}
          value={count(overview.feedback.total)}
          note={t("overview.feedbackUnread", { count: count(overview.feedback.unread) })}
        />
        {leadStatuses.map((status) => (
          <StatCard
            key={status}
            label={`${t("overview.leadsTitle")}: ${t(`leadStatus.${status}`)}`}
            value={count(overview.leadsByStatus[status])}
          />
        ))}
      </dl>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <BarList
          title={t("overview.sources")}
          rows={rows(overview.sources, (value) => (value === "direct" ? t("common.direct") : value))}
          empty={t("common.empty")}
          formatCount={count}
        />
        <BarList
          title={t("overview.countries")}
          rows={rows(overview.countries, (value) =>
            value === "unknown" ? t("common.unknown") : (countryName(value, locale) ?? value),
          )}
          empty={t("common.empty")}
          formatCount={count}
        />
        <BarList
          title={t("overview.devices")}
          rows={rows(overview.devices, (value) =>
            value === "mobile" || value === "tablet" || value === "desktop" ? t(`devices.${value}`) : value,
          )}
          empty={t("common.empty")}
          formatCount={count}
        />
        <BarList
          title={t("overview.languages")}
          rows={rows(overview.languages, (value) =>
            value === "ar" || value === "en" ? t(`languages.${value}`) : value,
          )}
          empty={t("common.empty")}
          formatCount={count}
        />
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-text">{t("overview.templates")}</h2>
        <p className="mb-3 text-sm text-muted">{t("overview.templatesIntro")}</p>
        <DemoFunnelTable stats={overview.templates} locale={locale} />
      </section>
    </>
  );
}
