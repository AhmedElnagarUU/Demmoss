import { CustomersPage } from "@/features/template-restaurant/dashboard/customers-page";
import { locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function FineDiningDashboardCustomersPageRoute() {
  return <CustomersPage />;
}
