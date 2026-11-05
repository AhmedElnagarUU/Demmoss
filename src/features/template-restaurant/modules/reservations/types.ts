import { z } from "zod";
import { dateKeySchema, timeSchema } from "../../types";

export const reservationStatuses = ["new", "confirmed", "seated", "cancelled", "no_show"] as const;
export const reservationStatusSchema = z.enum(reservationStatuses);

export const occasions = ["birthday", "anniversary", "business", "other"] as const;
export const occasionSchema = z.enum(occasions);

export const reservationSchema = z.object({
  id: z.string().min(1),
  date: dateKeySchema,
  time: timeSchema,
  guests: z.number().int().min(1).max(12),
  name: z.string().trim().min(1).max(80),
  phone: z.string().trim().min(1).max(30),
  occasion: occasionSchema.optional(),
  note: z.string().max(300).optional(),
  status: reservationStatusSchema,
  createdAt: z.iso.datetime(),
});

export const reservationSettingsSchema = z.object({
  // how long a table is held for one reservation
  slotMinutes: z.number().int().min(30).max(300),
  // the times guests can choose, when the restaurant is open
  slots: z.array(timeSchema).min(1),
  maxGuestsPerSlot: z.number().int().min(1).max(500),
});

export const reservationsShape = {
  reservations: z.array(reservationSchema),
  reservationSettings: reservationSettingsSchema,
};

export type ReservationStatus = z.infer<typeof reservationStatusSchema>;
export type Occasion = z.infer<typeof occasionSchema>;
export type Reservation = z.infer<typeof reservationSchema>;
export type ReservationSettings = z.infer<typeof reservationSettingsSchema>;
export type ReservationsData = { reservations: Reservation[]; reservationSettings: ReservationSettings };
