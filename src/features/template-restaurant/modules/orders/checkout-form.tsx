"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { track } from "@/features/tracking/client/track";
import type { Locale } from "@/shared/i18n/config";
import { Button } from "@/shared/ui/button";
import { buttonClasses } from "@/shared/ui/button-styles";
import { SelectInput, TextArea, TextInput } from "@/features/demo-engine/ui";
import { formatNumber, formatPrice, formatTime, weekdayName } from "@/features/demo-engine/format/format";
import { getRestaurantT } from "../../messages";
import { addDays } from "@/features/demo-engine/format/dates";
import { nextOpening } from "./opening";
import type { OrderingStore } from "./orders-store";
import {
  minimumShortfall,
  orderTotals,
  validateCheckout,
  type CheckoutErrors,
  type CheckoutInput,
} from "./totals";
import { useCartLines } from "./use-cart";
import { orderTypes, paymentMethods, type OrderType, type PaymentMethod } from "./types";

type Props = {
  store: OrderingStore;
  slug: string;
  locale: Locale;
  menuHref: string;
  // where the customer lands after ordering: the live status page of the new order
  statusHref: (orderId: string) => string;
};

const pill =
  "flex min-h-11 cursor-pointer items-center rounded-control border border-border bg-bg px-4 font-semibold " +
  "has-[:checked]:bg-primary has-[:checked]:text-on-primary has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-focus";

// The public checkout: pickup or delivery, no sign-up. A delivery needs an area (fee and minimum order apply).
export function CheckoutForm({ store, slug, locale, menuHref, statusHref }: Props) {
  const t = getRestaurantT(locale);
  const router = useRouter();
  const lines = useCartLines(store);
  const areas = store((state) => state.areas);
  const hours = store((state) => state.settings.hours);
  const currency = store((state) => state.settings.currency);
  const placeOrder = store((state) => state.placeOrder);

  const [now] = useState(() => new Date());
  const [input, setInput] = useState<CheckoutInput>({
    type: "pickup",
    areaId: "",
    address: "",
    name: "",
    phone: "",
    payment: "cash",
    note: "",
  });
  const [errors, setErrors] = useState<CheckoutErrors>({});

  const area = areas.find((candidate) => candidate.id === input.areaId);
  const totals = orderTotals(lines, input.type, area);
  const shortfall = minimumShortfall(totals.subtotal, input.type, area);
  const opening = nextOpening(hours, now);

  function change(patch: Partial<CheckoutInput>) {
    setInput((current) => ({ ...current, ...patch }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const found = validateCheckout(input, { lines, areas });
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const orderId = placeOrder(input);
    if (!orderId) return;
    track("demo_action", { locale, template: slug, meta: { kind: "order" } });
    router.push(statusHref(orderId));
  }

  if (lines.length === 0) {
    return (
      <div className="space-y-4">
        <p className="text-lg">{t("checkout.emptyCart")}</p>
        <Link href={menuHref} className={buttonClasses("primary")}>
          {t("cart.goMenu")}
        </Link>
      </div>
    );
  }

  const fieldError = (key: keyof CheckoutErrors) =>
    errors[key] ? (
      <p className="border-s-4 border-text ps-2 text-sm font-semibold text-text">
        {t(`checkout.errors.${key}`)}
      </p>
    ) : null;

  return (
    <form onSubmit={submit} noValidate className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-6">
        {opening ? (
          <p role="status" className="rounded-control border border-border bg-surface p-4 font-semibold">
            {opening.inDays === 0
              ? t("checkout.closedToday", { time: formatTime(opening.time, locale) })
              : t("checkout.closedLater", {
                  day: weekdayName(addDays(now, opening.inDays).getDay(), locale),
                  time: formatTime(opening.time, locale),
                })}
          </p>
        ) : null}

        {Object.keys(errors).length > 0 ? (
          <p role="alert" className="border-s-4 border-text ps-2 font-semibold text-text">
            {t("checkout.errorSummary")}
          </p>
        ) : null}

        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold">{t("checkout.typeLegend")}</legend>
          <div className="flex flex-wrap gap-2">
            {orderTypes.map((type: OrderType) => (
              <label key={type} className={pill}>
                <input
                  type="radio"
                  name="order-type"
                  value={type}
                  checked={input.type === type}
                  onChange={() => change({ type })}
                  className="sr-only"
                />
                {t(`orderTypes.${type}`)}
              </label>
            ))}
          </div>
        </fieldset>

        {input.type === "delivery" ? (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <SelectInput
                id="checkout-area"
                label={t("checkout.area")}
                value={input.areaId}
                aria-invalid={errors.area ? true : undefined}
                onChange={(event) => change({ areaId: event.target.value })}
              >
                <option value="">{t("checkout.chooseArea")}</option>
                {areas.map((item) => (
                  <option key={item.id} value={item.id}>
                    {t("checkout.areaOption", {
                      name: item.name[locale],
                      fee: formatPrice(item.fee, currency, locale),
                    })}
                  </option>
                ))}
              </SelectInput>
              {fieldError("area")}
            </div>
            <div className="space-y-1.5">
              <TextArea
                id="checkout-address"
                label={t("checkout.address")}
                autoComplete="street-address"
                value={input.address}
                maxLength={200}
                aria-invalid={errors.address ? true : undefined}
                onChange={(event) => change({ address: event.target.value })}
              />
              {fieldError("address")}
            </div>
            {area && shortfall > 0 ? (
              <p className="border-s-4 border-text ps-2 font-semibold">
                {t("checkout.minOrder", {
                  area: area.name[locale],
                  minimum: formatPrice(area.minOrder, currency, locale),
                  missing: formatPrice(shortfall, currency, locale),
                })}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <TextInput
              id="checkout-name"
              label={t("checkout.name")}
              autoComplete="name"
              value={input.name}
              aria-invalid={errors.name ? true : undefined}
              onChange={(event) => change({ name: event.target.value })}
            />
            {fieldError("name")}
          </div>
          <div className="space-y-1.5">
            <TextInput
              id="checkout-phone"
              label={t("checkout.phone")}
              type="tel"
              dir="ltr"
              autoComplete="tel"
              value={input.phone}
              aria-invalid={errors.phone ? true : undefined}
              onChange={(event) => change({ phone: event.target.value })}
            />
            {fieldError("phone")}
          </div>
        </div>

        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold">
            {input.type === "delivery" ? t("checkout.payDelivery") : t("checkout.payPickup")}
          </legend>
          <div className="flex flex-wrap gap-2">
            {paymentMethods.map((payment: PaymentMethod) => (
              <label key={payment} className={pill}>
                <input
                  type="radio"
                  name="payment"
                  value={payment}
                  checked={input.payment === payment}
                  onChange={() => change({ payment })}
                  className="sr-only"
                />
                {t(`payments.${payment}`)}
              </label>
            ))}
          </div>
        </fieldset>

        <TextArea
          id="checkout-note"
          label={t("checkout.note")}
          value={input.note}
          maxLength={300}
          onChange={(event) => change({ note: event.target.value })}
        />
      </div>

      <aside
        aria-labelledby="checkout-summary"
        className="h-fit space-y-4 rounded-control border border-border bg-surface p-5"
      >
        <h2 id="checkout-summary" className="text-xl font-bold">
          {t("checkout.summary")}
        </h2>
        <ul className="divide-y divide-border">
          {lines.map((line) => (
            <li key={`${line.kind}:${line.refId}`} className="flex justify-between gap-3 py-2">
              <span>
                {formatNumber(line.qty, locale)} × {line.name[locale]}
              </span>
              <span>{formatPrice(line.price * line.qty, currency, locale)}</span>
            </li>
          ))}
        </ul>
        <dl className="space-y-1">
          <div className="flex justify-between">
            <dt>{t("checkout.subtotal")}</dt>
            <dd>{formatPrice(totals.subtotal, currency, locale)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>{t("checkout.deliveryFee")}</dt>
            <dd>
              {input.type === "delivery" && area
                ? formatPrice(totals.deliveryFee, currency, locale)
                : t("checkout.noFee")}
            </dd>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <dt>{t("checkout.total")}</dt>
            <dd>{formatPrice(totals.total, currency, locale)}</dd>
          </div>
        </dl>
        <Button type="submit" className="w-full">
          {t("checkout.submit")}
        </Button>
      </aside>
    </form>
  );
}
