"use client";

import { useState } from "react";
import type { LocalizedText } from "@/features/demo-engine/types";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import {
  BilingualField,
  PageHeader,
  Panel,
  SelectInput,
  StatusBadge,
  TextInput,
} from "@/features/demo-engine/ui";
import { trackEdit } from "@/features/demo-engine/track-edit";
import { formatPrice } from "@/features/demo-engine/format/format";
import type { LibraryPhoto } from "../../images";
import { getRestaurantT } from "../../messages";
import type { OrderingStore } from "../orders/orders-store";
import type { NewOffer } from "./store-slice";
import type { Offer } from "./types";

type Props = { store: OrderingStore; slug: string; locale: Locale; photos: readonly LibraryPhoto[] };

const emptyText: LocalizedText = { ar: "", en: "" };

// Offers: the owner creates a deal; while it is active it shows on the home page and on top of the menu.
export function OffersPage({ store, slug, locale, photos }: Props) {
  const t = getRestaurantT(locale);
  const offers = store((state) => state.offers);
  const currency = store((state) => state.settings.currency);
  const addOffer = store((state) => state.addOffer);
  const updateOffer = store((state) => state.updateOffer);
  const setOfferActive = store((state) => state.setOfferActive);
  const removeOffer = store((state) => state.removeOffer);
  const [editing, setEditing] = useState("");
  const [adding, setAdding] = useState(false);

  const blank: NewOffer = {
    title: emptyText,
    description: emptyText,
    price: 0,
    image: photos[0]?.id ?? "",
    active: true,
  };

  return (
    <div className="space-y-6">
      <PageHeader title={t("offers.title")} intro={t("offers.intro")} />

      {adding ? (
        <Panel title={t("offers.newTitle")}>
          <OfferForm
            idPrefix="offer-new"
            initial={blank}
            photos={photos}
            locale={locale}
            onSave={(offer) => {
              addOffer(offer);
              trackEdit("offers", slug, locale);
              setAdding(false);
            }}
            onCancel={() => setAdding(false)}
          />
        </Panel>
      ) : (
        <Button onClick={() => setAdding(true)}>{t("offers.add")}</Button>
      )}

      {offers.length === 0 ? <p className="text-muted">{t("offers.empty")}</p> : null}

      <ul className="space-y-3">
        {offers.map((offer) => (
          <li key={offer.id} className="space-y-3 rounded-control border border-border bg-bg p-4">
            {editing === offer.id ? (
              <OfferForm
                idPrefix={`offer-${offer.id}`}
                initial={offer}
                photos={photos}
                locale={locale}
                onSave={(patch) => {
                  updateOffer(offer.id, patch);
                  trackEdit("offers", slug, locale);
                  setEditing("");
                }}
                onCancel={() => setEditing("")}
              />
            ) : (
              <OfferRow
                offer={offer}
                locale={locale}
                currency={currency}
                onEdit={() => setEditing(offer.id)}
                onToggle={() => {
                  setOfferActive(offer.id, !offer.active);
                  trackEdit("offers", slug, locale);
                }}
                onDelete={() => {
                  removeOffer(offer.id);
                  trackEdit("offers", slug, locale);
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

type RowProps = {
  offer: Offer;
  locale: Locale;
  currency: string;
  onEdit: () => void;
  onToggle: () => void;
  onDelete: () => void;
};

function OfferRow({ offer, locale, currency, onEdit, onToggle, onDelete }: RowProps) {
  const t = getRestaurantT(locale);
  const title = offer.title[locale];

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-bold">{title}</h2>
        <StatusBadge label={offer.active ? t("offers.activeBadge") : t("offers.inactiveBadge")} />
      </div>
      <p className="text-muted">{offer.description[locale]}</p>
      <p className="font-semibold">{formatPrice(offer.price, currency, locale)}</p>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" aria-label={`${t("common.edit")}: ${title}`} onClick={onEdit}>
          {t("common.edit")}
        </Button>
        <Button
          variant="secondary"
          aria-label={`${offer.active ? t("offers.turnOff") : t("offers.turnOn")}: ${title}`}
          onClick={onToggle}
        >
          {offer.active ? t("offers.turnOff") : t("offers.turnOn")}
        </Button>
        <Button variant="secondary" aria-label={`${t("common.delete")}: ${title}`} onClick={onDelete}>
          {t("common.delete")}
        </Button>
      </div>
    </>
  );
}

type FormProps = {
  idPrefix: string;
  initial: NewOffer;
  photos: readonly LibraryPhoto[];
  locale: Locale;
  onSave: (offer: NewOffer) => void;
  onCancel: () => void;
};

function OfferForm({ idPrefix, initial, photos, locale, onSave, onCancel }: FormProps) {
  const t = getRestaurantT(locale);
  const [draft, setDraft] = useState(initial);
  const [error, setError] = useState(false);

  function save() {
    const hasTitle = draft.title.ar.trim() !== "" || draft.title.en.trim() !== "";
    if (!hasTitle) {
      setError(true);
      return;
    }
    setError(false);
    onSave({ ...draft, price: Number.isFinite(draft.price) ? Math.max(0, draft.price) : 0 });
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        save();
      }}
      className="space-y-4"
    >
      <BilingualField
        id={`${idPrefix}-title`}
        label={t("offers.titleLabel")}
        value={draft.title}
        onChange={(title) => setDraft({ ...draft, title })}
        t={t}
      />
      <BilingualField
        id={`${idPrefix}-description`}
        label={t("offers.descriptionLabel")}
        value={draft.description}
        onChange={(description) => setDraft({ ...draft, description })}
        t={t}
        multiline
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextInput
          id={`${idPrefix}-price`}
          label={t("offers.price")}
          type="number"
          min={0}
          step="0.5"
          value={draft.price}
          onChange={(event) => setDraft({ ...draft, price: event.target.valueAsNumber })}
        />
        <SelectInput
          id={`${idPrefix}-image`}
          label={t("offers.image")}
          value={draft.image}
          onChange={(event) => setDraft({ ...draft, image: event.target.value })}
        >
          {photos.map((photo) => (
            <option key={photo.id} value={photo.id}>
              {photo.alt[locale]}
            </option>
          ))}
        </SelectInput>
      </div>
      <label className="flex items-center gap-2 text-sm font-semibold">
        <input
          type="checkbox"
          checked={draft.active}
          onChange={(event) => setDraft({ ...draft, active: event.target.checked })}
          className="size-5"
        />
        {t("offers.showOnSite")}
      </label>
      {error ? (
        <p role="alert" className="border-s-4 border-text ps-2 font-semibold">
          {t("offers.error")}
        </p>
      ) : null}
      <div className="flex gap-2">
        <Button type="submit">{t("common.save")}</Button>
        <Button variant="secondary" onClick={onCancel}>
          {t("common.cancel")}
        </Button>
      </div>
    </form>
  );
}
