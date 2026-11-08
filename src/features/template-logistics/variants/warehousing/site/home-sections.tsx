"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Photo } from "@/features/demo-engine/photo/photo";
import type { Locale } from "@/shared/i18n/config";
import { QuoteForm } from "../../../components/quote-form";
import type { ServiceKey } from "../../../types";
import { getWarehousingT } from "../messages";
import { warehousingPhotos } from "../photos";
import { WAREHOUSING_ROOT, WAREHOUSING_SLUG } from "../slug";
import { useWarehousingStore } from "../store";
import { blockButton, sectionTitle } from "./styles";

const partners = ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9", "p10"] as const;
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
const storageKeys = ["p1", "p2", "p3", "p4"] as const;
const extras = ["extra1", "extra2", "extra3", "extra4", "extra5"] as const;
const processKeys = ["s1", "s2", "s3", "s4"] as const;
const statKeys = ["accuracy", "support", "space", "clients"] as const;
const storageServices = [
  "storage",
  "storage_picking",
  "full_3pl",
  "returns",
] as const satisfies readonly ServiceKey[];

const storageIcons = [
  <path key="1" d="M3 12l13-7 13 7v15H3zM8 27V16h16v11M8 20h16M8 24h16" />,
  <g key="2">
    <rect x="4" y="9" width="24" height="19" rx="2" />
    <path d="M4 9l3-5h18l3 5M16 4v5M12 18h8M16 14v8" />
  </g>,
  <path key="3" d="M7 3h12l6 6v20H7zM19 3v6h6M11 15h10M11 20h10M11 25h6" />,
  <g key="4">
    <path d="M8 4v24M16 4v24M24 4v24" />
    <circle cx="8" cy="11" r="3" />
    <circle cx="16" cy="21" r="3" />
    <circle cx="24" cy="9" r="3" />
  </g>,
];

const statIcons = [
  <path key="1" d="M16 3l11 6v14l-11 6-11-6V9zM5 9l11 6 11-6M16 15v14" />,
  <g key="2">
    <rect x="5" y="5" width="22" height="22" rx="3" />
    <circle cx="16" cy="16" r="6" />
    <path d="M16 12v4l3 2" />
  </g>,
  <path key="3" d="M4 28V12l12-8 12 8v16zM11 28V18h10v10" />,
  <g key="4">
    <circle cx="16" cy="16" r="3" />
    <circle cx="6" cy="7" r="2.5" />
    <circle cx="26" cy="7" r="2.5" />
    <circle cx="6" cy="25" r="2.5" />
    <circle cx="26" cy="25" r="2.5" />
    <path d="M8 9l6 5M24 9l-6 5M8 23l6-5M24 23l-6-5" />
  </g>,
];

export function LogoStrip({ locale }: { locale: Locale }) {
  const t = getWarehousingT(locale);
  const track = useRef<HTMLDivElement>(null);

  function move(direction: 1 | -1) {
    const node = track.current;
    if (!node) return;
    const rtl = window.getComputedStyle(node).direction === "rtl";
    node.scrollBy({ left: direction * 240 * (rtl ? -1 : 1), behavior: "smooth" });
  }

  return (
    <section className="px-4 pb-2.5 pt-16 sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="text-xs font-semibold text-text">{t("partners.title")}</p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label={t("partners.previous")}
              onClick={() => move(-1)}
              className="grid size-7 place-items-center rounded-full border border-border text-text transition-colors hover:border-primary hover:bg-primary hover:text-on-primary focus-visible:outline-2 focus-visible:outline-focus"
            >
              <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-3 rtl:rotate-180">
                <path
                  d="M10 3L5 8l5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              aria-label={t("partners.next")}
              onClick={() => move(1)}
              className="grid size-7 place-items-center rounded-full border border-border text-text transition-colors hover:border-primary hover:bg-primary hover:text-on-primary focus-visible:outline-2 focus-visible:outline-focus"
            >
              <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-3 rtl:rotate-180">
                <path
                  d="M6 3l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          ref={track}
          className="flex items-center gap-11 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {partners.map((key, index) => (
            <span
              key={key}
              className={`shrink-0 whitespace-nowrap text-lg text-text/80 transition-colors hover:text-(--lg-accent) ${
                index === 0
                  ? "font-bold"
                  : index === 1
                    ? "font-semibold italic"
                    : index === 3
                      ? "rounded border-2 border-text px-2 py-0.5 text-sm font-bold"
                      : index === 7
                        ? "rounded bg-text px-2 py-0.5 text-sm font-bold text-bg"
                        : index === 9
                          ? "font-bold"
                          : "font-medium"
              }`}
            >
              {t(`partners.${key}`)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Schedule({ locale }: { locale: Locale }) {
  const t = getWarehousingT(locale);
  // the site renders only after the demo data is loaded in the browser, so the visitor's day is safe to read here
  const [today] = useState(() => (new Date().getDay() + 6) % 7);

  return (
    <div className="w-full rounded-2xl bg-surface px-5 py-4 text-sm sm:w-[300px]">
      <ul>
        {days.map((day, index) => (
          <li
            key={day}
            aria-current={today === index ? "date" : undefined}
            className={`flex items-center justify-between gap-4 py-1 transition-colors ${
              today === index ? "font-semibold text-text" : "text-muted"
            }`}
          >
            <span>
              {t(`storage.day.${day}`)} {t(`storage.hours.${day}`)}
            </span>
            {today === index ? (
              <span className="grid size-[18px] place-items-center rounded-full bg-primary text-on-primary">
                <svg aria-hidden="true" viewBox="0 0 10 10" fill="none" className="size-2.5">
                  <path
                    d="M2 5.2l2 2 4-4.4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            ) : null}
          </li>
        ))}
      </ul>
      <p className="mt-3 border-t border-border pt-3 text-xs text-muted">{t("storage.scheduleTitle")}</p>
    </div>
  );
}

export function StorageSection({ locale }: { locale: Locale }) {
  const t = getWarehousingT(locale);
  const root = `/${locale}${WAREHOUSING_ROOT}`;

  return (
    <section id="storage" className="px-4 pb-12 pt-14 sm:px-6 sm:pb-[70px] sm:pt-[90px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-7">
          <div>
            <h2 className={sectionTitle}>
              {t("storage.title1")} <br />
              {t("storage.title2")}
            </h2>
            <Link href={`${root}/quote`} className={`${blockButton("primary")} mt-6`}>
              {t("hero.cta")}
              <span aria-hidden="true" className="text-lg leading-none">
                +
              </span>
            </Link>
          </div>
          <Schedule locale={locale} />
        </div>

        <ul className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {storageKeys.map((key, index) => (
            <li
              key={key}
              className="flex min-h-[170px] flex-col justify-between gap-6 rounded-2xl bg-surface p-5 transition-all hover:-translate-y-1 hover:bg-bg hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.3)] motion-reduce:hover:translate-y-0"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-8 text-(--lg-accent)"
              >
                {storageIcons[index]}
              </svg>
              <h3 className="text-sm font-semibold leading-snug text-text">{t(`storage.${key}`)}</h3>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center gap-2.5 text-xs">
          <b className="font-semibold text-text">{t("storage.extras")}</b>
          {extras.map((key) => (
            <span
              key={key}
              className="rounded-full border border-border px-4 py-1.5 transition-colors hover:border-primary hover:text-(--lg-accent)"
            >
              {t(`storage.${key}`)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ThreePlSection({ locale }: { locale: Locale }) {
  const t = getWarehousingT(locale);
  const root = `/${locale}${WAREHOUSING_ROOT}`;

  return (
    <section id="tpl" className="bg-surface px-4 pb-10 pt-[70px] sm:px-6">
      <div className="mx-auto grid max-w-[1200px] items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className={sectionTitle}>
            {t("process.title1")} <br />
            {t("process.title2")}
          </h2>
          <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl bg-bg">
            <Photo
              photo={warehousingPhotos.docks}
              locale={locale}
              widths={[480, 800, 1000]}
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
            {["01", "02", "03"].map((label, index) => (
              <span
                key={label}
                className={`absolute top-3 rounded bg-text px-3 py-1 text-xs font-semibold text-bg ${
                  index === 0 ? "start-[14%]" : index === 1 ? "start-[46%]" : "start-[77%]"
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="relative min-h-[400px] overflow-hidden rounded-2xl bg-bg p-7">
          <h3 className="mb-7 text-lg font-semibold text-text">{t("process.processTitle")}</h3>
          <ol className="relative ms-2 border-s border-primary/50 ps-7">
            {processKeys.map((key) => (
              <li
                key={key}
                className="relative mb-7 max-w-[230px] text-sm leading-relaxed text-text/80 last:mb-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute -start-[31px] top-1 size-2.5 rounded-full border-[1.5px] border-primary bg-bg last:bg-primary"
                />
                {t(`process.${key}`)}
              </li>
            ))}
          </ol>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -end-16 size-64 rounded-full bg-primary/20 blur-2xl"
          />
          <Link
            href={`${root}/quote`}
            aria-label={t("process.ctaLabel")}
            className="absolute bottom-6 end-6 z-10 grid size-12 place-items-center rounded-full bg-primary text-on-primary transition-transform hover:scale-110 hover:translate-x-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rtl:hover:-translate-x-1"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-4 rtl:rotate-180">
              <path
                d="M2 8h12M9 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function StatsSection({ locale }: { locale: Locale }) {
  const t = getWarehousingT(locale);
  return (
    <section aria-label={t("stats.accuracy.label")} className="bg-surface px-4 pb-[70px] sm:px-6">
      <dl className="mx-auto grid max-w-[1200px] gap-4 rounded-2xl bg-bg px-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {statKeys.map((key, index) => (
          <div
            key={key}
            className={`flex items-center gap-3.5 px-4 py-2 lg:border-s lg:border-border ${
              index === 0 ? "lg:border-s-0" : ""
            }`}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-8 shrink-0 text-(--lg-accent)"
            >
              {statIcons[index]}
            </svg>
            <div className="flex flex-col">
              <dt className="order-2 text-[11.5px] text-muted">{t(`stats.${key}.label`)}</dt>
              <dd className="order-1 text-[22px] font-semibold leading-tight text-text">
                {t(`stats.${key}.value`)}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}

function FaqList({ locale }: { locale: Locale }) {
  const faq = useWarehousingStore((state) => state.faq);
  return (
    <div>
      {faq.map((item, index) => (
        <details
          key={item.id}
          name="warehousing-faq"
          open={index === 0}
          className="group border-b border-border"
        >
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 py-5 text-[15px] font-semibold text-text focus-visible:outline-2 focus-visible:outline-focus [&::-webkit-details-marker]:hidden">
            {item.question[locale]}
            <span
              aria-hidden="true"
              className="grid size-7 shrink-0 place-items-center rounded-full border border-border text-base text-(--lg-accent) transition-all duration-300 group-open:rotate-45 group-open:border-primary group-open:bg-primary group-open:text-on-primary"
            >
              +
            </span>
          </summary>
          <p className="pb-5 text-[13.5px] text-muted">{item.answer[locale]}</p>
        </details>
      ))}
    </div>
  );
}

export function FaqSection({ locale }: { locale: Locale }) {
  const t = getWarehousingT(locale);
  return (
    <section id="faq" className="px-4 py-[70px] sm:px-6">
      <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <h2 className={sectionTitle}>{t("faq.title")}</h2>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{t("faq.text")}</p>
        </div>
        <div>
          <FaqList locale={locale} />
        </div>
      </div>
    </section>
  );
}

export function QuoteSection({ locale }: { locale: Locale }) {
  const t = getWarehousingT(locale);
  const name = useWarehousingStore((state) => state.settings.businessName[locale]);
  const settings = useWarehousingStore((state) => state.settings);
  const dashboardHref = `/${locale}${WAREHOUSING_ROOT}/dashboard/quotes`;

  return (
    <section id="quote" className="bg-surface px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-[1200px] gap-5 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-2xl bg-bg p-6 sm:p-8">
          <h2 className="text-3xl font-semibold tracking-[-0.02em] text-text rtl:tracking-normal">
            {t("quoteSection.title")}
          </h2>
          <p className="mt-2 text-sm text-muted">{t("quoteSection.intro")}</p>
          <div className="mt-6">
            <QuoteForm
              store={useWarehousingStore}
              slug={WAREHOUSING_SLUG}
              locale={locale}
              dashboardHref={dashboardHref}
              services={storageServices}
              defaultService="storage"
              estimate={null}
            />
          </div>
        </div>

        <div className="wh-map relative min-h-[420px] overflow-hidden rounded-2xl">
          <span
            aria-hidden="true"
            className="absolute start-[52%] top-[40%] size-11 -rotate-45 rounded-[50%_50%_50%_0] bg-primary shadow-[0_10px_20px_-6px_rgba(227,38,43,0.6)] after:absolute after:inset-1/4 after:rounded-full after:bg-white"
          />
          <span
            aria-hidden="true"
            className="absolute start-[24%] top-[64%] size-7 -rotate-45 rounded-[50%_50%_50%_0] bg-text after:absolute after:inset-1/4 after:rounded-full after:bg-white"
          />
          <div className="absolute inset-x-4 bottom-4 grid gap-1 rounded-xl bg-bg px-5 py-4 text-sm">
            <b className="text-[15px] font-semibold text-text">{t("quoteSection.mapName", { name })}</b>
            <span className="text-muted">{settings.address[locale]}</span>
            <span className="text-muted" dir="ltr">
              {settings.phone} · {t("quoteSection.email")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
