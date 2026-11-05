import { describe, expect, it } from "vitest";
import { listNotifications } from "@/features/notifications/service";
import { setupTestDatabase } from "../../../tests/helpers/db";
import { countVisitors, findVisitor, listEventsOfVisitor, recordEvent } from "./service";
import type { EventInput } from "./types";

setupTestDatabase();

const visitorId = "7d444840-9dc0-41bc-8d6e-1b4a2e6c3a11";
const iphone = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148";

function event(extra: Partial<EventInput>): EventInput {
  return { visitorId, name: "page_view", locale: "ar", page: "/ar", ...extra };
}

describe("tracking service with a real database", () => {
  it("T1: counts a returning visitor once and keeps the first-visit source", async () => {
    const firstVisit = new Date("2026-11-01T10:00:00Z");
    const secondVisit = new Date("2026-11-03T18:30:00Z");

    await recordEvent(event({ source: { utmSource: "instagram" } }), {
      countryHeader: "SA",
      userAgent: iphone,
      now: firstVisit,
    });
    await recordEvent(event({ page: "/en/demos", locale: "en", source: { utmSource: "google" } }), {
      countryHeader: "SA",
      userAgent: iphone,
      now: secondVisit,
    });

    expect(await countVisitors()).toBe(1);
    const visitor = await findVisitor(visitorId);
    expect(visitor).toMatchObject({
      country: "SA",
      device: "mobile",
      locale: "en",
      firstSeenAt: firstVisit,
      lastSeenAt: secondVisit,
      source: { utmSource: "instagram" },
    });
  });

  it("T2: keeps the visitor's journey in order, with template and metadata", async () => {
    const context = { countryHeader: null, userAgent: null };
    await recordEvent(
      event({
        name: "demo_opened",
        template: "restaurant-fast-food",
        page: "/ar/demos/restaurant/fast-food",
      }),
      {
        ...context,
        now: new Date("2026-11-01T10:00:00Z"),
      },
    );
    await recordEvent(
      event({ name: "demo_action", template: "restaurant-fast-food", meta: { kind: "order" } }),
      {
        ...context,
        now: new Date("2026-11-01T10:05:00Z"),
      },
    );

    const journey = await listEventsOfVisitor(visitorId);
    expect(journey.map((e) => [e.name, e.template, e.meta])).toEqual([
      ["demo_opened", "restaurant-fast-food", undefined],
      ["demo_action", "restaurant-fast-food", { kind: "order" }],
    ]);
    expect((await findVisitor(visitorId))?.country).toBe("unknown");
  });

  it("T3: creates a notification only for events in the notify list", async () => {
    const context = { countryHeader: null, userAgent: null, now: new Date("2026-11-01T10:00:00Z") };
    await recordEvent(event({ name: "page_view" }), context);
    await recordEvent(
      event({ name: "content_edited", template: "restaurant-fast-food", meta: { section: "menu" } }),
      context,
    );
    await recordEvent(event({ name: "demo_registered", template: "restaurant-fast-food" }), context);

    const notifications = await listNotifications();
    expect(notifications.map((n) => [n.type, n.template, n.read])).toEqual([
      ["demo_registered", "restaurant-fast-food", false],
    ]);
  });
});
