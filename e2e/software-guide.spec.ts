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

const docs = {
  en: {
    sidebar: "Guide sections",
    search: "Search the guide",
    myths: "Myths",
    mythsTitle: "Myths and the truth",
    compare: "Comparison",
    compareTitle: "The four types side by side",
    typesTitle: "The four types of software, explained with a shop",
    sections: "Sections",
    next: /^Next/,
    previous: /^Previous/,
    glossaryResults: "Glossary terms",
    noMatch: "No matching section",
    seeQuery: "seo",
    seeTerm: "SEO",
    otherQuery: "myth",
    otherLink: "Myths",
    absentLink: "Comparison",
  },
  ar: {
    sidebar: "أقسام الدليل",
    search: "ابحث في الدليل",
    myths: "خرافات",
    mythsTitle: "خرافات شائعة والحقيقة",
    compare: "المقارنة",
    compareTitle: "الأنواع الأربعة جنبًا إلى جنب",
    typesTitle: "أنواع البرامج الأربعة، مشروحة بمثال المحل",
    sections: "الأقسام",
    next: /^التالي/,
    previous: /^السابق/,
    glossaryResults: "مصطلحات",
    noMatch: "لا يوجد قسم مطابق",
    seeQuery: "SEO",
    seeTerm: "تحسين الظهور",
    otherQuery: "خُرافات",
    otherLink: "خرافات",
    absentLink: "المقارنة",
  },
} as const;

for (const locale of ["en", "ar"] as const) {
  const text = docs[locale];

  test.describe(`/${locale}/guide documentation layout`, () => {
    test("SG7: the sidebar lists the guide sections and marks the one in view", async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(`/${locale}/guide`);
      const sidebar = page.getByRole("navigation", { name: text.sidebar });
      await expect(sidebar.getByRole("link", { name: text.myths, exact: true })).toBeVisible();

      await sidebar.getByRole("link", { name: text.myths, exact: true }).click();

      await expect(page.getByRole("heading", { level: 2, name: text.mythsTitle })).toBeInViewport();
      await expect(sidebar.getByRole("link", { name: text.myths, exact: true })).toHaveAttribute(
        "aria-current",
        "location",
      );
      await expect(sidebar.locator("[aria-current=location]")).toHaveCount(1);
    });

    test("SG8: on a phone the sections drawer opens, moves to a section and closes", async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`/${locale}/guide`);
      const opener = page.getByRole("button", { name: new RegExp(text.sections) });
      await expect(opener).toHaveAttribute("aria-expanded", "false");

      await opener.click();
      const drawer = page.getByRole("dialog");
      await expect(drawer).toBeVisible();
      await expect(opener).toHaveAttribute("aria-expanded", "true");

      await page.keyboard.press("Escape");
      await expect(drawer).toBeHidden();
      await expect(opener).toBeFocused();

      await opener.click();
      await drawer.getByRole("link", { name: text.myths, exact: true }).click();
      await expect(drawer).toBeHidden();
      await expect(page.getByRole("heading", { level: 2, name: text.mythsTitle })).toBeInViewport();
      await expect(opener).toContainText(text.myths);

      const widths = await page.evaluate(() => ({
        page: document.documentElement.scrollWidth,
        window: window.innerWidth,
      }));
      expect(widths.page).toBeLessThanOrEqual(widths.window);
    });

    test("SG9: next/previous links walk the guide in order", async ({ page }) => {
      await page.goto(`/${locale}/guide`);
      const types = page.locator("#types");
      await types.getByRole("link", { name: text.next }).click();
      await expect(page.getByRole("heading", { level: 2, name: text.compareTitle })).toBeInViewport();

      await page.locator("#compare").getByRole("link", { name: text.previous }).click();
      await expect(page.getByRole("heading", { level: 2, name: text.typesTitle })).toBeInViewport();
    });

    test("SG10: searching the guide filters sections and glossary terms", async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.goto(`/${locale}/guide`);
      const sidebar = page.getByRole("navigation", { name: text.sidebar });
      const search = sidebar.getByRole("searchbox", { name: text.search });

      await search.fill(text.seeQuery);
      await expect(sidebar.getByText(text.glossaryResults)).toBeVisible();
      await expect(sidebar.getByRole("link", { name: new RegExp(text.seeTerm) })).toBeVisible();
      await expect(page.locator("#glossary dt")).toHaveCount(1);

      await search.fill(text.otherQuery);
      await expect(sidebar.getByRole("link", { name: text.otherLink, exact: true })).toBeVisible();
      await expect(sidebar.getByRole("link", { name: text.absentLink, exact: true })).toHaveCount(0);

      await search.fill("zzzzqq");
      await expect(sidebar.getByText(text.noMatch)).toBeVisible();

      await search.fill("");
      await expect(sidebar.getByRole("link", { name: text.absentLink, exact: true })).toBeVisible();
      await expect(page.locator("#glossary dt")).not.toHaveCount(1);
    });
  });
}
