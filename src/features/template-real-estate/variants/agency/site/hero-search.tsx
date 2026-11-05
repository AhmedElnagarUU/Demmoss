"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useRealEstate } from "../../../context";
import { SelectInput } from "@/features/demo-engine/ui";
import { getRealEstateT } from "../../../messages";
import { pillClasses } from "../../../site/site-ui";
import { propertyTypes, type Purpose } from "../../../types";
import { getAgencyT } from "../messages";

// Buy / Rent search on the home page. It opens the Listings page with the same choices applied.
export function HeroSearch() {
  const { config, locale } = useRealEstate();
  const t = getRealEstateT(locale);
  const at = getAgencyT(locale);
  const router = useRouter();
  const [purpose, setPurpose] = useState<Purpose>("sale");
  const [area, setArea] = useState("");
  const [type, setType] = useState("");
  const [band, setBand] = useState("");

  function submit(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams({ purpose });
    if (area) params.set("area", area);
    if (propertyTypes.some((item) => item === type)) params.set("type", type);
    if (band) params.set("band", band);
    router.push(`/${locale}${config.basePath}/listings?${params.toString()}`);
  }

  return (
    <form
      onSubmit={submit}
      aria-label={at("hero.searchLabel")}
      className="space-y-4 rounded-control border border-border bg-bg p-5 shadow-sm"
    >
      <div role="group" aria-label={t("filters.purpose")} className="flex gap-2">
        {config.purposes.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={purpose === item}
            onClick={() => {
              setPurpose(item);
              setBand("");
            }}
            className="min-h-11 rounded-full border border-border px-6 font-semibold text-text aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {at(item === "sale" ? "hero.buy" : "hero.rent")}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
        <SelectInput
          id="hero-area"
          label={t("filters.area")}
          value={area}
          onChange={(e) => setArea(e.target.value)}
        >
          <option value="">{t("filters.anyArea")}</option>
          {config.areas.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name[locale]}
            </option>
          ))}
        </SelectInput>
        <SelectInput
          id="hero-type"
          label={t("filters.type")}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">{t("filters.anyType")}</option>
          {config.types.map((item) => (
            <option key={item} value={item}>
              {t(`type.${item}`)}
            </option>
          ))}
        </SelectInput>
        <SelectInput
          id="hero-price"
          label={t("filters.price")}
          value={band}
          onChange={(e) => setBand(e.target.value)}
        >
          <option value="">{t("filters.anyPrice")}</option>
          {config.priceBands
            .filter((item) => item.purpose === purpose)
            .map((item) => (
              <option key={item.id} value={item.id}>
                {t(`band.${item.id}`)}
              </option>
            ))}
        </SelectInput>
        <button type="submit" className={pillClasses.solid}>
          {at("hero.search")}
        </button>
      </div>
    </form>
  );
}
