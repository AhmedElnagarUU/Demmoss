import type { TipFact } from "../../value-tips";
import type { EventRequest } from "./types";

// A private event waiting for an answer is the highest-value lead of a restaurant.
export function eventWaitingFacts(requests: readonly EventRequest[]): TipFact[] {
  return requests
    .filter((request) => request.status === "new")
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((request) => ({ id: `eventWaiting:${request.id}`, key: "eventWaiting", label: request.name }));
}
