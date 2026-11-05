import type {
  ClinicData,
  Content,
  Department,
  Doctor,
  Faq,
  Result,
  Settings,
  Testimonial,
  Treatment,
} from "./types";

// Store actions both variants need. A variant store spreads `createSharedActions(set)` into its actions.
export type SetData<D> = (update: Partial<D> | ((state: D) => Partial<D>)) => void;

export type SharedActions = {
  updateSettings: (patch: Partial<Settings>) => void;
  updateContent: (content: Content) => void;
  setTreatments: (treatments: Treatment[]) => void;
  setDoctors: (doctors: Doctor[]) => void;
  setDepartments: (departments: Department[]) => void;
  setResults: (results: Result[]) => void;
  setFaqs: (faqs: Faq[]) => void;
  setTestimonials: (testimonials: Testimonial[]) => void;
  dismissTip: (id: string) => void;
};

export function createSharedActions(set: SetData<ClinicData>): SharedActions {
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
    setTreatments: (treatments) => set({ treatments }),
    setDoctors: (doctors) => set({ doctors }),
    setDepartments: (departments) => set({ departments }),
    setResults: (results) => set({ results }),
    setFaqs: (faqs) => set({ faqs }),
    setTestimonials: (testimonials) => set({ testimonials }),
    dismissTip: (id) =>
      set((state) =>
        state.dismissedTips.includes(id) ? {} : { dismissedTips: [...state.dismissedTips, id] },
      ),
  };
}
