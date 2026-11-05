import { describe, expect, it } from "vitest";
import { groupNotifications, type NotificationItem } from "./group";

function item(id: string, type: NotificationItem["type"], createdAt: string, read = false): NotificationItem {
  return { id, type, title: `Title ${id}`, template: undefined, read, createdAt: new Date(createdAt) };
}

describe("N1: notifications are saved one by one and grouped when shown", () => {
  it("groups by day (newest first), then by type with counts", () => {
    const groups = groupNotifications([
      item("1", "demo_registered", "2026-03-01T09:00:00Z"),
      item("2", "new_lead", "2026-03-02T08:00:00Z"),
      item("3", "demo_registered", "2026-03-02T10:00:00Z"),
      item("4", "demo_registered", "2026-03-02T11:00:00Z", true),
    ]);

    expect(groups.map((group) => group.day)).toEqual(["2026-03-02", "2026-03-01"]);
    expect(groups[0]?.types.map((g) => [g.type, g.count, g.unread])).toEqual([
      ["demo_registered", 2, 1],
      ["new_lead", 1, 1],
    ]);
    expect(groups[0]?.types[0]?.items.map((i) => i.id)).toEqual(["4", "3"]);
    expect(groups[1]?.types.map((g) => [g.type, g.count])).toEqual([["demo_registered", 1]]);
  });

  it("splits days at midnight UTC", () => {
    const groups = groupNotifications([
      item("late", "feedback", "2026-03-01T23:59:59Z"),
      item("early", "feedback", "2026-03-02T00:00:00Z"),
    ]);
    expect(groups.map((group) => group.day)).toEqual(["2026-03-02", "2026-03-01"]);
  });

  it("returns no groups for no notifications", () => {
    expect(groupNotifications([])).toEqual([]);
  });
});
