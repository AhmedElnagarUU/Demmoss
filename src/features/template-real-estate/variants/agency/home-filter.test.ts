import { describe, expect, it } from "vitest";
import { agencyAreas, agencyPriceBands } from "./areas";
import { filterForTab, homeProperties, homeTabs, noFilter, tabOf } from "./home-filter";
import { seedProperties } from "./seed/properties";

const ids = (filter: Parameters<typeof homeProperties>[1]) =>
  homeProperties(seedProperties, filter, agencyAreas, agencyPriceBands)
    .map((property) => property.id)
    .sort();

describe("RE1: the home listings tabs and search", () => {
  it("All shows every listing and For rent only the rentals", () => {
    expect(ids(filterForTab("all"))).toHaveLength(8);
    expect(ids(filterForTab("rent"))).toEqual(["birch-road", "dock-lofts", "quay-street"]);
  });

  it("the house, apartment and villa tabs show what is for sale, never a rental", () => {
    expect(ids(filterForTab("house"))).toEqual(["alder-lane", "orchard-close"]);
    expect(ids(filterForTab("apartment"))).toEqual(["mill-yard"]);
    expect(ids(filterForTab("villa"))).toEqual(["cypress-court", "laurel-heights"]);
  });

  it("the search combines Buy or Rent with a type, a location and a price band", () => {
    expect(ids({ ...noFilter, purpose: "rent", area: "riverside" })).toEqual(["birch-road"]);
    expect(ids({ ...noFilter, purpose: "rent", type: "apartment" })).toEqual(["dock-lofts", "quay-street"]);
    expect(ids({ ...noFilter, purpose: "sale", band: "sale-1" })).toEqual([]);
    expect(ids({ ...noFilter, purpose: "sale", band: "sale-2" })).toEqual(["mill-yard", "orchard-close"]);
  });

  it("a price band of the other purpose is ignored", () => {
    expect(ids({ ...noFilter, purpose: "rent", band: "sale-4" })).toHaveLength(3);
  });

  it("every tab can be read back from the filter it makes", () => {
    for (const tab of homeTabs) expect(tabOf(filterForTab(tab))).toBe(tab);
  });
});
