import { addDays, toDateKey } from "@/features/demo-engine/format/dates";
import { isValidPhone } from "@/features/demo-engine/format/phone";

export const EVENT_MIN_GUESTS = 4;
export const EVENT_MAX_GUESTS = 60;
export const EVENT_WINDOW_DAYS = 365;

export type EventRequestInput = { dateKey: string; guests: number; name: string; phone: string };
export type EventRequestErrors = Partial<Record<"date" | "guests" | "name" | "phone", true>>;

export function validateEventRequest(input: EventRequestInput, now: Date): EventRequestErrors {
  const errors: EventRequestErrors = {};
  if (!input.name.trim()) errors.name = true;
  if (!isValidPhone(input.phone)) errors.phone = true;
  if (!Number.isInteger(input.guests) || input.guests < EVENT_MIN_GUESTS || input.guests > EVENT_MAX_GUESTS) {
    errors.guests = true;
  }
  const withinWindow =
    input.dateKey >= toDateKey(now) && input.dateKey <= toDateKey(addDays(now, EVENT_WINDOW_DAYS));
  if (!withinWindow) errors.date = true;
  return errors;
}
