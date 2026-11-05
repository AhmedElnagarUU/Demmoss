import type { FreightData } from "../data";
import { seedContent, seedFaq, seedRates, seedSettings, seedTestimonials } from "./content";
import { createSampleQuotes, createSampleShipments } from "./sample-data";

// The starting point of the demo: also what "Reset demo" restores (the account is kept by the engine).
export function createFreightSeed(now: Date): FreightData {
  return {
    account: null,
    settings: seedSettings,
    content: seedContent,
    quotes: createSampleQuotes(now),
    faq: seedFaq,
    testimonials: seedTestimonials,
    dismissedTips: [],
    shipments: createSampleShipments(now),
    rates: seedRates,
  };
}
