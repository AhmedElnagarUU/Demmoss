import { DoctorsPage } from "@/features/template-clinic/modules/doctors/doctors-page";
import { locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function MedicalCentreDashboardDoctorsPageRoute() {
  return <DoctorsPage />;
}
