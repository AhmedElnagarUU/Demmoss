import { describe, expect, it } from "vitest";
import {
  emptyFilterState,
  filterProperties,
  filterStateFromParams,
  sortProperties,
  toPropertyFilter,
} from "./listings";
import { agencyAreas, agencyPriceBands } from "./variants/agency/areas";
import { seedProperties } from "./variants/agency/seed/properties";
import { seedProperties as residences } from "./variants/developer/seed/properties";

const ids = (list: { id: string }[]) => list.map((item) => item.id).sort();
const find = (filter: Parameters<typeof filterProperties>[1]) =>
  ids(filterProperties(seedProperties, filter, agencyAreas));

describe("RE1: search and filter properties", () => {
  it("filters by buy or rent", () => {
    expect(find({ purpose: "rent" })).toEqual(["narjis-townhouse", "olaya-apartment", "olaya-studio"]);
    expect(find({ purpose: "sale" })).toHaveLength(5);
  });

  it("filters by type, area, and a minimum number of bedrooms", () => {
    expect(find({ type: "townhouse", purpose: "sale" })).toEqual(["yasmin-townhouse"]);
    expect(find({ area: "al-olaya" })).toEqual(["olaya-apartment", "olaya-studio"]);
    expect(find({ minBedrooms: 5 })).toEqual(["hittin-villa", "malqa-villa", "malqa-villa-2"]);
  });

  it("price limits are inclusive", () => {
    expect(find({ purpose: "sale", minPrice: 1_150_000, maxPrice: 2_150_000 })).toEqual([
      "yasmin-apartment",
      "yasmin-townhouse",
    ]);
  });

  it("combines every filter (all must match)", () => {
    expect(find({ purpose: "sale", type: "villa", area: "al-malqa", maxPrice: 4_000_000 })).toEqual([
      "malqa-villa",
    ]);
    expect(find({ purpose: "rent", type: "villa" })).toEqual([]);
  });

  it("searches the title and the area in Arabic and in English, every word must match", () => {
    expect(find({ query: "villa malqa" })).toEqual(["malqa-villa", "malqa-villa-2"]);
    expect(find({ query: "فيلا حطين" })).toEqual(["hittin-villa"]);
    expect(find({ query: "الملقا" })).toEqual(["malqa-villa", "malqa-villa-2"]);
    expect(find({ query: "  VILLA  " })).toHaveLength(3);
    expect(find({ query: "castle" })).toEqual([]);
  });

  it("available only hides a listing under offer", () => {
    expect(find({ availableOnly: true })).not.toContain("malqa-villa-2");
    expect(find({})).toContain("malqa-villa-2");
  });

  it("available only judges a residence by its units", () => {
    const available = filterProperties(residences, { availableOnly: true }, []).map((item) => item.id);
    expect(available).not.toContain("obhur-shore-house");
    expect(available).toContain("hada-ridge-villa");
  });
});

describe("RE1: sorting", () => {
  it("sorts by price in both directions", () => {
    expect(sortProperties(seedProperties, "priceAsc")[0]?.id).toBe("olaya-studio");
    expect(sortProperties(seedProperties, "priceDesc")[0]?.id).toBe("hittin-villa");
  });

  it("featured first keeps the owner's order inside each group and does not change the input", () => {
    const before = seedProperties.map((item) => item.id);
    const sorted = sortProperties(seedProperties, "featured");
    expect(sorted.slice(0, 4).every((item) => item.featured)).toBe(true);
    expect(sorted.slice(4).every((item) => !item.featured)).toBe(true);
    expect(seedProperties.map((item) => item.id)).toEqual(before);
  });
});

describe("RE1: filter controls", () => {
  it("turns the controls into a filter using the price band of the chosen purpose", () => {
    const state = { ...emptyFilterState("rent"), band: "rent-2", bedrooms: "3", type: "townhouse" as const };
    expect(toPropertyFilter(state, agencyPriceBands)).toEqual({
      purpose: "rent",
      type: "townhouse",
      minPrice: 60_001,
      maxPrice: 100_000,
      minBedrooms: 3,
    });
    // a sale band does nothing when renting
    expect(toPropertyFilter({ ...emptyFilterState("rent"), band: "sale-1" }, agencyPriceBands)).toEqual({
      purpose: "rent",
    });
  });

  it("reads the URL of the home search and ignores unknown values", () => {
    const allowed = { purposes: ["sale", "rent"] as const, areas: agencyAreas, bands: agencyPriceBands };
    const params = new URLSearchParams("purpose=rent&type=villa&area=al-malqa&band=rent-1");
    expect(filterStateFromParams(params, allowed)).toMatchObject({
      purpose: "rent",
      type: "villa",
      area: "al-malqa",
      band: "rent-1",
    });
    const bad = new URLSearchParams("purpose=lease&type=castle&area=mars&band=sale-1&purpose2=x");
    expect(filterStateFromParams(bad, allowed)).toMatchObject({ purpose: "", type: "", area: "", band: "" });
  });

  it("a variant that only sells always filters for sale", () => {
    const state = filterStateFromParams(new URLSearchParams("purpose=rent"), {
      purposes: ["sale"],
      areas: [],
      bands: [],
    });
    expect(state.purpose).toBe("sale");
  });
});
