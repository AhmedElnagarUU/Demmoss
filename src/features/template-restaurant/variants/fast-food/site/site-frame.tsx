"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
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
import { Icon, SunMark } from "./icons";
import { SiteFooter } from "./site-footer";
import { container, pillSolidCompact, scriptFont } from "./styles";
import "./animations.css";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const root = `/${locale}/demos/restaurant/fast-food`;

  // the green count badge pops like the source cart whenever something lands in the cart
  const [pop, setPop] = useState(false);
  const lastCount = useRef(count);
  useEffect(() => {
    if (count === lastCount.current) return;
    lastCount.current = count;
    setPop(true);
    const timer = setTimeout(() => setPop(false), 250);
    return () => clearTimeout(timer);
  }, [count]);

  useEffect(() => {
    track("demo_opened", { locale, template: FAST_FOOD_SLUG });
  }, [locale]);

  // nav link: 2px red underline that grows to full width on hover or on the current page
  const linkClass =
    "relative block py-1 after:absolute after:bottom-[-2px] after:start-0 after:h-[2px] after:w-0 after:bg-primary " +
    "after:transition-[width] after:duration-[250ms] hover:after:w-full aria-[current=page]:after:w-full " +
    "aria-[current=page]:text-(--sl-primary-text) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

  return (
    <div className="bg-bg font-(family-name:--sl-body) text-text">
      <DemoBanner
        store={useFastFoodStore}
        slug={FAST_FOOD_SLUG}
        templateName="Smash Lab"
        locale={locale}
        dashboardHref={`${root}/dashboard`}
      />
      <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className={`${container} relative flex h-[74px] items-center justify-between gap-5`}>
          <Link
            href={root}
            className={`flex items-center gap-2 ${scriptFont} text-[34px] leading-none text-primary max-sm:text-[28px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus`}
          >
            <SunMark className="size-[30px] text-(--sl-accent)" />
            {name}
          </Link>
          <nav aria-label={t("nav.label")} className="hidden lg:block">
            <ul className="flex gap-[30px] text-sm font-medium">
              {pages.map((page) => {
                const href = `${root}${page.path}`;
                return (
                  <li key={page.path}>
                    <Link
                      href={href}
                      aria-current={pathname === href ? "page" : undefined}
                      className={linkClass}
                    >
                      {t(page.key)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex items-center gap-2.5">
            <TrackedLanguageSwitch locale={locale} label={getT(locale)("common.switchLanguage")} />
            <button
              type="button"
              aria-label={t("header.cart", { count: formatNumber(count, locale) })}
              onClick={() => setCartOpen(true)}
              className="relative grid size-[42px] shrink-0 cursor-pointer place-items-center rounded-full border border-border bg-surface text-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <Icon name="cart" className="size-5" />
              <span
                aria-hidden="true"
                className={`absolute -end-1 -top-1 grid h-[19px] min-w-[19px] place-items-center rounded-full bg-(--sl-accent) px-1 text-[11px] font-semibold text-(--sl-on-accent) transition-transform duration-300 motion-reduce:transition-none ${pop ? "scale-150" : ""}`}
              >
                {formatNumber(count, locale)}
              </span>
            </button>
            <Link href={`${root}/menu`} className={pillSolidCompact}>
              {t("header.order")}
            </Link>
            <button
              type="button"
              aria-label={t("nav.label")}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="grid size-[42px] shrink-0 cursor-pointer place-items-center rounded-[10px] border border-border bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus lg:hidden"
            >
              <span aria-hidden="true" className="space-y-1">
                <span className="block h-[2px] w-5 bg-text" />
                <span className="block h-[2px] w-5 bg-text" />
                <span className="block h-[2px] w-5 bg-text" />
              </span>
            </button>
          </div>
          {menuOpen ? (
            <div className="absolute inset-x-0 top-[74px] border-b border-border bg-bg px-6 pb-[22px] pt-4 lg:hidden">
              <ul className="flex flex-col gap-3.5 text-sm font-medium">
                {pages.map((page) => (
                  <li key={page.path}>
                    <Link
                      href={`${root}${page.path}`}
                      onClick={() => setMenuOpen(false)}
                      className="inline-block py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                    >
                      {t(page.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </header>
      <main id="main">{children}</main>
      <SiteFooter locale={locale} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} locale={locale} root={root} />
    </div>
  );
}
