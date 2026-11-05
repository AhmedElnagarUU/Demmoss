import { z } from "zod";
import { localizedTextSchema } from "@/features/demo-engine/types";

export const caseStudySchema = z.object({
  id: z.string().min(1),
  sector: localizedTextSchema,
  title: localizedTextSchema,
  text: localizedTextSchema,
  // the headline result, e.g. "-38%"
  metricValue: z.string().max(12),
  metricLabel: localizedTextSchema,
  visible: z.boolean(),
});

export const caseStudiesShape = { caseStudies: z.array(caseStudySchema) };

export type CaseStudy = z.infer<typeof caseStudySchema>;
export type CaseStudiesData = { caseStudies: CaseStudy[] };
