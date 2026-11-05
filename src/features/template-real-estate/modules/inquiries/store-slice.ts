import type { SetData } from "../../shared-slice";
import type { Inquiry, InquiryKind, InquiryStatus, RealEstateData } from "../../types";
import { canMoveInquiry } from "./status";

export type NewInquiry = {
  propertyId?: string;
  unitId?: string;
  kind: InquiryKind;
  name: string;
  phone: string;
  message: string;
};

export type InquiriesActions = {
  addInquiry: (input: NewInquiry, now?: Date) => string;
  setInquiryStatus: (id: string, status: InquiryStatus) => void;
};

export function createInquiriesActions(set: SetData<RealEstateData>): InquiriesActions {
  return {
    addInquiry: (input, now = new Date()) => {
      const inquiry: Inquiry = {
        ...input,
        id: crypto.randomUUID(),
        name: input.name.trim(),
        phone: input.phone.trim(),
        message: input.message.trim(),
        status: "new",
        createdAt: now.toISOString(),
      };
      set((state) => ({ inquiries: [inquiry, ...state.inquiries] }));
      return inquiry.id;
    },

    setInquiryStatus: (id, status) =>
      set((state) => ({
        inquiries: state.inquiries.map((inquiry) =>
          inquiry.id === id && canMoveInquiry(inquiry.status, status) ? { ...inquiry, status } : inquiry,
        ),
      })),
  };
}
