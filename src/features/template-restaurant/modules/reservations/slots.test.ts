import { describe, expect, it } from "vitest";
import type { OpeningDay } from "../../types";
import { bookableDates, freeSlots, validateReservation } from "./slots";
import type { Reservation, ReservationSettings } from "./types";

// Wednesday 2026-11-04, 15:00 (local time)
const now = new Date(2026, 10, 4, 15, 0);

const openEveryDay = (overrides: Partial<Record<number, Partial<OpeningDay>>> = {}): OpeningDay[] =>
  [0, 1, 2, 3, 4, 5, 6].map((day) => ({
    day,
    closed: false,
    open: "13:00",
    close: "23:30",
    ...overrides[day],
  }));

const settings: ReservationSettings = {
  slotMinutes: 90,
  slots: ["13:00", "14:30", "18:00", "19:30", "21:00", "22:30"],
  maxGuestsPerSlot: 10,
};

function reservation(partial: Partial<Reservation>): Reservation {
  return {
    id: "r",
    date: "2026-11-05",
    time: "19:30",
    guests: 2,
    name: "Guest",
    phone: "966500000001",
    status: "confirmed",
    createdAt: "2026-11-04T10:00:00.000Z",
    ...partial,
  };
}

const base = { now, hours: openEveryDay(), settings, reservations: [] as Reservation[] };

describe("R1: a guest only sees times that are really free", () => {
  it("offers all slots on a normal future day", () => {
    expect(freeSlots({ ...base, dateKey: "2026-11-05", guests: 2 })).toEqual(settings.slots);
  });

  it("hides slots that are already in the past today", () => {
    expect(freeSlots({ ...base, dateKey: "2026-11-04", guests: 2 })).toEqual([
      "18:00",
      "19:30",
      "21:00",
      "22:30",
    ]);
  });

  it("offers nothing on a day the restaurant is closed", () => {
    const hours = openEveryDay({ 4: { closed: true } }); // 2026-11-05 is a Thursday
    expect(freeSlots({ ...base, hours, dateKey: "2026-11-05", guests: 2 })).toEqual([]);
  });

  it("offers only slots inside the opening hours of that day", () => {
    const hours = openEveryDay({ 4: { open: "18:00", close: "22:00" } });
    expect(freeSlots({ ...base, hours, dateKey: "2026-11-05", guests: 2 })).toEqual([
      "18:00",
      "19:30",
      "21:00",
    ]);
  });

  it("hides a slot with no room left for the party, and keeps it for a smaller party", () => {
    const reservations = [reservation({ time: "19:30", guests: 8 })];
    expect(freeSlots({ ...base, reservations, dateKey: "2026-11-05", guests: 4 })).not.toContain("19:30");
    expect(freeSlots({ ...base, reservations, dateKey: "2026-11-05", guests: 2 })).toContain("19:30");
  });

  it("a table held for two hours also blocks the slots it overlaps", () => {
    const longHold = { ...settings, slotMinutes: 120 };
    const reservations = [reservation({ time: "19:30", guests: 10 })];
    const slots = freeSlots({ ...base, settings: longHold, reservations, dateKey: "2026-11-05", guests: 2 });
    expect(slots).not.toContain("18:00");
    expect(slots).not.toContain("19:30");
    expect(slots).not.toContain("21:00");
    expect(slots).toContain("14:30");
    expect(slots).toContain("22:30");
  });

  it("back-to-back tables do not block each other", () => {
    const reservations = [reservation({ time: "19:30", guests: 10 })];
    const slots = freeSlots({ ...base, reservations, dateKey: "2026-11-05", guests: 2 });
    expect(slots).toContain("18:00");
    expect(slots).toContain("21:00");
  });

  it("cancelled and no-show reservations free their table again", () => {
    const reservations = [
      reservation({ time: "19:30", guests: 10, status: "cancelled" }),
      reservation({ id: "r2", time: "19:30", guests: 10, status: "no_show" }),
    ];
    expect(freeSlots({ ...base, reservations, dateKey: "2026-11-05", guests: 2 })).toContain("19:30");
  });

  it("a full day-and-time on another date does not block this date", () => {
    const reservations = [reservation({ date: "2026-11-06", time: "19:30", guests: 10 })];
    expect(freeSlots({ ...base, reservations, dateKey: "2026-11-05", guests: 2 })).toContain("19:30");
  });

  it("guests must be between 1 and 12", () => {
    expect(freeSlots({ ...base, dateKey: "2026-11-05", guests: 0 })).toEqual([]);
    expect(freeSlots({ ...base, dateKey: "2026-11-05", guests: 13 })).toEqual([]);
    expect(
      freeSlots({
        ...base,
        settings: { ...settings, maxGuestsPerSlot: 50 },
        dateKey: "2026-11-05",
        guests: 12,
      }),
    ).not.toEqual([]);
  });

  it("dates go from today to 30 days ahead, and nothing beyond", () => {
    const dates = bookableDates(now);
    expect(dates[0]).toBe("2026-11-04");
    expect(dates.at(-1)).toBe("2026-12-04");
    expect(dates).toHaveLength(31);
    expect(freeSlots({ ...base, dateKey: "2026-12-05", guests: 2 })).toEqual([]);
    expect(freeSlots({ ...base, dateKey: "2026-11-03", guests: 2 })).toEqual([]);
  });
});

describe("R1: a reservation is validated before it is saved", () => {
  const context = { hours: base.hours, settings, reservations: [] as Reservation[] };
  const valid = { dateKey: "2026-11-05", time: "19:30", guests: 2, name: "Sara", phone: "+966 50 123 4567" };

  it("accepts a complete request for a free slot", () => {
    expect(validateReservation(valid, { now, ...context })).toEqual({});
  });

  it("rejects a missing name, a bad phone, a taken time, and too many guests", () => {
    expect(validateReservation({ ...valid, name: "  " }, { now, ...context })).toEqual({ name: true });
    expect(validateReservation({ ...valid, phone: "12" }, { now, ...context })).toEqual({ phone: true });
    expect(validateReservation({ ...valid, time: "10:00" }, { now, ...context })).toEqual({ time: true });
    expect(validateReservation({ ...valid, guests: 13 }, { now, ...context })).toMatchObject({
      guests: true,
    });
  });
});
