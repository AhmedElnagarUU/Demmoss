import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { settleAnimations } from "./helpers/animations";

// Verdant Table (restaurant-fine-dining). Demo data lives in the browser, so these journeys need no database.
const site = (locale: "ar" | "en", path = "") => `/${locale}/demos/restaurant/fine-dining${path}`;
const dashboard = (locale: "ar" | "en", path = "") => site(locale, `/dashboard${path}`);

async function register(page: Page, businessName = "") {
  // wait for the register form itself: the page we come from may also have a "Your name" field
  await expect(page.getByRole("heading", { level: 1, name: "Create your dashboard account" })).toBeVisible();
  await page.getByLabel("Your name").fill("Owner");
  await page.getByLabel("Password").fill("secret1");
  if (businessName) await page.getByLabel("Business name (optional)").fill(businessName);
  await page.getByRole("button", { name: "Create account and open dashboard" }).click();
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
}

async function reserveATable(page: Page, guest: string) {
  await page.goto(site("en", "/reserve"));
  await expect(page.getByRole("heading", { level: 1, name: "Reserve your table" })).toBeVisible();
  await page.getByRole("radio").first().check({ force: true });
  await page.getByLabel("Your name").fill(guest);
  await page.getByLabel("Phone number").fill("966501234567");
  await page.getByRole("button", { name: "Request my table" }).click();
  await expect(page.getByRole("heading", { name: "We received your reservation" })).toBeVisible();
}

test("R1, R2, R5: reserve on the site, register with a business name, see and confirm it, see the name on the site", async ({
  page,
}) => {
  await reserveATable(page, "Rania Test");

  await page.getByRole("link", { name: "Open your dashboard to see it arrive" }).click();
  await register(page, "Dar Rania");

  const row = page.getByRole("listitem").filter({ hasText: "Rania Test" });
  await expect(row).toBeVisible();
  await expect(row.getByText("New", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Confirm: Rania Test" }).click();
  await expect(row.getByText("Confirmed", { exact: true })).toBeVisible();

  await page.goto(site("en"));
  await expect(page.getByRole("link", { name: "Dar Rania" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Verdant Table" })).toHaveCount(0);

  await page.goto(site("ar"));
  await expect(page.getByRole("link", { name: "Dar Rania" }).first()).toBeVisible();
});

test("R1: a private event request reaches the dashboard", async ({ page }) => {
  await page.goto(site("en", "/events"));
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByLabel("Your name").fill("Huda Events");
  await page.getByLabel("Phone number").fill("966507654321");
  await page.getByLabel("Tell us about your event").fill("Family dinner for twenty.");
  await page.getByRole("button", { name: "Send my request" }).click();
  await expect(page.getByRole("heading", { name: "We received your request" })).toBeVisible();

  await page.goto(dashboard("en", "/events"));
  await register(page);
  const row = page.getByRole("listitem").filter({ hasText: "Huda Events" });
  await expect(row).toBeVisible();
  await page.getByRole("button", { name: "Mark as replied: Huda Events" }).click();
  await expect(row.getByText("Replied", { exact: true })).toBeVisible();
});

test("R4, E3: edit a dish in Arabic and English, then reset restores the seed and keeps the login", async ({
  page,
}) => {
  await page.goto(dashboard("en", "/menu"));
  await register(page);

  await page.getByRole("button", { name: "Edit dish: Whipped Feta" }).click();
  await page.getByLabel("Dish name (English)").fill("Honey feta");
  await page.getByLabel("Dish name (Arabic)").fill("فيتا بالعسل");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByText("Honey feta").first()).toBeVisible();

  await page.goto(site("en", "/menu"));
  await expect(page.getByRole("heading", { name: "Honey feta" })).toBeVisible();
  await page.goto(site("ar", "/menu"));
  await expect(page.getByRole("heading", { name: "فيتا بالعسل" })).toBeVisible();

  await page.goto(dashboard("en", "/settings"));
  await page.getByRole("main").getByRole("button", { name: "Reset demo" }).click();
  await expect(page.getByText("The demo was reset.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();

  await page.goto(site("en", "/menu"));
  await expect(page.getByRole("heading", { name: "Whipped Feta" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Honey feta" })).toHaveCount(0);
});

test("R5: choosing a palette changes the site", async ({ page }) => {
  await page.goto(dashboard("en", "/settings"));
  await register(page);
  const frame = page.locator("div[style*='--color-primary']").first();
  const before = await frame.getAttribute("style");
  await page.getByRole("radio", { name: "Wine" }).check();
  await expect.poll(async () => frame.getAttribute("style")).not.toBe(before);

  await page.goto(site("en"));
  await expect(page.locator("div[style*='#7a1f35']").first()).toBeVisible();
});

test("the value tip explains a request that came while the restaurant was closed", async ({ page }) => {
  await page.goto(dashboard("en"));
  await register(page);
  await expect(page.getByText(/when the restaurant was closed/)).toBeVisible();
});

test.describe("direction", () => {
  test("Arabic is right to left and English is left to right on the site and the dashboard", async ({
    page,
  }) => {
    // the header wraps on a phone, so the left/right order is checked at a desktop width
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(site("ar"));
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("مواسم تُقدَّم ببساطة على المائدة");
    const brand = await page.getByRole("link", { name: "فيردانت تيبل" }).first().boundingBox();
    const contact = await page.getByRole("link", { name: "زيارتنا" }).first().boundingBox();
    expect(brand && contact && brand.x > contact.x).toBe(true);

    await page.goto(site("en"));
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    const enBrand = await page.getByRole("link", { name: "Verdant Table" }).first().boundingBox();
    const enContact = await page.getByRole("link", { name: "Visit" }).first().boundingBox();
    expect(enBrand && enContact && enBrand.x < enContact.x).toBe(true);

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
      await settleAnimations(page);
      const results = await new AxeBuilder({ page }).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
    });
  }

  for (const path of ["", "/reservations", "/menu", "/settings"]) {
    test(`no serious accessibility issues on the dashboard ${path || "overview"}`, async ({ page }) => {
      await page.goto(dashboard("en", path));
      await register(page);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await settleAnimations(page);
      const results = await new AxeBuilder({ page }).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
    });
  }

  test("no serious accessibility issues on the reserve page, Arabic", async ({ page }) => {
    await page.goto(site("ar", "/reserve"));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await settleAnimations(page);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
});
