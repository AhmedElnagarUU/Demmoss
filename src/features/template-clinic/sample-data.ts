import { addDays, minutesOf, toDateKey } from "@/features/demo-engine/format/dates";
import { hoursOn, slotTimes } from "./booking";
import type { Appointment, AppointmentStatus, Doctor } from "./types";

// Sample appointments for a seed. Dates are relative to today, always on a day the doctor works and at a time inside the doctor's hours,
// so the dashboard is never empty and the sample never contradicts the schedule.
export type AppointmentSpec = {
  id: string;
  doctor: Doctor;
  treatmentId?: string;
  name: string;
  phone: string;
  status: AppointmentStatus;
  // days from today (negative = past); moved away from today until the doctor works that day
  dayOffset: number;
  // which free slot of that day (0 = first)
  slotIndex: number;
  // either hours before now, or "yesterday at HH:MM" for a request that came while the clinic was closed
  createdHoursAgo?: number;
  createdYesterdayAt?: string;
  note?: string;
};

// The first working day at or beyond `dayOffset`, moving away from today.
export function workingDateKey(doctor: Doctor, now: Date, dayOffset: number): string {
  const step = dayOffset < 0 ? -1 : 1;
  for (let offset = dayOffset; Math.abs(offset) < 60 + Math.abs(dayOffset); offset += step) {
    const dateKey = toDateKey(addDays(now, offset));
    if (hoursOn(doctor, dateKey)) return dateKey;
  }
  return toDateKey(addDays(now, dayOffset));
}

function createdAtOf(spec: AppointmentSpec, now: Date): string {
  if (spec.createdYesterdayAt) {
    const yesterday = addDays(now, -1);
    yesterday.setHours(
      Math.floor(minutesOf(spec.createdYesterdayAt) / 60),
      minutesOf(spec.createdYesterdayAt) % 60,
      0,
      0,
    );
    return yesterday.toISOString();
  }
  return new Date(now.getTime() - (spec.createdHoursAgo ?? 24) * 60 * 60 * 1000).toISOString();
}

export function buildAppointments(specs: readonly AppointmentSpec[], now: Date): Appointment[] {
  return specs.map((spec) => {
    const date = workingDateKey(spec.doctor, now, spec.dayOffset);
    const hours = hoursOn(spec.doctor, date);
    const times = hours ? slotTimes(hours, spec.doctor.slotMinutes) : [];
    return {
      id: spec.id,
      doctorId: spec.doctor.id,
      ...(spec.treatmentId ? { treatmentId: spec.treatmentId } : {}),
      name: spec.name,
      phone: spec.phone,
      date,
      time: times[Math.min(spec.slotIndex, times.length - 1)] ?? "09:00",
      ...(spec.note ? { note: spec.note } : {}),
      status: spec.status,
      createdAt: createdAtOf(spec, now),
    };
  });
}
