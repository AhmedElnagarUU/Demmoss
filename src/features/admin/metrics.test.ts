import { describe, expect, it } from "vitest";
import {
  conversionRate,
  daysBefore,
  eventsWithName,
  funnelSteps,
  sourceCounts,
  sourceLabel,
  startOfUtcDay,
  templateStats,
  topCounts,
  visitorsWithEvent,
  type EventTotals,
} from "./metrics";

describe("dashboard questions: how many, and where do they stop", () => {
  it("conversion rate is a share of those who started, and null when nobody started", () => {
    expect(conversionRate(200, 50)).toBe(0.25);
    expect(conversionRate(0, 0)).toBeNull();
    expect(conversionRate(10, 0)).toBe(0);
  });

  it("conversion never exceeds 100% (a visitor can complete without the start being tracked)", () => {
    expect(conversionRate(2, 3)).toBe(1);
  });

  it("a funnel shows each step against the step before it", () => {
    expect(funnelSteps([100, 40, 10])).toEqual([
      { count: 100, rateFromPrevious: null },
      { count: 40, rateFromPrevious: 0.4 },
      { count: 10, rateFromPrevious: 0.25 },
    ]);
    expect(funnelSteps([5, 0, 0])[2]).toEqual({ count: 0, rateFromPrevious: null });
  });

  it("windows start at midnight UTC today and N days back from now", () => {
    const now = new Date("2026-03-10T15:30:00Z");
    expect(startOfUtcDay(now).toISOString()).toBe("2026-03-10T00:00:00.000Z");
    expect(daysBefore(now, 7).toISOString()).toBe("2026-03-03T15:30:00.000Z");
  });

  it("top lists put the largest first, break ties alphabetically, and respect the limit", () => {
    const rows = [
      { value: "SA", count: 5 },
      { value: "EG", count: 9 },
      { value: "AE", count: 5 },
      { value: "KW", count: 1 },
    ];
    expect(topCounts(rows, 3).map((row) => row.value)).toEqual(["EG", "AE", "SA"]);
  });
});

describe("dashboard question: which source brings visitors", () => {
  it("prefers the campaign source, then the referrer site, then direct", () => {
    expect(sourceLabel({ utmSource: "Instagram", referrer: "https://www.google.com/" })).toBe("instagram");
    expect(sourceLabel({ referrer: "https://www.google.com/search?q=x" })).toBe("google.com");
    expect(sourceLabel({ referrer: "not a url" })).toBe("not a url");
    expect(sourceLabel({})).toBe("direct");
    expect(sourceLabel({ utmSource: "", referrer: "" })).toBe("direct");
  });

  it("adds up visitors that share a source", () => {
    const counts = sourceCounts([
      { utmSource: "instagram", count: 3 },
      { utmSource: "Instagram", referrer: "https://l.instagram.com/", count: 2 },
      { count: 4 },
      { referrer: "https://www.google.com/", count: 1 },
    ]);
    expect(topCounts(counts, 10)).toEqual([
      { value: "instagram", count: 5 },
      { value: "direct", count: 4 },
      { value: "google.com", count: 1 },
    ]);
  });
});

function row(name: string, template: string | undefined, events: number, visitors: number): EventTotals {
  return { name, template, events, visitors };
}

describe("dashboard questions: demo accounts per template and where visitors stop", () => {
  const rows = [
    row("wizard_started", undefined, 40, 30),
    row("wizard_completed", undefined, 12, 10),
    row("demo_opened", "restaurant-fine-dining", 50, 20),
    row("demo_registered", "restaurant-fine-dining", 8, 8),
    row("demo_action", "restaurant-fine-dining", 14, 5),
    row("content_edited", "restaurant-fine-dining", 9, 3),
    row("demo_reset", "restaurant-fine-dining", 2, 2),
    row("demo_opened", "clinic-dental", 70, 40),
    row("demo_registered", "clinic-dental", 4, 4),
    row("whatsapp_clicked", undefined, 6, 5),
    row("whatsapp_clicked", "clinic-dental", 3, 2),
  ];

  it("builds one funnel per template, biggest audience first", () => {
    const stats = templateStats(rows);
    expect(stats.map((s) => s.template)).toEqual(["clinic-dental", "restaurant-fine-dining"]);
    expect(stats[1]).toMatchObject({
      opened: 20,
      registered: 8,
      actions: 5,
      contentEdits: 9,
      resets: 2,
    });
    expect(stats[1]?.funnel.map((step) => step.rateFromPrevious)).toEqual([null, 0.4, 0.625]);
    expect(stats[0]).toMatchObject({ opened: 40, registered: 4, actions: 0, contentEdits: 0, resets: 0 });
  });

  it("counts wizard visitors without templates and all WhatsApp clicks", () => {
    expect(visitorsWithEvent(rows, "wizard_started")).toBe(30);
    expect(
      conversionRate(visitorsWithEvent(rows, "wizard_started"), visitorsWithEvent(rows, "wizard_completed")),
    ).toBeCloseTo(1 / 3);
    expect(eventsWithName(rows, "whatsapp_clicked")).toBe(9);
  });

  it("returns nothing when there are no template events", () => {
    expect(templateStats([row("page_view", undefined, 3, 2)])).toEqual([]);
  });
});
