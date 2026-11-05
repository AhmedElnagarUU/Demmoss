import { DeveloperProjects } from "@/features/template-real-estate/variants/developer/dashboard-pages";
import { locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function DeveloperDashboardProjectsRoute() {
  return <DeveloperProjects />;
}
