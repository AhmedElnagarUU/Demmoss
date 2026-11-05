import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Dr. Rayan Al Harthi (clinic-specialist). Demo data lives in the browser, so these journeys need no database.
// Photos come from a CDN: nothing here depends on them loading.
const site = (locale: "ar" | "en", path = "") => `/${locale}/demos/clinic/specialist${path}`;
const dashboard = (locale: "ar" | "en", path = "") => site(locale, `/dashboard${path}`);

async function register(page: Page, businessName = "") {
  await page.getByLabel("Your name").fill("Owner");
  await page.getByLabel("Password").fill("secret1");
  if (businessName) await page.getByLabel("Business name (optional)").fill(businessName);
  await page.getByRole("button", { name: "Create account and open dashboard" }).click();
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
}

async function bookAppointment(page: Page, guest: string) {
  const form = page.getByRole("form", { name: "Book an appointment" });
  await form.getByRole("radio").first().check({ force: true });
  await form.getByLabel("Your name").fill(guest);
  await form.getByLabel("Phone number").fill("966501234567");
  await form.getByRole("button", { name: "Request appointment" }).click();
  await expect(page.getByRole("heading", { name: "We received your appointment request" })).toBeVisible();
}

test("C1, C4, C5: book a free time, see the request in the dashboard, then confirm it", async ({ page }) => {
  await page.goto(site("en", "/book?treatment=implant"));
  await expect(page.getByLabel("Treatment")).toHaveValue("implant");
  await bookAppointment(page, "Nada Test");

  await page.getByRole("link", { name: "Open your dashboard to see it arrive" }).click();
  await register(page, "Dr. Rania");

  const row = page.getByRole("listitem").filter({ hasText: "Nada Test" });
  await expect(row).toBeVisible();
  await expect(row.getByText("Single dental implant")).toBeVisible();
  await expect(row.getByText("New", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Confirm: Nada Test" }).click();
  await expect(row.getByText("Confirmed", { exact: true })).toBeVisible();

  await page.goto(site("en"));
  await expect(page.getByRole("link", { name: "Dr. Rania" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Dr. Rayan Al Harthi" })).toHaveCount(0);
});

test("C1: a booked time is no longer offered, and a missing name or time is explained", async ({ page }) => {
  await page.goto(site("en", "/book"));
  const form = page.getByRole("form", { name: "Book an appointment" });
  const firstTime = await form
    .getByRole("radio")
    .first()
    .locator("xpath=following-sibling::span")
    .textContent();
  await bookAppointment(page, "Taken Slot");

  await page.goto(site("en", "/book"));
  await expect(
    page.getByRole("form", { name: "Book an appointment" }).getByText(firstTime ?? "", { exact: true }),
  ).toHaveCount(0);

  const again = page.getByRole("form", { name: "Book an appointment" });
  await again.getByRole("button", { name: "Request appointment" }).click();
  await expect(again.getByRole("alert")).toHaveText("Please fix the highlighted fields.");
  await expect(page.getByText("Enter your name.")).toBeVisible();
  await expect(page.getByText("Choose one of the free times.")).toBeVisible();
});

test("C7: a price changed in the dashboard changes the site", async ({ page }) => {
  await page.goto(dashboard("en", "/treatments"));
  await register(page);
  await page.getByRole("button", { name: "Edit: Single dental implant" }).click();
  await page.getByLabel("Price (SAR)").fill("4100");
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByText(/4,100/).first()).toBeVisible();

  await page.goto(site("en", "/prices"));
  await expect(page.getByText(/4,100/).first()).toBeVisible();
  await page.goto(site("en", "/treatments"));
  await expect(page.getByText(/4,100/).first()).toBeVisible();
});

test("C8: closing every day in Settings leaves nothing to book", async ({ page }) => {
  await page.goto(dashboard("en", "/settings"));
  await register(page);
  for (const day of ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"]) {
    await page.getByRole("checkbox", { name: new RegExp(day) }).uncheck();
  }
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByText("Saved.")).toBeVisible();

  await page.goto(site("en", "/book"));
  await expect(page.getByText("There are no open days right now. Please contact the clinic.")).toBeVisible();
});

test("C12, E3: editing the FAQ shows on the site, and reset restores the seed and keeps the login", async ({
  page,
}) => {
  await page.goto(dashboard("en", "/faq"));
  await register(page);
  await page.getByRole("button", { name: "Add question" }).click();
  await page.getByLabel("Question (English)").fill("Do you treat children?");
  await page.getByLabel("Answer (English)").fill("Yes, from the age of twelve.");
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByText("Do you treat children?").first()).toBeVisible();

  await page.goto(site("en", "/prices"));
  await expect(page.getByText("Do you treat children?")).toBeVisible();

  await page.goto(dashboard("en", "/settings"));
  await page.getByRole("main").getByRole("button", { name: "Reset demo" }).click();
  await expect(page.getByText("The demo is back to its sample data.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
  await page.goto(site("en", "/prices"));
  await expect(page.getByText("Do you treat children?")).toHaveCount(0);
});

test("the before and after slider works with the keyboard", async ({ page }) => {
  await page.goto(site("en", "/results"));
  const slider = page.getByRole("slider").first();
  await slider.focus();
  await expect(slider).toHaveValue("50");
  await page.keyboard.press("ArrowRight");
  await expect(slider).toHaveValue("51");
});

test("C9: the value tip names a patient who waited more than a day", async ({ page }) => {
  await page.goto(dashboard("en"));
  await register(page);
  await expect(page.getByText(/asked for an appointment more than a day ago/)).toBeVisible();
});

test.describe("direction", () => {
  test("C10: Arabic is right to left and English is left to right on the site and the dashboard", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(site("ar"));
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("جراحة أسنان تبدأ دقتها قبل العملية");
    const brand = await page.getByRole("link", { name: "د. ريان الحارثي" }).first().boundingBox();
    const results = await page.getByRole("link", { name: "النتائج", exact: true }).first().boundingBox();
    expect(brand && results && brand.x > results.x).toBe(true);

    await page.goto(site("en"));
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    const enBrand = await page.getByRole("link", { name: "Dr. Rayan Al Harthi" }).first().boundingBox();
    const enResults = await page.getByRole("link", { name: "Results", exact: true }).first().boundingBox();
    expect(enBrand && enResults && enBrand.x < enResults.x).toBe(true);

    await page.goto(dashboard("ar"));
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { name: "أنشئ حساب لوحة التحكم" })).toBeVisible();
  });
});

test.describe("accessibility", () => {
  async function expectNoSeriousIssues(page: Page) {
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  }

  for (const locale of ["ar", "en"] as const) {
    for (const path of ["", "/book"]) {
      test(`no serious accessibility issues on ${path || "home"} (${locale})`, async ({ page }) => {
        await page.goto(site(locale, path));
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        await expectNoSeriousIssues(page);
      });
    }
  }

  for (const path of ["", "/appointments", "/treatments", "/settings"]) {
    test(`no serious accessibility issues on the dashboard ${path || "overview"}`, async ({ page }) => {
      await page.goto(dashboard("en", path));
      await register(page);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expectNoSeriousIssues(page);
    });
  }
});
