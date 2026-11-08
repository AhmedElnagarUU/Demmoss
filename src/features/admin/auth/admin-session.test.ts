import { beforeAll, describe, expect, it } from "vitest";
import { attemptAdminLogin } from "./admin-session";

const email = "owner@example.com";
const password = "a password";
const now = 1_770_000_000_000;

beforeAll(() => {
  process.env.ADMIN_EMAIL = email;
  process.env.ADMIN_PASSWORD = password;
  process.env.SESSION_SECRET = "a-test-secret-that-is-at-least-32-characters-long";
});

function attempt(clientKey: string, at: number, passwordGuess = "wrong password") {
  return attemptAdminLogin({ email, password: passwordGuess, clientKey, now: at });
}

describe("C1: admin login lockout", () => {
  it("refuses the correct password after five failures, then allows it after 15 minutes", () => {
    const clientKey = "login-test:window";
    for (let i = 0; i < 5; i += 1) {
      expect(attempt(clientKey, now)).toEqual({ ok: false, error: "invalid_credentials" });
    }

    expect(attempt(clientKey, now, password)).toEqual({
      ok: false,
      error: "too_many_attempts",
      retryAfterMinutes: 15,
    });
    expect(attempt(clientKey, now + 15 * 60 * 1000, password)).toEqual({ ok: true });
  });

  it("does not block another client key", () => {
    const blocked = "login-test:blocked";
    for (let i = 0; i < 5; i += 1) attempt(blocked, now);

    expect(attempt(blocked, now, password)).toMatchObject({ error: "too_many_attempts" });
    expect(attempt("login-test:other", now, password)).toEqual({ ok: true });
  });
});
