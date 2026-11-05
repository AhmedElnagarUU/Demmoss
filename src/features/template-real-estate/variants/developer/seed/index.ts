import type { RealEstateData } from "../../../types";
import { seedContent, seedSettings, seedTestimonials } from "./content";
import { seedProperties } from "./properties";
import { createSampleInquiries, createSampleViewings } from "./sample-data";

// The starting point of the demo: also what "Reset demo" restores (the account is kept by the engine).
export function createDeveloperSeed(now: Date): RealEstateData {
  return {
    account: null,
    settings: seedSettings,
    content: seedContent,
    properties: seedProperties,
    viewings: createSampleViewings(now),
    inquiries: createSampleInquiries(now),
    testimonials: seedTestimonials,
    dismissedTips: [],
  };
}
