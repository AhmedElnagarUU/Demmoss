import { describe, expect, it } from "vitest";
import { allowedAppointmentStatuses, canMoveAppointment, isActiveAppointment } from "./appointment-status";

describe("C5: appointment status transitions", () => {
  it("new can be confirmed or cancelled, not finished directly", () => {
    expect(allowedAppointmentStatuses("new")).toEqual(["confirmed", "cancelled"]);
    expect(canMoveAppointment("new", "done")).toBe(false);
    expect(canMoveAppointment("new", "no_show")).toBe(false);
  });

  it("confirmed can be done, cancelled, or no show", () => {
    expect(allowedAppointmentStatuses("confirmed")).toEqual(["done", "cancelled", "no_show"]);
  });

  it("finished appointments cannot change again", () => {
    for (const status of ["done", "cancelled", "no_show"] as const) {
      expect(allowedAppointmentStatuses(status)).toEqual([]);
      expect(canMoveAppointment(status, "confirmed")).toBe(false);
    }
  });

  it("only new and confirmed hold a time slot", () => {
    expect(
      ["new", "confirmed", "done", "cancelled", "no_show"].filter((s) => isActiveAppointment(s as never)),
    ).toEqual(["new", "confirmed"]);
  });
});
