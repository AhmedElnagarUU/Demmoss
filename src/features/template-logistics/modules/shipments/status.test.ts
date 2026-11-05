import { describe, expect, it } from "vitest";
import { currentStatus, moveShipment, nextStatuses, nextTrackingNumber, timelineOf } from "./status";
import { stuckShipmentFacts } from "./tips";
import { findShipment, normalizeCode } from "./tracking";
import type { Shipment } from "./types";

const shipment: Shipment = {
  id: "s1",
  trackingNumber: "JC-48213",
  customer: "Noor Trading",
  origin: { ar: "شنغهاي", en: "Shanghai" },
  destination: { ar: "جدة", en: "Jeddah" },
  mode: "sea",
  cargo: "Lamps",
  eta: "2026-12-01T10:00:00.000Z",
  events: [
    { status: "booked", at: "2026-11-01T08:00:00.000Z" },
    { status: "picked_up", at: "2026-11-02T08:00:00.000Z" },
  ],
};

describe("L5: shipment status", () => {
  it("the current status is the last event", () => {
    expect(currentStatus(shipment)).toBe("picked_up");
  });

  it("only later steps are offered, and nothing after delivered", () => {
    expect(nextStatuses(shipment)).toEqual(["in_transit", "customs", "out_for_delivery", "delivered"]);
    const done = moveShipment(shipment, "delivered", new Date("2026-11-20T08:00:00.000Z"));
    expect(done && nextStatuses(done)).toEqual([]);
  });

  it("moves forward with a new event, skipping steps when needed", () => {
    const moved = moveShipment(shipment, "customs", new Date("2026-11-10T09:30:00.000Z"), "  Documents sent  ");
    expect(moved && currentStatus(moved)).toBe("customs");
    expect(moved?.events.at(-1)).toEqual({
      status: "customs",
      at: "2026-11-10T09:30:00.000Z",
      note: "Documents sent",
    });
    expect(moved?.events).toHaveLength(3);
  });

  it("refuses to go back or to repeat the current step", () => {
    expect(moveShipment(shipment, "booked", new Date())).toBeNull();
    expect(moveShipment(shipment, "picked_up", new Date())).toBeNull();
  });

  it("an event is never dated before the previous one", () => {
    const moved = moveShipment(shipment, "in_transit", new Date("2026-10-01T00:00:00.000Z"));
    expect(moved?.events.at(-1)?.at).toBe("2026-11-02T08:00:00.000Z");
  });

  it("L4: the timeline shows done, current and upcoming steps (a skipped step is done, without a time)", () => {
    const moved = moveShipment(shipment, "customs", new Date("2026-11-10T09:30:00.000Z"));
    const steps = moved ? timelineOf(moved) : [];
    expect(steps.map((step) => step.state)).toEqual([
      "done",
      "done",
      "done",
      "current",
      "upcoming",
      "upcoming",
    ]);
    expect(steps[2]?.at).toBeUndefined();
    expect(steps[3]?.at).toBe("2026-11-10T09:30:00.000Z");
  });

  it("the next tracking number is the highest one plus one", () => {
    expect(nextTrackingNumber([shipment, { ...shipment, id: "s2", trackingNumber: "JC-48250" }])).toBe("JC-48251");
    expect(nextTrackingNumber([])).toBe("JC-48001");
  });
});

describe("L4: tracking lookup", () => {
  it("ignores case, spaces and dashes", () => {
    for (const code of ["JC-48213", "jc-48213", " jc 48213 ", "JC48213"]) {
      expect(findShipment([shipment], code)?.id).toBe("s1");
    }
    expect(normalizeCode("jc 48213")).toBe("JC48213");
  });

  it("finds nothing for an unknown or empty number", () => {
    expect(findShipment([shipment], "JC-99999")).toBeUndefined();
    expect(findShipment([shipment], "  ")).toBeUndefined();
  });
});

describe("L11: stuck shipment tip", () => {
  const inCustoms = (at: string): Shipment => ({
    ...shipment,
    events: [...shipment.events, { status: "customs", at }],
  });
  const now = new Date("2026-11-10T12:00:00.000Z");

  it("appears for a shipment in customs for two days or more, with the number of days", () => {
    const facts = stuckShipmentFacts([inCustoms("2026-11-07T12:00:00.000Z")], now);
    expect(facts).toMatchObject([{ key: "stuckShipment", label: "JC-48213", amount: 3 }]);
  });

  it("does not appear for a recent customs step or another status", () => {
    expect(stuckShipmentFacts([inCustoms("2026-11-10T06:00:00.000Z")], now)).toEqual([]);
    expect(stuckShipmentFacts([shipment], now)).toEqual([]);
  });
});
