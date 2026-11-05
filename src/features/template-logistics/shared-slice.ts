import type { LocalizedText } from "@/features/demo-engine/types";
import { canMoveQuote } from "./quotes";
import type { Content, Estimate, FaqItem, LogisticsData, Quote, ServiceKey, Settings } from "./types";

// Store actions both variants need. A variant store spreads `createSharedActions(set)` into its actions.
export type SetData<D> = (update: Partial<D> | ((state: D) => Partial<D>)) => void;

export type NewQuote = {
  name: string;
  company: string;
  phone: string;
  email: string;
  service: ServiceKey;
  message: string;
  estimate: Estimate | null;
};

export type SharedActions = {
  updateSettings: (patch: Partial<Settings>) => void;
  updateContent: (content: Content) => void;
  addQuote: (input: NewQuote, now?: Date) => string;
  setQuoteStatus: (id: string, status: Quote["status"]) => void;
  addFaq: (question: LocalizedText, answer: LocalizedText) => string;
  updateFaq: (id: string, patch: Partial<Omit<FaqItem, "id">>) => void;
  removeFaq: (id: string) => void;
  setTestimonialVisible: (id: string, visible: boolean) => void;
  dismissTip: (id: string) => void;
};

export function createSharedActions(set: SetData<LogisticsData>): SharedActions {
  return {
    updateSettings: (patch) =>
      set((state) => ({
        settings: {
          ...state.settings,
          ...patch,
          // editing the name in Settings takes over from the name given at register
          nameEdited: state.settings.nameEdited || patch.businessName !== undefined,
        },
      })),
    updateContent: (content) => set({ content }),

    addQuote: (input, now = new Date()) => {
      const quote: Quote = {
        id: crypto.randomUUID(),
        ...input,
        name: input.name.trim(),
        company: input.company.trim(),
        phone: input.phone.trim(),
        email: input.email.trim(),
        status: "new",
        createdAt: now.toISOString(),
      };
      set((state) => ({ quotes: [quote, ...state.quotes] }));
      return quote.id;
    },
    setQuoteStatus: (id, status) =>
      set((state) => ({
        quotes: state.quotes.map((quote) =>
          quote.id === id && canMoveQuote(quote.status, status) ? { ...quote, status } : quote,
        ),
      })),

    addFaq: (question, answer) => {
      const item: FaqItem = { id: crypto.randomUUID(), question, answer };
      set((state) => ({ faq: [...state.faq, item] }));
      return item.id;
    },
    updateFaq: (id, patch) =>
      set((state) => ({ faq: state.faq.map((item) => (item.id === id ? { ...item, ...patch } : item)) })),
    removeFaq: (id) => set((state) => ({ faq: state.faq.filter((item) => item.id !== id) })),

    setTestimonialVisible: (id, visible) =>
      set((state) => ({
        testimonials: state.testimonials.map((item) => (item.id === id ? { ...item, visible } : item)),
      })),
    dismissTip: (id) =>
      set((state) =>
        state.dismissedTips.includes(id) ? {} : { dismissedTips: [...state.dismissedTips, id] },
      ),
  };
}
