import { describe, expect, it } from "vitest";
import { pickValueTip } from "./value-tip";

const tips = [
  { id: "after-hours-booking", text: "A booking came while you were closed." },
  { id: "empty-menu-category", text: "A category has no items." },
];

describe("value tips: at most one per page, dismissed ones stay hidden", () => {
  it("shows the first tip", () => {
    expect(pickValueTip(tips, [])?.id).toBe("after-hours-booking");
  });

  it("moves to the next tip when one is dismissed", () => {
    expect(pickValueTip(tips, ["after-hours-booking"])?.id).toBe("empty-menu-category");
  });

  it("shows nothing when all are dismissed or there are none", () => {
    expect(pickValueTip(tips, ["after-hours-booking", "empty-menu-category"])).toBeNull();
    expect(pickValueTip([], [])).toBeNull();
  });
});
