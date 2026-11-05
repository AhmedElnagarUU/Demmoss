import { describe, expect, it } from "vitest";
import { daysFrom } from "./days-from";

describe("E2: sample data dates are relative to today", () => {
  const now = new Date(2026, 0, 30, 9, 15);

  it("gives yesterday, today, and tomorrow at the requested time", () => {
    const yesterday = new Date(daysFrom(now, -1, "19:30"));
    expect([yesterday.getMonth(), yesterday.getDate(), yesterday.getHours(), yesterday.getMinutes()]).toEqual(
      [0, 29, 19, 30],
    );

    const today = new Date(daysFrom(now, 0, "08:05"));
    expect([today.getDate(), today.getHours(), today.getMinutes()]).toEqual([30, 8, 5]);

    const tomorrow = new Date(daysFrom(now, 1));
    expect([tomorrow.getMonth(), tomorrow.getDate(), tomorrow.getHours()]).toEqual([0, 31, 12]);
  });

  it("crosses month ends and moves with the date it is given", () => {
    const nextWeek = new Date(daysFrom(now, 7, "10:00"));
    expect([nextWeek.getMonth(), nextWeek.getDate()]).toEqual([1, 6]);

    const laterNow = new Date(2026, 5, 10, 9, 0);
    expect(new Date(daysFrom(laterNow, -1)).getDate()).toBe(9);
  });

  it("does not change the date it is given", () => {
    const original = now.getTime();
    daysFrom(now, 5);
    expect(now.getTime()).toBe(original);
  });
});
