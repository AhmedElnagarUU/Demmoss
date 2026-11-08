import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Noor Medical Centre (clinic-medical-centre). Demo data lives in the browser, so these journeys need no database.
// Photos come from a CDN: nothing here depends on them loading.
const site = (locale: "ar" | "en", path = "") => `/${locale}/demos/clinic/medical-centre${path}`;
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

test("C2, C4: book with a chosen doctor, then find the request under that doctor in the dashboard", async ({
  page,
}) => {
  await page.goto(site("en", "/doctors/detail?id=tariq-nasser"));
  await expect(page.getByRole("heading", { level: 1, name: "Dr. Tariq Nasser" })).toBeVisible();
  await expect(page.getByText("Next free time:")).toBeVisible();
  await page.getByRole("link", { name: "Book with Dr. Tariq Nasser" }).click();

  const form = page.getByRole("form", { name: "Book an appointment" });
  await expect(form.getByLabel("Doctor")).toHaveValue("tariq-nasser");
  await form.getByRole("radio").first().check({ force: true });
  await form.getByLabel("Your name").fill("Nada Test");
  await form.getByLabel("Phone number").fill("966501234567");
  await form.getByRole("button", { name: "Request appointment" }).click();
  await expect(page.getByRole("heading", { name: "We received your appointment request" })).toBeVisible();

  await page.getByRole("link", { name: "Open your dashboard to see it arrive" }).click();
  await register(page, "Noor Test");

  const row = page.getByRole("listitem").filter({ hasText: "Nada Test" });
  await expect(row).toBeVisible();
  await expect(row.getByText("Dr. Tariq Nasser")).toBeVisible();

  await page.getByLabel("Doctor", { exact: true }).selectOption({ label: "Dr. Munir Adel" });
  await expect(row).toHaveCount(0);
  await page.getByLabel("Doctor", { exact: true }).selectOption({ label: "Dr. Tariq Nasser" });
  await expect(row).toBeVisible();

  await page.getByRole("button", { name: "Confirm: Nada Test" }).click();
  await expect(row.getByText("Confirmed", { exact: true })).toBeVisible();

  await page.goto(site("en"));
  await expect(page.getByRole("link", { name: "Noor Test" }).first()).toBeVisible();
});

test("C2: the doctors directory filters by department and opens a profile", async ({ page }) => {
  await page.goto(site("en", "/doctors"));
  await expect(page.getByRole("link", { name: /Dr. Ahmad Bakr/ })).toBeVisible();
  await page.getByRole("button", { name: "Dermatology" }).click();
  await expect(page.getByRole("link", { name: /Dr. Munir Adel/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Dr. Ahmad Bakr/ })).toHaveCount(0);
  await page.getByRole("link", { name: /Dr. Munir Adel/ }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Dr. Munir Adel" })).toBeVisible();
  await expect(page.getByText("Weekly schedule")).toBeVisible();
});

test("C1: only the doctor's own free times are offered, and a taken one disappears", async ({ page }) => {
  await page.goto(site("en", "/book?doctor=huda-saeed"));
  const form = page.getByRole("form", { name: "Book an appointment" });
  await expect(form.getByLabel("Doctor")).toHaveValue("huda-saeed");
  const firstTime = await form
    .getByRole("radio")
    .first()
    .locator("xpath=following-sibling::span")
    .textContent();
  await form.getByRole("radio").first().check({ force: true });
  await form.getByLabel("Your name").fill("Taken Slot");
  await form.getByLabel("Phone number").fill("966501234567");
  await form.getByRole("button", { name: "Request appointment" }).click();
  await expect(page.getByRole("heading", { name: "We received your appointment request" })).toBeVisible();

  await page.goto(site("en", "/book?doctor=huda-saeed"));
  await expect(
    page.getByRole("form", { name: "Book an appointment" }).getByText(firstTime ?? "", { exact: true }),
  ).toHaveCount(0);
});

test("C7: a price changed in the dashboard changes the departments page", async ({ page }) => {
  await page.goto(dashboard("en", "/treatments"));
  await register(page);
  await page.getByRole("button", { name: "Edit: Family medicine consultation" }).click();
  await page.getByLabel("Price (SAR)").fill("215");
  await page.getByRole("button", { name: "Save", exact: true }).click();

  await page.goto(site("en", "/departments"));
  await expect(page.getByText(/215/).first()).toBeVisible();
});

test("C8: closing a doctor's schedule in the dashboard leaves nothing to book with them", async ({
  page,
}) => {
  await page.goto(dashboard("en", "/doctors"));
  await register(page);
  await page.getByRole("button", { name: "Edit: Dr. Tariq Nasser" }).click();
  for (const day of ["Sunday", "Monday", "Wednesday"]) {
    await page.getByRole("checkbox", { name: new RegExp(day) }).uncheck();
  }
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Edit doctor" })).toHaveCount(0);

  await page.goto(site("en", "/doctors/detail?id=tariq-nasser"));
  await expect(page.getByText("No free time in the next two weeks")).toBeVisible();
});

test.describe("direction", () => {
  test("C10: Arabic is right to left and English is left to right on the site and the dashboard", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(site("ar"));
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("رعاية لكل الأسرة، على بُعد حجز واحد");
    const brand = await page.getByRole("link", { name: "مركز نور الطبي" }).first().boundingBox();
    const contact = await page.getByRole("link", { name: "تواصل معنا", exact: true }).first().boundingBox();
    expect(brand && contact && brand.x > contact.x).toBe(true);

    await page.goto(site("en"));
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    const enBrand = await page.getByRole("link", { name: "Noor Medical Centre" }).first().boundingBox();
    const enContact = await page.getByRole("link", { name: "Contact", exact: true }).first().boundingBox();
    expect(enBrand && enContact && enBrand.x < enContact.x).toBe(true);

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
    for (const path of ["", "/book", "/doctors/detail?id=huda-saeed"]) {
      test(`no serious accessibility issues on ${path || "home"} (${locale})`, async ({ page }) => {
        await page.goto(site(locale, path));
        await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
        await expectNoSeriousIssues(page);
      });
    }
  }

  for (const path of ["", "/appointments", "/doctors", "/settings"]) {
    test(`no serious accessibility issues on the dashboard ${path || "overview"}`, async ({ page }) => {
      await page.goto(dashboard("en", path));
      await register(page);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expectNoSeriousIssues(page);
    });
  }
});
