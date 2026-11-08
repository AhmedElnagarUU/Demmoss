import { describe, expect, it } from "vitest";
import ar from "./content/ar.json";
import en from "./content/en.json";
import { buildGuideNav, filterGuideNav, matchesQuery, normalizeSearch, prevNext } from "./guide-nav";
import { readingMinutes } from "./reading-time";
import { guideContentSchema } from "./types";

const english = guideContentSchema.parse(en);
const arabic = guideContentSchema.parse(ar);
const nav = buildGuideNav(english);
const arabicNav = buildGuideNav(arabic);

describe("guide navigation (SG7, SG9)", () => {
  it("SG7: sections are listed in reading order, group by group", () => {
    expect(nav.items.map((item) => item.id)).toEqual([
      "overview",
      "why",
      "types",
      "compare",
      "how-built",
      "rent-or-build",
      "myths",
      "quiz",
      "glossary",
    ]);
    expect(nav.groups.map((group) => group.id)).toEqual(["start", "understand", "decide", "reference"]);
    expect(arabicNav.items.map((item) => item.id)).toEqual(nav.items.map((item) => item.id));
  });

  it("SG7: the four type links belong to the types section, and every item knows its group", () => {
    const types = nav.items.find((item) => item.id === "types");
    expect(types?.children.map((child) => child.id)).toEqual(["profile", "functional", "system", "saas"]);
    expect(types?.groupLabel).toBe("Understand");
    const others = nav.items.filter((item) => item.id !== "types");
    expect(others.every((item) => item.children.length === 0)).toBe(true);
  });

  it('SG7: "On this page" lists the headings of a section, and nothing for sections without any', () => {
    expect(nav.toc["types"]?.map((link) => link.id)).toEqual(["profile", "functional", "system", "saas"]);
    expect(nav.toc["myths"]).toHaveLength(english.myths.items.length);
    expect(nav.toc["quiz"]).toBeUndefined();
  });

  it("SG9: the first section has no previous and the last has no next", () => {
    expect(prevNext(nav.items, "overview")).toEqual({ previous: null, next: nav.items[1] });
    const last = nav.items[nav.items.length - 1];
    expect(prevNext(nav.items, "glossary")).toEqual({
      previous: nav.items[nav.items.length - 2],
      next: null,
    });
    expect(last?.id).toBe("glossary");
  });

  it("SG9: from the four types, next is the comparison and previous is why this matters", () => {
    const { previous, next } = prevNext(nav.items, "types");
    expect(previous?.id).toBe("why");
    expect(next?.id).toBe("compare");
  });

  it("SG9: an unknown section has neither", () => {
    expect(prevNext(nav.items, "nope")).toEqual({ previous: null, next: null });
  });
});

describe("guide search (SG10)", () => {
  it("SG10: an empty search shows every group and no glossary results", () => {
    const result = filterGuideNav(nav, "  ");
    expect(result.groups).toEqual(nav.groups);
    expect(result.terms).toEqual([]);
  });

  it("SG10: an English query is case-insensitive and finds sections and glossary terms", () => {
    const result = filterGuideNav(nav, "MYTH");
    expect(result.groups.flatMap((group) => group.items.map((item) => item.id))).toEqual(["myths"]);
    const seo = filterGuideNav(nav, "seo");
    expect(seo.terms.map((term) => term.id)).toEqual(["term-seo"]);
  });

  it("SG10: a query that matches a type name keeps only that sub-link under its section", () => {
    const result = filterGuideNav(nav, "saas");
    const types = result.groups.flatMap((group) => group.items).find((item) => item.id === "types");
    expect(types?.children.map((child) => child.id)).toEqual(["saas"]);
  });

  it("SG10: a group name keeps the whole group", () => {
    const result = filterGuideNav(nav, "decide");
    expect(result.groups.map((group) => group.id)).toEqual(["decide"]);
    expect(result.groups[0]?.items).toHaveLength(3);
  });

  it("SG10: an Arabic query finds sections and terms, ignoring diacritics and tatweel", () => {
    expect(filterGuideNav(arabicNav, "خُرافات").groups.flatMap((g) => g.items.map((i) => i.id))).toContain(
      "myths",
    );
    expect(filterGuideNav(arabicNav, "الاســتضافة").terms.map((term) => term.id)).toContain("term-hosting");
  });

  it("SG10: alef spellings and ta marbuta do not block a match", () => {
    expect(matchesQuery("اساسي", "الأساسي")).toBe(true);
    expect(matchesQuery("مقارنه", "المقارنة")).toBe(true);
    expect(normalizeSearch("  ABC ")).toBe("abc");
  });

  it("SG10: a query that matches nothing returns no groups and no terms", () => {
    const result = filterGuideNav(nav, "zzzzqq");
    expect(result.groups).toEqual([]);
    expect(result.terms).toEqual([]);
  });
});

describe("reading time", () => {
  it("is computed from the real word count, so a longer guide takes longer to read", () => {
    const minutes = readingMinutes(english);
    expect(minutes).toBeGreaterThanOrEqual(1);
    const longer = {
      ...english,
      facts: { ...english.facts, items: [{ id: "x", text: "word ".repeat(2000) }] },
    };
    expect(readingMinutes(longer)).toBeGreaterThan(minutes);
  });
});
