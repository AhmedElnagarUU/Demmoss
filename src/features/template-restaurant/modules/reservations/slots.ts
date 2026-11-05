import { addDays, minutesOf, timeKey, toDateKey } from "@/features/demo-engine/format/dates";
import { openingOnDateKey } from "../../hours";
import { isValidPhone } from "@/features/demo-engine/format/phone";
import type { OpeningDay } from "../../types";
import type { Reservation, ReservationSettings } from "./types";

export const MIN_GUESTS = 1;
export const MAX_GUESTS = 12;
export const BOOKING_WINDOW_DAYS = 30;

// A reservation holds its table, so it counts against the capacity of the slots it overlaps.
const holdingStatuses: readonly Reservation["status"][] = ["new", "confirmed", "seated"];

// Today up to 30 days ahead, as date keys.
export function bookableDates(now: Date): string[] {
  return Array.from({ length: BOOKING_WINDOW_DAYS + 1 }, (_, index) => toDateKey(addDays(now, index)));
}

export function isBookableDate(dateKey: string, now: Date): boolean {
  return bookableDates(now).includes(dateKey);
}

function guestsAlreadyAt(
  slot: string,
  dateKey: string,
  settings: ReservationSettings,
  reservations: readonly Reservation[],
): number {
  const start = minutesOf(slot);
  return reservations
    .filter((reservation) => reservation.date === dateKey && holdingStatuses.includes(reservation.status))
    .filter((reservation) => {
      const other = minutesOf(reservation.time);
      return other < start + settings.slotMinutes && start < other + settings.slotMinutes;
    })
    .reduce((total, reservation) => total + reservation.guests, 0);
}

type FreeSlotsInput = {
  dateKey: string;
  guests: number;
  now: Date;
  hours: readonly OpeningDay[];
  settings: ReservationSettings;
  reservations: readonly Reservation[];
};

// The times a guest can still choose: inside opening hours, not in the past, and with room for the party.
export function freeSlots({ dateKey, guests, now, hours, settings, reservations }: FreeSlotsInput): string[] {
  if (guests < MIN_GUESTS || guests > MAX_GUESTS) return [];
  if (!isBookableDate(dateKey, now)) return [];

  const opening = openingOnDateKey(hours, dateKey);
  if (!opening || opening.closed) return [];

  const isToday = dateKey === toDateKey(now);
  const nowMinutes = minutesOf(timeKey(now));

  return [...settings.slots]
    .sort()
    .filter(
      (slot) => minutesOf(slot) >= minutesOf(opening.open) && minutesOf(slot) < minutesOf(opening.close),
    )
    .filter((slot) => !isToday || minutesOf(slot) > nowMinutes)
    .filter(
      (slot) => guestsAlreadyAt(slot, dateKey, settings, reservations) + guests <= settings.maxGuestsPerSlot,
    );
}

export type ReservationInput = {
  dateKey: string;
  time: string;
  guests: number;
  name: string;
  phone: string;
};

export type ReservationErrors = Partial<Record<"date" | "time" | "guests" | "name" | "phone", true>>;

export function validateReservation(
  input: ReservationInput,
  context: Omit<FreeSlotsInput, "dateKey" | "guests">,
): ReservationErrors {
  const errors: ReservationErrors = {};
  if (!input.name.trim()) errors.name = true;
  if (!isValidPhone(input.phone)) errors.phone = true;
  if (!Number.isInteger(input.guests) || input.guests < MIN_GUESTS || input.guests > MAX_GUESTS) {
    errors.guests = true;
  }
  if (!isBookableDate(input.dateKey, context.now)) errors.date = true;
  const slots = freeSlots({ ...context, dateKey: input.dateKey, guests: input.guests });
  if (!slots.includes(input.time)) errors.time = true;
  return errors;
}
