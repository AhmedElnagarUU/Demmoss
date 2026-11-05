import type { WizardTranslate } from "./messages";
import type { LeadType } from "./types";

type MessageInput = {
  t: WizardTranslate;
  brand: string;
  type: LeadType;
  fieldName?: string;
  idea?: string;
  name?: string;
};

const IDEA_SUMMARY_LENGTH = 200;

const wantKey = {
  business: "whatsapp.wantBusiness",
  system: "whatsapp.wantSystem",
  saas: "whatsapp.wantSaas",
  other: "whatsapp.wantOther",
} as const;

export function summarizeIdea(idea: string): string {
  const oneLine = idea.replace(/\s+/g, " ").trim();
  return oneLine.length > IDEA_SUMMARY_LENGTH ? `${oneLine.slice(0, IDEA_SUMMARY_LENGTH - 1)}…` : oneLine;
}

export function buildWhatsAppMessage({ t, brand, type, fieldName, idea, name }: MessageInput): string {
  const greeting = name ? t("whatsapp.greeting", { brand, name }) : t("whatsapp.greetingNoName", { brand });
  const lines = [greeting, t(wantKey[type])];
  if (fieldName) lines.push(t("whatsapp.field", { field: fieldName }));
  if (idea) lines.push(t("whatsapp.idea", { idea: summarizeIdea(idea) }));
  return lines.join("\n");
}
