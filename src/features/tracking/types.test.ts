import { describe, expect, it } from "vitest";
import { eventInputSchema } from "./types";

const validEvent = {
  visitorId: "7d444840-9dc0-41bc-8d6e-1b4a2e6c3a11",
  name: "demo_action",
  locale: "ar",
  page: "/ar/demos/restaurant/fast-food/checkout",
  template: "restaurant-fast-food",
  meta: { kind: "order" },
};

describe("T4: tracking never accepts personal data or demo content", () => {
  it("accepts a key action with allowed metadata", () => {
    expect(eventInputSchema.safeParse(validEvent).success).toBe(true);
  });

  it("rejects metadata keys outside the allowed list (e.g. a customer name or phone)", () => {
    expect(eventInputSchema.safeParse({ ...validEvent, meta: { kind: "order", name: "Sara" } }).success).toBe(
      false,
    );
    expect(eventInputSchema.safeParse({ ...validEvent, meta: { phone: "0500000000" } }).success).toBe(false);
  });

  it("rejects extra top-level fields such as a demo password", () => {
    expect(eventInputSchema.safeParse({ ...validEvent, password: "secret" }).success).toBe(false);
  });

  it("rejects event names that are not in the analytics list", () => {
    expect(eventInputSchema.safeParse({ ...validEvent, name: "button_clicked" }).success).toBe(false);
  });

  it("rejects a visitor id that is not a random id", () => {
    expect(eventInputSchema.safeParse({ ...validEvent, visitorId: "sara@example.com" }).success).toBe(false);
  });
});
