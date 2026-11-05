import type { Property, Unit } from "./types";

// Availability rules. A developer residence is judged by its units; an agency listing by its own status.

export type UnitCounts = { available: number; reserved: number; sold: number; total: number };

export type PropertyState = "available" | "reserved" | "sold_out";

export function unitCounts(units: readonly Unit[]): UnitCounts {
  const count = (status: Unit["status"]) => units.filter((unit) => unit.status === status).length;
  return {
    available: count("available"),
    reserved: count("reserved"),
    sold: count("sold"),
    total: units.length,
  };
}

// Sold out: nothing left to buy or reserve. Reserved: nothing free, but a reservation may fall through.
export function propertyState(property: Pick<Property, "units" | "status">): PropertyState {
  if (property.units.length === 0) {
    if (property.status === "closed") return "sold_out";
    return property.status === "reserved" ? "reserved" : "available";
  }
  const counts = unitCounts(property.units);
  if (counts.available > 0) return "available";
  return counts.reserved > 0 ? "reserved" : "sold_out";
}

// Residences where exactly one unit is still free (and there were at least two): a reason to act now.
export function lastUnitProperties(properties: readonly Property[]): Property[] {
  return properties.filter((property) => {
    const counts = unitCounts(property.units);
    return counts.total >= 2 && counts.available === 1;
  });
}
