import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const locales = [
  { locale: "ar", dir: "rtl", title: "جرّب البرنامج الذي يمكن أن يملكه نشاطك" },
  { locale: "en", dir: "ltr", title: "Try the software your business could have" },
] as const;

for (const { locale, dir, title } of locales) {
  test.describe(`/${locale}/demos`, () => {
    test(`G1: renders in ${locale} with dir=${dir} and lists the restaurant demos`, async ({ page }) => {
      await page.goto(`/${locale}/demos`);
      await expect(page.locator("html")).toHaveAttribute("dir", dir);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
      await expect(page.locator(`main a[href='/${locale}/demos/restaurant/fine-dining']`)).toBeVisible();
      await expect(page.locator(`main a[href='/${locale}/demos/restaurant/fast-food']`)).toBeVisible();
    });

    test(`G2: a category without demos in ${locale} leads to the wizard and WhatsApp`, async ({ page }) => {
      await page.goto(`/${locale}/demos?category=fitness`);
      await expect(page.locator("main").locator(`a[href='/${locale}/start']`)).toBeVisible();
      await expect(page.locator("main a[href*='wa.me']")).toBeVisible();
    });

    test("no serious accessibility issues", async ({ page }) => {
      await page.goto(`/${locale}/demos`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      const results = await new AxeBuilder({ page }).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
    });
  });
}

test("G3: the Open the website link of every demo card opens in a new tab, the dashboard link in the same tab", async ({
  page,
}) => {
  await page.goto("/en/demos");
  const siteLinks = page.locator("main article a", { hasText: "Open the website" });
  expect(await siteLinks.count()).toBeGreaterThan(0);
  for (const link of await siteLinks.all()) {
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
  }
  const dashboardLinks = page.locator("main article a", { hasText: "Open the dashboard" });
  for (const link of await dashboardLinks.all()) {
    await expect(link).not.toHaveAttribute("target", "_blank");
  }
});

test("the gallery announces both languages for search engines", async ({ page }) => {
  await page.goto("/en/demos");
  await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveAttribute("href", /\/ar\/demos$/);
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", /\/en\/demos$/);
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("regression G1: every demo card is in the static page (search engines, slow phones)", async ({
    page,
  }) => {
    await page.goto("/en/demos");
    await expect(page.locator("main article").first()).toBeVisible();
    expect(await page.locator("main article a", { hasText: "Open the website" }).count()).toBeGreaterThan(0);
  });
});
