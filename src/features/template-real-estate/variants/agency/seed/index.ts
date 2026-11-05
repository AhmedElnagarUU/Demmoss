import type { AgencyData } from "../data";
import { seedAgents, seedContent, seedSettings, seedTestimonials } from "./content";
import { seedProperties } from "./properties";
import { createSampleInquiries, createSampleViewings } from "./sample-data";

// The starting point of the demo: also what "Reset demo" restores (the account is kept by the engine).
export function createAgencySeed(now: Date): AgencyData {
  return {
    account: null,
    settings: seedSettings,
    content: seedContent,
    properties: seedProperties,
    viewings: createSampleViewings(now),
    inquiries: createSampleInquiries(now),
    testimonials: seedTestimonials,
    agents: seedAgents,
    dismissedTips: [],
  };
}

// Used by the property route to build the static pages of the seed properties.
export const seedPropertyIds = seedProperties.map((property) => property.id);
