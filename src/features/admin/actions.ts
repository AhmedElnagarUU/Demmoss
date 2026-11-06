"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getClientKey } from "@/shared/rate-limit";
import { attemptAdminLogin, endAdminSession, startAdminSession } from "./auth/admin-session";
import { adminPath, adminPathForNotification } from "./paths";
import {
  changeLeadStatus,
  markAllNotificationsAsRead,
  markFeedbackAsRead,
  markNotificationAsRead,
  saveLeadNotes,
} from "./service";
import {
  leadNotesInputSchema,
  leadStatusInputSchema,
  localeInputSchema,
  loginInputSchema,
  markFeedbackReadInputSchema,
  openNotificationInputSchema,
  type LoginResult,
} from "./types";

function fields(formData: FormData): Record<string, FormDataEntryValue> {
  return Object.fromEntries(formData);
}

export async function loginAction(_previous: LoginResult, formData: FormData): Promise<LoginResult> {
  const parsed = loginInputSchema.safeParse(fields(formData));
  if (!parsed.success) return { error: "invalid_input" };
  const clientKey = await getClientKey();
  const result = attemptAdminLogin({
    email: parsed.data.email,
    password: parsed.data.password,
    clientKey,
    now: Date.now(),
  });
  if (!result.ok) {
    if (result.error === "too_many_attempts") {
      return { error: "too_many_attempts", retryAfterMinutes: result.retryAfterMinutes };
    }
    return { error: "invalid_credentials" };
  }
  await startAdminSession();
  redirect(adminPath(parsed.data.locale));
}

export async function logoutAction(formData: FormData): Promise<void> {
  const parsed = localeInputSchema.safeParse(fields(formData));
  await endAdminSession();
  redirect(adminPath(parsed.success ? parsed.data.locale : "en", "login"));
}

export async function updateLeadStatusAction(formData: FormData): Promise<void> {
  const parsed = leadStatusInputSchema.safeParse(fields(formData));
  if (!parsed.success) return;
  await changeLeadStatus(parsed.data.id, parsed.data.status);
  revalidatePath(adminPath(parsed.data.locale), "layout");
}

export async function saveLeadNotesAction(formData: FormData): Promise<void> {
  const parsed = leadNotesInputSchema.safeParse(fields(formData));
  if (!parsed.success) return;
  await saveLeadNotes(parsed.data.id, parsed.data.notes);
  revalidatePath(adminPath(parsed.data.locale), "layout");
}

export async function markFeedbackReadAction(formData: FormData): Promise<void> {
  const parsed = markFeedbackReadInputSchema.safeParse(fields(formData));
  if (!parsed.success) return;
  await markFeedbackAsRead(parsed.data.id);
  revalidatePath(adminPath(parsed.data.locale), "layout");
}

export async function markAllNotificationsReadAction(formData: FormData): Promise<void> {
  const parsed = localeInputSchema.safeParse(fields(formData));
  if (!parsed.success) return;
  await markAllNotificationsAsRead();
  revalidatePath(adminPath(parsed.data.locale), "layout");
}

export async function openNotificationAction(formData: FormData): Promise<void> {
  const parsed = openNotificationInputSchema.safeParse(fields(formData));
  if (!parsed.success) return;
  await markNotificationAsRead(parsed.data.id);
  redirect(adminPathForNotification(parsed.data.type, parsed.data.locale));
}
