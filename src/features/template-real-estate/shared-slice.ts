import type { Content, Property, RealEstateData, Settings, Testimonial } from "./types";

// Store actions both variants need. A variant store spreads `createSharedActions(set)` into its actions.
export type SetData<D> = (update: Partial<D> | ((state: D) => Partial<D>)) => void;

export type NewProperty = Omit<Property, "id">;
export type NewTestimonial = Omit<Testimonial, "id">;

export type SharedActions = {
  updateSettings: (patch: Partial<Settings>) => void;
  updateContent: (content: Content) => void;
  addProperty: (input: NewProperty) => string;
  replaceProperty: (id: string, input: NewProperty) => void;
  removeProperty: (id: string) => void;
  addTestimonial: (input: NewTestimonial) => string;
  updateTestimonial: (id: string, patch: Partial<NewTestimonial>) => void;
  removeTestimonial: (id: string) => void;
  dismissTip: (id: string) => void;
};

export function createSharedActions(set: SetData<RealEstateData>): SharedActions {
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

    addProperty: (input) => {
      const property: Property = { ...input, id: crypto.randomUUID() };
      set((state) => ({ properties: [property, ...state.properties] }));
      return property.id;
    },

    replaceProperty: (id, input) =>
      set((state) => ({
        properties: state.properties.map((property) => (property.id === id ? { ...input, id } : property)),
      })),

    removeProperty: (id) => set((state) => ({ properties: state.properties.filter((property) => property.id !== id) })),

    addTestimonial: (input) => {
      const testimonial: Testimonial = { ...input, id: crypto.randomUUID() };
      set((state) => ({ testimonials: [...state.testimonials, testimonial] }));
      return testimonial.id;
    },

    updateTestimonial: (id, patch) =>
      set((state) => ({
        testimonials: state.testimonials.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      })),

    removeTestimonial: (id) =>
      set((state) => ({ testimonials: state.testimonials.filter((item) => item.id !== id) })),

    dismissTip: (id) =>
      set((state) => (state.dismissedTips.includes(id) ? {} : { dismissedTips: [...state.dismissedTips, id] })),
  };
}
