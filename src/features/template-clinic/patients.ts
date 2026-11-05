import { phoneDigits } from "@/features/demo-engine/format/phone";
import { isActiveAppointment } from "./appointment-status";
import type { Appointment } from "./types";

// A patient is whoever booked with the same phone number (the last 9 digits, so 0501234567 and +966 50 123 4567 match).
export type Patient = {
  key: string;
  name: string;
  phone: string;
  requests: number;
  visits: number;
  noShows: number;
  lastVisit: string | null;
  nextAppointment: string | null;
};

export function patientKey(phone: string): string {
  return phoneDigits(phone).slice(-9);
}

// Most recently active first. `today` is a "YYYY-MM-DD" key.
export function groupPatients(appointments: readonly Appointment[], today: string): Patient[] {
  const byKey = new Map<string, Appointment[]>();
  for (const appointment of appointments) {
    const key = patientKey(appointment.phone);
    byKey.set(key, [...(byKey.get(key) ?? []), appointment]);
  }

  return [...byKey.entries()]
    .map(([key, items]) => {
      const newestFirst = [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      const done = items.filter((item) => item.status === "done").map((item) => item.date);
      const upcoming = items
        .filter((item) => isActiveAppointment(item.status) && item.date >= today)
        .map((item) => item.date);
      const patient: Patient = {
        key,
        name: newestFirst[0]?.name ?? "",
        phone: newestFirst[0]?.phone ?? "",
        requests: items.length,
        visits: done.length,
        noShows: items.filter((item) => item.status === "no_show").length,
        lastVisit: done.sort().at(-1) ?? null,
        nextAppointment: upcoming.sort()[0] ?? null,
      };
      return { patient, latest: newestFirst[0]?.createdAt ?? "" };
    })
    .sort((a, b) => b.latest.localeCompare(a.latest))
    .map((entry) => entry.patient);
}
