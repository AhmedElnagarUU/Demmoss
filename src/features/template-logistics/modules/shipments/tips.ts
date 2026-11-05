import type { TipFact } from "../../value-tips";
import { currentStatus } from "./status";
import type { Shipment } from "./types";

const HOUR_MS = 60 * 60 * 1000;
export const STUCK_IN_CUSTOMS_HOURS = 48;

// A shipment waiting in customs for more than two days: the client is about to call. Longest wait first.
export function stuckShipmentFacts(shipments: readonly Shipment[], now: Date): TipFact[] {
  return shipments
    .filter((shipment) => currentStatus(shipment) === "customs")
    .map((shipment) => {
      const last = shipment.events[shipment.events.length - 1];
      const since = last ? new Date(last.at).getTime() : now.getTime();
      return { shipment, hours: Math.floor((now.getTime() - since) / HOUR_MS) };
    })
    .filter(({ hours }) => hours >= STUCK_IN_CUSTOMS_HOURS)
    .sort((a, b) => b.hours - a.hours)
    .map(({ shipment, hours }) => ({
      id: `stuckShipment:${shipment.id}`,
      key: "stuckShipment",
      label: shipment.trackingNumber,
      amount: Math.floor(hours / 24),
    }));
}
