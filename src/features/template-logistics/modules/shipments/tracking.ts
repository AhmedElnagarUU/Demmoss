import type { Shipment } from "./types";

// "jc 48213", "JC-48213" and "jc48213" are the same tracking number.
export function normalizeCode(code: string): string {
  return code.replace(/[\s-]/g, "").toUpperCase();
}

export function findShipment(shipments: readonly Shipment[], code: string): Shipment | undefined {
  const wanted = normalizeCode(code);
  if (!wanted) return undefined;
  return shipments.find((shipment) => normalizeCode(shipment.trackingNumber) === wanted);
}
