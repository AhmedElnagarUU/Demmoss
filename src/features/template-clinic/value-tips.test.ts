import { describe, expect, it } from "vitest";
import {
  afterHoursFacts,
  allTipFacts,
  noShowFacts,
  popularTreatmentFacts,
  waitingFacts,
  wasAfterHours,
} from "./value-tips";
import type { Appointment, Doctor, Treatment } from "./types";

const now = new Date(2026, 10, 4, 12, 0);
const hours = { from: "09:00", to: "17:00" };
const doctor: Doctor = {
  id: "d1",
  name: { ar: "د", en: "Dr" },
  title: { ar: "ط", en: "T" },
  photo: "p",
  bio: { ar: "", en: "" },
  credentials: [],
  years: 1,
  slotMinutes: 30,
  schedule: [hours, hours, hours, hours, hours, hours, hours],
};
const treatment = (id: string): Treatment => ({
  id,
  name: { ar: id, en: id },
  description: { ar: "", en: "" },
  steps: [],
  durationMinutes: 30,
  price: 100,
  fromPrice: false,
  priceNote: { ar: "", en: "" },
});
const make = (over: Partial<Appointment>): Appointment => ({
  id: "a",
  doctorId: "d1",
  name: "Sara",
  phone: "966500000001",
  date: "2026-11-06",
  time: "09:00",
  status: "new",
  createdAt: new Date(2026, 10, 4, 10, 0).toISOString(),
  ...over,
});

describe("C9: value tips appear only when the data justifies them", () => {
  it("waiting: a new request older than a day, not a fresh one or a confirmed one", () => {
    const old = new Date(2026, 10, 2, 10, 0).toISOString();
    expect(waitingFacts([make({ id: "x", createdAt: old, name: "Huda" })], now)).toEqual([
      { id: "waiting:x", key: "waiting", label: "Huda" },
    ]);
    expect(waitingFacts([make({})], now)).toEqual([]);
    expect(waitingFacts([make({ createdAt: old, status: "confirmed" })], now)).toEqual([]);
  });

  it("afterHours: counts requests sent outside every doctor's hours", () => {
    const night = new Date(2026, 10, 3, 23, 30).toISOString();
    expect(wasAfterHours(night, [doctor])).toBe(true);
    expect(wasAfterHours(new Date(2026, 10, 3, 10, 0).toISOString(), [doctor])).toBe(false);
    expect(afterHoursFacts([make({ createdAt: night }), make({})], [doctor])).toEqual([
      { id: "afterHours", key: "afterHours", count: 1 },
    ]);
    expect(afterHoursFacts([make({})], [doctor])).toEqual([]);
  });

  it("noShows: share of finished visits, nothing when there are none", () => {
    const list = [
      make({ status: "no_show" }),
      make({ status: "done" }),
      make({ status: "done" }),
      make({ status: "done" }),
    ];
    expect(noShowFacts(list)).toEqual([{ id: "noShows", key: "noShows", count: 1, percent: 25 }]);
    expect(noShowFacts([make({ status: "done" })])).toEqual([]);
  });

  it("popularTreatment: needs two non-cancelled requests", () => {
    const two = [make({ treatmentId: "implant" }), make({ treatmentId: "implant", status: "done" })];
    expect(popularTreatmentFacts(two, [treatment("implant")])[0]).toMatchObject({
      key: "popularTreatment",
      count: 2,
    });
    const cancelled = [
      make({ treatmentId: "implant" }),
      make({ treatmentId: "implant", status: "cancelled" }),
    ];
    expect(popularTreatmentFacts(cancelled, [treatment("implant")])).toEqual([]);
  });

  it("no data, no tips", () => {
    expect(allTipFacts({ appointments: [], treatments: [], doctors: [doctor] }, now)).toEqual([]);
  });
});
