import { expect, test, type Page } from "@playwright/test";
import { adminEmail, signInAsAdmin } from "./helpers/admin";

const protectedPages = ["", "/leads", "/visitors", "/demos", "/activity", "/feedback", "/notifications"];

test("C1: every admin page sends a visitor without a session to the login", async ({ page }) => {
  for (const section of protectedPages) {
    await page.goto(`/en/admin${section}`);
    await expect(page).toHaveURL(/\/en\/admin\/login$/);
    await expect(page.getByRole("heading", { level: 1, name: "Admin sign in" })).toBeVisible();
  }
  await page.goto("/ar/admin/leads");
  await expect(page).toHaveURL(/\/ar\/admin\/login$/);
});

test("C1: a visitor journey page is private too", async ({ page }) => {
  await page.goto("/en/admin/visitors/7d444840-9dc0-41bc-8d6e-1b4a2e6c3a01");
  await expect(page).toHaveURL(/\/en\/admin\/login$/);
});

test("C1: the admin pages are not indexed", async ({ page }) => {
  await page.goto("/en/admin/login");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("C1: a wrong password does not sign in", async ({ page }) => {
  await page.goto("/en/admin/login");
  await page.getByLabel("Email", { exact: true }).fill(adminEmail);
  await page.getByLabel("Password", { exact: true }).fill("not the password");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.getByText("Wrong email or password.")).toBeVisible();
  await expect(page).toHaveURL(/\/en\/admin\/login$/);

  await page.goto("/en/admin/leads");
  await expect(page).toHaveURL(/\/en\/admin\/login$/);
});

test("C1: a wrong email does not sign in even with the right password", async ({ page }) => {
  await page.goto("/en/admin/login");
  await page.getByLabel("Email", { exact: true }).fill("someone@else.test");
  await page.getByLabel("Password", { exact: true }).fill("e2e-admin-password");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.getByText("Wrong email or password.")).toBeVisible();
});

async function sendWizardRequest(page: Page, name: string): Promise<void> {
  await page.goto("/en/start");
  await page.getByRole("radio", { name: /A SaaS product/ }).check();
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByLabel("Your idea").fill("A booking tool for yoga teachers with reminders");
  await page.getByRole("button", { name: "Next" }).click();
  await page.getByLabel("Your name").fill(name);
  await page.getByLabel("WhatsApp number").fill("966522222222");
  await page.getByRole("button", { name: "Send my request" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "We received your idea" })).toBeVisible();
}

test("C1, C3, N1: the owner signs in, sees a wizard lead, changes its status, and sees unread notifications", async ({
  page,
}, testInfo) => {
  const name = `Admin Test ${testInfo.project.name} ${Date.now()}`;

  await sendWizardRequest(page, name);

  await signInAsAdmin(page);
  await expect(page.getByRole("heading", { level: 1, name: "Overview" })).toBeVisible();
  await expect(page.getByRole("link", { name: /^Notifications \d+ unread$/ })).toBeVisible();

  await page.getByRole("link", { name: "Leads", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/admin\/leads$/);
  const row = page.getByRole("row").filter({ hasText: name });
  await expect(row).toBeVisible();
  await expect(row.getByLabel(`Status of ${name}`)).toHaveValue("new");
  await expect(row.getByRole("link", { name: `WhatsApp ${name}` })).toHaveAttribute(
    "href",
    "https://wa.me/966522222222",
  );

  await row.getByLabel(`Status of ${name}`).selectOption("contacted");
  await row.getByRole("button", { name: "Update" }).click();

  await page.reload();
  await expect(page.getByRole("row").filter({ hasText: name }).getByLabel(`Status of ${name}`)).toHaveValue(
    "contacted",
  );
  await page.getByLabel("Status", { exact: true }).selectOption("new");
  await page.getByRole("button", { name: "Filter" }).click();
  await expect(page.getByRole("row").filter({ hasText: name })).toHaveCount(0);

  await page.getByRole("link", { name: /^Notifications/ }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Notifications" })).toBeVisible();
  await expect(page.getByText("New leads (", { exact: false }).first()).toBeVisible();
});

test("C1: signing out ends the session", async ({ page }) => {
  await signInAsAdmin(page);
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/en\/admin\/login$/);

  await page.goto("/en/admin");
  await expect(page).toHaveURL(/\/en\/admin\/login$/);
});
