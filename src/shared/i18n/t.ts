import ar from "./messages/ar.json";
import en from "./messages/en.json";
import type { Locale } from "./config";

export type Messages = typeof en;

type Leaves<T, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends string ? `${Prefix}${K}` : Leaves<T[K], `${Prefix}${K}.`>;
}[keyof T & string];

export type MessageKey = Leaves<Messages>;

export type Translate = (key: MessageKey, values?: Record<string, string>) => string;

export type TranslateFor<M> = (key: Leaves<M>, values?: Record<string, string>) => string;

const messages: Record<Locale, Messages> = { ar, en };

export function getT(locale: Locale): Translate {
  return createTranslator(messages, locale);
}

// For a feature's own messages: src/features/<feature>/messages/{ar,en}.json
export function createTranslator<M>(source: Record<Locale, M>, locale: Locale): TranslateFor<M> {
  return (key, values = {}) => {
    const text = lookup(source[locale], key);
    return text.replace(/\{(\w+)\}/g, (match, name: string) => values[name] ?? match);
  };
}

function lookup(source: unknown, key: string): string {
  const value = key.split(".").reduce<unknown>((node, part) => {
    return typeof node === "object" && node !== null ? (node as Record<string, unknown>)[part] : undefined;
  }, source);
  if (typeof value !== "string") throw new Error(`Missing message: ${key}`);
  return value;
}
