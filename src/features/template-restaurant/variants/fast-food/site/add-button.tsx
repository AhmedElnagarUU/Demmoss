"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/shared/i18n/config";
import { getFastFoodT } from "../messages";
import { useFastFoodStore } from "../store";
import { addClass } from "./styles";

type Props = { kind: "item" | "offer"; refId: string; name: string; locale: Locale; available?: boolean };

// Adds one to the cart and says so for a moment ("Added"), also for screen readers.
export function AddButton({ kind, refId, name, locale, available = true }: Props) {
  const t = getFastFoodT(locale);
  const addToCart = useFastFoodStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 900);
    return () => clearTimeout(timer);
  }, [added]);

  if (!available) {
    return (
      <button type="button" disabled className={addClass}>
        {t("menu.unavailable")}
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        aria-label={t("menu.addLabel", { name })}
        onClick={() => {
          addToCart(kind, refId);
          setAdded(true);
        }}
        className={addClass}
      >
        {added ? t("menu.added") : t("menu.add")}
      </button>
      <span role="status" className="sr-only">
        {added ? t("menu.addedLabel", { name }) : ""}
      </span>
    </>
  );
}
