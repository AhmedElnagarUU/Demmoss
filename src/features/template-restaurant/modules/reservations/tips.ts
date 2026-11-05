import type { TipFact } from "../../value-tips";
import type { Reservation } from "./types";

// A no-show is the moment to explain reminders: only when one really exists.
export function noShowFacts(reservations: readonly Reservation[]): TipFact[] {
  return reservations
    .filter((reservation) => reservation.status === "no_show")
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((reservation) => ({ id: `noShow:${reservation.id}`, key: "noShow", label: reservation.name }));
}
