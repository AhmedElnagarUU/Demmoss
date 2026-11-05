import { FaqPage } from "@/features/template-logistics/dashboard/faq-page";
import { locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function WarehousingDashboardFaqPageRoute() {
  return <FaqPage />;
}
