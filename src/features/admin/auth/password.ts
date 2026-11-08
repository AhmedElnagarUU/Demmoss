import { createHash, timingSafeEqual } from "node:crypto";

// The admin password is a plain value in the server-only .env (ADMIN_PASSWORD). Both sides are hashed to the same
// length first, so timingSafeEqual can compare them in constant time without revealing the password length.
export function passwordMatches(guess: string, expected: string): boolean {
  if (!expected) return false;
  const digest = (value: string) => createHash("sha256").update(value, "utf8").digest();
  return timingSafeEqual(digest(guess), digest(expected));
}
