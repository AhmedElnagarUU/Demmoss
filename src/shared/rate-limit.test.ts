import { describe, expect, it } from "vitest";
import { checkRateLimit, clientKeyFromHeaders, isRateLimited, recordRateLimitHit } from "./rate-limit";

const options = { limit: 2, windowMs: 60_000, now: 1_000_000 };

describe("rate limiter", () => {
  it("allows up to the limit then blocks", () => {
    const key = "unit:limit";

    expect(checkRateLimit(key, options).allowed).toBe(true);
    expect(checkRateLimit(key, options).allowed).toBe(true);
    expect(checkRateLimit(key, options).allowed).toBe(false);
  });

  it("reports the time left in the window when blocked", () => {
    const key = "unit:retry";
    checkRateLimit(key, options);
    checkRateLimit(key, options);

    expect(checkRateLimit(key, { ...options, now: options.now + 20_000 })).toEqual({
      allowed: false,
      retryAfterMs: 40_000,
    });
  });

  it("allows again after the window passes", () => {
    const key = "unit:window";
    checkRateLimit(key, options);
    checkRateLimit(key, options);
    expect(checkRateLimit(key, options).allowed).toBe(false);

    expect(checkRateLimit(key, { ...options, now: options.now + options.windowMs }).allowed).toBe(true);
  });

  it("keeps two keys independent", () => {
    const first = "unit:key-a";
    const second = "unit:key-b";
    checkRateLimit(first, options);
    checkRateLimit(first, options);

    expect(checkRateLimit(first, options).allowed).toBe(false);
    expect(checkRateLimit(second, options).allowed).toBe(true);
  });

  it("checks without counting a hit", () => {
    const key = "unit:peek";
    checkRateLimit(key, options);

    expect(isRateLimited(key, options).allowed).toBe(true);
    expect(isRateLimited(key, options).allowed).toBe(true);
    expect(checkRateLimit(key, options).allowed).toBe(true);

    expect(isRateLimited(key, options).allowed).toBe(false);
  });

  it("counts a hit without checking", () => {
    const key = "unit:record";
    recordRateLimitHit(key, options);
    recordRateLimitHit(key, options);

    expect(checkRateLimit(key, options).allowed).toBe(false);
  });
});

describe("client key from headers", () => {
  it("prefers cf-connecting-ip over x-forwarded-for", () => {
    const both = new Headers({
      "cf-connecting-ip": "203.0.113.7",
      "x-forwarded-for": "198.51.100.9, 10.0.0.1",
    });

    expect(clientKeyFromHeaders(both)).toBe(
      clientKeyFromHeaders(new Headers({ "cf-connecting-ip": "203.0.113.7" })),
    );
  });

  it("falls back to the first x-forwarded-for value", () => {
    const forwarded = new Headers({ "x-forwarded-for": " 198.51.100.9 , 10.0.0.1" });

    expect(clientKeyFromHeaders(forwarded)).toBe(
      clientKeyFromHeaders(new Headers({ "x-forwarded-for": "198.51.100.9" })),
    );
  });

  it("returns null without an ip header", () => {
    expect(clientKeyFromHeaders(new Headers())).toBeNull();
  });

  it("never contains the raw ip", () => {
    const clientKey = clientKeyFromHeaders(new Headers({ "cf-connecting-ip": "203.0.113.7" }));

    expect(clientKey).toMatch(/^[a-f0-9]{64}$/);
    expect(clientKey).not.toContain("203.0.113.7");
  });
});
