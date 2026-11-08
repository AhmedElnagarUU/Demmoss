import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Stackwell (logistics-warehousing). Demo data lives in the browser, so these journeys need no database.
const site = (locale: "ar" | "en", path = "") => `/${locale}/demos/logistics/warehousing${path}`;
const dashboard = (locale: "ar" | "en", path = "") => site(locale, `/dashboard${path}`);

async function register(page: Page) {
  // wait for the register form itself: the page we come from may also have a "Your name" field
  await expect(page.getByRole("heading", { level: 1, name: "Create your dashboard account" })).toBeVisible();
  await page.getByLabel("Your name").fill("Owner");
  await page.getByLabel("Password").fill("secret1");
  await page.getByRole("button", { name: "Create account and open dashboard" }).click();
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
}

async function expectNoSeriousA11yIssues(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
}

test("L7, L8: estimator → quote with the estimator values → register → quote in the dashboard → mark quoted", async ({
  page,
}) => {
  await page.goto(site("en", "/quote"));
  await expect(page.getByRole("heading", { level: 1, name: "Get a storage quote" })).toBeVisible();
  await expect(page.getByText(/2,598\.40/).first()).toBeVisible();

  await page.getByLabel("Pallet positions").fill("100");
  await expect(page.getByText(/4,696/).first()).toBeVisible();
  await page.getByLabel("Cargo insurance").check();
  await expect(page.getByText(/4,765\.92/).first()).toBeVisible();

  await page.getByLabel("Your name").fill("Rania Test");
  await page.getByLabel("Phone number").fill("+966 50 123 4567");
  await page.getByRole("button", { name: "Send my quote request" }).click();
  await expect(page.getByRole("heading", { name: "We received your quote request" })).toBeVisible();

  await page.getByRole("link", { name: "Open your dashboard to see it arrive" }).click();
  await register(page);

  const row = page.getByRole("listitem").filter({ hasText: "Rania Test" });
  await expect(row).toBeVisible();
  await expect(
    row.getByText(/100 pallets for 6 months, 300 picking orders a month, with insurance/),
  ).toBeVisible();
  await expect(row.getByText(/4,765\.92/)).toBeVisible();
  await expect(row.getByText("Storage and picking", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: "Mark as quoted: Rania Test" }).click();
  await expect(row.getByText("Quoted", { exact: true })).toBeVisible();
});

test("L9: editing the occupied pallets of a warehouse changes the free spots on the site", async ({
  page,
}) => {
  await page.goto(site("en", "/warehouses"));
  await expect(page.getByText("340 pallet spots free")).toBeVisible();

  await page.goto(dashboard("en", "/warehouses"));
  await register(page);
  await page.locator("#wh-riyadh-occupied").fill("4000");
  await page.getByRole("button", { name: "Save warehouse: North Hub" }).click();
  await expect(page.getByRole("status")).toContainText("Saved.");

  await page.goto(site("en", "/warehouses"));
  await expect(page.getByText("200 pallet spots free")).toBeVisible();
});

test("L10: a case study hidden in the dashboard disappears from the site", async ({ page }) => {
  await page.goto(dashboard("en", "/case-studies"));
  await register(page);
  // the first case study is the retail one
  await page.getByLabel("Show on the website").first().uncheck();
  await page.getByRole("button", { name: "Save case study" }).first().click();

  await page.goto(site("en", "/case-studies"));
  await expect(page.getByRole("heading", { level: 1, name: "Case studies" })).toBeVisible();
  await expect(page.getByText("Cutting pick times for a fast-growing home goods brand")).toHaveCount(0);
  await expect(page.getByText("Expiry-controlled storage for a chilled snack distributor")).toBeVisible();
});

test("the value tip warns about a warehouse that is almost full", async ({ page }) => {
  await page.goto(dashboard("en"));
  await register(page);
  await expect(page.getByText(/outside your office hours|92% full/).first()).toBeVisible();
});

test.describe("direction", () => {
  test("L12: Arabic is right to left and English is left to right on the site and the dashboard", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(site("ar"));
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "تخزين وحلول لوجستية موثوقة بلا تأخير ولا تكاليف إضافية",
    );
    const brand = await page.getByRole("link", { name: "ستاكويل" }).first().boundingBox();
    const warehouses = await page.getByRole("link", { name: "المستودعات" }).first().boundingBox();
    expect(brand && warehouses && brand.x > warehouses.x).toBe(true);

    await page.goto(site("en"));
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    const enBrand = await page.getByRole("link", { name: "Stackwell" }).first().boundingBox();
    const enWarehouses = await page.getByRole("link", { name: "Warehouses" }).first().boundingBox();
    expect(enBrand && enWarehouses && enBrand.x < enWarehouses.x).toBe(true);

    await page.goto(dashboard("ar"));
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { name: "أنشئ حساب لوحة التحكم" })).toBeVisible();
  });
});

test.describe("accessibility", () => {
  for (const locale of ["ar", "en"] as const) {
    test(`no serious accessibility issues on the home page (${locale})`, async ({ page }) => {
      await page.goto(site(locale));
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expectNoSeriousA11yIssues(page);
    });
  }

  for (const path of ["/quote", "/services", "/warehouses", "/case-studies"]) {
    test(`no serious accessibility issues on ${path}`, async ({ page }) => {
      await page.goto(site("en", path));
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expectNoSeriousA11yIssues(page);
    });
  }

  for (const path of ["", "/quotes", "/warehouses", "/storage-rates"]) {
    test(`no serious accessibility issues on the dashboard ${path || "overview"}`, async ({ page }) => {
      await page.goto(dashboard("en", path));
      await register(page);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expectNoSeriousA11yIssues(page);
    });
  }
});
