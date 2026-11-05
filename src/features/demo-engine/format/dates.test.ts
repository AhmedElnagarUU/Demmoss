import { describe, expect, it } from "vitest";
import { addDays, dateFromKey, dateKeyFromNow, minutesOf, timeKey, toDateKey } from "./dates";

describe("E2: dates stay local keys, so a booking never shifts with time zones", () => {
  it("round-trips a date key and zero-pads month and day", () => {
    expect(toDateKey(new Date(2026, 0, 5, 23, 59))).toBe("2026-01-05");
    expect(toDateKey(dateFromKey("2026-12-31"))).toBe("2026-12-31");
  });

  it("adds days across a month end without changing the original date", () => {
    const now = new Date(2026, 0, 30, 9, 0);
    expect(dateKeyFromNow(now, 3)).toBe("2026-02-02");
    expect(dateKeyFromNow(now, -30)).toBe("2025-12-31");
    expect(addDays(now, 1).getDate()).toBe(31);
    expect(now.getDate()).toBe(30);
  });

  it("reads and writes HH:MM times", () => {
    expect(minutesOf("08:05")).toBe(485);
    expect(timeKey(new Date(2026, 0, 1, 7, 3))).toBe("07:03");
  });
});
