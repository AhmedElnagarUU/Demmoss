import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const locales = [
  { locale: "ar", dir: "rtl", title: "اعرف ما تحتاجه قبل أن تدفع ثمنه" },
  { locale: "en", dir: "ltr", title: "Know what you need before you pay for it" },
] as const;

async function answerAll(page: Page, optionIndexes: number[]) {
  const questions = page.locator("#quiz fieldset");
  for (const [question, optionIndex] of optionIndexes.entries()) {
    await questions.nth(question).getByRole("radio").nth(optionIndex).check();
  }
}

for (const { locale, dir, title } of locales) {
  test.describe(`/${locale}/guide`, () => {
    test(`SG1: renders in ${locale} with dir=${dir}`, async ({ page }) => {
      await page.goto(`/${locale}/guide`);
      await expect(page.locator("html")).toHaveAttribute("dir", dir);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
      await expect(page.locator("#types article")).toHaveCount(4);
    });

    test("SG5, SG6: the quiz recommends a type and links to the wizard with it", async ({ page }) => {
      await page.goto(`/${locale}/guide`);
      await expect(page.locator("#quiz button[type=submit]")).toBeDisabled();

      await answerAll(page, [2, 2, 2, 2, 2]);
      await page.locator("#quiz button[type=submit]").click();

      const start = page.locator("#quiz").getByRole("link").first();
      await expect(start).toHaveAttribute("href", `/${locale}/start?type=system`);
      await expect(page.locator("#quiz a[href$='/demos']")).toHaveAttribute("href", `/${locale}/demos`);
    });

    test("SG5: a tie offers WhatsApp and still leads to the wizard with the simpler type", async ({
      page,
    }) => {
      await page.goto(`/${locale}/guide`);
      await answerAll(page, [0, 0, 1, 1, 3]);
      await page.locator("#quiz button[type=submit]").click();

      await expect(page.locator("#quiz a[href*='wa.me']")).toBeVisible();
      await expect(page.locator(`#quiz a[href='/${locale}/start?type=business']`)).toBeVisible();
    });

    test("no serious accessibility issues, also after the quiz result", async ({ page }) => {
      await page.goto(`/${locale}/guide`);
      await answerAll(page, [1, 1, 1, 1, 1]);
      await page.locator("#quiz button[type=submit]").click();
      await expect(page.locator(`#quiz a[href='/${locale}/start?type=business']`)).toBeVisible();

      const results = await new AxeBuilder({ page }).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
    });
  });
}

test("regression: guide shows a single site header", async ({ page }) => {
  await page.goto("/en/guide");
  await expect(page.getByRole("banner")).toHaveCount(1);
  await expect(page.getByRole("link", { name: "Skip to content" })).toHaveCount(1);
});

test("the guide announces both languages for search engines", async ({ page }) => {
  await page.goto("/en/guide");
  await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveAttribute("href", /\/ar\/guide$/);
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", /\/en\/guide$/);
});
