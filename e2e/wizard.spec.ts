import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { withTestDatabase } from "./helpers/database";

async function leadNamed(name: string) {
  return withTestDatabase((db) => db.collection("leads").findOne({ name }));
}

async function eventNames(page: Page): Promise<string[]> {
  const visitorId = await page.evaluate(() => window.localStorage.getItem("demo:visitor-id"));
  return withTestDatabase(async (db) =>
    (
      await db
        .collection("events")
        .find({ visitorId }, { sort: { createdAt: 1 } })
        .toArray()
    ).map((event) => event.name as string),
  );
}

test("W2, W4, W5, W6: a business owner picks a category in Arabic and ends on WhatsApp", async ({ page }) => {
  await page.goto("/ar/start");
  await expect(page.getByRole("heading", { name: "ماذا تريد أن تبني؟" })).toBeVisible();

  await page.getByRole("radio", { name: /موقع لنشاطي التجاري/ }).check();
  await page.getByRole("button", { name: "التالي" }).click();

  await page.getByLabel("مجال نشاطك").selectOption("restaurant");
  await page.getByRole("button", { name: "التالي" }).click();

  await page.getByLabel("اسمك").fill("سارة المطيري");
  await page.getByLabel("رقم واتساب").fill("+966 50 123 4567");
  await page.getByRole("button", { name: "أرسل طلبي" }).click();

  await expect(page).toHaveURL(/\/ar\/start\/result\?type=business&field=restaurant$/);
  expect(page.url()).not.toContain(encodeURIComponent("سارة"));
  await expect(page.getByRole("heading", { level: 1, name: "وصلنا طلبك" })).toBeVisible();

  const whatsapp = page.getByRole("link", { name: "تابع على واتساب" });
  const href = (await whatsapp.getAttribute("href")) ?? "";
  expect(href).toContain("https://wa.me/");
  await expect
    .poll(async () => decodeURIComponent((await whatsapp.getAttribute("href")) ?? ""))
    .toContain("سارة المطيري");
  expect(decodeURIComponent((await whatsapp.getAttribute("href")) ?? "")).toContain("المطاعم والمقاهي");

  await expect
    .poll(() => leadNamed("سارة المطيري"))
    .toMatchObject({
      type: "business",
      field: "restaurant",
      whatsapp: "+966501234567",
      locale: "ar",
      status: "new",
    });
  await expect
    .poll(() => withTestDatabase((db) => db.collection("notifications").countDocuments({ type: "new_lead" })))
    .toBeGreaterThan(0);
  await expect
    .poll(() => eventNames(page))
    .toEqual(expect.arrayContaining(["wizard_started", "wizard_completed"]));
});

test("W3, W5, W6: a SaaS idea in English is saved and shown as received", async ({ page }) => {
  await page.goto("/en/start");
  await page.getByRole("radio", { name: /A SaaS product/ }).check();
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Your idea").fill("A booking tool for yoga teachers with reminders");
  await page.getByRole("button", { name: "Next" }).click();

  await page.getByLabel("Your name").fill("Omar Test");
  await page.getByLabel("WhatsApp number").fill("966511111111");
  await page.getByLabel("Email (optional)").fill("omar@example.com");
  await page.getByRole("button", { name: "Send my request" }).click();

  await expect(page).toHaveURL(/\/en\/start\/result\?type=saas$/);
  await expect(page.getByRole("heading", { level: 1, name: "We received your idea" })).toBeVisible();
  await expect
    .poll(async () =>
      decodeURIComponent(
        (await page.getByRole("link", { name: "Continue on WhatsApp" }).getAttribute("href")) ?? "",
      ),
    )
    .toContain("A booking tool for yoga teachers");

  await expect
    .poll(() => leadNamed("Omar Test"))
    .toMatchObject({
      type: "saas",
      idea: "A booking tool for yoga teachers with reminders",
      email: "omar@example.com",
      locale: "en",
    });
});

test("W1: the Software Guide link with ?type= skips to step 2", async ({ page }) => {
  await page.goto("/en/start?type=system");
  await expect(page.getByRole("heading", { name: "Tell us about your idea" })).toBeVisible();
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(page.getByRole("radio", { name: /custom system/ })).toBeChecked();
});

test("W1-W3: errors are shown next to the field, and answers are kept when going back", async ({ page }) => {
  await page.goto("/en/start");
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByText("Choose one option to continue.")).toBeVisible();

  await page.getByRole("radio", { name: /Something else/ }).check();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByLabel("Your idea").fill("too short");
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByLabel("Your idea")).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText("Write at least 10 characters")).toBeVisible();

  await page.getByLabel("Your idea").fill("I need advice about what to build");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByLabel("Your name").fill("A");
  await page.getByLabel("WhatsApp number").fill("123");
  await page.getByLabel("Email (optional)").fill("not-an-email");
  await page.getByRole("button", { name: "Send my request" }).click();
  await expect(page.getByText("Enter your name")).toBeVisible();
  await expect(page.getByText("Enter a valid number")).toBeVisible();
  await expect(page.getByText("Enter a valid email")).toBeVisible();
  expect(await leadNamed("A")).toBeNull();

  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(page.getByLabel("Your idea")).toHaveValue("I need advice about what to build");
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(page.getByRole("radio", { name: /Something else/ })).toBeChecked();
});

test("W4: a business category without demos shows the fallback with a link to all demos", async ({
  page,
}) => {
  await page.goto("/en/start/result?type=business&field=fitness");
  await expect(page.getByRole("heading", { name: "We build for your field too" })).toBeVisible();
  await expect(page.getByRole("link", { name: "See all demos" })).toHaveAttribute("href", "/en/demos");
  await expect(page.getByRole("link", { name: "Continue on WhatsApp" })).toBeVisible();
});

test("the wizard page is laid out right-to-left in Arabic and has no serious accessibility issues", async ({
  page,
}) => {
  await page.goto("/ar/start");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { name: "ماذا تريد أن تبني؟" })).toBeVisible();
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
});
