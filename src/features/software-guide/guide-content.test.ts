import { describe, expect, it } from "vitest";
import ar from "./content/ar.json";
import en from "./content/en.json";
import { guideContentSchema, type GuideContent } from "./types";

describe("guide content files (SG11, SG12)", () => {
  it("SG12: en.json and ar.json both match the content schema", () => {
    expect(guideContentSchema.safeParse(en).error).toBeUndefined();
    expect(guideContentSchema.safeParse(ar).error).toBeUndefined();
  });

  it("SG12: a missing field fails the schema with a clear path", () => {
    const broken = { ...en, hero: { ...en.hero, title: undefined } };
    const result = guideContentSchema.safeParse(broken);
    expect(result.error?.issues[0]?.path).toEqual(["hero", "title"]);
  });

  it("SG11: both languages list the same item ids in the same order", () => {
    const english = guideContentSchema.parse(en);
    const arabic = guideContentSchema.parse(ar);
    expect(idsOf(arabic)).toEqual(idsOf(english));
  });

  it("SG7: every sidebar link points to a section or a type card the page renders", () => {
    const sections = [
      "overview",
      "why",
      "types",
      "compare",
      "how-built",
      "rent-or-build",
      "myths",
      "quiz",
      "glossary",
    ];
    for (const content of [guideContentSchema.parse(en), guideContentSchema.parse(ar)]) {
      const types = content.types.items.map((type) => type.id);
      for (const item of content.menu.groups.flatMap((group) => group.items)) {
        expect(sections).toContain(item.id);
        for (const child of item.children ?? []) expect(types).toContain(child.id);
      }
    }
  });

  it("SG5: every quiz option points to the same type in both languages", () => {
    const english = guideContentSchema.parse(en);
    const arabic = guideContentSchema.parse(ar);
    expect(quizTypesOf(arabic)).toEqual(quizTypesOf(english));
  });

  it("SG5: every question offers each of the four types once", () => {
    for (const question of guideContentSchema.parse(en).quiz.questions) {
      expect(question.options.map((option) => option.type).sort()).toEqual([
        "functional",
        "profile",
        "saas",
        "system",
      ]);
    }
  });
});

function idsOf(content: GuideContent) {
  return {
    menu: content.menu.groups.map((group) => [
      group.id,
      ...group.items.map((item) => [item.id, ...(item.children ?? []).map((child) => child.id)]),
    ]),
    facts: content.facts.items.map((item) => item.id),
    types: content.types.items.map((item) => item.id),
    rows: content.comparison.rows.map((row) => row.id),
    howBuilt: content.howBuilt.items.map((item) => item.id),
    myths: content.myths.items.map((item) => item.id),
    questions: content.quiz.questions.map((q) => [q.id, ...q.options.map((o) => o.id)]),
    glossary: content.glossary.items.map((item) => item.id),
  };
}

function quizTypesOf(content: GuideContent) {
  return content.quiz.questions.map((question) => question.options.map((option) => option.type));
}
