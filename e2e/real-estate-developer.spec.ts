import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Solenne Estates (real-estate-developer). Demo data lives in the browser, so these journeys need no database.
// Photos come from a CDN: nothing here depends on them loading.
const site = (locale: "ar" | "en", path = "") => `/${locale}/demos/real-estate/developer${path}`;
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

test("RE11, RE6: marking a unit reserved in the dashboard shows it as reserved on the site", async ({
  page,
}) => {
  await page.goto(site("en", "/residences/detail?id=skyline-penthouse"));
  const table = page.getByRole("table");
  await expect(table.getByRole("row", { name: /P-24/ }).getByRole("button")).toBeVisible();

  await page.goto(dashboard("en", "/projects"));
  await register(page);
  await page.getByLabel("Status of unit P-24 in Skyline Penthouse").selectOption("reserved");

  await page.goto(site("en", "/residences/detail?id=skyline-penthouse"));
  const row = page.getByRole("row", { name: /P-24/ });
  await expect(row.getByText("Reserved", { exact: true })).toBeVisible();
  await expect(row.getByRole("button")).toHaveCount(0);

  // every unit is now taken: the residence card says reserved, and "available only" hides it
  await page.goto(site("en", "/residences"));
  await expect(page.getByRole("article").filter({ hasText: "Skyline Penthouse" })).toContainText("Reserved");
  await page.getByLabel("Show available only").check();
  await expect(page.getByRole("link", { name: "Skyline Penthouse" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Cedar Hollow Villa" })).toBeVisible();
});

test("RE11: freeing a sold unit makes it available again on the site", async ({ page }) => {
  await page.goto(dashboard("en", "/projects"));
  await register(page);
  await page.getByLabel("Status of unit V-04 in Cedar Hollow Villa").selectOption("available");
  await page.goto(site("en", "/residences/detail?id=cedar-hollow-villa"));
  await expect(page.getByRole("button", { name: "Choose unit V-04 for the request" })).toBeVisible();
});

test("RE3, RE7, RE8: request a private viewing of a unit, then confirm it in the dashboard", async ({
  page,
}) => {
  await page.goto(site("en", "/residences/detail?id=cedar-hollow-villa"));
  await expect(page.getByRole("heading", { level: 1, name: "Cedar Hollow Villa" })).toBeVisible();
  await page.getByRole("button", { name: "Choose unit V-01 for the request" }).click();

  const form = page.getByRole("form", { name: "Request a private viewing" });
  await expect(form.getByLabel("Unit")).toHaveValue("ch-1");
  await form.getByRole("radio").first().check({ force: true });
  await form.getByLabel("Your name").fill("Nada Buyer");
  await form.getByLabel("Phone number").fill("966501234567");
  await form.getByRole("button", { name: "Request viewing" }).click();
  await expect(page.getByRole("heading", { name: "We received your viewing request" })).toBeVisible();

  await page.getByRole("link", { name: "Open your dashboard to see it arrive" }).click();
  await register(page, "Solenne Test");
  const row = page.getByRole("listitem").filter({ hasText: "Nada Buyer" });
  await expect(row).toContainText("Cedar Hollow Villa · V-01");
  await page.getByRole("button", { name: "Confirm: Nada Buyer" }).click();
  await expect(row.getByText("Confirmed", { exact: true })).toBeVisible();

  await page.goto(site("en"));
  await expect(page.getByRole("link", { name: "Solenne Test" }).first()).toBeVisible();
});

test("RE4: a brochure request for a unit reaches the dashboard Inquiries", async ({ page }) => {
  await page.goto(site("en", "/residences/detail?id=driftline-residence"));
  const form = page.getByRole("form", { name: "Request the brochure or ask about a unit" });
  await form.getByLabel("Unit").selectOption("dl-2");
  await form.getByLabel("Your name").fill("Huda Brochure");
  await form.getByLabel("Phone number").fill("966507654321");
  await form.getByRole("button", { name: "Send" }).click();
  await expect(page.getByRole("heading", { name: "We received your message" })).toBeVisible();

  await page.goto(dashboard("en", "/inquiries"));
  await register(page);
  const row = page.getByRole("listitem").filter({ hasText: "Huda Brochure" });
  await expect(row).toContainText("Brochure");
  await expect(row).toContainText("D-02");
  await page.getByRole("button", { name: "Close: Huda Brochure" }).click();
  await expect(row.getByText("Closed", { exact: true })).toBeVisible();
});

test("RE1: the home type filter and the residences filters narrow the list", async ({ page }) => {
  await page.goto(site("en"));
  await page
    .getByRole("group", { name: "Property type" })
    .getByRole("button", { name: "Penthouses" })
    .click();
  await expect(page.getByRole("link", { name: "Skyline Penthouse" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Cedar Hollow Villa" })).toHaveCount(0);

  await page.goto(site("en", "/residences?type=coastal"));
  await expect(page.getByRole("status").filter({ hasText: "residences found" })).toHaveText(
    "2 residences found",
  );
  await page.getByLabel("Price").selectOption("dev-3");
  await expect(page.getByRole("status").filter({ hasText: "residences found" })).toHaveText(
    "1 residences found",
  );
});

test("RE11: adding a unit in the dashboard shows it on the residence page", async ({ page }) => {
  await page.goto(dashboard("en", "/projects"));
  await register(page);
  await page.getByLabel("Unit", { exact: true }).fill("D-09");
  await page.getByLabel("Size (m²)").fill("480");
  await page.getByLabel("Price (SAR)").fill("3950000");
  await page.getByRole("button", { name: "Add unit" }).click();
  await expect(page.getByLabel("Status of unit D-09 in Cedar Hollow Villa")).toBeVisible();
});

test("RE12: the value tip points to a residence with one unit left", async ({ page }) => {
  await page.goto(dashboard("en"));
  await register(page);
  await page.getByRole("button", { name: "Dismiss this tip" }).click();
  await page.getByRole("button", { name: "Dismiss this tip" }).click();
  await page.getByRole("button", { name: "Dismiss this tip" }).click();
  await expect(page.getByText(/Only one unit is left in/)).toBeVisible();
});

test.describe("direction", () => {
  test("RE14: Arabic is right to left and English is left to right on the site and the dashboard", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(site("ar"));
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("بيوت تشكّلها الطبيعة");
    const brand = await page.getByRole("link", { name: "سولين للعقارات" }).first().boundingBox();
    const contact = await page.getByRole("link", { name: "تواصل معنا" }).first().boundingBox();
    expect(brand && contact && brand.x > contact.x).toBe(true);

    await page.goto(site("en"));
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    const enBrand = await page.getByRole("link", { name: "Solenne Estates" }).first().boundingBox();
    const enContact = await page.getByRole("link", { name: "Contact", exact: true }).first().boundingBox();
    expect(enBrand && enContact && enBrand.x < enContact.x).toBe(true);

    await page.goto(dashboard("ar"));
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { name: "أنشئ حساب لوحة التحكم" })).toBeVisible();
  });

  test("RE14: the Arabic residence page shows the unit table in Arabic", async ({ page }) => {
    await page.goto(site("ar", "/residences/detail?id=cedar-hollow-villa"));
    await expect(page.getByRole("heading", { level: 1, name: "فيلا وادي الأرز" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "توفّر الوحدات" })).toBeVisible();
  });
});

test.describe("accessibility", () => {
  async function expectNoSeriousIssues(page: Page) {
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  }

  for (const locale of ["ar", "en"] as const) {
    test(`no serious accessibility issues on the home page (${locale})`, async ({ page }) => {
      await page.goto(site(locale));
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expectNoSeriousIssues(page);
    });

    test(`no serious accessibility issues on a residence page (${locale})`, async ({ page }) => {
      await page.goto(site(locale, "/residences/detail?id=cedar-hollow-villa"));
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expectNoSeriousIssues(page);
    });
  }

  for (const path of ["", "/projects", "/properties", "/viewings"]) {
    test(`no serious accessibility issues on the dashboard ${path || "overview"}`, async ({ page }) => {
      await page.goto(dashboard("en", path));
      await register(page);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expectNoSeriousIssues(page);
    });
  }
});
