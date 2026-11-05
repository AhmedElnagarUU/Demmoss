import { ContentPage } from "@/features/template-real-estate/dashboard/content-page";
import { locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function AgencyDashboardContentRoute() {
  return <ContentPage />;
}
