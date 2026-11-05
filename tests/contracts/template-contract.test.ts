import { existsSync } from "node:fs";
import path from "node:path";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getAllDemos } from "@/features/gallery/catalog";
import { templateMetaSchema } from "@/features/gallery/types";
import { createFakeStorage } from "../helpers/storage";
import { projectRoot } from "../helpers/files";
import { templateRegistry, type TemplateParts } from "./template-registry";

// Template contract (.claude/rules/templates.md): every variant in the gallery catalog is checked here, automatically.
const storage = createFakeStorage();
vi.stubGlobal("window", { localStorage: storage });

const demos = getAllDemos();
const account = { name: "Sara", passwordHash: "b".repeat(64), businessName: "My Place" };

it("every gallery demo is registered for the contract, and every registered one is in the gallery", () => {
  expect(Object.keys(templateRegistry).sort()).toEqual(demos.map((demo) => demo.slug).sort());
});

describe.each(demos.map((demo) => [demo.slug, demo] as const))("template contract: %s", (slug, meta) => {
  let parts: TemplateParts;

  beforeEach(async () => {
    storage.clear();
    const load = templateRegistry[slug];
    if (!load) throw new Error(`No registry entry for ${slug}`);
    parts = await load();
    parts.store.getState().resetDemo();
    parts.store.getState().setAccount(null);
  });

  it("has a valid catalog entry whose slug is <category>-<variant>", () => {
    expect(templateMetaSchema.safeParse(meta).success).toBe(true);
    expect(meta.slug).toBe(`${meta.category}-${meta.variant}`);
  });

  it("has a screenshot file, a route folder, and a plan doc", () => {
    expect(existsSync(path.join(projectRoot, "public", meta.screenshot))).toBe(true);
    expect(existsSync(path.join(projectRoot, "src/app/[locale]/demos", meta.category, meta.variant))).toBe(
      true,
    );
    expect(existsSync(path.join(projectRoot, `docs/features/template-${meta.category}.md`))).toBe(true);
  });

  it("E5: stores its data under demo:<slug> with a version", () => {
    const options = parts.store.persist.getOptions();
    expect(options.name).toBe(`demo:${slug}`);
    expect(options.version).toBeGreaterThanOrEqual(1);
  });

  it("E5: its seed is valid for its schema and has no account", () => {
    const seed = parts.createSeed(new Date());
    expect(parts.schema.safeParse(seed).success).toBe(true);
    expect(seed.account).toBeNull();
  });

  it("E2: its sample dates move with today's date", () => {
    const early = JSON.stringify(parts.createSeed(new Date(2026, 0, 10, 12)));
    const later = JSON.stringify(parts.createSeed(new Date(2026, 5, 20, 12)));
    expect(early).not.toBe(later);
  });

  it("E3: reset demo keeps the fake account", () => {
    parts.store.getState().setAccount(account);
    parts.store.getState().resetDemo();
    expect(parts.store.getState().account).toEqual(account);
  });
});
