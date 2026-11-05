import { AgencyAgents } from "@/features/template-real-estate/variants/agency/dashboard-pages";
import { locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function AgencyDashboardAgentsRoute() {
  return <AgencyAgents />;
}
