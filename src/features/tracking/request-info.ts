import type { Device } from "./types";

export function deviceFromUserAgent(userAgent: string | null): Device {
  if (!userAgent) return "desktop";
  if (/iPad|Tablet|PlayBook|Silk|Android(?!.*Mobile)/i.test(userAgent)) return "tablet";
  if (/Mobi|iPhone|iPod|Android|Windows Phone/i.test(userAgent)) return "mobile";
  return "desktop";
}

export function countryFromHeader(value: string | null): string {
  const code = value?.trim().toUpperCase();
  return code && /^[A-Z]{2}$/.test(code) && code !== "XX" ? code : "unknown";
}
