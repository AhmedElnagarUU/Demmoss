import { shipmentStatuses, type Shipment, type ShipmentStatus } from "./types";

// booked → picked_up → in_transit → customs → out_for_delivery → delivered
export const TRACKING_PREFIX = "JC";

function rank(status: ShipmentStatus): number {
  return shipmentStatuses.indexOf(status);
}

export function currentStatus(shipment: Shipment): ShipmentStatus {
  const last = shipment.events[shipment.events.length - 1];
  return last ? last.status : "booked";
}

// A shipment only moves forward (steps may be skipped); delivered is final.
export function nextStatuses(shipment: Shipment): readonly ShipmentStatus[] {
  const current = rank(currentStatus(shipment));
  return shipmentStatuses.filter((status) => rank(status) > current);
}

// Returns the shipment with one more event, or null when the move is not allowed.
// The event time is never earlier than the previous event.
export function moveShipment(
  shipment: Shipment,
  status: ShipmentStatus,
  at: Date,
  note?: string,
): Shipment | null {
  if (!nextStatuses(shipment).includes(status)) return null;
  const previous = shipment.events[shipment.events.length - 1];
  const time = previous && previous.at > at.toISOString() ? previous.at : at.toISOString();
  const cleanNote = note?.trim();
  return {
    ...shipment,
    events: [...shipment.events, { status, at: time, ...(cleanNote ? { note: cleanNote } : {}) }],
  };
}

export type TimelineStep = {
  status: ShipmentStatus;
  state: "done" | "current" | "upcoming";
  at?: string;
  note?: string;
};

// Every step of the journey with its state. A skipped step is done, without a time.
export function timelineOf(shipment: Shipment): TimelineStep[] {
  const current = rank(currentStatus(shipment));
  return shipmentStatuses.map((status, index) => {
    const event = shipment.events.find((item) => item.status === status);
    const state = index < current ? "done" : index === current ? "current" : "upcoming";
    return {
      status,
      state,
      ...(event ? { at: event.at } : {}),
      ...(event?.note ? { note: event.note } : {}),
    };
  });
}

// The next tracking number is the highest one in use plus one.
export function nextTrackingNumber(shipments: readonly Shipment[]): string {
  const highest = shipments.reduce((max, shipment) => {
    const number = Number(shipment.trackingNumber.split("-")[1]);
    return Number.isFinite(number) ? Math.max(max, number) : max;
  }, 48000);
  return `${TRACKING_PREFIX}-${String(highest + 1).padStart(5, "0")}`;
}
