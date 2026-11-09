import { expect, test } from "@playwright/test";
import { getAllDemos } from "../src/features/gallery/catalog";

// A demo home page from the gallery catalog, so the check follows the catalog when it changes.
const firstDemo = getAllDemos()[0];
if (!firstDemo) throw new Error("The gallery catalog is empty");
const demoHome = `/ar/demos/${firstDemo.category}/${firstDemo.variant}`;

const expectedContentSecurityPolicy = [
  "default-src 'self'",
  // Google Tag Manager / Analytics (NEXT_PUBLIC_GTM_ID) are the only third-party scripts and connections.
  "img-src 'self' data: blob: https://images.unsplash.com https://images.pexels.com https://*.google-analytics.com https://*.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "font-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

test("production: every page sends the security headers", async ({ request }) => {
  const response = await request.get("/ar");
  expect(response.status()).toBe(200);

  const headers = response.headers();
  const csp = headers["content-security-policy"];
  expect(csp).toBe(expectedContentSecurityPolicy);
  expect(csp).toContain("default-src 'self'");
  expect(csp).toContain("frame-ancestors 'none'");
  expect(csp).not.toContain("unsafe-eval");
  expect(headers["strict-transport-security"]).toBe("max-age=31536000; includeSubDomains");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["permissions-policy"]).toBe("camera=(), microphone=(), geolocation=()");
});

test("production: pages load without CSP violations", async ({ page }) => {
  const violations: string[] = [];
  page.on("console", (message) => {
    if (message.text().includes("Content Security Policy")) violations.push(message.text());
  });

  for (const path of ["/ar", "/en/guide", "/en/start", demoHome]) {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
  }

  expect(violations).toEqual([]);
});
