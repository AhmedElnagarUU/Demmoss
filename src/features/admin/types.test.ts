import { describe, expect, it } from "vitest";
import {
  leadNotesInputSchema,
  leadStatusInputSchema,
  loginInputSchema,
  openNotificationInputSchema,
} from "./types";

const id = "65f0c0ffee0123456789abcd";

describe("admin Server Actions reject bad input before anything is read or written", () => {
  it("login needs an email, a password, and a known locale", () => {
    expect(loginInputSchema.safeParse({ email: "a@b.co", password: "x", locale: "en" }).success).toBe(true);
    expect(loginInputSchema.safeParse({ email: "", password: "x", locale: "en" }).success).toBe(false);
    expect(loginInputSchema.safeParse({ email: "a@b.co", password: "", locale: "en" }).success).toBe(false);
    expect(loginInputSchema.safeParse({ email: "a@b.co", password: "x", locale: "fr" }).success).toBe(false);
  });

  it("C3: a lead status must be one of new, contacted, won, lost on a real lead id", () => {
    expect(leadStatusInputSchema.safeParse({ id, status: "won", locale: "en" }).success).toBe(true);
    expect(leadStatusInputSchema.safeParse({ id, status: "archived", locale: "en" }).success).toBe(false);
    expect(leadStatusInputSchema.safeParse({ id: "../etc", status: "won", locale: "en" }).success).toBe(
      false,
    );
    expect(leadStatusInputSchema.safeParse({ id: { $ne: "" }, status: "won", locale: "en" }).success).toBe(
      false,
    );
  });

  it("C3: lead notes are limited in length", () => {
    expect(leadNotesInputSchema.safeParse({ id, notes: "Call on Sunday", locale: "en" }).success).toBe(true);
    expect(leadNotesInputSchema.safeParse({ id, notes: "x".repeat(2001), locale: "en" }).success).toBe(false);
  });

  it("N2: opening a notification needs a known type", () => {
    expect(openNotificationInputSchema.safeParse({ id, type: "new_lead", locale: "en" }).success).toBe(true);
    expect(
      openNotificationInputSchema.safeParse({ id, type: "https://evil.example", locale: "en" }).success,
    ).toBe(false);
  });
});
