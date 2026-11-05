import { describe, expect, it } from "vitest";
import { allowedOrderStatuses, canMoveOrder, statusSteps } from "./status";
import { orderStatuses } from "./types";

describe("R3: order statuses only move along the allowed paths", () => {
  it("new → preparing → ready for pickup → completed", () => {
    expect(canMoveOrder("new", "preparing", "pickup")).toBe(true);
    expect(canMoveOrder("preparing", "ready", "pickup")).toBe(true);
    expect(canMoveOrder("ready", "completed", "pickup")).toBe(true);
  });

  it("a delivery goes through out_for_delivery, never ready", () => {
    expect(canMoveOrder("preparing", "out_for_delivery", "delivery")).toBe(true);
    expect(canMoveOrder("preparing", "ready", "delivery")).toBe(false);
    expect(canMoveOrder("preparing", "out_for_delivery", "pickup")).toBe(false);
    expect(canMoveOrder("out_for_delivery", "completed", "delivery")).toBe(true);
  });

  it("an unfinished order can be cancelled, a finished one cannot change", () => {
    for (const from of ["new", "preparing", "ready", "out_for_delivery"] as const) {
      expect(canMoveOrder(from, "cancelled", "delivery")).toBe(true);
    }
    for (const from of ["completed", "cancelled"] as const) {
      expect(allowedOrderStatuses(from, "pickup")).toEqual([]);
    }
  });

  it("cannot skip a step or go backwards", () => {
    expect(canMoveOrder("new", "completed", "pickup")).toBe(false);
    expect(canMoveOrder("new", "ready", "pickup")).toBe(false);
    expect(canMoveOrder("preparing", "new", "pickup")).toBe(false);
    expect(canMoveOrder("completed", "preparing", "pickup")).toBe(false);
  });

  it("nothing moves to itself", () => {
    for (const status of orderStatuses) expect(canMoveOrder(status, status, "pickup")).toBe(false);
  });

  it("the customer's steps follow the order type", () => {
    expect(statusSteps("pickup")).toEqual(["new", "preparing", "ready", "completed"]);
    expect(statusSteps("delivery")).toEqual(["new", "preparing", "out_for_delivery", "completed"]);
  });
});
