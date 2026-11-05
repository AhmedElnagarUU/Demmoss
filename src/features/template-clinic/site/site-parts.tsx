"use client";

import { useEffect, useState } from "react";
import { formatTime, weekdayName } from "@/features/demo-engine/format/format";
import type { Locale } from "@/shared/i18n/config";
import { formatPrice } from "../format";
import { getClinicT } from "../messages";
import type { Faq, Schedule, Testimonial, Treatment } from "../types";
import { primaryButton } from "./site-ui";

// Small pieces both clinic sites use. They read their data through props, so each page decides what to show.

export function PriceTable({ treatments, locale }: { treatments: readonly Treatment[]; locale: Locale }) {
  const t = getClinicT(locale);
  return (
    <ul className="mx-auto max-w-3xl divide-y divide-border rounded-3xl bg-bg px-6 py-2 text-start shadow-sm sm:px-8">
      {treatments.map((treatment) => (
        <li key={treatment.id} className="flex items-baseline justify-between gap-5 py-5">
          <p className="text-base text-text">
            {treatment.name[locale]}
            <span className="block text-sm text-muted">{treatment.priceNote[locale]}</span>
          </p>
          <p className="whitespace-nowrap font-medium text-(--cl-accent)">
            {treatment.fromPrice ? `${t("common.from")} ` : ""}
            {formatPrice(treatment.price, locale)}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function FaqList({ faqs, locale }: { faqs: readonly Faq[]; locale: Locale }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
      {faqs.map((faq) => (
        <details key={faq.id} className="group py-1">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-4 text-lg font-medium text-text focus-visible:outline-2 focus-visible:outline-focus [&::-webkit-details-marker]:hidden">
            {faq.question[locale]}
            <span
              aria-hidden="true"
              className="grid size-8 shrink-0 place-items-center rounded-full bg-border transition group-open:rotate-45 group-open:bg-primary"
            >
              +
            </span>
          </summary>
          <p className="pb-5 pe-12 text-muted">{faq.answer[locale]}</p>
        </details>
      ))}
    </div>
  );
}

// Weekly hours from a schedule, one row per weekday (Sunday first).
export function HoursList({ schedule, locale }: { schedule: Schedule; locale: Locale }) {
  const t = getClinicT(locale);
  return (
    <dl className="divide-y divide-border text-sm">
      {schedule.map((hours, day) => (
        <div key={day} className="flex justify-between gap-4 py-2">
          <dt className="text-text">{weekdayName(day, locale)}</dt>
          <dd className="text-muted">
            {hours ? `${formatTime(hours.from, locale)} – ${formatTime(hours.to, locale)}` : t("site.hours.closed")}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function TestimonialCards({
  testimonials,
  locale,
}: {
  testimonials: readonly Testimonial[];
  locale: Locale;
}) {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {testimonials.map((item) => (
        <li key={item.id} className="flex flex-col gap-4 rounded-3xl bg-surface p-6 text-muted">
          <span aria-hidden="true" className="tracking-widest text-(--cl-accent)">
            ★★★★★
          </span>
          <blockquote className="grow text-text">“{item.text[locale]}”</blockquote>
          <p className="flex items-center gap-3 font-medium text-text">
            <span
              aria-hidden="true"
              className="grid size-11 place-items-center rounded-full bg-primary text-on-primary"
            >
              {item.name[locale].slice(0, 1)}
            </span>
            <span>
              {item.name[locale]}
              <small className="block font-normal text-muted">{item.context[locale]}</small>
            </span>
          </p>
        </li>
      ))}
    </ul>
  );
}

// A stat of the hero: a big number and a small label.
export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <strong className="block text-4xl font-medium leading-none tracking-tight rtl:tracking-normal">{value}</strong>
      <small className="text-sm text-muted">{label}</small>
    </div>
  );
}

// Fixed bar at the bottom of phones: appears after the hero and hides while the booking section is on screen.
export function StickyCta({
  text,
  label,
  href,
  heroId,
  bookId,
}: {
  text: string;
  label: string;
  href: string;
  heroId: string;
  bookId: string;
}) {
  const [heroVisible, setHeroVisible] = useState(true);
  const [bookVisible, setBookVisible] = useState(false);

  useEffect(() => {
    const watch = (id: string, onChange: (visible: boolean) => void) => {
      const element = document.getElementById(id);
      if (!element) return null;
      const observer = new IntersectionObserver(([entry]) => onChange(Boolean(entry?.isIntersecting)));
      observer.observe(element);
      return observer;
    };
    const observers = [watch(heroId, setHeroVisible), watch(bookId, setBookVisible)];
    return () => observers.forEach((observer) => observer?.disconnect());
  }, [heroId, bookId]);

  const visible = !heroVisible && !bookVisible;
  return (
    <div
      inert={!visible}
      className={`fixed inset-x-4 bottom-4 z-30 mx-auto flex max-w-xl items-center gap-3 rounded-full bg-text py-2 ps-5 pe-2 text-bg shadow-2xl transition duration-500 md:hidden ${
        visible ? "translate-y-0" : "translate-y-[150%]"
      }`}
    >
      <p className="grow text-sm leading-tight">{text}</p>
      <a href={href} className={`${primaryButton} min-h-11 whitespace-nowrap px-5 py-2.5 text-sm shadow-none`}>
        {label}
      </a>
    </div>
  );
}
