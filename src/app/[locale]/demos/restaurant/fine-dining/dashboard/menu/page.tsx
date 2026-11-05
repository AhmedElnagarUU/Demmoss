import { MenuPage } from "@/features/template-restaurant/dashboard/menu-page";
import { locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function FineDiningDashboardMenuPageRoute() {
  return <MenuPage />;
}
