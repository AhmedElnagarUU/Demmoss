"use client";

import {
  createVariantContext,
  type DashboardModule,
} from "@/features/demo-engine/dashboard-shell/dashboard-context";
import type { Palette } from "@/features/demo-engine/palettes/palette";
import type { ClinicStore } from "./clinic-store";
import type { Photo } from "./site/photo";

// Everything the shared site parts and the shared dashboard need to know about a variant.
export type ClinicConfig = {
  slug: string;
  // the demo's English name, used in the WhatsApp message to the clinic
  templateName: string;
  // route of the variant without the locale, e.g. "/demos/clinic/specialist"
  basePath: string;
  palettes: readonly Palette[];
  photos: readonly Photo[];
  // specialist: one doctor whose weekly hours are edited in Settings; centre: doctors have their own module
  singleDoctor: boolean;
  // variant modules, listed in the sidebar after Patients
  modules: readonly DashboardModule[];
};

export const { Provider: ClinicProvider, useVariant: useClinic } = createVariantContext<
  ClinicStore,
  ClinicConfig
>("Clinic");
