import type { ReactNode } from "react";
import { getAllDemos } from "@/features/gallery/catalog";
import type { Locale } from "@/shared/i18n/config";
import { landingStats } from "../stats";
import { landingT } from "../translate";
import { ArrowRightIcon, CheckIcon, EyeIcon, EyeOffIcon } from "./icons";
import { Section } from "./section";

const cardIcons: Record<string, ReactNode> = {
  hour: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  dashboard: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
      <path d="M3.5 9h17M9 9v11" />
    </>
  ),
  languages: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.5 3.5 5.500 3.500 8.500s-1 6-3.500 8.500c-2.500-2.500-3.500-5.500-3.500-8.500s1-6 3.500-8.500Z" />
    </>
  ),
  edit: (
    <>
      <path d="M12 3 3.500 7.500 12 12l8.500-4.500L12 3Z" />
      <path d="m3.500 12 8.500 4.500 8.500-4.500M3.500 16.500 12 21l8.500-4.500" />
    </>
  ),
  flow: (
    <>
      <path d="M13 3 5 13.500h6L10 21l8-10.500h-6L13 3Z" />
    </>
  ),
};

function Card({
  icon,
  label,
  position,
  title,
  text,
  className = "",
  children,
}: {
  icon: keyof typeof cardIcons;
  label: string;
  position: string;
  title: string;
  text?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <li className={`studio-card flex flex-col p-6 sm:p-7 ${className}`}>
      <div className="font-mono-label flex items-center justify-between gap-3 text-faint">
        <span className="flex items-center gap-2.5">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            {cardIcons[icon]}
          </svg>
          {label}
        </span>
        <span>{position}</span>
      </div>
      <h3 className="mt-10 max-w-md text-balance text-[clamp(1.5rem,2.2vw,1.9rem)] font-normal leading-tight text-text">
        {title}
      </h3>
      {text ? <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{text}</p> : null}
      <div className="mt-auto pt-8">{children}</div>
    </li>
  );
}

export function Value({ locale }: { locale: Locale }) {
  const t = landingT(locale);
  const number = new Intl.NumberFormat(locale);
  const pad = new Intl.NumberFormat(locale, { minimumIntegerDigits: 2, useGrouping: false });
  const { demoCount, categoryCount } = landingStats(getAllDemos());
  const position = (index: number) => `${pad.format(index)} / ${pad.format(5)}`;
  const ringLength = 2 * Math.PI * 44;
  const ringShown = ringLength * 0.78;

  return (
    <Section
      id="value-title"
      anchor="value"
      index={pad.format(2)}
      label={t("value.label")}
      aside={t("value.aside")}
      lead={t("value.titleLead")}
      rest={t("value.titleRest")}
      intro={t("value.intro")}
    >
      <ul className="grid gap-4 lg:grid-cols-12">
        <Card
          icon="hour"
          label={t("value.cards.hour")}
          position={position(1)}
          title={t("value.customers.title")}
          text={t("value.customers.text")}
          className="lg:col-span-7"
        >
          <div className="studio-inset grid items-center gap-4 p-4 sm:grid-cols-[1fr_auto_1.25fr]">
            <div>
              <p className="font-mono-label text-faint">{t("value.visuals.fromCustomer")}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="studio-chip">{t("value.visuals.table")}</span>
                <span className="studio-chip">{t("value.visuals.friday")}</span>
                <span className="studio-chip">{t("value.visuals.eightPm")}</span>
              </div>
            </div>
            <ArrowRightIcon className="hidden size-4 text-faint sm:block" />
            <div className="studio-inset p-3.5">
              <p className="font-mono-label text-faint">{t("value.visuals.inDashboard")}</p>
              <p className="mt-2 text-sm font-medium text-text">{t("value.visuals.newBooking")}</p>
              <p className="font-mono-label mt-3 inline-block rounded-full border border-accent/40 px-2.5 py-1 text-accent">
                {t("value.visuals.whatsappSent")}
              </p>
            </div>
          </div>
          <p className="mt-3 flex items-center gap-2.5 rounded-xl border border-accent/20 bg-accent/[0.06] px-4 py-3 text-xs text-muted">
            <CheckIcon className="size-4 shrink-0 text-accent" />
            {t("value.visuals.instant")}
          </p>
        </Card>

        <Card
          icon="dashboard"
          label={t("value.cards.dashboard")}
          position={position(2)}
          title={t("value.dashboard.title")}
          text={t("value.dashboard.text")}
          className="lg:col-span-5"
        >
          <div aria-hidden="true" className="relative mx-auto h-44 max-w-sm">
            <div className="absolute inset-x-6 inset-y-2 flex rotate-[-12deg] flex-col justify-between rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.01))] p-4 shadow-xl shadow-black/50 rtl:rotate-[12deg]">
              <span className="studio-badge self-end">{t("value.visuals.today")}</span>
              <p className="text-lg font-medium text-text">
                {t("value.visuals.summary", { bookings: number.format(12), orders: number.format(8) })}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4 text-xs">
            <span className="text-muted">{t("value.visuals.phone")}</span>
            <span className="text-end text-text">{t("value.visuals.updated")}</span>
          </div>
        </Card>

        <Card
          icon="languages"
          label={t("value.cards.languages")}
          position={position(3)}
          title={t("value.languages.title")}
          className="lg:col-span-4"
        >
          <ul>
            {[
              {
                badge: "EN",
                title: t("value.visuals.home"),
                sub: t("value.visuals.ltr"),
                value: t("value.visuals.homeUrl"),
              },
              {
                badge: "ع",
                title: t("value.visuals.arabicHome"),
                sub: t("value.visuals.rtl"),
                value: t("value.visuals.arabicHomeUrl"),
              },
              {
                badge: "⇄",
                title: t("value.visuals.switch"),
                sub: t("value.visuals.switchNote"),
                value: t("value.visuals.switchValue"),
              },
            ].map((row) => (
              <li
                key={row.badge}
                className="flex items-center gap-3 border-b border-white/[0.07] py-3 last:border-b-0"
              >
                <span
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-[11px] text-muted"
                >
                  {row.badge}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-text">{row.title}</span>
                  <span className="block truncate text-[11px] text-faint">{row.sub}</span>
                </span>
                <span dir="ltr" className="font-mono-label shrink-0 normal-case tracking-normal text-text">
                  {row.value}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-2 flex items-center justify-between gap-3 text-[11px] text-faint">
            <span>{t("value.visuals.oneDesign")}</span>
            <span className="text-accent">{t("value.visuals.rtlReady")}</span>
          </p>
        </Card>

        <Card
          icon="edit"
          label={t("value.cards.edit")}
          position={position(4)}
          title={t("value.edit.title")}
          className="lg:col-span-4"
        >
          <ol className="relative flex flex-col gap-4">
            <span aria-hidden="true" className="absolute inset-y-4 start-[0.8rem] w-px bg-white/10" />
            {[
              { label: t("value.visuals.hours"), hidden: false },
              { label: t("value.visuals.menu"), hidden: false },
              { label: t("value.visuals.photos"), hidden: false },
              { label: `${t("value.visuals.team")} — ${t("value.visuals.hidden")}`, hidden: true },
            ].map((row, index) => (
              <li key={row.label} className="relative flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={`font-mono-label relative flex size-[1.65rem] shrink-0 items-center justify-center rounded-full border bg-surface text-[10px] ${
                    row.hidden ? "border-white/15 text-faint" : "border-accent/60 text-accent"
                  }`}
                >
                  {pad.format(index + 1)}
                </span>
                <span className={`flex-1 text-sm ${row.hidden ? "text-faint" : "text-text"}`}>
                  {row.label}
                </span>
                {row.hidden ? (
                  <EyeOffIcon className="size-4 text-faint" />
                ) : (
                  <EyeIcon className="size-4 text-faint" />
                )}
              </li>
            ))}
          </ol>
          <p className="font-mono-label mt-5 inline-block rounded-full border border-accent/40 px-3 py-1.5 text-accent">
            {t("value.visuals.editPill")}
          </p>
        </Card>

        <Card
          icon="flow"
          label={t("value.cards.flow")}
          position={position(5)}
          title={t("value.flow.title")}
          className="lg:col-span-4"
        >
          <div className="flex items-center gap-5">
            <div className="relative size-32 shrink-0">
              <svg aria-hidden="true" viewBox="0 0 100 100" className="size-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-white/10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${ringShown} ${ringLength}`}
                />
              </svg>
              <p className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-light text-text">{number.format(demoCount)}</span>
                <span className="font-mono-label max-w-[4.5rem] text-[8px] leading-tight text-faint">
                  {t("value.visuals.ringLabel")}
                </span>
              </p>
            </div>
            <ul className="flex-1 space-y-2.5 text-xs">
              {[
                { label: t("value.visuals.categories"), value: categoryCount, tone: "bg-accent" },
                { label: t("value.visuals.languages"), value: 2, tone: "bg-faint" },
                { label: t("value.visuals.signups"), value: 0, tone: "bg-white/40" },
              ].map((row) => (
                <li key={row.label} className="flex items-center gap-2 text-muted">
                  <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${row.tone}`} />
                  <span className="flex-1">{row.label}</span>
                  <span className="text-text">{number.format(row.value)}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </ul>
    </Section>
  );
}
