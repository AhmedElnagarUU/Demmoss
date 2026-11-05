import type { Locale } from "@/shared/i18n/config";
import { getDemoStats } from "../service";
import { adminT } from "../translate";
import { DemoFunnelTable } from "./demo-funnel-table";
import { PageHeading } from "./page-heading";

export async function DemosPage({ locale }: { locale: Locale }) {
  const t = adminT(locale);
  const stats = await getDemoStats();

  return (
    <>
      <PageHeading title={t("demos.title")} intro={t("demos.intro")} />
      <DemoFunnelTable stats={stats} locale={locale} />
    </>
  );
}
