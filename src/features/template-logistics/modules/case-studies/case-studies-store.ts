import type { StoreWith } from "../../logistics-store";
import type { CaseStudiesActions } from "./store-slice";
import type { CaseStudiesData } from "./types";

export type CaseStudiesStore = StoreWith<CaseStudiesData & CaseStudiesActions>;
export type CaseStudyListStore = StoreWith<CaseStudiesData>;
