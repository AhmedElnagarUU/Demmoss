"use client";

import { useState } from "react";
import type { Locale } from "@/shared/i18n/config";
import { formatPrice } from "@/features/demo-engine/format/format";
import type { Offer } from "../../../modules/offers/types";
import type { MenuItem } from "../../../types";
import { AddButton } from "./add-button";
import { FastFoodPhoto } from "./fast-food-photo";
import { getFastFoodT } from "../messages";
import { Icon } from "./icons";
import { serifFont } from "./styles";

type Frame = { currency: string; locale: Locale };

// A dish card in the source's design: fixed 210px photo band, a red heart button on the photo,
// the name in the serif heading font, a red price and a green add pill. Hover lifts the card and zooms the photo.
function Card({
  image,
  name,
  price,
  action,
  locale,
  currency,
}: Frame & {
  image: string;
  name: string;
  price: number;
  action: React.ReactNode;
}) {
  const t = getFastFoodT(locale);
  const [favourite, setFavourite] = useState(false);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[20px] bg-surface shadow-(--sl-shadow) transition-transform duration-300 hover:-translate-y-1.5">
      <div className="h-[210px] overflow-hidden bg-bg">
        <FastFoodPhoto
          imageId={image}
          locale={locale}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
          className="transition-transform duration-500 group-hover:scale-[1.06]"
        />
      </div>
      <button
        type="button"
        aria-label={t("menu.favorite")}
        aria-pressed={favourite}
        onClick={() => setFavourite((on) => !on)}
        className="absolute end-[14px] top-[14px] grid size-11 cursor-pointer place-items-center rounded-full bg-primary text-on-primary transition-transform duration-200 hover:scale-[1.12] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        <Icon name="heart" filled={favourite} className="size-5" />
      </button>
      <div className="flex grow flex-col px-[22px] pt-[18px] pb-[22px]">
        <h3 className={`${serifFont} text-[19px]`}>{name}</h3>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <b className="text-xl font-bold text-(--sl-primary-text)">{formatPrice(price, currency, locale)}</b>
          {action}
        </div>
      </div>
    </article>
  );
}

export function ItemCard({ item, ...frame }: Frame & { item: MenuItem }) {
  return (
    <Card
      {...frame}
      image={item.image}
      name={item.name[frame.locale]}
      price={item.price}
      action={
        <AddButton
          kind="item"
          refId={item.id}
          name={item.name[frame.locale]}
          locale={frame.locale}
          available={item.available}
        />
      }
    />
  );
}

export function OfferCard({ offer, ...frame }: Frame & { offer: Offer }) {
  return (
    <Card
      {...frame}
      image={offer.image}
      name={offer.title[frame.locale]}
      price={offer.price}
      action={
        <AddButton kind="offer" refId={offer.id} name={offer.title[frame.locale]} locale={frame.locale} />
      }
    />
  );
}
