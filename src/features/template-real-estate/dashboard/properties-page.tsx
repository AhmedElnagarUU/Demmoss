"use client";

import { useState, type FormEvent } from "react";
import type { LocalizedText } from "@/features/demo-engine/types";
import { Button } from "@/shared/ui/button";
import { propertyState } from "../availability";
import { useRealEstate } from "../context";
import { formatPrice } from "../format";
import { getRealEstateT } from "../messages";
import {
  propertyFeatures,
  propertyStatuses,
  purposes,
  type Property,
  type PropertyFeature,
  type PropertyStatus,
  type PropertyType,
  type Purpose,
} from "../types";
import { trackEdit } from "./track-edit";
import { BilingualField, ErrorSummary, PageHeader, Panel, SelectInput, StatusBadge, TextInput } from "./ui";

// Dashboard: add, edit, and remove the properties shown on the site (listings for the agency, residences for the developer).
export function PropertiesPage() {
  const { store, config, locale } = useRealEstate();
  const t = getRealEstateT(locale);
  const properties = store((state) => state.properties);
  const removeProperty = store((state) => state.removeProperty);
  // "new" = the add form is open; a Property = that one is being edited
  const [editing, setEditing] = useState<Property | "new" | null>(null);

  const titleKey = config.unitsDriveStatus ? "properties.residencesTitle" : "properties.title";

  return (
    <div className="space-y-6">
      <PageHeader
        title={t(titleKey)}
        intro={t("properties.intro")}
        action={
          editing ? null : (
            <Button onClick={() => setEditing("new")}>
              {t(config.unitsDriveStatus ? "properties.addResidence" : "properties.add")}
            </Button>
          )
        }
      />

      {editing ? (
        <PropertyForm
          key={editing === "new" ? "new" : editing.id}
          property={editing === "new" ? null : editing}
          onDone={() => setEditing(null)}
        />
      ) : null}

      {properties.length === 0 ? (
        <p className="text-muted">{t("properties.empty")}</p>
      ) : (
        <ul className="space-y-3">
          {properties.map((property) => {
            const area = config.areas.find((item) => item.id === property.area);
            const title = property.title[locale];
            return (
              <li
                key={property.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-control border border-border bg-bg p-4"
              >
                <div className="space-y-1">
                  <p className="text-lg font-bold text-text">{title}</p>
                  <p className="text-muted">
                    {t(`type.${property.type}`)} · {area?.name[locale] ?? ""} · {formatPrice(property.price, locale)}
                    {property.purpose === "rent" ? ` ${t("common.perYear")}` : ""}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge label={t(`state.${propertyState(property)}`)} />
                  <Button variant="secondary" aria-label={`${t("common.edit")}: ${title}`} onClick={() => setEditing(property)}>
                    {t("common.edit")}
                  </Button>
                  <Button
                    variant="secondary"
                    aria-label={`${t("common.remove")}: ${title}`}
                    onClick={() => {
                      removeProperty(property.id);
                      trackEdit("properties", config.slug, locale);
                    }}
                  >
                    {t("common.remove")}
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

type Draft = {
  title: LocalizedText;
  description: LocalizedText;
  purpose: Purpose;
  type: PropertyType;
  area: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  size: string;
  features: PropertyFeature[];
  photos: string[];
  featured: boolean;
  status: PropertyStatus;
  agentId: string;
};

function PropertyForm({ property, onDone }: { property: Property | null; onDone: () => void }) {
  const { store, config, locale } = useRealEstate();
  const t = getRealEstateT(locale);
  const addProperty = store((state) => state.addProperty);
  const replaceProperty = store((state) => state.replaceProperty);
  const agents = config.useAgentOptions();
  const propertyPhotos = config.photos.filter((photo) => !photo.portrait);

  const [draft, setDraft] = useState<Draft>(() => ({
    title: property?.title ?? { ar: "", en: "" },
    description: property?.description ?? { ar: "", en: "" },
    purpose: property?.purpose ?? config.purposes[0] ?? "sale",
    type: property?.type ?? config.types[0] ?? "villa",
    area: property?.area ?? config.areas[0]?.id ?? "",
    price: property ? String(property.price) : "",
    bedrooms: property ? String(property.bedrooms) : "3",
    bathrooms: property ? String(property.bathrooms) : "2",
    size: property ? String(property.size) : "",
    features: property?.features ?? [],
    photos: property?.photos ?? (propertyPhotos[0] ? [propertyPhotos[0].id] : []),
    featured: property?.featured ?? false,
    status: property?.status ?? "available",
    agentId: property?.agentId ?? "",
  }));
  const [errors, setErrors] = useState<Set<string>>(new Set());

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft((current) => ({ ...current, [key]: value }));

  function toggle<T extends string>(list: T[], item: T): T[] {
    return list.includes(item) ? list.filter((entry) => entry !== item) : [...list, item];
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const found = new Set<string>();
    const price = Number(draft.price);
    const size = Number(draft.size);
    const bedrooms = Number(draft.bedrooms);
    const bathrooms = Number(draft.bathrooms);
    const titleAr = draft.title.ar.trim();
    const titleEn = draft.title.en.trim();
    if (!titleAr && !titleEn) found.add("title");
    if (!Number.isInteger(price) || price <= 0) found.add("price");
    if (!(size > 0)) found.add("size");
    if (!Number.isInteger(bedrooms) || bedrooms < 0 || bedrooms > 20) found.add("bedrooms");
    if (!Number.isInteger(bathrooms) || bathrooms < 0 || bathrooms > 20) found.add("bathrooms");
    if (draft.photos.length === 0) found.add("photos");
    setErrors(found);
    if (found.size > 0) return;

    // an empty language copies the other one, so the site never shows a blank title
    const fill = (text: LocalizedText): LocalizedText => ({
      ar: text.ar.trim() || text.en.trim(),
      en: text.en.trim() || text.ar.trim(),
    });
    // keep the photo list order, the first photo is the cover
    const photos = propertyPhotos.map((photo) => photo.id).filter((id) => draft.photos.includes(id));
    const values = {
      title: fill(draft.title),
      description: fill(draft.description),
      purpose: draft.purpose,
      type: draft.type,
      area: draft.area,
      price,
      bedrooms,
      bathrooms,
      size,
      features: draft.features,
      photos,
      featured: draft.featured,
      status: draft.status,
    };
    const agentId = draft.agentId || undefined;
    if (property) {
      replaceProperty(property.id, { ...values, units: property.units, ...(agentId ? { agentId } : {}) });
    } else {
      addProperty({ ...values, units: [], ...(agentId ? { agentId } : {}) });
    }
    trackEdit("properties", config.slug, locale);
    onDone();
  }

  const errorText = (field: string, key: "price" | "size" | "bedrooms" | "bathrooms") =>
    errors.has(field) ? t(`propertyForm.errors.${key}`) : undefined;

  return (
    <form onSubmit={submit} noValidate>
      <Panel title={t(property ? "propertyForm.editTitle" : "propertyForm.addTitle")}>
        {errors.size > 0 ? <ErrorSummary text={t("propertyForm.errorSummary")} /> : null}
        {errors.has("title") ? <p className="font-semibold text-text">{t("propertyForm.errors.title")}</p> : null}
        <BilingualField
          id="property-title"
          label={t("propertyForm.name")}
          value={draft.title}
          onChange={(value) => set("title", value)}
          t={t}
        />
        <BilingualField
          id="property-description"
          label={t("propertyForm.description")}
          value={draft.description}
          onChange={(value) => set("description", value)}
          t={t}
          multiline
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {config.purposes.length > 1 ? (
            <SelectInput
              id="property-purpose"
              label={t("propertyForm.purpose")}
              value={draft.purpose}
              onChange={(event) => set("purpose", purposes.find((item) => item === event.target.value) ?? "sale")}
            >
              {config.purposes.map((purpose) => (
                <option key={purpose} value={purpose}>
                  {t(`purpose.${purpose}`)}
                </option>
              ))}
            </SelectInput>
          ) : null}
          <SelectInput
            id="property-type"
            label={t("propertyForm.type")}
            value={draft.type}
            onChange={(event) => set("type", config.types.find((item) => item === event.target.value) ?? draft.type)}
          >
            {config.types.map((type) => (
              <option key={type} value={type}>
                {t(`type.${type}`)}
              </option>
            ))}
          </SelectInput>
          <SelectInput
            id="property-area"
            label={t("propertyForm.area")}
            value={draft.area}
            onChange={(event) => set("area", event.target.value)}
          >
            {config.areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name[locale]}
              </option>
            ))}
          </SelectInput>
          <TextInput
            id="property-price"
            label={t(draft.purpose === "rent" ? "propertyForm.priceRent" : "propertyForm.price")}
            type="number"
            inputMode="numeric"
            min={1}
            value={draft.price}
            error={errorText("price", "price")}
            onChange={(event) => set("price", event.target.value)}
          />
          <TextInput
            id="property-bedrooms"
            label={t("propertyForm.bedrooms")}
            type="number"
            inputMode="numeric"
            min={0}
            value={draft.bedrooms}
            error={errorText("bedrooms", "bedrooms")}
            onChange={(event) => set("bedrooms", event.target.value)}
          />
          <TextInput
            id="property-bathrooms"
            label={t("propertyForm.bathrooms")}
            type="number"
            inputMode="numeric"
            min={0}
            value={draft.bathrooms}
            error={errorText("bathrooms", "bathrooms")}
            onChange={(event) => set("bathrooms", event.target.value)}
          />
          <TextInput
            id="property-size"
            label={t("propertyForm.size")}
            type="number"
            inputMode="numeric"
            min={1}
            value={draft.size}
            error={errorText("size", "size")}
            onChange={(event) => set("size", event.target.value)}
          />
          {config.unitsDriveStatus ? null : (
            <SelectInput
              id="property-status"
              label={t("propertyForm.status")}
              value={draft.status}
              onChange={(event) =>
                set("status", propertyStatuses.find((item) => item === event.target.value) ?? "available")
              }
            >
              {propertyStatuses.map((status) => (
                <option key={status} value={status}>
                  {t(`propertyStatus.${status}`)}
                </option>
              ))}
            </SelectInput>
          )}
          {agents.length > 0 ? (
            <SelectInput
              id="property-agent"
              label={t("propertyForm.agent")}
              value={draft.agentId}
              onChange={(event) => set("agentId", event.target.value)}
            >
              <option value="">{t("propertyForm.noAgent")}</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name[locale]}
                </option>
              ))}
            </SelectInput>
          ) : null}
        </div>

        <fieldset className="space-y-2">
          <legend className="text-sm font-bold text-text">{t("propertyForm.features")}</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {propertyFeatures.map((feature) => (
              <label key={feature} className="flex min-h-11 items-center gap-2 text-text">
                <input
                  type="checkbox"
                  className="size-5"
                  checked={draft.features.includes(feature)}
                  onChange={() => set("features", toggle(draft.features, feature))}
                />
                {t(`feature.${feature}`)}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-2">
          <legend className="text-sm font-bold text-text">{t("propertyForm.photos")}</legend>
          <p className="text-sm text-muted">{t("propertyForm.photosHint")}</p>
          {errors.has("photos") ? <p className="font-semibold text-text">{t("propertyForm.errors.photos")}</p> : null}
          <div className="grid gap-2 sm:grid-cols-2">
            {propertyPhotos.map((photo) => (
              <label key={photo.id} className="flex min-h-11 items-center gap-2 text-text">
                <input
                  type="checkbox"
                  className="size-5"
                  checked={draft.photos.includes(photo.id)}
                  onChange={() => set("photos", toggle(draft.photos, photo.id))}
                />
                {photo.alt[locale]}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="flex min-h-11 items-center gap-2 font-semibold text-text">
          <input
            type="checkbox"
            className="size-5"
            checked={draft.featured}
            onChange={(event) => set("featured", event.target.checked)}
          />
          {t("propertyForm.featured")}
        </label>

        <div className="flex flex-wrap gap-3">
          <Button type="submit">{t("propertyForm.save")}</Button>
          <Button variant="secondary" onClick={onDone}>
            {t("common.cancel")}
          </Button>
        </div>
      </Panel>
    </form>
  );
}
