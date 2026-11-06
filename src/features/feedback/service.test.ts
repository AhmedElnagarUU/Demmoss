import { describe, expect, it, vi } from "vitest";
import { listNotifications } from "@/features/notifications/service";
import { setupTestDatabase } from "../../../tests/helpers/db";
import { createFeedback, listFeedback, submitFeedback } from "./service";
import type { FeedbackInput } from "./types";

// Next.js request headers exist only inside a request; with no ip header the limiter stays off.
vi.mock("next/headers", () => ({ headers: async () => new Headers() }));

setupTestDatabase();

const feedback: FeedbackInput = {
  visitorId: "7d444840-9dc0-41bc-8d6e-1b4a2e6c3a11",
  contact: undefined,
  message: "Please add a price list.",
  page: "/en/demos/restaurant/fast-food",
  template: "restaurant-fast-food",
  locale: "en",
};

describe("feedback service with a real database", () => {
  it("F3: saving feedback keeps it unread and notifies the admin", async () => {
    await createFeedback({ ...feedback, contact: "sara@example.com" });

    const saved = await listFeedback();
    expect(saved).toHaveLength(1);
    expect(saved[0]).toMatchObject({
      message: "Please add a price list.",
      contact: "sara@example.com",
      page: "/en/demos/restaurant/fast-food",
      template: "restaurant-fast-food",
      read: false,
    });

    const notifications = await listNotifications();
    expect(notifications.map((n) => [n.type, n.template, n.read])).toEqual([
      ["feedback", "restaurant-fast-food", false],
    ]);
  });

  it("F2: feedback without a contact is saved without one", async () => {
    await createFeedback({ ...feedback, template: undefined });

    const [saved] = await listFeedback();
    expect(saved?.contact).toBeUndefined();
  });

  it("limits one client to five messages per hour and saves only those", async () => {
    const request = { clientKey: "feedback-test:limit", now: 1_770_000_000_000 };

    for (let i = 0; i < 5; i += 1) {
      expect(await submitFeedback(feedback, request)).toEqual({ ok: true });
    }

    expect(await submitFeedback(feedback, request)).toEqual({ ok: false, reason: "rate_limited" });
    expect(await listFeedback()).toHaveLength(5);
  });
});
