import { addDays, dateFromKey, minutesOf, toDateKey } from "@/features/demo-engine/format/dates";
import { isValidPhone } from "@/features/demo-engine/format/phone";
import { isActiveAppointment } from "./appointment-status";
import type { Appointment, DayHours, Doctor, Schedule } from "./types";

// Appointment slots come from the doctor's weekly schedule: the next 14 days, one patient per slot.
export const BOOKABLE_DAYS = 14;

export function hoursOn(doctor: Doctor, dateKey: string): DayHours {
  return doctor.schedule[dateFromKey(dateKey).getDay()] ?? null;
}

// Days (today first) on which the doctor works.
export function bookableDates(doctor: Doctor, now: Date): string[] {
  return Array.from({ length: BOOKABLE_DAYS }, (_, index) => toDateKey(addDays(now, index))).filter(
    (dateKey) => hoursOn(doctor, dateKey) !== null,
  );
}

// "HH:MM" start times of a working day; the last appointment must end by the closing time.
export function slotTimes(hours: NonNullable<DayHours>, slotMinutes: number): string[] {
  const times: string[] = [];
  const close = minutesOf(hours.to);
  for (let start = minutesOf(hours.from); start + slotMinutes <= close; start += slotMinutes) {
    const hh = String(Math.floor(start / 60)).padStart(2, "0");
    const mm = String(start % 60).padStart(2, "0");
    times.push(`${hh}:${mm}`);
  }
  return times;
}

type SlotQuery = {
  doctor: Doctor;
  dateKey: string;
  appointments: readonly Appointment[];
  now: Date;
};

// A time is free when it is inside the doctor's hours, still ahead today, and not held by a new or confirmed appointment.
export function freeTimes({ doctor, dateKey, appointments, now }: SlotQuery): string[] {
  const hours = hoursOn(doctor, dateKey);
  if (!hours || !bookableDates(doctor, now).includes(dateKey)) return [];
  const isToday = dateKey === toDateKey(now);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const taken = new Set(
    appointments
      .filter(
        (item) => item.doctorId === doctor.id && item.date === dateKey && isActiveAppointment(item.status),
      )
      .map((item) => item.time),
  );
  return slotTimes(hours, doctor.slotMinutes).filter(
    (time) => !taken.has(time) && !(isToday && minutesOf(time) <= nowMinutes),
  );
}

// The first free time in the next 14 days, for "next available" on a doctor's profile.
export function nextFreeSlot(
  doctor: Doctor,
  appointments: readonly Appointment[],
  now: Date,
): { dateKey: string; time: string } | null {
  for (const dateKey of bookableDates(doctor, now)) {
    const time = freeTimes({ doctor, dateKey, appointments, now })[0];
    if (time) return { dateKey, time };
  }
  return null;
}

// The centre's hours per weekday: from the earliest opening to the latest closing of any doctor.
export function combinedSchedule(doctors: readonly Doctor[]): Schedule {
  return Array.from({ length: 7 }, (_, day) => {
    const open = doctors.flatMap((doctor) => doctor.schedule[day] ?? []);
    if (open.length === 0) return null;
    const from = open.reduce((best, hours) => (minutesOf(hours.from) < minutesOf(best) ? hours.from : best), "23:59");
    const to = open.reduce((best, hours) => (minutesOf(hours.to) > minutesOf(best) ? hours.to : best), "00:00");
    return { from, to };
  });
}

export type BookingErrors = { doctor?: true; date?: true; time?: true; name?: true; phone?: true };

export function validateBooking(
  input: { doctor: Doctor | undefined; dateKey: string; time: string; name: string; phone: string },
  context: { appointments: readonly Appointment[]; now: Date },
): BookingErrors {
  const errors: BookingErrors = {};
  if (!input.doctor) {
    errors.doctor = true;
    errors.time = true;
  } else {
    if (!bookableDates(input.doctor, context.now).includes(input.dateKey)) errors.date = true;
    const free = freeTimes({ doctor: input.doctor, dateKey: input.dateKey, ...context });
    if (!free.includes(input.time)) errors.time = true;
  }
  if (!input.name.trim()) errors.name = true;
  if (!isValidPhone(input.phone)) errors.phone = true;
  return errors;
}
