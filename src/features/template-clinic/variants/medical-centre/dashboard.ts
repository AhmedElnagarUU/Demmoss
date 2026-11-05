import type { DashboardModule } from "@/features/demo-engine/dashboard-shell/dashboard-context";
import type { ClinicConfig } from "../../context";
import { medicalCentrePalettes } from "./palettes";
import { medicalCentrePhotos } from "./photos";
import { MEDICAL_CENTRE_SLUG } from "./slug";

// The shared dashboard + this variant module, and nothing else.
export const medicalCentreModules: readonly DashboardModule[] = [
  { path: "doctors", label: { ar: "الأطباء والأقسام", en: "Doctors & departments" } },
];

export const medicalCentreConfig: ClinicConfig = {
  slug: MEDICAL_CENTRE_SLUG,
  templateName: "Noor Medical Centre",
  basePath: "/demos/clinic/medical-centre",
  palettes: medicalCentrePalettes,
  photos: medicalCentrePhotos,
  singleDoctor: false,
  modules: medicalCentreModules,
};
