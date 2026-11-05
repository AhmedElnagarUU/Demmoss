import { z } from "zod";

export const guideTypeSchema = z.enum(["profile", "functional", "system", "saas"]);
export type GuideType = z.infer<typeof guideTypeSchema>;

const text = z.string().trim().min(1);
const idText = z.object({ id: text, text });
const sectionTitle = z.object({ title: text });

const typeCardSchema = z.object({
  id: guideTypeSchema,
  name: text,
  shortName: text,
  oneLine: text,
  analogy: text,
  whatItDoes: text,
  examples: text,
  goodFor: text,
  youManage: text,
  effort: text,
  note: text.optional(),
});

const quizOptionSchema = z.object({ id: text, type: guideTypeSchema, text });

const quizQuestionSchema = z.object({
  id: text,
  text,
  options: z.array(quizOptionSchema).length(4),
});

const quizResultSchema = z.object({ title: text, why: text });

export const guideContentSchema = z.object({
  meta: z.object({ title: text, description: text }),
  menu: z.object({ label: text, items: z.array(z.object({ id: text, label: text })).min(1) }),
  quizLink: text,
  hero: z.object({ title: text, subtitle: text, findCta: text, demosCta: text }),
  facts: sectionTitle.extend({ items: z.array(idText).min(1) }),
  types: sectionTitle.extend({
    intro: text,
    labels: z.object({
      analogy: text,
      whatItDoes: text,
      examples: text,
      goodFor: text,
      youManage: text,
      effort: text,
    }),
    items: z.array(typeCardSchema).length(4),
  }),
  comparison: sectionTitle.extend({
    caption: text,
    rowHeader: text,
    columns: z.array(z.object({ id: guideTypeSchema, name: text })).length(4),
    rows: z.array(z.object({ id: text, label: text, values: z.array(text).length(4) })).min(1),
  }),
  rentOrBuild: sectionTitle.extend({
    text,
    rent: z.object({ label: text, text }),
    build: z.object({ label: text, text }),
    mix: z.object({ label: text, text }),
  }),
  howBuilt: sectionTitle.extend({
    items: z.array(z.object({ id: text, title: text, text })).min(1),
  }),
  myths: sectionTitle.extend({
    mythLabel: text,
    truthLabel: text,
    items: z.array(z.object({ id: text, myth: text, truth: text })).min(1),
  }),
  quiz: sectionTitle.extend({
    intro: text,
    questionCount: text,
    submit: text,
    incomplete: text,
    restart: text,
    resultLabel: text,
    startProject: text,
    seeDemos: text,
    whatsapp: text,
    whatsappMessage: text,
    questions: z.array(quizQuestionSchema).min(1),
    results: z.object({
      profile: quizResultSchema,
      functional: quizResultSchema,
      system: quizResultSchema,
      saas: quizResultSchema,
      tie: quizResultSchema,
    }),
  }),
  glossary: sectionTitle.extend({
    items: z.array(z.object({ id: text, term: text, definition: text })).min(1),
  }),
  cta: sectionTitle.extend({
    text,
    startProject: text,
    seeDemos: text,
    whatsapp: text,
    whatsappMessage: text,
  }),
});

export type GuideContent = z.infer<typeof guideContentSchema>;
export type QuizQuestion = z.infer<typeof quizQuestionSchema>;
