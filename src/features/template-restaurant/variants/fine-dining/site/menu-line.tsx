import type { Locale } from "@/shared/i18n/config";
import { formatPrice } from "@/features/demo-engine/format/format";
import { getRestaurantT } from "../../../messages";
import type { MenuItem } from "../../../types";
import { getFineDiningT } from "../messages";
import { displayFont } from "./styles";

type Props = { item: MenuItem; currency: string; locale: Locale };

// One dish as the source menu line (.item): name, dotted leader, gold price, then the description and tags.
export function MenuLine({ item, currency, locale }: Props) {
  const t = getRestaurantT(locale);
  const site = getFineDiningT(locale);

  return (
    <article className="border-b border-dashed border-text/35 py-4">
      <div className="flex items-baseline gap-2.5">
        <h3 className={`${displayFont} text-[23px]`}>{item.name[locale]}</h3>
        <span aria-hidden="true" className="-translate-y-1 grow border-b border-dotted border-text/35" />
        <p className={`${displayFont} text-[22px] text-(--fd-accent)`}>
          {formatPrice(item.price, currency, locale)}
        </p>
      </div>
      <p className="text-sm leading-[1.5] opacity-70">{item.description[locale]}</p>
      <ul className="mt-2 flex flex-wrap gap-2 text-xs empty:hidden">
        {item.tags.map((tag) => (
          <li key={tag} className="border border-text/35 px-2 py-0.5">
            {t(`tags.${tag}`)}
          </li>
        ))}
        {!item.available ? (
          <li className="border border-text px-2 py-0.5 font-normal">{site("menu.unavailable")}</li>
        ) : null}
      </ul>
    </article>
  );
}
