import { describe, expect, it } from "vitest";
import { eventWaitingFacts } from "./modules/event-requests/tips";
import type { EventRequest } from "./modules/event-requests/types";
import { noShowFacts } from "./modules/reservations/tips";
import type { Reservation } from "./modules/reservations/types";
import type { Menu, OpeningDay } from "./types";
import { afterHoursFacts, emptyCategoryFacts } from "./value-tips";

const hours: OpeningDay[] = [0, 1, 2, 3, 4, 5, 6].map((day) => ({
  day,
  closed: false,
  open: "13:00",
  close: "23:30",
}));

// created at local 23:40 and 15:00 on Wednesday 2026-11-04
const lateAt = new Date(2026, 10, 4, 23, 40).toISOString();
const openAt = new Date(2026, 10, 4, 15, 0).toISOString();

describe("R6: a value tip appears only when the data justifies it", () => {
  it("a request that came after closing time is a missed-call tip", () => {
    const facts = afterHoursFacts([{ id: "a", name: "Lama", createdAt: lateAt }], hours);
    expect(facts).toEqual([{ id: "afterHours:a", key: "afterHours", label: "Lama", at: lateAt }]);
  });

  it("a request during opening hours gives no tip", () => {
    expect(afterHoursFacts([{ id: "a", name: "Lama", createdAt: openAt }], hours)).toEqual([]);
  });

  it("a request on a closed day is outside the hours", () => {
    const closedWednesday = hours.map((day) => (day.day === 3 ? { ...day, closed: true } : day));
    expect(afterHoursFacts([{ id: "a", name: "Lama", createdAt: openAt }], closedWednesday)).toHaveLength(1);
  });

  it("no data, no tip", () => {
    expect(afterHoursFacts([], hours)).toEqual([]);
  });

  it("the newest late request comes first", () => {
    const earlier = new Date(2026, 10, 3, 23, 50).toISOString();
    const facts = afterHoursFacts(
      [
        { id: "old", name: "A", createdAt: earlier },
        { id: "new", name: "B", createdAt: lateAt },
      ],
      hours,
    );
    expect(facts.map((fact) => fact.id)).toEqual(["afterHours:new", "afterHours:old"]);
  });

  it("a no-show tip needs a real no-show", () => {
    const base: Reservation = {
      id: "r1",
      date: "2026-11-03",
      time: "19:30",
      guests: 2,
      name: "Hind",
      phone: "966500000002",
      status: "confirmed",
      createdAt: openAt,
    };
    expect(noShowFacts([base])).toEqual([]);
    expect(noShowFacts([{ ...base, status: "no_show" }]).map((fact) => fact.id)).toEqual(["noShow:r1"]);
  });

  it("an event tip needs a request that is still waiting for a reply", () => {
    const base: EventRequest = {
      id: "e1",
      type: "business",
      date: "2026-12-01",
      guests: 10,
      name: "Walid",
      phone: "966500000003",
      details: "",
      status: "replied",
      createdAt: openAt,
    };
    expect(eventWaitingFacts([base])).toEqual([]);
    expect(eventWaitingFacts([{ ...base, status: "new" }]).map((fact) => fact.id)).toEqual([
      "eventWaiting:e1",
    ]);
  });

  it("an empty-section tip needs a category with no available dish", () => {
    const menu: Menu = {
      categories: [
        { id: "a", name: { ar: "أ", en: "A" } },
        { id: "b", name: { ar: "ب", en: "B" } },
      ],
      items: [
        {
          id: "i1",
          categoryId: "a",
          name: { ar: "x", en: "x" },
          description: { ar: "x", en: "x" },
          price: 1,
          image: "chef",
          tags: [],
          available: true,
          featured: false,
        },
        {
          id: "i2",
          categoryId: "b",
          name: { ar: "y", en: "y" },
          description: { ar: "y", en: "y" },
          price: 1,
          image: "chef",
          tags: [],
          available: false,
          featured: false,
        },
      ],
    };
    expect(emptyCategoryFacts(menu).map((fact) => fact.id)).toEqual(["emptyCategory:b"]);
  });
});
