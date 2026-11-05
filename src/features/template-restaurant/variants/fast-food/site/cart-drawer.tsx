"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { getRestaurantT } from "../../../messages";
import { CartView } from "../../../modules/orders/cart-view";
import { useFastFoodStore } from "../store";

type Props = { open: boolean; onClose: () => void; locale: Locale; root: string };

// The cart slides in from the end side (right in English, left in Arabic). A native dialog gives focus handling and Esc.
export function CartDrawer({ open, onClose, locale, root }: Props) {
  const t = getRestaurantT(locale);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="cart-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      className="m-0 ms-auto h-dvh max-h-dvh w-full max-w-md bg-bg p-0 text-text backdrop:bg-black/50"
    >
      <div className="space-y-5 p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 id="cart-title" className="text-2xl font-bold">
            {t("cart.title")}
          </h2>
          <Button variant="secondary" onClick={onClose}>
            {t("cart.close")}
          </Button>
        </div>
        <CartView
          store={useFastFoodStore}
          locale={locale}
          menuHref={`${root}/menu`}
          checkoutHref={`${root}/checkout`}
          onNavigate={onClose}
        />
      </div>
    </dialog>
  );
}
