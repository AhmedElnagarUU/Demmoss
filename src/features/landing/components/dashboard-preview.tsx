import Link from "next/link";
import { publicEnv } from "@/shared/env";
import type { Locale } from "@/shared/i18n/config";
import { BrandMark } from "@/shared/ui/brand-mark";
import { landingT } from "../translate";
import { ArrowRightIcon, CategoryIcon, CheckIcon } from "./icons";

const navKeys = ["overview", "bookings", "orders", "customers", "content", "settings"] as const;
const weekCounts = [8, 12, 9, 14, 18, 22, 12];
const activities = [
  { key: "booking", icon: "restaurant", isNew: false },
  { key: "order", icon: "online-store", isNew: true },
  { key: "appointment", icon: "clinic", isNew: false },
  { key: "viewing", icon: "real-estate", isNew: true },
] as const;

function chartPoints(): { line: string; area: string } {
  const max = 24;
  const points = weekCounts.map((count, index) => {
    const x = (index / (weekCounts.length - 1)) * 300;
    const y = 90 - (count / max) * 80;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return { line: points.join(" "), area: `0,100 ${points.join(" ")} 300,100` };
}

function weekdayLabels(locale: Locale): string[] {
  const format = new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" });
  return weekCounts.map((_, index) => format.format(new Date(Date.UTC(2024, 0, 1 + index))));
}

// An example of the owner dashboard that comes with a "website + dashboard" product. Static, decorative, clearly labelled.
export function DashboardPreview({ locale }: { locale: Locale }) {
  const t = landingT(locale);
  const number = new Intl.NumberFormat(locale);
  const brand = publicEnv.NEXT_PUBLIC_BRAND_NAME;
  const chart = chartPoints();
  const days = weekdayLabels(locale);
  const kpis = [
    { label: t("dashboard.bookingsToday"), value: 12, accent: false },
    { label: t("dashboard.newOrders"), value: 8, accent: false },
    { label: t("dashboard.messages"), value: 5, accent: false },
    { label: t("dashboard.closed"), value: 23, accent: true },
  ];

  return (
    <div className="relative z-10 -mt-32 px-5 pb-4 sm:-mt-44 sm:px-8">
      <figure className="mx-auto max-w-[1100px]">
        <div className="studio-tilt-wrap relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[8%] -bottom-10 h-40 rounded-full bg-accent/20 blur-[90px]"
          />
          <div
            aria-hidden="true"
            className="studio-tilt relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-surface shadow-2xl shadow-black/70"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.07] bg-white/[0.03] px-4 py-3">
              <span className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
              </span>
              <span className="font-mono-label mx-auto truncate rounded-full border border-white/[0.07] bg-black/30 px-4 py-1 text-faint">
                {t("dashboard.url", { brand })}
              </span>
              <span className="w-10 sm:w-[3.25rem]" />
            </div>

            <div className="grid sm:grid-cols-[10.5rem_minmax(0,1fr)]">
              <div className="hidden flex-col gap-1 border-e border-white/[0.07] p-4 sm:flex">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-text">
                  <BrandMark className="size-5" />
                  <span className="truncate">{brand}</span>
                </div>
                {navKeys.map((key, index) => (
                  <span
                    key={key}
                    className={`rounded-lg px-3 py-2 text-xs ${
                      index === 0 ? "bg-white/[0.08] text-text" : "text-muted"
                    }`}
                  >
                    {t(`dashboard.nav.${key}`)}
                  </span>
                ))}
              </div>

              <div className="min-w-0 p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <p className="text-lg font-medium text-text">{t("dashboard.today")}</p>
                  <span className="font-mono-label inline-flex items-center gap-1.5 rounded-full border border-accent/40 px-2.5 py-1 text-accent">
                    <span className="size-1.5 rounded-full bg-accent" />
                    {t("dashboard.live")}
                  </span>
                  <span className="ms-auto rounded-full border border-white/10 px-3 py-1 text-[11px] text-muted">
                    {t("dashboard.langAr")} / {t("dashboard.langEn")}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {kpis.map((kpi) => (
                    <div key={kpi.label} className="studio-inset min-w-0 p-3 sm:p-4">
                      <p className="truncate text-[11px] text-muted">{kpi.label}</p>
                      <p
                        className={`mt-2 text-3xl font-light tracking-tight rtl:tracking-normal ${
                          kpi.accent ? "text-accent" : "text-text"
                        }`}
                      >
                        {number.format(kpi.value)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
                  <div className="studio-inset p-4">
                    <p className="text-xs text-muted">{t("dashboard.chartTitle")}</p>
                    <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="mt-3 h-24 w-full">
                      <defs>
                        <linearGradient id="dash-area" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0.35" />
                          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <polygon points={chart.area} fill="url(#dash-area)" />
                      <polyline
                        points={chart.line}
                        fill="none"
                        stroke="var(--color-accent)"
                        strokeWidth="2"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                    <div className="mt-2 flex justify-between text-[10px] text-faint">
                      {days.map((day, index) => (
                        <span key={index}>{day}</span>
                      ))}
                    </div>
                  </div>

                  <div className="studio-inset p-4">
                    <p className="text-xs text-muted">{t("dashboard.activityTitle")}</p>
                    <ul className="mt-3 flex flex-col gap-2.5">
                      {activities.map((activity) => (
                        <li key={activity.key} className="flex items-center gap-3">
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-white/10 text-muted">
                            <CategoryIcon slug={activity.icon} className="size-3.5" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-xs text-text">
                              {t(`dashboard.activity.${activity.key}.title`)}
                            </span>
                            <span className="block truncate text-[10px] text-faint">
                              {t(`dashboard.activity.${activity.key}.source`)} ·{" "}
                              {t(`dashboard.activity.${activity.key}.time`)}
                            </span>
                          </span>
                          <span
                            className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] ${
                              activity.isNew ? "border-accent/40 text-accent" : "border-white/10 text-muted"
                            }`}
                          >
                            {t(`dashboard.activity.${activity.key}.status`)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute -bottom-6 end-3 z-10 flex items-center gap-3 rounded-2xl border border-white/10 bg-surface/95 p-3 pe-5 shadow-2xl shadow-black/60 backdrop-blur-xl sm:-end-6 sm:bottom-10"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-whatsapp text-accent">
              <CheckIcon className="size-4" />
            </span>
            <span>
              <span className="block text-xs font-medium text-text">
                {t("dashboard.toast.title")} — {t("dashboard.toast.text")}
              </span>
              <span className="block text-[10px] text-faint">{t("dashboard.toast.meta")}</span>
            </span>
          </div>
        </div>

        <figcaption className="mt-12 flex flex-wrap items-center justify-center gap-x-2 text-center text-xs text-faint">
          <span>{t("dashboard.caption")} —</span>
          <Link
            href={`/${locale}/demos`}
            className="inline-flex items-center gap-1.5 rounded text-text underline decoration-white/30 underline-offset-4 hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            {t("dashboard.link")}
            <ArrowRightIcon className="size-3" />
          </Link>
        </figcaption>
      </figure>
    </div>
  );
}
