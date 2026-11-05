import type { SetData } from "../../shared-slice";
import type { Property, Unit, UnitStatus } from "../../types";

export type NewUnit = Omit<Unit, "id">;

export type UnitsActions = {
  addUnit: (propertyId: string, input: NewUnit) => string;
  updateUnit: (propertyId: string, unitId: string, patch: Partial<NewUnit>) => void;
  setUnitStatus: (propertyId: string, unitId: string, status: UnitStatus) => void;
  removeUnit: (propertyId: string, unitId: string) => void;
};

type UnitsData = { properties: Property[] };

function changeUnits(set: SetData<UnitsData>, propertyId: string, change: (units: Unit[]) => Unit[]) {
  set((state) => ({
    properties: state.properties.map((property) =>
      property.id === propertyId ? { ...property, units: change(property.units) } : property,
    ),
  }));
}

// Developer residences only. The owner may set any status; the site reads the units, so it changes at once.
export function createUnitsActions(set: SetData<UnitsData>): UnitsActions {
  return {
    addUnit: (propertyId, input) => {
      const unit: Unit = { ...input, id: crypto.randomUUID() };
      changeUnits(set, propertyId, (units) => [...units, unit]);
      return unit.id;
    },

    updateUnit: (propertyId, unitId, patch) =>
      changeUnits(set, propertyId, (units) =>
        units.map((unit) => (unit.id === unitId ? { ...unit, ...patch } : unit)),
      ),

    setUnitStatus: (propertyId, unitId, status) =>
      changeUnits(set, propertyId, (units) =>
        units.map((unit) => (unit.id === unitId ? { ...unit, status } : unit)),
      ),

    removeUnit: (propertyId, unitId) =>
      changeUnits(set, propertyId, (units) => units.filter((unit) => unit.id !== unitId)),
  };
}
