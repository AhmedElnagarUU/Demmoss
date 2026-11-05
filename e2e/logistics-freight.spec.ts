import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Jisr Cargo (logistics-freight). Demo data lives in the browser, so these journeys need no database.
const site = (locale: "ar" | "en", path = "") => `/${locale}/demos/logistics/freight${path}`;
const dashboard = (locale: "ar" | "en", path = "") => site(locale, `/dashboard${path}`);

async function register(page: Page, businessName = "") {
  await page.getByLabel("Your name").fill("Owner");
  await page.getByLabel("Password").fill("secret1");
  if (businessName) await page.getByLabel("Business name (optional)").fill(businessName);
  await page.getByRole("button", { name: "Create account and open dashboard" }).click();
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
}

async function expectNoSeriousA11yIssues(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
}

test("L1, L2, L3: calculator → quote request with the estimate → register → quote in the dashboard → mark quoted", async ({
  page,
}) => {
  await page.goto(site("en", "/calculator"));
  await expect(page.getByRole("heading", { level: 1, name: "Shipping calculator" })).toBeVisible();
  await expect(page.getByText(/8,000/)).toBeVisible();

  await page.getByRole("radio", { name: "Sea" }).check({ force: true });
  await expect(page.getByText(/2,400/)).toBeVisible();

  await page.getByLabel("Your name").fill("Rania Test");
  await page.getByLabel("Phone number").fill("+966 50 123 4567");
  await page.getByRole("button", { name: "Send my quote request" }).click();
  await expect(page.getByRole("heading", { name: "We received your quote request" })).toBeVisible();

  await page.getByRole("link", { name: "Open your dashboard to see it arrive" }).click();
  await register(page, "Dar Rania");

  const row = page.getByRole("listitem").filter({ hasText: "Rania Test" });
  await expect(row).toBeVisible();
  await expect(row.getByText(/Estimate: Sea freight, Shanghai, China to Jeddah, Saudi Arabia/)).toBeVisible();
  await expect(row.getByText("New", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Mark as quoted: Rania Test" }).click();
  await expect(row.getByText("Quoted", { exact: true })).toBeVisible();

  await page.goto(site("en"));
  await expect(page.getByRole("link", { name: "Dar Rania" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Jisr Cargo" })).toHaveCount(0);
});

test("L4, L5: the owner updates a shipment and the public tracker shows the new step", async ({ page }) => {
  await page.goto(dashboard("en", "/shipments"));
  await register(page);

  const card = page.getByRole("article").filter({ hasText: "JC-48190" });
  await expect(card.getByText("Customs clearance").first()).toBeVisible();
  await card.getByLabel("New status").selectOption({ label: "Out for delivery" });
  await card.getByLabel("Note (optional)").fill("Released by customs");
  await page.getByRole("button", { name: "Update status: JC-48190" }).click();
  await expect(card.getByText("Out for delivery").first()).toBeVisible();

  await page.goto(site("en", "/track"));
  await page.getByLabel("Tracking number").fill("jc 48190");
  await page.getByRole("button", { name: "Track", exact: true }).click();
  await expect(page.getByRole("heading", { name: "JC-48190" })).toBeVisible();
  await expect(page.locator("li[aria-current='step']")).toContainText("Out for delivery");
  await expect(page.locator("li[aria-current='step']")).toContainText("Released by customs");

  await page.getByLabel("Tracking number").fill("JC-00000");
  await page.getByRole("button", { name: "Track", exact: true }).click();
  await expect(page.getByText("We could not find JC-00000")).toBeVisible();
});

test("L6: changing a rate in the dashboard changes the calculator", async ({ page }) => {
  await page.goto(dashboard("en", "/rates"));
  await register(page);
  await page.locator("#rate-sea-ratePerKg").fill("2");
  await page.getByRole("button", { name: "Save rates: Sea freight" }).click();
  await expect(page.getByRole("status")).toContainText("Saved.");

  await page.goto(site("en", "/calculator"));
  await page.getByRole("radio", { name: "Sea" }).check({ force: true });
  await expect(page.getByText(/4,000/)).toBeVisible();
});

test("L10: the value tip explains a shipment stuck in customs, and reset restores the demo", async ({
  page,
}) => {
  await page.goto(dashboard("en"));
  await register(page);
  await expect(page.getByText(/at 11:00 PM|outside your office hours/).first()).toBeVisible();
  await page.goto(dashboard("en", "/settings"));
  await page.getByRole("main").getByRole("button", { name: "Reset demo" }).click();
  await expect(page.getByText("The demo was reset.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
});

test.describe("direction", () => {
  test("L12: Arabic is right to left and English is left to right on the site and the dashboard", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(site("ar"));
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("نوصّل بضاعتك من آسيا إلى بابك");
    const brand = await page.getByRole("link", { name: "جسر كارجو" }).first().boundingBox();
    const track = await page.getByRole("link", { name: "تتبّع الشحنة" }).first().boundingBox();
    expect(brand && track && brand.x > track.x).toBe(true);

    await page.goto(site("en"));
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    const enBrand = await page.getByRole("link", { name: "Jisr Cargo" }).first().boundingBox();
    const enTrack = await page.getByRole("link", { name: "Track shipment" }).first().boundingBox();
    expect(enBrand && enTrack && enBrand.x < enTrack.x).toBe(true);

    await page.goto(dashboard("ar"));
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { name: "أنشئ حساب لوحة التحكم" })).toBeVisible();
  });

  test("the Arabic calculator shows Arabic modes and prices", async ({ page }) => {
    await page.goto(site("ar", "/calculator"));
    await expect(page.getByRole("heading", { level: 1, name: "حاسبة الشحن" })).toBeVisible();
    await expect(page.getByRole("radio", { name: "بحري" })).toBeAttached();
    await expect(page.getByText("التكلفة التقديرية")).toBeVisible();
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

  for (const path of ["/calculator", "/track", "/quote"]) {
    test(`no serious accessibility issues on ${path}`, async ({ page }) => {
      await page.goto(site("en", path));
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expectNoSeriousA11yIssues(page);
    });
  }

  for (const path of ["", "/quotes", "/shipments", "/rates"]) {
    test(`no serious accessibility issues on the dashboard ${path || "overview"}`, async ({ page }) => {
      await page.goto(dashboard("en", path));
      await register(page);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expectNoSeriousA11yIssues(page);
    });
  }
});
