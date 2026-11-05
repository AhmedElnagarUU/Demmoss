import { describe, expect, it } from "vitest";
import { feedbackInputSchema } from "./types";

const validFeedback = {
  visitorId: "7d444840-9dc0-41bc-8d6e-1b4a2e6c3a11",
  message: "The menu page is clear, thank you.",
  page: "/en/demos",
  locale: "en",
};

describe("F1: a visitor can send a message from any page", () => {
  it("accepts a message with the page it was sent from", () => {
    expect(feedbackInputSchema.safeParse(validFeedback).success).toBe(true);
  });

  it("requires a message of 3 to 1000 characters, ignoring surrounding spaces", () => {
    expect(feedbackInputSchema.safeParse({ ...validFeedback, message: "" }).success).toBe(false);
    expect(feedbackInputSchema.safeParse({ ...validFeedback, message: "  ok  " }).success).toBe(false);
    expect(feedbackInputSchema.safeParse({ ...validFeedback, message: "a".repeat(1000) }).success).toBe(true);
    expect(feedbackInputSchema.safeParse({ ...validFeedback, message: "a".repeat(1001) }).success).toBe(
      false,
    );
  });

  it("rejects an unknown visitor, a page that is not a path, and unexpected fields", () => {
    expect(feedbackInputSchema.safeParse({ ...validFeedback, visitorId: "visitor-1" }).success).toBe(false);
    expect(feedbackInputSchema.safeParse({ ...validFeedback, page: "https://evil.example" }).success).toBe(
      false,
    );
    expect(feedbackInputSchema.safeParse({ ...validFeedback, password: "secret" }).success).toBe(false);
  });
});

describe("F2: a visitor leaves a contact only if they want a reply", () => {
  it("works without a contact, and an empty contact counts as none", () => {
    const withoutContact = feedbackInputSchema.parse(validFeedback);
    const emptyContact = feedbackInputSchema.parse({ ...validFeedback, contact: "   " });
    expect(withoutContact.contact).toBeUndefined();
    expect(emptyContact.contact).toBeUndefined();
  });

  it("keeps a contact when it is given", () => {
    const parsed = feedbackInputSchema.parse({ ...validFeedback, contact: " sara@example.com " });
    expect(parsed.contact).toBe("sara@example.com");
  });
});
