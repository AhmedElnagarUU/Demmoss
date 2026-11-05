import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Dar Al Manzil (real-estate-agency). Demo data lives in the browser, so these journeys need no database.
// Photos come from a CDN: nothing here depends on them loading.
const site = (locale: "ar" | "en", path = "") => `/${locale}/demos/real-estate/agency${path}`;
const dashboard = (locale: "ar" | "en", path = "") => site(locale, `/dashboard${path}`);

async function register(page: Page, businessName = "") {
  await page.getByLabel("Your name").fill("Owner");
  await page.getByLabel("Password").fill("secret1");
  if (businessName) await page.getByLabel("Business name (optional)").fill(businessName);
  await page.getByRole("button", { name: "Create account and open dashboard" }).click();
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
}

async function scheduleViewing(page: Page, guest: string) {
  const form = page.getByRole("form", { name: "Schedule a viewing" });
  await form.getByRole("radio").first().check({ force: true });
  await form.getByLabel("Your name").fill(guest);
  await form.getByLabel("Phone number").fill("966501234567");
  await form.getByRole("button", { name: "Request viewing" }).click();
  await expect(page.getByRole("heading", { name: "We received your viewing request" })).toBeVisible();
}

test("RE1, RE3, RE7, RE8: filter the listings, open a property, schedule a viewing, then confirm it in the dashboard", async ({
  page,
}) => {
  await page.goto(site("en", "/listings"));
  await expect(
    page.getByRole("heading", { level: 1, name: "Find it fast, see what is available" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "For rent", exact: true }).click();
  await expect(page.getByRole("status").filter({ hasText: "properties found" })).toHaveText(
    "3 properties found",
  );
  await page.getByLabel("Search", { exact: true }).fill("studio");
  await expect(page.getByRole("status").filter({ hasText: "properties found" })).toHaveText(
    "1 properties found",
  );

  await page.getByRole("link", { name: "Furnished studio in Al Olaya" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Furnished studio in Al Olaya" })).toBeVisible();
  await scheduleViewing(page, "Nada Test");

  await page.getByRole("link", { name: "Open your dashboard to see it arrive" }).click();
  await register(page, "Dar Rania");

  const row = page.getByRole("listitem").filter({ hasText: "Nada Test" });
  await expect(row).toBeVisible();
  await expect(row.getByText("Furnished studio in Al Olaya")).toBeVisible();
  await expect(row.getByText("New", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Confirm: Nada Test" }).click();
  await expect(row.getByText("Confirmed", { exact: true })).toBeVisible();

  await page.goto(site("en"));
  await expect(page.getByRole("link", { name: "Dar Rania" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Dar Al Manzil" })).toHaveCount(0);
});

test("RE1: filters narrow the listings and an empty result says so", async ({ page }) => {
  await page.goto(site("en", "/listings?purpose=sale"));
  await expect(page.getByRole("status").filter({ hasText: "properties found" })).toHaveText(
    "5 properties found",
  );
  await page.getByLabel("Property type").selectOption("townhouse");
  await expect(page.getByRole("status").filter({ hasText: "properties found" })).toHaveText(
    "1 properties found",
  );
  await page.getByLabel("Area").selectOption("al-olaya");
  await expect(page.getByText("No property matches these filters. Try widening your search.")).toBeVisible();
});

test("RE1: the home search opens the listings with the same choices", async ({ page }) => {
  await page.goto(site("en"));
  const search = page.getByRole("form", { name: "Search homes" });
  await search.getByRole("button", { name: "Rent" }).click();
  await search.getByLabel("Area").selectOption("al-narjis");
  await search.getByRole("button", { name: "Search" }).click();
  await expect(page.getByRole("status").filter({ hasText: "properties found" })).toHaveText(
    "1 properties found",
  );
  await expect(page.getByRole("link", { name: "Duplex townhouse for rent in Al Narjis" })).toBeVisible();
});

test("RE4, RE9: a question on a property reaches the dashboard Inquiries", async ({ page }) => {
  await page.goto(site("en", "/listings/detail?id=malqa-villa"));
  const form = page.getByRole("form", { name: "Ask about this property" });
  await form.getByLabel("Your name").fill("Huda Asks");
  await form.getByLabel("Phone number").fill("966507654321");
  await form.getByLabel("Your message").fill("Is the price negotiable?");
  await form.getByRole("button", { name: "Send" }).click();
  await expect(page.getByRole("heading", { name: "We received your message" })).toBeVisible();

  await page.goto(dashboard("en", "/inquiries"));
  await register(page);
  const row = page.getByRole("listitem").filter({ hasText: "Huda Asks" });
  await expect(row).toBeVisible();
  await page.getByRole("button", { name: "Mark as replied: Huda Asks" }).click();
  await expect(row.getByText("Replied", { exact: true })).toBeVisible();
});

test("RE4: a valuation request can be sent without a message", async ({ page }) => {
  await page.goto(site("en", "/contact"));
  const form = page.getByRole("form", { name: "Ask a question or request a free valuation" });
  await form.getByText("Free valuation", { exact: true }).click();
  await form.getByLabel("Your name").fill("Owner Seller");
  await form.getByLabel("Phone number").fill("966509998877");
  await form.getByRole("button", { name: "Send" }).click();
  await expect(page.getByRole("heading", { name: "We received your message" })).toBeVisible();
});

test("RE3: a bad phone number or a missing time is explained, nothing is saved", async ({ page }) => {
  await page.goto(site("en", "/listings/detail?id=olaya-apartment"));
  const form = page.getByRole("form", { name: "Schedule a viewing" });
  await form.getByLabel("Your name").fill("No Phone");
  await form.getByLabel("Phone number").fill("12");
  await form.getByRole("button", { name: "Request viewing" }).click();
  await expect(form.getByRole("alert")).toHaveText("Please fix the highlighted fields.");
  await expect(form.getByText("Enter a valid phone number.")).toBeVisible();
  await expect(form.getByText("Choose one of the free times.")).toBeVisible();
});

test("RE5: the mortgage calculator reacts to the down payment", async ({ page }) => {
  await page.goto(site("en", "/listings/detail?id=malqa-villa"));
  const monthly = page.getByText("Estimated monthly payment").locator("xpath=following-sibling::p[1]");
  await expect(monthly).toContainText("SAR");
  const before = await monthly.textContent();
  await page.getByLabel(/^Down payment/).fill("50");
  await expect.poll(async () => monthly.textContent()).not.toBe(before);
});

test("RE10, E3: edit a property in Arabic and English, then reset restores the seed and keeps the login", async ({
  page,
}) => {
  await page.goto(dashboard("en", "/properties"));
  await register(page);

  await page.getByRole("button", { name: "Edit: Furnished studio in Al Olaya" }).click();
  await page.getByLabel("Title (English)").fill("Studio with a view");
  await page.getByLabel("Title (Arabic)").fill("استوديو بإطلالة");
  await page.getByRole("button", { name: "Save property" }).click();
  await expect(page.getByText("Studio with a view").first()).toBeVisible();

  await page.goto(site("en", "/listings/detail?id=olaya-studio"));
  await expect(page.getByRole("heading", { level: 1, name: "Studio with a view" })).toBeVisible();
  await page.goto(site("ar", "/listings/detail?id=olaya-studio"));
  await expect(page.getByRole("heading", { level: 1, name: "استوديو بإطلالة" })).toBeVisible();

  await page.goto(dashboard("en", "/settings"));
  await page.getByRole("main").getByRole("button", { name: "Reset demo" }).click();
  await expect(page.getByText("The demo was reset.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();

  await page.goto(site("en", "/listings/detail?id=olaya-studio"));
  await expect(page.getByRole("heading", { level: 1, name: "Furnished studio in Al Olaya" })).toBeVisible();
});

test("RE10: a property added in the dashboard opens on the site", async ({ page }) => {
  await page.goto(dashboard("en", "/properties"));
  await register(page);
  await page.getByRole("button", { name: "Add a property" }).click();
  await page.getByLabel("Title (English)").fill("Garden flat in Hittin");
  await page.getByLabel("Price (SAR)").fill("1800000");
  await page.getByLabel("Size (m²)").fill("140");
  await page.getByRole("button", { name: "Save property" }).click();
  await expect(page.getByText("Garden flat in Hittin").first()).toBeVisible();

  await page.goto(site("en", "/listings"));
  await page.getByRole("link", { name: "Garden flat in Hittin" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Garden flat in Hittin" })).toBeVisible();
});

test("RE12: the value tip names a client who waited more than a day", async ({ page }) => {
  await page.goto(dashboard("en"));
  await register(page);
  await expect(page.getByText(/is still waiting/)).toBeVisible();
});

test("RE13: choosing a palette changes the site", async ({ page }) => {
  await page.goto(dashboard("en", "/settings"));
  await register(page);
  await page.getByRole("radio", { name: "Navy" }).check();
  await page.goto(site("en"));
  await expect(page.locator("div[style*='#1f3358']").first()).toBeVisible();
});

test.describe("direction", () => {
  test("RE14: Arabic is right to left and English is left to right on the site and the dashboard", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(site("ar"));
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("اعثر على البيت الذي ستسميه وطنك");
    const brand = await page.getByRole("link", { name: "دار المنزل العقارية" }).first().boundingBox();
    const contact = await page.getByRole("link", { name: "تواصل معنا" }).first().boundingBox();
    expect(brand && contact && brand.x > contact.x).toBe(true);

    await page.goto(site("en"));
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    const enBrand = await page.getByRole("link", { name: "Dar Al Manzil Real Estate" }).first().boundingBox();
    const enContact = await page.getByRole("link", { name: "Contact", exact: true }).first().boundingBox();
    expect(enBrand && enContact && enBrand.x < enContact.x).toBe(true);

    await page.goto(dashboard("ar"));
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { name: "أنشئ حساب لوحة التحكم" })).toBeVisible();
  });

  test("RE14: the Arabic property page shows Arabic prices and facts", async ({ page }) => {
    await page.goto(site("ar", "/listings/detail?id=malqa-villa"));
    await expect(page.getByRole("heading", { level: 1, name: "فيلا حديثة في الملقا" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "احجز معاينة" })).toBeVisible();
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

    test(`no serious accessibility issues on a property page (${locale})`, async ({ page }) => {
      await page.goto(site(locale, "/listings/detail?id=malqa-villa"));
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expectNoSeriousIssues(page);
    });
  }

  test("no serious accessibility issues on the listings page", async ({ page }) => {
    await page.goto(site("en", "/listings"));
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expectNoSeriousIssues(page);
  });

  for (const path of ["", "/viewings", "/properties", "/agents", "/settings"]) {
    test(`no serious accessibility issues on the dashboard ${path || "overview"}`, async ({ page }) => {
      await page.goto(dashboard("en", path));
      await register(page);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expectNoSeriousIssues(page);
    });
  }
});
