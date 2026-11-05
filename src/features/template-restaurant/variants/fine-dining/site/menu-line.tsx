import type { Locale } from "@/shared/i18n/config";
import { formatPrice } from "../../../format";
import { getRestaurantT } from "../../../messages";
import type { MenuItem } from "../../../types";
import { getFineDiningT } from "../messages";
import { displayFont } from "./styles";

type Props = { item: MenuItem; currency: string; locale: Locale };

// One dish as a menu line: name, dotted leader, price, then the description and tags.
export function MenuLine({ item, currency, locale }: Props) {
  const t = getRestaurantT(locale);
  const site = getFineDiningT(locale);

  return (
    <article className="border-b border-dashed border-border py-4">
      <div className="flex items-baseline gap-3">
        <h3 className={`${displayFont} text-2xl font-semibold`}>{item.name[locale]}</h3>
        <span aria-hidden="true" className="grow translate-y-[-4px] border-b border-dotted border-border" />
        <p className={`${displayFont} text-xl font-semibold text-(--fd-accent)`}>
          {formatPrice(item.price, currency, locale)}
        </p>
      </div>
      <p className="mt-1 text-muted">{item.description[locale]}</p>
      <ul className="mt-2 flex flex-wrap gap-2 text-sm empty:hidden">
        {item.tags.map((tag) => (
          <li key={tag} className="border border-border px-2 py-0.5 text-muted">
            {t(`tags.${tag}`)}
          </li>
        ))}
        {!item.available ? (
          <li className="border border-text px-2 py-0.5 font-semibold text-text">
            {site("menu.unavailable")}
          </li>
        ) : null}
      </ul>
    </article>
  );
}
