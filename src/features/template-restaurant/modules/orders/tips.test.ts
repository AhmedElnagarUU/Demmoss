import { describe, expect, it } from "vitest";
import { nextOpening } from "./opening";
import { directOrderFacts, orderTrackingFacts } from "./tips";
import type { Order } from "./types";
import type { OpeningDay } from "../../types";

// Wednesday 2026-11-04, 15:00 (local time)
const now = new Date(2026, 10, 4, 15, 0);

function order(partial: Partial<Order>): Order {
  return {
    id: "o",
    number: 1001,
    lines: [{ name: { ar: "a", en: "a" }, price: 10, qty: 1 }],
    type: "pickup",
    name: "Guest",
    phone: "966500000000",
    payment: "cash",
    subtotal: 10,
    deliveryFee: 0,
    total: 10,
    status: "new",
    createdAt: new Date(2026, 10, 4, 12, 0).toISOString(),
    ...partial,
  };
}

describe("R6: order value tips appear only when the data justifies them", () => {
  it("counts today's orders that were not cancelled", () => {
    const facts = directOrderFacts(
      [
        order({ id: "a" }),
        order({ id: "b", status: "cancelled" }),
        order({ id: "c", createdAt: new Date(2026, 10, 3, 20, 0).toISOString() }),
        order({ id: "d", status: "completed" }),
      ],
      now,
    );
    expect(facts).toEqual([{ id: "directOrders:2026-11-04", key: "directOrders", count: 2 }]);
  });

  it("no orders today, no tip", () => {
    expect(directOrderFacts([order({ createdAt: new Date(2026, 10, 3, 20, 0).toISOString() })], now)).toEqual(
      [],
    );
    expect(directOrderFacts([], now)).toEqual([]);
  });

  it("the tracking tip is for the newest order being worked on", () => {
    const facts = orderTrackingFacts([
      order({
        id: "old",
        number: 1001,
        status: "preparing",
        createdAt: new Date(2026, 10, 4, 10, 0).toISOString(),
      }),
      order({
        id: "new",
        number: 1002,
        status: "out_for_delivery",
        createdAt: new Date(2026, 10, 4, 11, 0).toISOString(),
      }),
      order({
        id: "done",
        number: 1003,
        status: "completed",
        createdAt: new Date(2026, 10, 4, 14, 0).toISOString(),
      }),
    ]);
    expect(facts).toEqual([{ id: "orderTracking:new", key: "orderTracking", label: "#1002" }]);
  });

  it("no order in progress, no tracking tip", () => {
    expect(orderTrackingFacts([order({ status: "new" }), order({ id: "x", status: "completed" })])).toEqual(
      [],
    );
  });
});

describe("R1: the checkout tells a customer when the shop opens", () => {
  const hours = (overrides: Partial<Record<number, Partial<OpeningDay>>> = {}): OpeningDay[] =>
    [0, 1, 2, 3, 4, 5, 6].map((day) => ({
      day,
      closed: false,
      open: "12:00",
      close: "23:30",
      ...overrides[day],
    }));

  it("is null while the shop is open", () => {
    expect(nextOpening(hours(), now)).toBeNull();
  });

  it("before opening time, it opens later today", () => {
    expect(nextOpening(hours(), new Date(2026, 10, 4, 9, 0))).toEqual({ time: "12:00", inDays: 0 });
  });

  it("after closing time, it opens tomorrow", () => {
    expect(nextOpening(hours(), new Date(2026, 10, 4, 23, 45))).toEqual({ time: "12:00", inDays: 1 });
  });

  it("skips closed days", () => {
    // Thursday (4) is closed
    expect(nextOpening(hours({ 4: { closed: true } }), new Date(2026, 10, 4, 23, 45))).toEqual({
      time: "12:00",
      inDays: 2,
    });
  });
});
