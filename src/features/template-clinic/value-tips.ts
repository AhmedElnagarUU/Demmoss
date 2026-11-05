import type { LocalizedText } from "@/features/demo-engine/types";
import { minutesOf, timeKey } from "@/features/demo-engine/format/dates";
import { hoursOn } from "./booking";
import type { Appointment, Doctor, Treatment } from "./types";

// Value tips are facts computed from the demo data. A fact exists only when the data justifies it:
// no data, no tip, and no invented numbers. The dashboard turns facts into text (dashboard/tip-texts.ts).
export type TipFact = {
  id: string;
  key: "waiting" | "afterHours" | "noShows" | "popularTreatment";
  label?: string | LocalizedText;
  count?: number;
  percent?: number;
};

const DAY_MS = 24 * 60 * 60 * 1000;

// A request nobody answered for more than a day: the patient probably called another clinic. Oldest first.
export function waitingFacts(appointments: readonly Appointment[], now: Date): TipFact[] {
  return appointments
    .filter((item) => item.status === "new" && now.getTime() - new Date(item.createdAt).getTime() > DAY_MS)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map((item) => ({ id: `waiting:${item.id}`, key: "waiting", label: item.name }));
}

// True when the request was sent at a time when no doctor was working (the site worked while the clinic was closed).
export function wasAfterHours(createdAt: string, doctors: readonly Doctor[]): boolean {
  const date = new Date(createdAt);
  const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const minutes = minutesOf(timeKey(date));
  return !doctors.some((doctor) => {
    const hours = hoursOn(doctor, dateKey);
    return hours !== null && minutes >= minutesOf(hours.from) && minutes < minutesOf(hours.to);
  });
}

export function afterHoursFacts(appointments: readonly Appointment[], doctors: readonly Doctor[]): TipFact[] {
  const count = appointments.filter((item) => wasAfterHours(item.createdAt, doctors)).length;
  return count > 0 ? [{ id: "afterHours", key: "afterHours", count }] : [];
}

// No-shows are empty slots: their share of the visits that were finished (done or no-show).
export function noShowFacts(appointments: readonly Appointment[]): TipFact[] {
  const noShows = appointments.filter((item) => item.status === "no_show").length;
  const finished = appointments.filter((item) => item.status === "done").length + noShows;
  if (noShows === 0) return [];
  return [{ id: "noShows", key: "noShows", count: noShows, percent: Math.round((noShows / finished) * 100) }];
}

// The treatment patients ask for most (at least two requests that were not cancelled).
export function popularTreatmentFacts(
  appointments: readonly Appointment[],
  treatments: readonly Treatment[],
): TipFact[] {
  const counts = new Map<string, number>();
  for (const item of appointments) {
    if (!item.treatmentId || item.status === "cancelled") continue;
    counts.set(item.treatmentId, (counts.get(item.treatmentId) ?? 0) + 1);
  }
  const best = treatments
    .map((treatment) => ({ treatment, count: counts.get(treatment.id) ?? 0 }))
    .filter((entry) => entry.count >= 2)
    .sort((a, b) => b.count - a.count)[0];
  if (!best) return [];
  return [
    {
      id: `popularTreatment:${best.treatment.id}`,
      key: "popularTreatment",
      label: best.treatment.name,
      count: best.count,
    },
  ];
}

type TipData = {
  appointments: readonly Appointment[];
  treatments: readonly Treatment[];
  doctors: readonly Doctor[];
};

export function allTipFacts(data: TipData, now: Date): TipFact[] {
  return [
    ...waitingFacts(data.appointments, now),
    ...afterHoursFacts(data.appointments, data.doctors),
    ...noShowFacts(data.appointments),
    ...popularTreatmentFacts(data.appointments, data.treatments),
  ];
}
