import { describe, expect, it } from "vitest";
import { SESSION_MAX_AGE_SECONDS, signSession, verifySession } from "./session";

const secret = "a-test-secret-that-is-at-least-32-characters-long";
const now = new Date("2026-03-01T10:00:00Z");

function tamperedPayload(cookie: string, change: (payload: Record<string, unknown>) => void): string {
  const [encoded = "", signature = ""] = cookie.split(".");
  const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as Record<string, unknown>;
  change(payload);
  return `${Buffer.from(JSON.stringify(payload)).toString("base64url")}.${signature}`;
}

describe("C1: the admin session cookie", () => {
  it("accepts a cookie we signed and returns the admin email", () => {
    const cookie = signSession("owner@example.com", secret, now);
    expect(verifySession(cookie, secret, now)).toEqual({ email: "owner@example.com" });
  });

  it("is valid just before 8 hours and rejected after", () => {
    const cookie = signSession("owner@example.com", secret, now);
    const justBefore = new Date(now.getTime() + SESSION_MAX_AGE_SECONDS * 1000 - 1000);
    const atExpiry = new Date(now.getTime() + SESSION_MAX_AGE_SECONDS * 1000);
    expect(verifySession(cookie, secret, justBefore)).not.toBeNull();
    expect(verifySession(cookie, secret, atExpiry)).toBeNull();
  });

  it("rejects a cookie whose payload was changed (longer expiry or another email)", () => {
    const cookie = signSession("owner@example.com", secret, now);
    const longer = tamperedPayload(cookie, (payload) => (payload.expiresAt = Date.now() * 10));
    const other = tamperedPayload(cookie, (payload) => (payload.email = "attacker@example.com"));
    expect(verifySession(longer, secret, now)).toBeNull();
    expect(verifySession(other, secret, now)).toBeNull();
  });

  it("rejects a cookie signed with another secret", () => {
    const cookie = signSession("owner@example.com", "another-secret-that-is-also-32-characters!", now);
    expect(verifySession(cookie, secret, now)).toBeNull();
  });

  it("rejects missing, empty, and malformed values", () => {
    expect(verifySession(undefined, secret, now)).toBeNull();
    expect(verifySession("", secret, now)).toBeNull();
    expect(verifySession("not-a-cookie", secret, now)).toBeNull();
    expect(verifySession("a.b.c", secret, now)).toBeNull();
    expect(verifySession(".", secret, now)).toBeNull();
  });
});
