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

  test.describe("browser in Arabic", () => {
    test.use({ locale: "ar-SA" });

    test("the root sends an Arabic browser to /ar, right to left", async ({ page }) => {
      await page.goto("/");
      await expect(page).toHaveURL(/\/ar$/);
      await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
      await expect(page.getByRole("heading", { level: 1 })).toHaveText("موقع يجلب لك العملاء حتى وأنت نائم");
    });

    test("switching language changes the page and the choice is remembered", async ({ page }) => {
      await page.goto("/ar");
      await page.getByRole("link", { name: "English" }).click();
      await expect(page).toHaveURL(/\/en$/);
      await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        "A website that brings you customers, even while you sleep",
      );

      await page.goto("/");
      await expect(page).toHaveURL(/\/en$/);
    });
  });

  test("a browser in another language gets the default locale (Arabic)", async ({ browser }) => {
    const context = await browser.newContext({ locale: "fr-FR" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page).toHaveURL(/\/ar$/);
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
