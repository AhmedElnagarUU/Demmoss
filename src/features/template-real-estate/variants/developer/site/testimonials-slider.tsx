"use client";

import { useEffect, useState } from "react";
import { useRealEstate } from "../../../context";
import { formatNumber } from "@/features/demo-engine/format/format";
import { getDeveloperT } from "../messages";
import { useDeveloperStore } from "../store";
import { ArrowIcon } from "./icons";
import { Reveal } from "./reveal";
import { container, labelClass, rtlSafe, sectionPad } from "./styles";

const AUTO_MS = 6000;

const arrowClass =
  "grid size-[50px] cursor-pointer place-items-center rounded-full border border-border text-text transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus motion-reduce:transition-none";

// "Client voices": one quote at a time on the panel colour, with arrows and line dots, changing by itself every 6 seconds
// (not with reduced motion). Goal: trust (people like you were helped). The quotes are the visible testimonials of the dashboard.
export function TestimonialsSlider() {
  const { locale } = useRealEstate();
  const t = getDeveloperT(locale);
  const testimonials = useDeveloperStore((state) => state.testimonials).filter((item) => item.visible);
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
      id="testimonials"
      aria-labelledby="testimonials-title"
      className={`${sectionPad} relative overflow-x-clip border-y border-border bg-surface`}
    >
      <div className={container}>
        <Reveal>
          <p id="testimonials-title" className={`${labelClass} text-muted`}>
            {t("stories.eyebrow")}
          </p>
        </Reveal>
        <Reveal>
          <div className="relative mt-[60px] overflow-hidden">
            <div
              className="flex transition-transform duration-[800ms] ease-[cubic-bezier(0.7,0,0.2,1)] motion-reduce:transition-none"
              style={{ transform: `translateX(${direction * current * 100}%)` }}
            >
              {testimonials.map((item, position) => (
                <figure
                  key={item.id}
                  aria-hidden={position !== current}
                  className="m-0 shrink-0 grow-0 basis-full pe-0.5"
                >
                  <blockquote
                    className={`max-w-[960px] text-[clamp(20px,2.8vw,38px)] font-extralight leading-[1.5] tracking-[0.04em] rtl:font-light rtl:leading-[1.8] ${rtlSafe}`}
                  >
                    “{item.text[locale]}”
                  </blockquote>
                  <figcaption
                    className={`mt-8 text-[11px] uppercase tracking-[0.26em] text-(--re-accent) ${rtlSafe}`}
                  >
                    {item.name[locale]}
                    <span className="mt-1 block tracking-[0.18em] text-muted">{item.context[locale]}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Reveal>
        <div className="mt-12 flex items-center gap-3.5">
          <button
            type="button"
            aria-label={t("stories.prev")}
            onClick={() => go(current - 1)}
            className={arrowClass}
          >
            <ArrowIcon direction="start" className="size-[18px]" />
          </button>
          <button
            type="button"
            aria-label={t("stories.next")}
            onClick={() => go(current + 1)}
            className={arrowClass}
          >
            <ArrowIcon direction="end" className="size-[18px]" />
          </button>
          <div className="ms-4 flex gap-2">
            {testimonials.map((item, position) => (
              <button
                key={item.id}
                type="button"
                aria-label={t("stories.slide", { number: formatNumber(position + 1, locale) })}
                aria-current={position === current}
                onClick={() => go(position)}
                className="group cursor-pointer py-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                <span
                  className={`block h-px w-7 transition-colors duration-300 ${position === current ? "bg-(--re-accent)" : "bg-border group-hover:bg-muted"}`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
