import { SettingsPage } from "@/features/template-restaurant/dashboard/settings-page";
import { locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function FineDiningDashboardSettingsPageRoute() {
  return <SettingsPage />;
}
