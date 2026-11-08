"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Photo } from "@/features/demo-engine/photo/photo";
import type { Locale } from "@/shared/i18n/config";
import { getWarehousingT } from "../messages";
import { warehousingPhotos } from "../photos";
import { WAREHOUSING_ROOT } from "../slug";
import { useWarehousingStore } from "../store";
import { blockButton } from "./styles";

const steps = ["storage", "picking", "delivery"] as const;

export function HeroSection({ locale }: { locale: Locale }) {
  const t = getWarehousingT(locale);
  const content = useWarehousingStore((state) => state.content);
  const root = `/${locale}${WAREHOUSING_ROOT}`;
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setStep((current) => (current + 1) % steps.length), 2600);
    return () => window.clearInterval(timer);
  }, []);

  const highlights = [t("hero.highlight1"), t("hero.highlight2")];
  const titleParts = content.hero.title[locale].split(new RegExp(`(${highlights.join("|")})`));

  return (
    <section className="relative pt-5">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="relative flex flex-col sm:block sm:min-h-[520px]">
          <div className="relative order-2 mt-2.5 h-[280px] overflow-hidden rounded-2xl bg-surface sm:absolute sm:end-[-24px] sm:top-0 sm:mt-0 sm:h-full sm:w-[80%] lg:w-[68%]">
            <Photo
              photo={warehousingPhotos.exterior}
              locale={locale}
              priority
              widths={[480, 800, 1200]}
              sizes="(min-width: 1024px) 68vw, 100vw"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-bg)_0%,transparent_30%)] sm:bg-[linear-gradient(90deg,var(--color-bg)_0%,color-mix(in_srgb,var(--color-bg)_75%,transparent)_18%,transparent_55%)] sm:rtl:bg-[linear-gradient(270deg,var(--color-bg)_0%,color-mix(in_srgb,var(--color-bg)_75%,transparent)_18%,transparent_55%)]"
            />

            <div className="wh-bob absolute bottom-16 end-3 rounded-xl bg-bg px-4 py-3 text-center text-xs font-semibold text-text shadow-[0_14px_40px_-14px_rgba(0,0,0,0.25)] sm:bottom-auto sm:top-10">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-1.5 size-5 text-(--lg-accent)"
              >
                <path d="M3 10l9-6 9 6v10H3zM8 20v-6h8v6" />
              </svg>
              {t("hero.floatTitle")}
              <small className="mt-0.5 block text-[10.5px] font-normal text-muted">
                {t("hero.floatSubtitle")}
              </small>
            </div>

            <Link
              href={`${root}/quote`}
              className="absolute bottom-3 end-3 rounded-xl bg-bg/90 px-3 py-2 text-center text-xs font-semibold text-text sm:bottom-auto sm:top-48"
            >
              <span className="wh-pulse relative mx-auto mb-1.5 grid size-14 place-items-center rounded-full bg-primary text-on-primary">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                </svg>
              </span>
              {t("hero.phone")}
            </Link>
          </div>

          <div className="relative z-10 order-1 pt-5 sm:max-w-[470px] sm:pt-12">
            <h1 className="text-[clamp(34px,4.6vw,54px)] font-semibold leading-[1.1] tracking-[-0.02em] text-text rtl:tracking-normal">
              {titleParts.map((part, index) =>
                highlights.includes(part) ? (
                  <span key={index} className="text-(--lg-accent)">
                    {part}
                  </span>
                ) : (
                  part
                ),
              )}
            </h1>
            <p className="mt-5 max-w-[300px] text-sm leading-relaxed text-text/80">
              {content.hero.subtitle[locale]}
            </p>
            <Link href={`${root}/quote`} className={`${blockButton("primary")} mt-7`}>
              {t("hero.cta")}
              <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="size-3.5 rtl:rotate-180">
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

        <div className="relative z-10 mt-4 grid gap-3.5 sm:-mt-[90px] sm:grid-cols-2 lg:grid-cols-[1fr_1.15fr_1.4fr]">
          <div className="flex flex-col justify-between rounded-2xl border border-text bg-text p-5 text-bg shadow-[0_10px_40px_-18px_rgba(0,0,0,0.22)]">
            <div>
              <p className="text-5xl font-medium leading-none">{t("hero.years")}</p>
              <p className="mt-2 text-sm opacity-80">{t("hero.yearsText")}</p>
            </div>
            <p className="mt-8 text-[11.5px] opacity-60">
              <span aria-hidden="true" className="me-1.5 text-primary">
                •
              </span>
              {t("hero.yearsNote")}
            </p>
          </div>

          <div className="flex min-h-[176px] flex-col justify-between rounded-2xl border border-border bg-bg p-5 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.18)]">
            <div className="flex items-start justify-between gap-3">
              <h2 className="max-w-[12rem] text-[15px] font-semibold leading-tight text-text">
                {t("hero.standardsTitle")}
              </h2>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6 shrink-0 text-(--lg-accent)"
              >
                <circle cx="12" cy="9" r="5.5" />
                <path d="M9 14l-1.5 7 4.5-2.5 4.5 2.5L15 14M10 9l1.5 1.5L14.5 7.5" />
              </svg>
            </div>
            <p className="text-[11px] font-medium text-text/70">{t("hero.standardsList")}</p>
          </div>

          <div className="relative grid gap-2 overflow-hidden rounded-2xl border border-border bg-bg p-5 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.18)] grid-cols-[1fr_100px] sm:col-span-2 sm:grid-cols-[1fr_120px] lg:col-span-1">
            <div>
              <div className="mb-8 flex flex-wrap items-center">
                {steps.map((key, index) => (
                  <span key={key} className="flex items-center">
                    {index > 0 ? (
                      <span
                        aria-hidden="true"
                        className={`mx-2 h-px min-w-3 flex-1 ${step >= index ? "bg-primary" : "bg-border"}`}
                      />
                    ) : null}
                    <button
                      type="button"
                      aria-pressed={step === index}
                      onClick={() => setStep(index)}
                      className={`whitespace-nowrap py-0.5 text-[11.5px] font-semibold transition-colors ${
                        step === index ? "text-(--lg-accent)" : "text-muted"
                      }`}
                    >
                      {t(`hero.steps.${key}`)}
                    </button>
                  </span>
                ))}
              </div>
              <p className="min-h-9 text-xs leading-relaxed text-text/75">
                {t(`hero.stepTexts.${steps[step] ?? "storage"}`)}
              </p>
            </div>
            <div className="relative h-28 overflow-hidden rounded-xl bg-surface lg:h-auto lg:max-h-[150px]">
              <Photo photo={warehousingPhotos.boxes} locale={locale} widths={[240, 400]} sizes="120px" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
