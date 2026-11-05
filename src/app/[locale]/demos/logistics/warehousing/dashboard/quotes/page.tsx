import { QuotesPage } from "@/features/template-logistics/dashboard/quotes-page";
import { locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function WarehousingDashboardQuotesPageRoute() {
  return <QuotesPage />;
}
