import { isValidPhone } from "../../phone";
import type { InquiryKind } from "../../types";

export type InquiryErrors = { name?: true; phone?: true; message?: true };

// A question needs words; a valuation or brochure request can go without a message.
export function validateInquiry(input: {
  kind: InquiryKind;
  name: string;
  phone: string;
  message: string;
}): InquiryErrors {
  const errors: InquiryErrors = {};
  if (!input.name.trim()) errors.name = true;
  if (!isValidPhone(input.phone)) errors.phone = true;
  if (input.kind === "question" && input.message.trim().length < 5) errors.message = true;
  return errors;
}
