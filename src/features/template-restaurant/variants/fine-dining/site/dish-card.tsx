import type { Locale } from "@/shared/i18n/config";
import { formatPrice } from "../../../format";
import { getRestaurantT } from "../../../messages";
import { RestaurantImage } from "../../../restaurant-image";
import type { MenuItem } from "../../../types";
import { getFineDiningT } from "../messages";

type Props = { item: MenuItem; currency: string; locale: Locale; withImage?: boolean };

export function DishCard({ item, currency, locale, withImage = true }: Props) {
  const t = getRestaurantT(locale);
  const site = getFineDiningT(locale);

  return (
    <article className={`flex h-full flex-col overflow-hidden rounded-control border border-border bg-bg`}>
      {withImage ? (
        <div className="aspect-[4/3] overflow-hidden bg-surface">
          <RestaurantImage imageId={item.image} locale={locale} />
        </div>
      ) : null}
      <div className="flex grow flex-col gap-2 p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-xl font-bold">{item.name[locale]}</h3>
          <p className="font-sans text-lg font-semibold text-(--fd-accent)">
            {formatPrice(item.price, currency, locale)}
          </p>
        </div>
        <p className="text-muted">{item.description[locale]}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-2 font-sans text-sm">
          {item.tags.map((tag) => (
            <li key={tag} className="rounded-control border border-border px-2 py-0.5 text-muted">
              {t(`tags.${tag}`)}
            </li>
          ))}
          {!item.available ? (
            <li className="rounded-control border border-text px-2 py-0.5 font-semibold text-text">
              {site("menu.unavailable")}
            </li>
          ) : null}
        </ul>
      </div>
    </article>
  );
}
