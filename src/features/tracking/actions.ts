"use server";

import { headers } from "next/headers";
import { clientKeyFromHeaders } from "@/shared/rate-limit";
import { submitEvent } from "./service";
import { eventInputSchema } from "./types";

export async function recordEventAction(input: unknown): Promise<void> {
  const parsed = eventInputSchema.safeParse(input);
  if (!parsed.success) return;
  const requestHeaders = await headers();
  await submitEvent(parsed.data, {
    countryHeader: requestHeaders.get("cf-ipcountry"),
    userAgent: requestHeaders.get("user-agent"),
    now: new Date(),
    clientKey: clientKeyFromHeaders(requestHeaders),
  });
}
