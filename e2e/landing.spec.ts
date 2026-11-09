import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const texts = {
  ar: {
    h1: "موقعك يستقبل الحجوزات والطلبات حتى وأنت نائم",
    start: "احصل على توصيتك المجانية",
    demos: "جرّب نموذجًا حيًّا",
    guide: "افتح دليل البرمجيات",
    guideSection: "موقع أم نظام أم SaaS؟ اعرف خلال دقيقتين",
    problemTitle: "العميل يقرر خلال دقائق. هل أنت موجود عندما يقرر؟",
    valueTitle: "ماذا يتغير عندما يعمل موقعك لصالحك؟",
    faq: {
      priceQ: "كم التكلفة؟",
      priceA:
        "تعتمد على ما تحتاجه: الموقع التعريفي أقل تكلفة من نظام بلوحة تحكم. أخبرنا عن مشروعك وتحصل على سعر واضح قبل بدء أي عمل.",
    },
    menu: "القائمة",
    nav: { guide: "الدليل", demos: "النماذج", start: "ابدأ" },
  },
  en: {
    h1: "Your website takes bookings and orders, even while you sleep",
    start: "Get my free recommendation",
    demos: "Try a live demo",
    guide: "Open the Software Guide",
    guideSection: "Website, system or SaaS? Find out in 2 minutes",
    problemTitle: "Customers decide in minutes. Are you there when they do?",
    valueTitle: "What changes when your website works for you",
    faq: {
      priceQ: "How much does it cost?",
      priceA:
        "It depends on what you need: a business website costs less than a system with a dashboard. Tell us about your project and you get a clear price before any work starts.",
    },
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
      const hero = main.locator("section").filter({ has: page.getByRole("heading", { level: 1 }) });
      await expect(hero.getByRole("link", { name: text.start })).toHaveAttribute("href", `/${locale}/start`);
      await expect(main.getByRole("link", { name: text.demos })).toHaveAttribute("href", `/${locale}/demos`);
      const guideSection = page.getByRole("region", { name: text.guideSection });
      await expect(guideSection.getByRole("link", { name: text.guide })).toHaveAttribute(
        "href",
        `/${locale}/guide`,
      );
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

    test(`L5: names the visitor's problem before the solution`, async ({ page }) => {
      await page.goto(`/${locale}`);
      const headings = await page.getByRole("heading", { level: 2 }).allTextContents();
      const problemIndex = headings.indexOf(text.problemTitle);
      const valueIndex = headings.indexOf(text.valueTitle);
      expect(problemIndex).toBeGreaterThanOrEqual(0);
      expect(valueIndex).toBeGreaterThanOrEqual(0);
      expect(problemIndex).toBeLessThan(valueIndex);
    });

    test(`L6: the FAQ answers the price question, without JavaScript tricks`, async ({ page }) => {
      await page.goto(`/${locale}`);
      const answer = page.getByText(text.faq.priceA, { exact: true });
      await expect(answer).toBeHidden();
      await page.getByText(text.faq.priceQ, { exact: true }).click();
      await expect(answer).toBeVisible();
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
  const hero = page
    .getByRole("main")
    .locator("section")
    .filter({ has: page.getByRole("heading", { level: 1 }) });
  await hero.getByRole("link", { name: texts.en.start }).click();
  await expect(page).toHaveURL(/\/en\/start$/);
});
