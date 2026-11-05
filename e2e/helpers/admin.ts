import { expect, type Page } from "@playwright/test";
import credentials from "./admin-credentials.json" with { type: "json" };

// The admin used by E2E tests. e2e/server.mjs starts the app with the same TEST values (admin-credentials.json).
export const adminEmail = credentials.email;
export const adminPassword = credentials.password;

export async function signInAsAdmin(page: Page, locale: "en" | "ar" = "en"): Promise<void> {
  await page.goto(`/${locale}/admin/login`);
  await page.getByLabel("Email", { exact: true }).fill(adminEmail);
  await page.getByLabel("Password", { exact: true }).fill(adminPassword);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(new RegExp(`/${locale}/admin$`));
}
