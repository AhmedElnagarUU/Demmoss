import { ViewingsPage } from "@/features/template-real-estate/modules/viewings/viewings-page";
import { locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function DeveloperDashboardViewingsRoute() {
  return <ViewingsPage />;
}
