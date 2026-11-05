"use client";

import { useRealEstate } from "../context";
import { SelectInput, TextInput } from "@/features/demo-engine/ui";
import { sortIds, type FilterState } from "../listings";
import { getRealEstateT } from "../messages";
import { propertyTypes } from "../types";

export type FilterField =
  "purpose" | "type" | "area" | "price" | "bedrooms" | "query" | "availableOnly" | "sort";

type Props = {
  state: FilterState;
  onChange: (state: FilterState) => void;
  fields: readonly FilterField[];
  idPrefix: string;
};

// Search and filter controls of the Listings / Residences pages. The page applies the filter (listings.ts).
export function FilterBar({ state, onChange, fields, idPrefix }: Props) {
  const { config, locale } = useRealEstate();
  const t = getRealEstateT(locale);
  const set = (patch: Partial<FilterState>) => onChange({ ...state, ...patch });
  const has = (field: FilterField) => fields.includes(field);
  const bands = config.priceBands.filter((band) => band.purpose === state.purpose);

  return (
    <div role="search" aria-label={t("filters.label")} className="space-y-4">
      {has("purpose") && config.purposes.length > 1 ? (
        <div role="group" aria-label={t("filters.purpose")} className="flex gap-2">
          {(["", ...config.purposes] as const).map((purpose) => (
            <button
              key={purpose || "any"}
              type="button"
              aria-pressed={state.purpose === purpose}
              onClick={() => set({ purpose, band: "" })}
              className="min-h-11 rounded-full border border-border px-6 font-semibold text-text aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              {purpose ? t(`purpose.${purpose}`) : t("filters.anyPurpose")}
            </button>
          ))}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {has("query") ? (
          <TextInput
            id={`${idPrefix}-query`}
            label={t("filters.query")}
            type="search"
            placeholder={t("filters.queryHint")}
            value={state.query}
            onChange={(event) => set({ query: event.target.value })}
          />
        ) : null}
        {has("type") ? (
          <SelectInput
            id={`${idPrefix}-type`}
            label={t("filters.type")}
            value={state.type}
            onChange={(event) =>
              set({ type: propertyTypes.find((item) => item === event.target.value) ?? "" })
            }
          >
            <option value="">{t("filters.anyType")}</option>
            {config.types.map((type) => (
              <option key={type} value={type}>
                {t(`type.${type}`)}
              </option>
            ))}
          </SelectInput>
        ) : null}
        {has("area") ? (
          <SelectInput
            id={`${idPrefix}-area`}
            label={t("filters.area")}
            value={state.area}
            onChange={(event) => set({ area: event.target.value })}
          >
            <option value="">{t("filters.anyArea")}</option>
            {config.areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name[locale]}
              </option>
            ))}
          </SelectInput>
        ) : null}
        {has("price") && (state.purpose || config.purposes.length === 1) ? (
          <SelectInput
            id={`${idPrefix}-price`}
            label={t("filters.price")}
            value={state.band}
            onChange={(event) => set({ band: event.target.value })}
          >
            <option value="">{t("filters.anyPrice")}</option>
            {bands.map((band) => (
              <option key={band.id} value={band.id}>
                {t(`band.${band.id}`)}
              </option>
            ))}
          </SelectInput>
        ) : null}
        {has("bedrooms") ? (
          <SelectInput
            id={`${idPrefix}-bedrooms`}
            label={t("filters.bedrooms")}
            value={state.bedrooms}
            onChange={(event) => set({ bedrooms: event.target.value })}
          >
            <option value="">{t("filters.anyBedrooms")}</option>
            {["1", "2", "3", "4", "5"].map((count) => (
              <option key={count} value={count}>
                {t("filters.bedroomsOrMore", { count })}
              </option>
            ))}
          </SelectInput>
        ) : null}
        {has("sort") ? (
          <SelectInput
            id={`${idPrefix}-sort`}
            label={t("filters.sort")}
            value={state.sort}
            onChange={(event) =>
              set({ sort: sortIds.find((item) => item === event.target.value) ?? "featured" })
            }
          >
            {sortIds.map((sort) => (
              <option key={sort} value={sort}>
                {t(`sort.${sort}`)}
              </option>
            ))}
          </SelectInput>
        ) : null}
      </div>

      {has("availableOnly") ? (
        <label className="flex min-h-11 items-center gap-2 font-semibold text-text">
          <input
            type="checkbox"
            className="size-5"
            checked={state.availableOnly}
            onChange={(event) => set({ availableOnly: event.target.checked })}
          />
          {t("filters.availableOnly")}
        </label>
      ) : null}
    </div>
  );
}
