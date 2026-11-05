"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/shared/i18n/config";
import { formatPrice } from "../../../format";
import { getRestaurantT } from "../../../messages";
import type { Offer } from "../../../modules/offers/types";
import type { MenuItem } from "../../../types";
import { AddButton } from "./add-button";
import { FastFoodPhoto } from "./fast-food-photo";
import { displayFont } from "./styles";

type Frame = { currency: string; locale: Locale };

function Card({
  image,
  name,
  description,
  price,
  tags,
  action,
  locale,
  currency,
}: Frame & {
  image: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  action: ReactNode;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-bg shadow-sm">
      <div className="aspect-[4/3] overflow-hidden bg-surface">
        <FastFoodPhoto
          imageId={image}
          locale={locale}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
        />
      </div>
      <div className="flex grow flex-col gap-2 p-5">
        <h3 className={`${displayFont} text-3xl leading-none`}>{name}</h3>
        <p className="grow text-muted">{description}</p>
        {tags.length > 0 ? (
          <ul className="flex flex-wrap gap-2 text-xs">
            {tags.map((tag) => (
              <li key={tag} className="rounded-full border border-border px-2 py-0.5 text-muted">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="flex items-center justify-between gap-3 pt-2">
          <p className="text-xl font-bold text-primary">{formatPrice(price, currency, locale)}</p>
          {action}
        </div>
      </div>
    </article>
  );
}

export function ItemCard({ item, ...frame }: Frame & { item: MenuItem }) {
  const t = getRestaurantT(frame.locale);
  return (
    <Card
      {...frame}
      image={item.image}
      name={item.name[frame.locale]}
      description={item.description[frame.locale]}
      price={item.price}
      tags={item.tags.map((tag) => t(`tags.${tag}`))}
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
      description={offer.description[frame.locale]}
      price={offer.price}
      tags={[]}
      action={
        <AddButton kind="offer" refId={offer.id} name={offer.title[frame.locale]} locale={frame.locale} />
      }
    />
  );
}
