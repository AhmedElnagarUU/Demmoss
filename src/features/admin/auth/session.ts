import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE_SECONDS = 8 * 60 * 60;

const payloadSchema = z.object({ email: z.string(), expiresAt: z.number() });

export type AdminSession = { email: string };

function signature(encodedPayload: string, secret: string): Buffer {
  return createHmac("sha256", secret).update(encodedPayload).digest();
}

// Cookie value: base64url(payload JSON) + "." + base64url(HMAC-SHA256 of the first part).
export function signSession(email: string, secret: string, now: Date): string {
  const expiresAt = now.getTime() + SESSION_MAX_AGE_SECONDS * 1000;
  const encodedPayload = Buffer.from(JSON.stringify({ email, expiresAt })).toString("base64url");
  return `${encodedPayload}.${signature(encodedPayload, secret).toString("base64url")}`;
}

export function verifySession(value: string | undefined, secret: string, now: Date): AdminSession | null {
  if (!value) return null;
  const [encodedPayload, encodedSignature, ...rest] = value.split(".");
  if (!encodedPayload || !encodedSignature || rest.length > 0) return null;

  const given = Buffer.from(encodedSignature, "base64url");
  const expected = signature(encodedPayload, secret);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;

  try {
    const payload = payloadSchema.parse(
      JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")),
    );
    return payload.expiresAt > now.getTime() ? { email: payload.email } : null;
  } catch {
    return null;
  }
}
