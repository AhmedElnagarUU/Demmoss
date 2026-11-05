import { PropertiesPage } from "@/features/template-real-estate/dashboard/properties-page";
import { locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function DeveloperDashboardPropertiesRoute() {
  return <PropertiesPage />;
}
