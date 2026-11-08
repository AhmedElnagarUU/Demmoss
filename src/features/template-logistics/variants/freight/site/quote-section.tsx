"use client";

import type { Locale } from "@/shared/i18n/config";
import type { FreightEstimate } from "../../../types";
import { getFreightT } from "../messages";
import { FREIGHT_ROOT } from "../slug";
import { useFreightStore } from "../store";
import { MutedTail } from "./brand";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "./icons";
import { QuoteForm } from "./quote-form";
import { CenterHead, Reveal } from "./section";
import { container, panel } from "./styles";

// The quote block of the source: the form card next to the ink contact card and the drawn map.
export function QuoteSection({ locale, estimate }: { locale: Locale; estimate: FreightEstimate | null }) {
  const t = getFreightT(locale);
  const root = `/${locale}${FREIGHT_ROOT}`;

  return (
    <section id="contacts" className="overflow-x-clip pt-[110px] max-[640px]:pt-20">
      <div className={container}>
        <Reveal>
          <CenterHead eyebrow={t("quote.eyebrow")} title={<MutedTail text={t("quote.title")} />} />
        </Reveal>
        <div className="grid grid-cols-[1.15fr_1fr] gap-[22px] max-[1024px]:grid-cols-1">
          <Reveal>
            <div className={`${panel} rounded-[28px] p-[42px] max-[640px]:px-5 max-[640px]:py-[26px]`}>
              <h3 className="mb-2 text-[28px] font-semibold tracking-[-0.02em] text-text">
                {t("quote.formTitle")}
              </h3>
              <p className="mb-[26px] text-[14.5px] text-muted">{t("quote.formText")}</p>
              <QuoteForm locale={locale} dashboardHref={`${root}/dashboard/quotes`} estimate={estimate} />
            </div>
          </Reveal>
          <Reveal delay={1}>
            <ContactInfo locale={locale} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// The ink contact card and the map, reused by the quote page.
export function ContactInfo({ locale }: { locale: Locale }) {
  const t = getFreightT(locale);
  const settings = useFreightStore((state) => state.settings);
  const rows = [
    { key: "phone", icon: PhoneIcon, value: settings.phone, ltr: true },
    { key: "email", icon: MailIcon, value: t("contact.emailValue"), ltr: true },
    { key: "office", icon: PinIcon, value: settings.address[locale], ltr: false },
    {
      key: "hours",
      icon: ClockIcon,
      value: t("contact.hoursText", { open: settings.officeOpen, close: settings.officeClose }),
      ltr: false,
    },
  ] as const;

  return (
    <div className="flex h-full flex-col gap-[22px]">
      <div className="rounded-[26px] border border-text bg-text p-8 text-bg">
        {rows.map(({ key, icon: Icon, value, ltr }) => (
          <div
            key={key}
            className="flex gap-4 border-b border-bg/10 py-3.5 first:pt-0 last:border-0 last:pb-0"
          >
            <Icon className="mt-0.5 size-[22px] shrink-0 text-bg/80" />
            <div className="min-w-0">
              <small className="block text-xs text-bg/60">{t(`contact.${key}`)}</small>
              <b
                dir={ltr ? "ltr" : undefined}
                className={`block break-words text-[15px] font-medium ${ltr ? "text-start" : ""}`}
              >
                {value}
              </b>
            </div>
          </div>
        ))}
      </div>

      <div
        role="img"
        aria-label={t("contact.mapLabel")}
        className="lg-map-grid relative min-h-[220px] flex-1 overflow-hidden rounded-[26px] border border-border bg-(--lg-band)"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 400 260"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path
            d="M-10 190C80 170 120 100 220 120S340 40 420 60"
            fill="none"
            stroke="var(--color-surface)"
            strokeWidth="12"
          />
          <path d="M60 -10C80 80 150 140 170 270" fill="none" stroke="var(--color-surface)" strokeWidth="8" />
          <path d="M-10 60C100 80 260 200 420 190" fill="none" stroke="var(--color-border)" strokeWidth="5" />
        </svg>
        <div className="absolute inset-x-0 top-[46%] flex -translate-y-full flex-col items-center">
          <i className="relative grid size-[46px] rotate-[-45deg] place-items-center rounded-[50%_50%_50%_0] bg-text shadow-[0_10px_24px_rgba(0,0,0,0.3)] after:size-3.5 after:rounded-full after:bg-surface" />
          <em className="mt-3.5 whitespace-nowrap rounded-full bg-surface px-3.5 py-1.5 text-xs font-semibold not-italic text-text shadow-[0_10px_40px_rgba(17,17,17,0.06)]">
            {t("contact.hq")}
          </em>
        </div>
      </div>
    </div>
  );
}
