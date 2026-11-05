"use client";

import Link from "next/link";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { buttonClasses } from "@/shared/ui/button-styles";
import { formatNumber, formatPrice } from "../../format";
import { getRestaurantT } from "../../messages";
import type { OrderingStore } from "./orders-store";
import { orderTotals } from "./totals";
import { useCartLines } from "./use-cart";

type Props = {
  store: OrderingStore;
  locale: Locale;
  menuHref: string;
  checkoutHref: string;
  // called when a link inside is followed, so a drawer can close
  onNavigate?: () => void;
};

// The items in the cart with quantity controls. Used in the cart drawer.
export function CartView({ store, locale, menuHref, checkoutHref, onNavigate }: Props) {
  const t = getRestaurantT(locale);
  const lines = useCartLines(store);
  const currency = store((state) => state.settings.currency);
  const setCartQty = store((state) => state.setCartQty);
  const clearCart = store((state) => state.clearCart);

  if (lines.length === 0) {
    return (
      <div className="space-y-4">
        <p className="text-muted">{t("cart.empty")}</p>
        <Link href={menuHref} onClick={onNavigate} className={buttonClasses("primary")}>
          {t("cart.goMenu")}
        </Link>
      </div>
    );
  }

  const { subtotal } = orderTotals(lines, "pickup", undefined);

  return (
    <div className="space-y-5">
      <ul className="divide-y divide-border">
        {lines.map((line) => {
          const name = line.name[locale];
          return (
            <li key={`${line.kind}:${line.refId}`} className="space-y-2 py-3">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-semibold">{name}</p>
                <p className="font-semibold">{formatPrice(line.price * line.qty, currency, locale)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  aria-label={t("cart.decrease", { name })}
                  onClick={() => setCartQty(line.kind, line.refId, line.qty - 1)}
                >
                  −
                </Button>
                <p className="min-w-8 text-center font-semibold">{formatNumber(line.qty, locale)}</p>
                <Button
                  variant="secondary"
                  aria-label={t("cart.increase", { name })}
                  onClick={() => setCartQty(line.kind, line.refId, line.qty + 1)}
                >
                  +
                </Button>
                <Button
                  variant="secondary"
                  className="ms-auto"
                  aria-label={t("cart.remove", { name })}
                  onClick={() => setCartQty(line.kind, line.refId, 0)}
                >
                  {t("cart.removeShort")}
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="flex justify-between text-lg font-bold">
        <span>{t("cart.subtotal")}</span>
        <span>{formatPrice(subtotal, currency, locale)}</span>
      </p>
      <p className="text-sm text-muted">{t("cart.feeNote")}</p>
      <div className="flex flex-wrap gap-3">
        <Link href={checkoutHref} onClick={onNavigate} className={buttonClasses("primary")}>
          {t("cart.checkout")}
        </Link>
        <Button variant="secondary" onClick={clearCart}>
          {t("cart.clear")}
        </Button>
      </div>
    </div>
  );
}
