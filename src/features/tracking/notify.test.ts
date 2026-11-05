import { describe, expect, it } from "vitest";
import { eventNames, type EventInput } from "./types";
import { notificationForEvent } from "./notify";

function event(name: EventInput["name"], extra: Partial<EventInput> = {}): EventInput {
  return {
    visitorId: "7d444840-9dc0-41bc-8d6e-1b4a2e6c3a11",
    name,
    locale: "en",
    page: "/en",
    ...extra,
  };
}

describe("T3: the admin is notified of important actions only", () => {
  it("notifies demo registrations, demo actions, and WhatsApp clicks", () => {
    expect(
      notificationForEvent(event("demo_registered", { template: "restaurant-fine-dining" })),
    ).toMatchObject({
      type: "demo_registered",
      template: "restaurant-fine-dining",
    });
    expect(
      notificationForEvent(
        event("demo_action", { template: "restaurant-fast-food", meta: { kind: "order" } }),
      ),
    ).toMatchObject({ type: "demo_action", title: "New order in restaurant-fast-food" });
    expect(notificationForEvent(event("whatsapp_clicked"))).toMatchObject({ type: "whatsapp_clicked" });
  });

  it("does not notify other events (leads and feedback are notified by their own services)", () => {
    const notified = new Set(["demo_registered", "demo_action", "whatsapp_clicked"]);
    for (const name of eventNames.filter((eventName) => !notified.has(eventName))) {
      expect(notificationForEvent(event(name)), name).toBeNull();
    }
  });
});
