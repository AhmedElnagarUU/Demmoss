import path from "node:path";
import { describe, expect, it } from "vitest";
import { listFiles, readProjectFile } from "../helpers/files";

type Import = { file: string; target: string };

function importsOf(file: string): Import[] {
  const source = readProjectFile(file);
  return [...source.matchAll(/(?:from|import)\s+["']([^"']+)["']/g)].map((match) => ({
    file,
    target: resolveImport(file, match[1] ?? ""),
  }));
}

function resolveImport(file: string, specifier: string): string {
  if (specifier.startsWith("@/")) return path.posix.join("src", specifier.slice(2));
  if (specifier.startsWith(".")) return path.posix.join(path.posix.dirname(file), specifier);
  return specifier;
}

function featureOf(target: string): string | null {
  const match = /^src\/features\/([^/]+)/.exec(target);
  return match?.[1] ?? null;
}

const allImports = listFiles("src", [".ts", ".tsx"]).flatMap(importsOf);

describe("feature boundaries (code rule 2)", () => {
  it("shared/ never imports a feature", () => {
    const offenders = allImports.filter((i) => i.file.startsWith("src/shared/") && featureOf(i.target));
    expect(offenders).toEqual([]);
  });

  it("demo-engine never imports a template", () => {
    const offenders = allImports.filter(
      (i) => featureOf(i.file) === "demo-engine" && featureOf(i.target)?.startsWith("template-"),
    );
    expect(offenders).toEqual([]);
  });

  it("features import each other in one direction only (no cycles)", () => {
    const graph = new Map<string, Set<string>>();
    for (const { file, target } of allImports) {
      const from = featureOf(file);
      const to = featureOf(target);
      if (!from || !to || from === to) continue;
      graph.set(from, (graph.get(from) ?? new Set()).add(to));
    }
    expect(findCycle(graph)).toBeNull();
  });

  it("detects a cycle (guards this check itself)", () => {
    const graph = new Map([
      ["wizard", new Set(["gallery"])],
      ["gallery", new Set(["wizard"])],
    ]);
    expect(findCycle(graph)).toEqual(["wizard", "gallery", "wizard"]);
  });
});

function findCycle(graph: Map<string, Set<string>>): string[] | null {
  const done = new Set<string>();
  function visit(node: string, trail: string[]): string[] | null {
    if (trail.includes(node)) return [...trail.slice(trail.indexOf(node)), node];
    if (done.has(node)) return null;
    for (const next of graph.get(node) ?? []) {
      const cycle = visit(next, [...trail, node]);
      if (cycle) return cycle;
    }
    done.add(node);
    return null;
  }
  for (const node of graph.keys()) {
    const cycle = visit(node, []);
    if (cycle) return cycle;
  }
  return null;
}
