"use client";

import { useEffect, useState } from "react";
import { useRealEstate } from "../../../context";
import { formatNumber } from "@/features/demo-engine/format/format";
import { getAgencyT } from "../messages";
import { useAgencyStore } from "../store";
import { ChevronIcon } from "./icons";
import { Reveal } from "./reveal";
import { container, h2Class, labelClass, rtlSafe, sectionPad } from "./styles";

const AUTO_MS = 6000;

const arrowClass =
  "grid size-10 cursor-pointer place-items-center rounded-full border border-border text-text transition-colors duration-300 hover:border-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

// "Client stories": one quote at a time on a white band, with arrows and dots, changing by itself every 6 seconds
// (not with reduced motion). Goal: trust (people like you were helped). The quotes are the visible testimonials of the dashboard.
export function TestimonialsSlider() {
  const { locale } = useRealEstate();
  const t = getAgencyT(locale);
  const testimonials = useAgencyStore((state) => state.testimonials).filter((item) => item.visible);
  const count = testimonials.length;
  const [index, setIndex] = useState(0);
  // a click restarts the 6 seconds, like the source
  const [clicks, setClicks] = useState(0);

  const current = count === 0 ? 0 : Math.min(index, count - 1);
  const go = (next: number) => {
    setIndex(count === 0 ? 0 : (next + count) % count);
    setClicks((value) => value + 1);
  };

  useEffect(() => {
    if (count < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((value) => (value + 1) % count), AUTO_MS);
    return () => clearInterval(timer);
  }, [count, clicks]);

  if (count === 0) return null;
  // the track moves toward the start edge: left in English, right in Arabic
  const direction = locale === "ar" ? 1 : -1;

  return (
    <section
      id="testi"
      aria-labelledby="testi-title"
      className={`${sectionPad} scroll-mt-20 overflow-x-clip bg-surface text-center`}
    >
      <div className={container}>
        <Reveal>
          <p className={`${labelClass} mb-[22px] justify-center text-(--re-accent)`}>
            {t("stories.eyebrow")}
          </p>
        </Reveal>
        <Reveal>
          <h2 id="testi-title" className={h2Class}>
            {t("stories.title")}
          </h2>
        </Reveal>
        <Reveal>
          <div className="relative mx-auto mt-[50px] max-w-[780px] overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] motion-reduce:transition-none"
              style={{ transform: `translateX(${direction * current * 100}%)` }}
            >
              {testimonials.map((item, position) => (
                <figure
                  key={item.id}
                  aria-hidden={position !== current}
                  className="m-0 shrink-0 grow-0 basis-full px-2.5"
                >
                  <blockquote
                    className={`text-[clamp(18px,2.2vw,26px)] font-extralight leading-[1.7] tracking-[0.04em] rtl:font-light ${rtlSafe}`}
                  >
                    {item.text[locale]}
                  </blockquote>
                  <figcaption
                    className={`mt-7 text-[11px] uppercase tracking-[0.24em] text-(--re-accent) ${rtlSafe}`}
                  >
                    {item.name[locale]}
                    <span className="mt-1 block text-[10px] tracking-[0.14em] text-muted">
                      {item.context[locale]}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Reveal>
        <div className="mt-[38px] flex items-center justify-center gap-3.5">
          <button
            type="button"
            aria-label={t("stories.prev")}
            onClick={() => go(current - 1)}
            className={arrowClass}
          >
            <ChevronIcon direction="start" className="size-3.5" />
          </button>
          <div className="flex">
            {testimonials.map((item, position) => (
              <button
                key={item.id}
                type="button"
                aria-label={t("stories.slide", { number: formatNumber(position + 1, locale) })}
                aria-current={position === current}
                onClick={() => go(position)}
                className="group grid size-6 cursor-pointer place-items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                <span
                  className={`size-2 rounded-full border border-text transition-[background-color,scale] duration-300 ${position === current ? "scale-[1.3] bg-text" : ""}`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label={t("stories.next")}
            onClick={() => go(current + 1)}
            className={arrowClass}
          >
            <ChevronIcon direction="end" className="size-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
