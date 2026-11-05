import { z } from "zod";
import { localizedTextSchema } from "@/features/demo-engine/types";
import { transportModeSchema } from "../../types";

export const shipmentStatuses = [
  "booked",
  "picked_up",
  "in_transit",
  "customs",
  "out_for_delivery",
  "delivered",
] as const;
export const shipmentStatusSchema = z.enum(shipmentStatuses);

export const shipmentEventSchema = z.object({
  status: shipmentStatusSchema,
  at: z.iso.datetime(),
  note: z.string().max(120).optional(),
});

export const shipmentSchema = z.object({
  id: z.string().min(1),
  trackingNumber: z.string().regex(/^[A-Z]{2}-\d{5}$/),
  customer: z.string().trim().min(1).max(80),
  origin: localizedTextSchema,
  destination: localizedTextSchema,
  mode: transportModeSchema,
  cargo: z.string().trim().min(1).max(80),
  eta: z.iso.datetime(),
  // the current status is the status of the last event
  events: z.array(shipmentEventSchema).min(1),
});

export const shipmentsShape = { shipments: z.array(shipmentSchema) };

export type ShipmentStatus = z.infer<typeof shipmentStatusSchema>;
export type ShipmentEvent = z.infer<typeof shipmentEventSchema>;
export type Shipment = z.infer<typeof shipmentSchema>;
export type ShipmentsData = { shipments: Shipment[] };
