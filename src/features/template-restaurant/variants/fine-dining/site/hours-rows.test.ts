import { describe, expect, it } from "vitest";
import { seedSettings } from "../seed/content";
import { formatClock, groupHours } from "./hours-rows";

describe("opening hours rows of the site", () => {
  it("groups the seed hours like the source: Tuesday to Thursday, Friday and Saturday, Sunday, Monday", () => {
    const rows = groupHours(seedSettings.hours);
    expect(rows.map((row) => row.days)).toEqual([[2, 3, 4], [5, 6], [0], [1]]);
    expect(rows[0]).toMatchObject({ closed: false, open: "17:00", close: "22:00" });
    expect(rows[3]?.closed).toBe(true);
  });

  it("a week with the same hours every day is one row", () => {
    const week = seedSettings.hours.map((day) => ({ ...day, closed: false, open: "12:00", close: "20:00" }));
    expect(groupHours(week)).toHaveLength(1);
  });

  it("shows times on a 24-hour clock", () => {
    expect(formatClock("17:00", "en")).toBe("17:00");
    expect(formatClock("23:30", "en")).toBe("23:30");
  });
});
