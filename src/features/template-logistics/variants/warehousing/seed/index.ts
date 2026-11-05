import type { WarehousingData } from "../data";
import {
  seedCaseStudies,
  seedContent,
  seedFaq,
  seedSettings,
  seedStorageRates,
  seedTestimonials,
  seedWarehouses,
} from "./content";
import { createSampleQuotes } from "./sample-data";

// The starting point of the demo: also what "Reset demo" restores (the account is kept by the engine).
export function createWarehousingSeed(now: Date): WarehousingData {
  return {
    account: null,
    settings: seedSettings,
    content: seedContent,
    quotes: createSampleQuotes(now),
    faq: seedFaq,
    testimonials: seedTestimonials,
    dismissedTips: [],
    warehouses: seedWarehouses,
    storageRates: seedStorageRates,
    caseStudies: seedCaseStudies,
  };
}
