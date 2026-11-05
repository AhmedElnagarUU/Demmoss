import type { ClinicConfig } from "../../context";
import { specialistPalettes } from "./palettes";
import { specialistPhotos } from "./photos";
import { SPECIALIST_SLUG } from "./slug";

// The shared dashboard, and no variant modules: the single doctor's hours are edited in Settings.
export const specialistConfig: ClinicConfig = {
  slug: SPECIALIST_SLUG,
  templateName: "Dr. Rayan Al Harthi",
  basePath: "/demos/clinic/specialist",
  palettes: specialistPalettes,
  photos: specialistPhotos,
  singleDoctor: true,
  modules: [],
};
