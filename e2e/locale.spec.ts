import { expect, test } from "@playwright/test";

test.describe("Arabic / English routing and RTL", () => {
  test.describe("browser in English", () => {
    test.use({ locale: "en-US" });

    test("the root sends an English browser to /en, left to right", async ({ page }) => {
      await page.goto("/");
      await expect(page).toHaveURL(/\/en$/);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    });
  });

  test.describe("browser in Arabic without a remembered choice", () => {
    test.use({ locale: "ar-SA" });

    test("the root opens in the default English, left to right", async ({ page }) => {
      await page.goto("/");
      await expect(page).toHaveURL(/\/en$/);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "Bookings and orders, even while you sleep",
      );
    });

    test("switching language changes the page and the choice is remembered", async ({ page }) => {
      await page.goto("/en");
      await page.getByRole("link", { name: "العربية" }).click();
      await expect(page).toHaveURL(/\/ar$/);
      await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("حجوزات وطلبات… حتى وأنت نائم");

      await page.goto("/");
      await expect(page).toHaveURL(/\/ar$/);
    });
  });

  test("a browser in another language gets the default locale (English)", async ({ browser }) => {
    const context = await browser.newContext({ locale: "fr-FR" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/en$/);
    await context.close();
  });

  test("a remembered choice wins over the default locale", async ({ browser, baseURL }) => {
    const context = await browser.newContext({ locale: "en-US" });
    await context.addCookies([{ name: "locale", value: "ar", url: baseURL ?? "http://localhost:3100" }]);
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/ar$/);
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await context.close();
  });

  test("an unknown page answers 404", async ({ request }) => {
    const response = await request.get("/fr/not-a-page");
    expect(response.status()).toBe(404);
  });

  test("the page announces its other language for search engines", async ({ page }) => {
    await page.goto("/ar");
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", /\/en$/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
  });
});
