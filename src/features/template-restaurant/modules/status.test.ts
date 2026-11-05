import { describe, expect, it } from "vitest";
import { canMoveEventRequest } from "./event-requests/status";
import { allowedReservationStatuses, canMoveReservation } from "./reservations/status";
import { eventRequestStatuses } from "./event-requests/types";
import { reservationStatuses } from "./reservations/types";

describe("R2: reservation statuses only move along the allowed paths", () => {
  it("new → confirmed → seated", () => {
    expect(canMoveReservation("new", "confirmed")).toBe(true);
    expect(canMoveReservation("confirmed", "seated")).toBe(true);
  });

  it("new and confirmed can be cancelled; only confirmed can be a no-show", () => {
    expect(canMoveReservation("new", "cancelled")).toBe(true);
    expect(canMoveReservation("confirmed", "cancelled")).toBe(true);
    expect(canMoveReservation("confirmed", "no_show")).toBe(true);
    expect(canMoveReservation("new", "no_show")).toBe(false);
  });

  it("cannot skip a step or go backwards", () => {
    expect(canMoveReservation("new", "seated")).toBe(false);
    expect(canMoveReservation("seated", "confirmed")).toBe(false);
    expect(canMoveReservation("cancelled", "new")).toBe(false);
  });

  it("finished reservations have no actions left", () => {
    for (const status of ["seated", "cancelled", "no_show"] as const) {
      expect(allowedReservationStatuses(status)).toEqual([]);
    }
  });

  it("nothing moves to itself", () => {
    for (const status of reservationStatuses) expect(canMoveReservation(status, status)).toBe(false);
  });
});

describe("R2: event request statuses only move along the allowed paths", () => {
  it("new → replied → booked or closed", () => {
    expect(canMoveEventRequest("new", "replied")).toBe(true);
    expect(canMoveEventRequest("replied", "booked")).toBe(true);
    expect(canMoveEventRequest("replied", "closed")).toBe(true);
  });

  it("cannot be booked before a reply, and finished requests stay finished", () => {
    expect(canMoveEventRequest("new", "booked")).toBe(false);
    expect(canMoveEventRequest("booked", "closed")).toBe(false);
    expect(canMoveEventRequest("closed", "replied")).toBe(false);
  });

  it("nothing moves to itself", () => {
    for (const status of eventRequestStatuses) expect(canMoveEventRequest(status, status)).toBe(false);
  });
});
