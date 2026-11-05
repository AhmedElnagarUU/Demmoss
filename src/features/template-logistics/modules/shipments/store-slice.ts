import type { LocalizedText } from "@/features/demo-engine/types";
import type { SetData } from "../../shared-slice";
import type { TransportMode } from "../../types";
import { moveShipment, nextTrackingNumber } from "./status";
import type { Shipment, ShipmentStatus, ShipmentsData } from "./types";

export type NewShipment = {
  customer: string;
  origin: LocalizedText;
  destination: LocalizedText;
  mode: TransportMode;
  cargo: string;
  eta: string;
};

export type ShipmentsActions = {
  addShipment: (input: NewShipment, now?: Date) => string;
  moveShipmentStatus: (id: string, status: ShipmentStatus, note?: string, now?: Date) => void;
};

export function createShipmentsActions(set: SetData<ShipmentsData>): ShipmentsActions {
  return {
    addShipment: (input, now = new Date()) => {
      const id = crypto.randomUUID();
      set((state) => {
        const shipment: Shipment = {
          id,
          trackingNumber: nextTrackingNumber(state.shipments),
          ...input,
          customer: input.customer.trim(),
          cargo: input.cargo.trim(),
          events: [{ status: "booked", at: now.toISOString() }],
        };
        return { shipments: [shipment, ...state.shipments] };
      });
      return id;
    },

    moveShipmentStatus: (id, status, note, now = new Date()) =>
      set((state) => ({
        shipments: state.shipments.map((shipment) =>
          shipment.id === id ? (moveShipment(shipment, status, now, note) ?? shipment) : shipment,
        ),
      })),
  };
}
