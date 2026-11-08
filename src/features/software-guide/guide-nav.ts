import type { GuideContent } from "./types";

export type NavLink = { id: string; label: string };
export type NavItem = NavLink & { groupId: string; groupLabel: string; children: NavLink[] };
export type NavGroup = { id: string; label: string; description: string; items: NavItem[] };
export type NavTerm = NavLink & { text: string };

export type GuideNav = {
  groups: NavGroup[];
  /** Every section in reading order: the one source for the sidebar, the pager and the scroll-spy. */
  items: NavItem[];
  /** Headings inside a section ("On this page"); sections without headings are not listed. */
  toc: Record<string, NavLink[]>;
  terms: NavTerm[];
};

export function buildGuideNav(content: GuideContent): GuideNav {
  const groups = content.menu.groups.map((group) => ({
    id: group.id,
    label: group.label,
    description: group.description,
    items: group.items.map((item) => ({
      id: item.id,
      label: item.label,
      groupId: group.id,
      groupLabel: group.label,
      children: item.children ?? [],
    })),
  }));
  const items = groups.flatMap((group) => group.items);

  const toc: Record<string, NavLink[]> = {};
  for (const item of items) if (item.children.length > 0) toc[item.id] = item.children;
  toc["how-built"] = content.howBuilt.items.map((part) => ({ id: `part-${part.id}`, label: part.title }));
  toc["myths"] = content.myths.items.map((myth) => ({ id: `myth-${myth.id}`, label: myth.myth }));
  toc["glossary"] = content.glossary.items.map((entry) => ({ id: `term-${entry.id}`, label: entry.term }));

  const terms = content.glossary.items.map((entry) => ({
    id: `term-${entry.id}`,
    label: entry.term,
    text: entry.definition,
  }));

  return { groups, items, toc, terms };
}

export function prevNext(items: NavItem[], id: string): { previous: NavItem | null; next: NavItem | null } {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return { previous: null, next: null };
  return { previous: items[index - 1] ?? null, next: items[index + 1] ?? null };
}

const DIACRITICS_AND_TATWEEL = /[ً-ٰٟـ]/g;

/** Lowercase, and make Arabic spelling variants equal: no diacritics or tatweel, one alef, ya, and ha. */
export function normalizeSearch(text: string): string {
  return text
    .toLowerCase()
    .replace(DIACRITICS_AND_TATWEEL, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .trim();
}

export function matchesQuery(query: string, ...texts: string[]): boolean {
  const wanted = normalizeSearch(query);
  if (wanted === "") return true;
  return texts.some((text) => normalizeSearch(text).includes(wanted));
}

export type NavFilter = { groups: NavGroup[]; terms: NavTerm[] };

export function filterGuideNav(nav: GuideNav, query: string): NavFilter {
  if (normalizeSearch(query) === "") return { groups: nav.groups, terms: [] };

  const groups = nav.groups.flatMap((group) => {
    const groupMatches = matchesQuery(query, group.label);
    const items = group.items.flatMap((item) => {
      if (groupMatches || matchesQuery(query, item.label)) return [item];
      const children = item.children.filter((child) => matchesQuery(query, child.label));
      return children.length > 0 ? [{ ...item, children }] : [];
    });
    return items.length > 0 ? [{ ...group, items }] : [];
  });
  const terms = nav.terms.filter((term) => matchesQuery(query, term.label, term.text));
  return { groups, terms };
}
