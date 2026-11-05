import { describe, expect, it } from "vitest";
import { inquiryStatuses, viewingStatuses } from "../types";
import { canMoveInquiry } from "./inquiries/status";
import { allowedViewingStatuses, canMoveViewing, isActiveViewing } from "./viewings/status";

describe("RE8: viewing statuses only move along the allowed paths", () => {
  it("new → confirmed → done", () => {
    expect(canMoveViewing("new", "confirmed")).toBe(true);
    expect(canMoveViewing("confirmed", "done")).toBe(true);
  });

  it("new and confirmed can be cancelled; only confirmed can be a no-show", () => {
    expect(canMoveViewing("new", "cancelled")).toBe(true);
    expect(canMoveViewing("confirmed", "cancelled")).toBe(true);
    expect(canMoveViewing("confirmed", "no_show")).toBe(true);
    expect(canMoveViewing("new", "no_show")).toBe(false);
  });

  it("cannot skip a step or go backwards", () => {
    expect(canMoveViewing("new", "done")).toBe(false);
    expect(canMoveViewing("done", "confirmed")).toBe(false);
    expect(canMoveViewing("cancelled", "new")).toBe(false);
    expect(canMoveViewing("confirmed", "new")).toBe(false);
  });

  it("finished viewings have no actions left and do not hold a time slot", () => {
    for (const status of ["done", "cancelled", "no_show"] as const) {
      expect(allowedViewingStatuses(status)).toEqual([]);
      expect(isActiveViewing(status)).toBe(false);
    }
    expect(isActiveViewing("new")).toBe(true);
    expect(isActiveViewing("confirmed")).toBe(true);
  });

  it("nothing moves to itself", () => {
    for (const status of viewingStatuses) expect(canMoveViewing(status, status)).toBe(false);
  });
});

describe("RE9: inquiry statuses only move along the allowed paths", () => {
  it("new → replied → closed, and new may be closed directly", () => {
    expect(canMoveInquiry("new", "replied")).toBe(true);
    expect(canMoveInquiry("replied", "closed")).toBe(true);
    expect(canMoveInquiry("new", "closed")).toBe(true);
  });

  it("a closed inquiry stays closed and nothing goes back", () => {
    expect(canMoveInquiry("closed", "replied")).toBe(false);
    expect(canMoveInquiry("replied", "new")).toBe(false);
  });

  it("nothing moves to itself", () => {
    for (const status of inquiryStatuses) expect(canMoveInquiry(status, status)).toBe(false);
  });
});
