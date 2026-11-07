import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Sole Trattoria (restaurant-fast-food). Demo data lives in the browser, so these journeys need no database.
// Photos come from a CDN that may be blocked: nothing here depends on an image loading.
const site = (locale: "ar" | "en", path = "") => `/${locale}/demos/restaurant/fast-food${path}`;
const dashboard = (locale: "ar" | "en", path = "") => site(locale, `/dashboard${path}`);

async function registerAndWait(page: Page) {
  // wait for the register form itself: the page we come from may also have a "Your name" field
  await expect(page.getByRole("heading", { level: 1, name: "Create your dashboard account" })).toBeVisible();
  await page.getByLabel("Your name").fill("Owner");
  await page.getByLabel("Password").fill("secret1");
  await page.getByRole("button", { name: "Create account and open dashboard" }).click();
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
}

async function addToCart(page: Page, dish: string, times = 1) {
  for (let i = 0; i < times; i += 1) {
    await page.getByRole("button", { name: `Add to cart: ${dish}` }).click();
  }
}

async function checkoutAsDelivery(page: Page, guest: string) {
  await page.getByRole("button", { name: /^Cart,/ }).click();
  await page.getByRole("dialog").getByRole("link", { name: "Go to checkout" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Checkout" })).toBeVisible();
  await page.getByText("Delivery", { exact: true }).click();
  await page.getByLabel("Delivery area").selectOption({ label: "Al Olaya (delivery SAR 8)" });
  await page.getByLabel("Address and directions").fill("Olaya Street, building 3");
  await page.getByLabel("Your name").fill(guest);
  await page.getByLabel("Phone number").fill("966501234567");
  await page.getByRole("button", { name: "Place my order" }).click();
}

test("R1-R3: order for delivery, follow it, and watch the dashboard move it forward", async ({
  page,
  context,
}) => {
  await page.goto(site("en", "/menu"));
  await expect(page.getByRole("heading", { level: 1, name: "Taste of Italy" })).toBeVisible();
  await addToCart(page, "Diavola", 2);
  await expect(page.getByRole("button", { name: "Cart, 2 items" })).toBeVisible();

  await checkoutAsDelivery(page, "Rania Test");
  await expect(page.getByRole("heading", { level: 1, name: /^Order / })).toBeVisible();
  await expect(page).toHaveURL(/\/order\?id=/);
  await expect(page.getByRole("status").filter({ hasText: "We received your order" })).toBeVisible();
  // 2 x 52 + delivery 8
  await expect(page.getByText("SAR 112")).toBeVisible();

  // the owner, in a second tab of the same browser
  const owner = await context.newPage();
  await owner.goto(dashboard("en", "/orders"));
  await registerAndWait(owner);
  const card = owner.getByRole("listitem").filter({ hasText: "Rania Test" });
  await expect(card).toBeVisible();
  await owner.getByRole("button", { name: "Start preparing: Rania Test" }).click();

  await expect(page.getByRole("status").filter({ hasText: "We are preparing your order" })).toBeVisible();

  await owner.getByRole("button", { name: "Out for delivery: Rania Test" }).click();
  await expect(page.getByRole("status").filter({ hasText: "Your order is on its way" })).toBeVisible();
});

test("R1: a delivery below the area minimum is explained and not placed", async ({ page }) => {
  await page.goto(site("en", "/menu"));
  await page.getByRole("button", { name: "Antipasti" }).click();
  await addToCart(page, "Bruschetta");
  await page.getByRole("button", { name: /^Cart,/ }).click();
  await page.getByRole("dialog").getByRole("link", { name: "Go to checkout" }).click();
  await page.getByText("Delivery", { exact: true }).click();
  await page.getByLabel("Delivery area").selectOption({ label: "Al Olaya (delivery SAR 8)" });
  await expect(page.getByText(/The minimum order for Al Olaya is SAR.40/)).toBeVisible();
  await page.getByLabel("Address and directions").fill("Olaya Street");
  await page.getByLabel("Your name").fill("Min Test");
  await page.getByLabel("Phone number").fill("966501234567");
  await page.getByRole("button", { name: "Place my order" }).click();
  await expect(page).not.toHaveURL(/\/order\?id=/);
  await expect(page.getByText("Please check the highlighted fields.")).toBeVisible();
});

test("B2: an offer created in the dashboard appears on the home page", async ({ page }) => {
  await page.goto(dashboard("en", "/offers"));
  await registerAndWait(page);
  await page.getByRole("button", { name: "Add an offer" }).click();
  await page.getByLabel("Offer name (English)").fill("Friday Feast");
  await page.getByLabel("Offer name (Arabic)").fill("وليمة الجمعة");
  await page.getByLabel("Price", { exact: true }).fill("45");
  await page.getByRole("button", { name: "Save changes" }).click();
  await expect(page.getByRole("heading", { name: "Friday Feast" })).toBeVisible();

  await page.goto(site("en"));
  await expect(page.getByRole("heading", { name: "Friday Feast" })).toBeVisible();
  await page.goto(site("ar"));
  await expect(page.getByRole("heading", { name: "وليمة الجمعة" })).toBeVisible();
});

test("R5: the business name given at register replaces Sole Trattoria on the site", async ({ page }) => {
  await page.goto(dashboard("en"));
  await page.getByLabel("Your name").fill("Owner");
  await page.getByLabel("Password").fill("secret1");
  await page.getByLabel("Business name (optional)").fill("Burger Haus");
  await page.getByRole("button", { name: "Create account and open dashboard" }).click();
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
  await page.goto(site("en"));
  await expect(page.getByRole("link", { name: "Burger Haus" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Sole Trattoria" })).toHaveCount(0);
});

test("the value tip explains an order that came while the shop was closed", async ({ page }) => {
  await page.goto(dashboard("en"));
  await registerAndWait(page);
  await expect(
    page.getByText(/came straight from your website|follow order|when the restaurant was closed/),
  ).toBeVisible();
});

test.describe("direction", () => {
  test("Arabic is right to left and English is left to right on the site and the dashboard", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(site("ar"));
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("بيتزا وباستا");
    const brand = await page.getByRole("link", { name: "سولي تراتوريا" }).first().boundingBox();
    const contact = await page.getByRole("link", { name: "تواصل معنا" }).first().boundingBox();
    expect(brand && contact && brand.x > contact.x).toBe(true);

    await page.goto(site("en"));
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("PIZZA & PASTA");
    const enBrand = await page.getByRole("link", { name: "Sole Trattoria" }).first().boundingBox();
    const enContact = await page.getByRole("link", { name: "Contact" }).first().boundingBox();
    expect(enBrand && enContact && enBrand.x < enContact.x).toBe(true);

    await page.goto(dashboard("ar"));
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });
});

test.describe("accessibility", () => {
  const serious = async (page: Page) => {
    const results = await new AxeBuilder({ page }).analyze();
    return results.violations
      .filter((v) => v.impact === "serious" || v.impact === "critical")
      .map((v) => `${v.id}: ${v.help}`);
  };

  for (const locale of ["ar", "en"] as const) {
    test(`no serious accessibility issues on the home page and the menu (${locale})`, async ({ page }) => {
      await page.goto(site(locale));
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(await serious(page)).toEqual([]);
      await page.goto(site(locale, "/menu"));
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(await serious(page)).toEqual([]);
    });
  }

  test("no serious accessibility issues on the checkout, with a delivery chosen", async ({ page }) => {
    await page.goto(site("en", "/menu"));
    await addToCart(page, "Diavola", 2);
    await page.goto(site("en", "/checkout"));
    await expect(page.getByRole("heading", { level: 1, name: "Checkout" })).toBeVisible();
    await page.getByText("Delivery", { exact: true }).click();
    expect(await serious(page)).toEqual([]);
  });

  test("no serious accessibility issues on the cart drawer", async ({ page }) => {
    await page.goto(site("en", "/menu"));
    await addToCart(page, "Diavola");
    await page.getByRole("button", { name: /^Cart,/ }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    expect(await serious(page)).toEqual([]);
  });

  for (const path of ["", "/orders", "/offers", "/areas"]) {
    test(`no serious accessibility issues on the dashboard ${path || "overview"}`, async ({ page }) => {
      await page.goto(dashboard("en", path));
      await registerAndWait(page);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(await serious(page)).toEqual([]);
    });
  }
});
