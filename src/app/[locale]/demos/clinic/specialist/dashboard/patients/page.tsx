import { PatientsPage } from "@/features/template-clinic/dashboard/patients-page";
import { locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function SpecialistDashboardPatientsPageRoute() {
  return <PatientsPage />;
}
