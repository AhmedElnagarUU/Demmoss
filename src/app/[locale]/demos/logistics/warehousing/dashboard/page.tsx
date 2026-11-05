import { OverviewPage } from "@/features/template-logistics/dashboard/overview-page";
import { locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function WarehousingDashboardOverviewPageRoute() {
  return <OverviewPage />;
}
