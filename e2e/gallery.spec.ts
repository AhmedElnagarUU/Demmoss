import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const locales = [
  { locale: "ar", dir: "rtl", title: "جرّب البرنامج الذي يمكن أن يملكه نشاطك" },
  { locale: "en", dir: "ltr", title: "Try the software your business could have" },
] as const;

for (const { locale, dir, title } of locales) {
  test.describe(`/${locale}/demos`, () => {
    test(`G1: renders in ${locale} with dir=${dir} and an empty state that leads to the wizard`, async ({
      page,
    }) => {
      await page.goto(`/${locale}/demos`);
      await expect(page.locator("html")).toHaveAttribute("dir", dir);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
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

test("the gallery announces both languages for search engines", async ({ page }) => {
  await page.goto("/en/demos");
  await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveAttribute("href", /\/ar\/demos$/);
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", /\/en\/demos$/);
});
