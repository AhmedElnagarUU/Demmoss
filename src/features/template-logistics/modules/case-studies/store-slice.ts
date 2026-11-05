import type { SetData } from "../../shared-slice";
import type { CaseStudiesData, CaseStudy } from "./types";

export type CaseStudiesActions = {
  addCaseStudy: (input: Omit<CaseStudy, "id">) => string;
  updateCaseStudy: (id: string, patch: Partial<Omit<CaseStudy, "id">>) => void;
  removeCaseStudy: (id: string) => void;
};

export function createCaseStudiesActions(set: SetData<CaseStudiesData>): CaseStudiesActions {
  return {
    addCaseStudy: (input) => {
      const created: CaseStudy = { ...input, id: crypto.randomUUID() };
      set((state) => ({ caseStudies: [...state.caseStudies, created] }));
      return created.id;
    },
    updateCaseStudy: (id, patch) =>
      set((state) => ({
        caseStudies: state.caseStudies.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      })),
    removeCaseStudy: (id) =>
      set((state) => ({ caseStudies: state.caseStudies.filter((item) => item.id !== id) })),
  };
}
