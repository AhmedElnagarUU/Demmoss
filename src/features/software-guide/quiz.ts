import type { GuideType } from "./types";

export type WizardType = "business" | "system" | "saas";

export type Recommendation = {
  // The simplest of the top types, so a tie never pushes the visitor to the bigger project.
  type: GuideType;
  // Every type that has the top score, simplest first. More than one means a tie.
  tied: GuideType[];
  wizardType: WizardType;
};

// From simplest to biggest: the order that breaks a tie.
const simplestFirst: GuideType[] = ["profile", "functional", "system", "saas"];

const wizardTypeOf: Record<GuideType, WizardType> = {
  profile: "business",
  functional: "business",
  system: "system",
  saas: "saas",
};

export function pickRecommendation(answers: GuideType[]): Recommendation {
  if (answers.length === 0) throw new Error("The quiz needs at least one answer");

  const scores = simplestFirst.map((type) => ({
    type,
    count: answers.filter((answer) => answer === type).length,
  }));
  const best = Math.max(...scores.map((score) => score.count));
  const tied = scores.filter((score) => score.count === best).map((score) => score.type);
  const [type = "profile"] = tied;

  return { type, tied, wizardType: wizardTypeOf[type] };
}

export function fillPlaceholders(text: string, values: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (match, name: string) => values[name] ?? match);
}
