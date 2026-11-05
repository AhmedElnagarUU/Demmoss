import { ClientsPage } from "@/features/template-logistics/dashboard/clients-page";
import { locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function WarehousingDashboardClientsPageRoute() {
  return <ClientsPage />;
}
