import { seedContent, seedReviews, seedSettings } from "./content";
import { seedMenu } from "./menu";
import { createSampleEventRequests, createSampleReservations, seedReservationSettings } from "./sample-data";
import type { FineDiningData } from "../data";

// The starting point of the demo: also what "Reset demo" restores (the account is kept by the engine).
export function createFineDiningSeed(now: Date): FineDiningData {
  return {
    account: null,
    settings: seedSettings,
    content: seedContent,
    menu: seedMenu,
    reviews: seedReviews,
    dismissedTips: [],
    reservations: createSampleReservations(now),
    reservationSettings: seedReservationSettings,
    eventRequests: createSampleEventRequests(now),
  };
}
