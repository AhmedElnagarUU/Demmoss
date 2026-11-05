import { describe, expect, it } from "vitest";
import type { Viewing } from "../../types";
import { bookableDates, freeViewingTimes, validateViewing, VIEWING_TIMES } from "./slots";

// Wednesday 4 November 2026, noon. Friday is the 6th and the 13th.
const now = new Date(2026, 10, 4, 12, 0);

function viewing(over: Partial<Viewing>): Viewing {
  return {
    id: "v",
    name: "Sara",
    phone: "966500000001",
    date: "2026-11-05",
    time: "10:30",
    status: "new",
    createdAt: "2026-11-04T08:00:00.000Z",
    ...over,
  };
}

describe("RE3: viewing slots", () => {
  it("offers the next 14 days without Fridays", () => {
    const dates = bookableDates(now);
    expect(dates[0]).toBe("2026-11-04");
    expect(dates).not.toContain("2026-11-06");
    expect(dates).not.toContain("2026-11-13");
    expect(dates).toHaveLength(12);
  });

  it("offers all six times on a free future day", () => {
    expect(freeViewingTimes({ dateKey: "2026-11-05", viewings: [], now })).toEqual([...VIEWING_TIMES]);
  });

  it("today only offers times that are still ahead", () => {
    expect(freeViewingTimes({ dateKey: "2026-11-04", viewings: [], now })).toEqual([
      "16:00",
      "17:30",
      "19:00",
    ]);
    expect(
      freeViewingTimes({ dateKey: "2026-11-04", viewings: [], now: new Date(2026, 10, 4, 20, 0) }),
    ).toEqual([]);
  });

  it("a time is full when two active viewings hold it, but a cancelled one does not", () => {
    const full = [viewing({ id: "a" }), viewing({ id: "b", status: "confirmed" })];
    expect(freeViewingTimes({ dateKey: "2026-11-05", viewings: full, now })).not.toContain("10:30");
    const withCancelled = [viewing({ id: "a" }), viewing({ id: "b", status: "cancelled" })];
    expect(freeViewingTimes({ dateKey: "2026-11-05", viewings: withCancelled, now })).toContain("10:30");
  });

  it("the same property cannot be shown twice at one time, another property can", () => {
    const held = [viewing({ propertyId: "villa" })];
    expect(
      freeViewingTimes({ dateKey: "2026-11-05", propertyId: "villa", viewings: held, now }),
    ).not.toContain("10:30");
    expect(freeViewingTimes({ dateKey: "2026-11-05", propertyId: "flat", viewings: held, now })).toContain(
      "10:30",
    );
  });

  it("offers nothing on a Friday or outside the 14 days", () => {
    expect(freeViewingTimes({ dateKey: "2026-11-06", viewings: [], now })).toEqual([]);
    expect(freeViewingTimes({ dateKey: "2026-12-01", viewings: [], now })).toEqual([]);
  });

  it("validation reports a taken time, an empty name, and a bad phone", () => {
    const held = [viewing({ id: "a" }), viewing({ id: "b" })];
    const errors = validateViewing(
      { dateKey: "2026-11-05", time: "10:30", name: "  ", phone: "123" },
      { viewings: held, now },
    );
    expect(errors).toEqual({ time: true, name: true, phone: true });
    expect(
      validateViewing(
        { dateKey: "2026-11-05", time: "12:00", name: "Sara", phone: "+966 50 123 4567" },
        { viewings: held, now },
      ),
    ).toEqual({});
  });
});
