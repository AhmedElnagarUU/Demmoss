import { expect, test } from "@playwright/test";

test("admin pages show no public site chrome and are not tracked as visitor traffic", async ({ page }) => {
  await page.goto("/en/admin/login");
  await expect(page.getByRole("button", { name: "Send feedback", exact: true })).toHaveCount(0);
  await expect(page.locator("footer")).toHaveCount(0);
  await page.waitForLoadState("networkidle");
  expect(await page.evaluate(() => window.localStorage.getItem("demo:visitor-id"))).toBeNull();
});
