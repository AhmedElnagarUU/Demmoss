import type { ReactNode } from "react";
import type { Locale } from "@/shared/i18n/config";
import { landingT } from "../translate";
import { Section } from "./section";

const weekdayValues = [18, 26, 22, 34, 42, 30, 24];
const highlightedDay = 4;
const maxValue = 48;
const notifications = [
  { kind: "booking", time: "first" },
  { kind: "order", time: "second" },
  { kind: "message", time: "third" },
] as const;
const donutRadius = 70;
const donutLength = 2 * Math.PI * donutRadius;

const iconProps = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "size-5",
} as const;

const orbitTiles = [
  { x: 34, y: 88, path: "M5 8h14M5 12h14M5 16h8" },
  { x: 90, y: 22, path: "M7 12h10M12 7v10" },
  { x: 270, y: 22, path: "M12 4a6 6 0 0 1 6 6c0 4-6 10-6 10S6 14 6 10a6 6 0 0 1 6-6Z" },
  { x: 326, y: 88, path: "M4 7h16v10H4zM4 11h16" },
  { x: 90, y: 154, path: "M12 4l2.4 5 5.6.7-4.1 3.8 1.1 5.5L12 16.4 7 19l1.1-5.5L4 9.7 9.6 9z" },
  {
    x: 270,
    y: 154,
    path: "M4 12a8 8 0 1 0 16 0 8 8 0 0 0-16 0ZM4 12h16M12 4c2.5 2.5 2.5 13.5 0 16M12 4c-2.5 2.5-2.5 13.5 0 16",
  },
] as const;

const flowNodes = [
  "M3 5h18v12H3zM8 21h8",
  "M4 5h7v7H4zM13 5h7v4h-7zM13 11h7v8h-7zM4 14h7v5H4z",
  "M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z",
] as const;

function weekdayLabels(locale: Locale): string[] {
  const format = new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" });
  return weekdayValues.map((_, index) => format.format(new Date(Date.UTC(2024, 0, 1 + index))));
}

function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return <li className={`site-tile flex flex-col justify-between gap-6 p-6 ${className}`}>{children}</li>;
}

function CardText({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h3 className="text-lg font-medium text-text">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
    </div>
  );
}

function IconTile({ children }: { children: ReactNode }) {
  return (
    <span className="flex size-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
      {children}
    </span>
  );
}

export function Value({ locale }: { locale: Locale }) {
  const t = landingT(locale);
  const number = new Intl.NumberFormat(locale);
  const days = weekdayLabels(locale);

  return (
    <Section id="value-title" badge={t("value.badge")} title={t("value.title")}>
      <ul className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardText title={t("value.customers.title")} text={t("value.customers.text")} />
          <div aria-hidden="true" className="flex gap-3">
            <IconTile>
              <svg {...iconProps}>
                <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
              </svg>
            </IconTile>
            <IconTile>
              <svg {...iconProps}>
                <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
                <path d="M3.5 10h17M8 3v4M16 3v4" />
              </svg>
            </IconTile>
            <IconTile>
              <svg {...iconProps}>
                <path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
              </svg>
            </IconTile>
          </div>
        </Card>

        <Card>
          <CardText title={t("value.time.title")} text={t("value.time.text")} />
          <ul aria-hidden="true" className="space-y-2">
            {notifications.map((item) => (
              <li
                key={item.kind}
                className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
              >
                <span className="flex items-center gap-2 text-xs text-text">
                  <span className="size-1.5 rounded-full bg-primary" />
                  {t(`value.visuals.rows.${item.kind}`)}
                </span>
                <span className="text-[11px] text-muted">{t(`value.visuals.times.${item.time}`)}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="md:row-span-2">
          <CardText title={t("value.trust.title")} text={t("value.trust.text")} />
          <div aria-hidden="true" className="relative mx-auto size-48">
            <svg viewBox="0 0 160 160" className="size-full -rotate-90 rtl:-scale-y-100">
              <defs>
                <linearGradient id="value-donut" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#4ade80" />
                  <stop offset="1" stopColor="#15803d" />
                </linearGradient>
              </defs>
              <circle
                cx="80"
                cy="80"
                r={donutRadius}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="12"
              />
              <circle
                cx="80"
                cy="80"
                r={donutRadius}
                fill="none"
                stroke="url(#value-donut)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${donutLength * 0.75} ${donutLength}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs text-muted">{t("value.visuals.donutLabel")}</span>
              <span className="mt-1 text-3xl font-semibold text-text">{t("value.visuals.donutWord")}</span>
            </div>
          </div>
        </Card>

        <Card className="md:col-span-2">
          <CardText title={t("value.dashboard.title")} text={t("value.dashboard.text")} />
          <div aria-hidden="true" className="flex h-36 items-end gap-3">
            {weekdayValues.map((value, index) => (
              <div key={days[index]} className="relative flex h-full flex-1 flex-col justify-end gap-2">
                {index === highlightedDay ? (
                  <span className="absolute -top-1 start-1/2 -translate-x-1/2 rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold text-black rtl:translate-x-1/2">
                    {number.format(value)}
                  </span>
                ) : null}
                <span
                  className={`block w-full rounded-md ${index === highlightedDay ? "bg-primary" : "bg-white/15"}`}
                  style={{ height: `${(value / maxValue) * 80}%` }}
                />
                <span className="text-center text-[11px] text-muted">{days[index]}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="md:col-span-2">
          <CardText title={t("value.languages.title")} text={t("value.languages.text")} />
          <div aria-hidden="true" className="relative mx-auto h-44 w-full max-w-sm">
            <svg viewBox="0 0 360 176" fill="none" className="size-full">
              <ellipse
                cx="180"
                cy="88"
                rx="170"
                ry="80"
                stroke="#22c55e"
                strokeOpacity="0.2"
                strokeDasharray="3 5"
              />
              <ellipse cx="180" cy="88" rx="110" ry="52" stroke="#22c55e" strokeOpacity="0.28" />
              <circle cx="180" cy="88" r="34" fill="#22c55e" fillOpacity="0.18" />
              <circle cx="180" cy="88" r="26" fill="#22c55e" />
              <path
                d="M172 77h9a5.5 5.5 0 0 1 0 11h-9zm0 11h10a6 6 0 0 1 0 12h-10z"
                fill="#03150b"
                fillRule="evenodd"
              />
              {orbitTiles.map((tile) => (
                <g key={tile.path} transform={`translate(${tile.x - 17} ${tile.y - 17})`}>
                  <rect width="34" height="34" rx="9" fill="#0b1410" stroke="#22c55e" strokeOpacity="0.4" />
                  <path
                    d={tile.path}
                    transform="translate(5 5)"
                    stroke="#4ade80"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              ))}
            </svg>
          </div>
        </Card>

        <Card>
          <CardText title={t("value.flow.title")} text={t("value.flow.text")} />
          <div
            aria-hidden="true"
            className="flex items-center justify-between rounded-lg px-2 py-4 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:16px_16px]"
          >
            {flowNodes.map((path, index) => (
              <span key={path} className="flex flex-1 items-center last:flex-none">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/40 bg-black text-primary">
                  <svg {...iconProps}>
                    <path d={path} />
                  </svg>
                </span>
                {index < flowNodes.length - 1 ? <span className="h-px flex-1 bg-primary/50" /> : null}
              </span>
            ))}
          </div>
        </Card>
      </ul>
    </Section>
  );
}
