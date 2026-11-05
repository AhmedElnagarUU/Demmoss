import { SettingsPage } from "@/features/template-real-estate/dashboard/settings-page";
import { locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function AgencyDashboardSettingsRoute() {
  return <SettingsPage />;
}
