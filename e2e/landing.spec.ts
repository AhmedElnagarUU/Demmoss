import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const texts = {
  ar: {
    h1: "موقع يجلب لك العملاء حتى وأنت نائم",
    start: "ابدأ مشروعك",
    demos: "شاهد النماذج الحيّة",
    guide: "افتح دليل البرمجيات",
    menu: "القائمة",
    nav: { guide: "الدليل", demos: "النماذج", start: "ابدأ" },
  },
  en: {
    h1: "A website that brings you customers, even while you sleep",
    start: "Start your project",
    demos: "See live demos",
    guide: "Open the Software Guide",
    menu: "Menu",
    nav: { guide: "Guide", demos: "Demos", start: "Start" },
  },
} as const;

async function openMenuIfCollapsed(page: Page, menuLabel: string) {
  const menu = page.getByRole("button", { name: menuLabel });
  if (await menu.isVisible()) await menu.click();
}

for (const locale of ["ar", "en"] as const) {
  const text = texts[locale];

  test.describe(`landing in ${locale}`, () => {
    test(`L1: states the business result and the page direction is right`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(text.h1);
      await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");
    });

    test(`L4: the buttons lead to the wizard, the guide, and the demos`, async ({ page }) => {
      await page.goto(`/${locale}`);
      const main = page.getByRole("main");
      await expect(main.getByRole("link", { name: text.start })).toHaveAttribute("href", `/${locale}/start`);
      await expect(main.getByRole("link", { name: text.demos })).toHaveAttribute("href", `/${locale}/demos`);
      await expect(main.getByRole("link", { name: text.guide })).toHaveAttribute("href", `/${locale}/guide`);
    });

    test(`L4: the header links are reachable, through the menu on a phone`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await openMenuIfCollapsed(page, text.menu);
      const header = page.getByRole("banner");
      await expect(header.getByRole("link", { name: text.nav.guide })).toHaveAttribute(
        "href",
        `/${locale}/guide`,
      );
      await expect(header.getByRole("link", { name: text.nav.demos })).toHaveAttribute(
        "href",
        `/${locale}/demos`,
      );
      await expect(header.getByRole("link", { name: text.nav.start })).toHaveAttribute(
        "href",
        `/${locale}/start`,
      );
    });

    test(`no serious accessibility issues with the menu open`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await openMenuIfCollapsed(page, text.menu);
      const results = await new AxeBuilder({ page }).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
    });
  });
}

test("L4: the hero button takes the visitor to the wizard address", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("main").getByRole("link", { name: texts.en.start }).click();
  await expect(page).toHaveURL(/\/en\/start$/);
});
