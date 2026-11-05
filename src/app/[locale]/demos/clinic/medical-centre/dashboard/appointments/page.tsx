import { AppointmentsPage } from "@/features/template-clinic/modules/appointments/appointments-page";
import { locales } from "@/shared/i18n/config";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function MedicalCentreDashboardAppointmentsPageRoute() {
  return <AppointmentsPage />;
}
