import "server-only";
import { createHash } from "node:crypto";
import { headers } from "next/headers";

export type RateLimitOptions = { limit: number; windowMs: number; now: number };
export type RateLimitResult = { allowed: boolean; retryAfterMs: number };

type Window = { count: number; resetAt: number };

// In-memory is correct for one VPS process; several processes would need a shared store.
const windows = new Map<string, Window>();

function windowFor(key: string, options: RateLimitOptions): Window {
  if (windows.size > 10_000) {
    for (const [entryKey, entry] of windows) {
      if (entry.resetAt <= options.now) windows.delete(entryKey);
    }
  }
  const existing = windows.get(key);
  if (existing && existing.resetAt > options.now) return existing;
  const fresh = { count: 0, resetAt: options.now + options.windowMs };
  windows.set(key, fresh);
  return fresh;
}

export function checkRateLimit(key: string, options: RateLimitOptions): RateLimitResult {
  const window = windowFor(key, options);
  if (window.count >= options.limit) return { allowed: false, retryAfterMs: window.resetAt - options.now };
  window.count += 1;
  return { allowed: true, retryAfterMs: 0 };
}

export function isRateLimited(key: string, options: RateLimitOptions): RateLimitResult {
  const window = windowFor(key, options);
  if (window.count >= options.limit) return { allowed: false, retryAfterMs: window.resetAt - options.now };
  return { allowed: true, retryAfterMs: 0 };
}

export function recordRateLimitHit(key: string, options: RateLimitOptions): void {
  windowFor(key, options).count += 1;
}

export function clientKeyFromHeaders(requestHeaders: Headers): string | null {
  const forwarded = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = requestHeaders.get("cf-connecting-ip")?.trim() || forwarded;
  if (!ip) return null;
  const secret = process.env.SESSION_SECRET ?? "";
  return createHash("sha256").update(`${secret}:${ip}`).digest("hex");
}

// A null client key (no ip header, e.g. local dev and the E2E server) is not limited.
export async function getClientKey(): Promise<string | null> {
  return clientKeyFromHeaders(await headers());
}
