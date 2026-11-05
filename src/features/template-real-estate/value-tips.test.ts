import { describe, expect, it } from "vitest";
import {
  allTipFacts,
  hotPropertyFacts,
  lastUnitFacts,
  waitingInquiryFacts,
  waitingViewingFacts,
} from "./value-tips";
import type { Inquiry, Property, Viewing } from "./types";

const now = new Date("2026-11-04T12:00:00.000Z");

const viewing = (over: Partial<Viewing>): Viewing => ({
  id: "v1",
  name: "Sara",
  phone: "966500000001",
  date: "2026-11-08",
  time: "10:30",
  status: "new",
  createdAt: "2026-11-02T12:00:00.000Z",
  ...over,
});
const inquiry = (over: Partial<Inquiry>): Inquiry => ({
  id: "i1",
  kind: "question",
  name: "Omar",
  phone: "966500000002",
  message: "How much?",
  status: "new",
  createdAt: "2026-11-02T12:00:00.000Z",
  ...over,
});
const property = (id: string, statuses: ("available" | "sold")[] = []) =>
  ({
    id,
    title: { ar: id, en: id },
    status: "available",
    units: statuses.map((status, index) => ({
      id: `${id}-${index}`,
      label: "U",
      floor: 0,
      size: 1,
      price: 1,
      status,
    })),
  }) as unknown as Property;

describe("RE12: value tips are facts from the demo data", () => {
  it("a viewing request waiting for more than a day gives a tip with the client's name", () => {
    expect(waitingViewingFacts([viewing({})], now)).toEqual([
      { id: "viewingWaiting:v1", key: "viewingWaiting", label: "Sara" },
    ]);
  });

  it("recent, confirmed, or finished viewings give no tip", () => {
    expect(waitingViewingFacts([viewing({ createdAt: "2026-11-04T06:00:00.000Z" })], now)).toEqual([]);
    expect(waitingViewingFacts([viewing({ status: "confirmed" })], now)).toEqual([]);
    expect(waitingViewingFacts([], now)).toEqual([]);
  });

  it("an unanswered inquiry older than a day gives a tip; a replied one does not", () => {
    expect(waitingInquiryFacts([inquiry({})], now)).toHaveLength(1);
    expect(waitingInquiryFacts([inquiry({ status: "replied" })], now)).toEqual([]);
  });

  it("the most requested property needs at least two viewing requests that were not cancelled", () => {
    const properties = [property("a"), property("b")];
    const one = [viewing({ propertyId: "a" })];
    expect(hotPropertyFacts(one, properties)).toEqual([]);
    const two = [viewing({ id: "1", propertyId: "a" }), viewing({ id: "2", propertyId: "a" })];
    expect(hotPropertyFacts(two, properties)).toMatchObject([{ key: "hotProperty", count: 2 }]);
    const cancelled = [
      viewing({ id: "1", propertyId: "a" }),
      viewing({ id: "2", propertyId: "a", status: "cancelled" }),
    ];
    expect(hotPropertyFacts(cancelled, properties)).toEqual([]);
  });

  it("a residence with one unit left gives a tip", () => {
    expect(
      lastUnitFacts([property("x", ["available", "sold"]), property("y", ["available", "available"])]),
    ).toEqual([{ id: "lastUnit:x", key: "lastUnit", label: { ar: "x", en: "x" } }]);
  });

  it("no data means no tips", () => {
    expect(allTipFacts({ viewings: [], inquiries: [], properties: [] }, now)).toEqual([]);
  });
});
