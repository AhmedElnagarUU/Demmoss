import { isValidPhone } from "@/features/demo-engine/format/phone";
import type { QuoteStatus } from "./types";

// new → quoted → won or lost; a new quote can also be lost. Won and lost are final.
export type QuoteTarget = Exclude<QuoteStatus, "new">;

const transitions: Record<QuoteStatus, readonly QuoteTarget[]> = {
  new: ["quoted", "lost"],
  quoted: ["won", "lost"],
  won: [],
  lost: [],
};

export function allowedQuoteStatuses(from: QuoteStatus): readonly QuoteTarget[] {
  return transitions[from];
}

export function canMoveQuote(from: QuoteStatus, to: QuoteStatus): boolean {
  return transitions[from].some((target) => target === to);
}

export type QuoteInput = { name: string; phone: string; email: string };
export type QuoteErrors = Partial<Record<"name" | "phone" | "email", true>>;

// The email is optional, but when it is given it must look like an address.
export function validateQuote(input: QuoteInput): QuoteErrors {
  const errors: QuoteErrors = {};
  if (!input.name.trim()) errors.name = true;
  if (!isValidPhone(input.phone)) errors.phone = true;
  const email = input.email.trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = true;
  return errors;
}
