import type { InquiryStatus } from "../../types";

// new → replied → closed · new → closed (not relevant, nothing to reply)
export type InquiryTarget = Exclude<InquiryStatus, "new">;

const transitions: Record<InquiryStatus, readonly InquiryTarget[]> = {
  new: ["replied", "closed"],
  replied: ["closed"],
  closed: [],
};

export function allowedInquiryStatuses(from: InquiryStatus): readonly InquiryTarget[] {
  return transitions[from];
}

export function canMoveInquiry(from: InquiryStatus, to: InquiryStatus): boolean {
  return transitions[from].some((target) => target === to);
}
