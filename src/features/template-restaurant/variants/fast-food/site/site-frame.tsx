"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { DemoBanner } from "@/features/demo-engine/banner/demo-banner";
import { getEngineT } from "@/features/demo-engine/messages";
import { HydrationGate } from "@/features/demo-engine/storage/hydration-gate";
import { track } from "@/features/tracking/client/track";
import { TrackedLanguageSwitch } from "@/features/tracking/components/tracked-language-switch";
import type { Locale } from "@/shared/i18n/config";
import { getT } from "@/shared/i18n/t";
import { businessNameOf } from "@/features/demo-engine/fake-auth/business-name";
import { formatNumber } from "@/features/demo-engine/format/format";
import { cartCount, useCartLines } from "../../../modules/orders/use-cart";
import { PaletteScope } from "@/features/demo-engine/palettes/palette-scope";
import { fastFoodFonts } from "../fonts";
import { getFastFoodT } from "../messages";
import { fastFoodPalettes } from "../palettes";
import { FAST_FOOD_SLUG } from "../slug";
import { useFastFoodStore } from "../store";
import { CartDrawer } from "./cart-drawer";
import { Icon } from "./icons";
import { SiteFooter } from "./site-footer";
import { displayFont, pillSolid } from "./styles";

type Props = { locale: Locale; children: ReactNode };

// Fonts + palette + loaded demo data + banner + header (with the cart) and footer around every public page of Smash Lab.
export function SiteFrame({ locale, children }: Props) {
  return (
    <div className={fastFoodFonts.className} style={fastFoodFonts.style}>
      <PaletteScope store={useFastFoodStore} palettes={fastFoodPalettes}>
        <HydrationGate store={useFastFoodStore} loadingLabel={getEngineT(locale)("loading")}>
          <Chrome locale={locale}>{children}</Chrome>
        </HydrationGate>
      </PaletteScope>
    </div>
  );
}

const pages = [
  { path: "", key: "nav.home" },
  { path: "/menu", key: "nav.menu" },
  { path: "/contact", key: "nav.contact" },
] as const;

function Chrome({ locale, children }: Props) {
  const t = getFastFoodT(locale);
  const pathname = usePathname();
  const name = useFastFoodStore((state) => businessNameOf(state, locale));
  const count = cartCount(useCartLines(useFastFoodStore));
  const [cartOpen, setCartOpen] = useState(false);
  const root = `/${locale}/demos/restaurant/fast-food`;

  useEffect(() => {
    track("demo_opened", { locale, template: FAST_FOOD_SLUG });
  }, [locale]);

  return (
    <div className="bg-bg font-(family-name:--sl-body) text-text">
      <DemoBanner
        store={useFastFoodStore}
        slug={FAST_FOOD_SLUG}
        templateName="Smash Lab"
        locale={locale}
        dashboardHref={`${root}/dashboard`}
      />
      <header className="sticky top-0 z-30 border-b border-border bg-bg/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
          <Link
            href={root}
            className={`${displayFont} text-4xl leading-none text-primary focus-visible:outline-2 focus-visible:outline-focus`}
          >
            {name}
          </Link>
          <nav aria-label={t("nav.label")}>
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium">
              {pages.map((page) => {
                const href = `${root}${page.path}`;
                return (
                  <li key={page.path}>
                    <Link
                      href={href}
                      aria-current={pathname === href ? "page" : undefined}
                      className="inline-block py-2 hover:text-primary aria-[current=page]:border-b-2 aria-[current=page]:border-primary aria-[current=page]:text-primary focus-visible:outline-2 focus-visible:outline-focus"
                    >
                      {t(page.key)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <TrackedLanguageSwitch locale={locale} label={getT(locale)("common.switchLanguage")} />
            <button
              type="button"
              aria-label={t("header.cart", { count: formatNumber(count, locale) })}
              onClick={() => setCartOpen(true)}
              className="relative flex size-11 items-center justify-center rounded-full border border-border bg-surface text-text focus-visible:outline-2 focus-visible:outline-focus"
            >
              <Icon name="cart" />
              <span
                aria-hidden="true"
                className="absolute -end-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-on-primary"
              >
                {formatNumber(count, locale)}
              </span>
            </button>
            <Link href={`${root}/menu`} className={pillSolid}>
              {t("header.order")}
            </Link>
          </div>
        </div>
      </header>
      <main id="main">{children}</main>
      <SiteFooter locale={locale} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} locale={locale} root={root} />
    </div>
  );
}
