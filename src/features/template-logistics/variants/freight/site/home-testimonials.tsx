"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/shared/i18n/config";
import { Photo } from "@/features/demo-engine/photo/photo";
import { freightPhotos } from "../photos";
import { getFreightT } from "../messages";
import { useFreightStore } from "../store";
import { MutedTail } from "./brand";
import { ArrowIcon } from "./icons";
import { CenterHead, Reveal } from "./section";
import { container, eyebrow, roundButton } from "./styles";

const portraitFor = {
  "t-daniel": freightPhotos.portraitDaniel,
  "t-amelia": freightPhotos.portraitAmelia,
  "t-marcus": freightPhotos.portraitMarcus,
  "t-priya": freightPhotos.portraitPriya,
} as const;

// The testimonial slider of the source: one large quote at a time, auto-advancing every seven seconds,
// with dots and two round arrows. Reduced motion stops the automatic advance.
export function HomeTestimonials({ locale }: { locale: Locale }) {
  const t = getFreightT(locale);
  const testimonials = useFreightStore((state) => state.testimonials);
  const visible = testimonials.filter((item) => item.visible);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (visible.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % visible.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [visible.length, index]);

  if (visible.length === 0) return null;
  const current = index % visible.length;

  function go(next: number) {
    setIndex((next + visible.length) % visible.length);
  }

  return (
    <section id="testimonials" className="overflow-x-clip pt-[110px] max-[640px]:pt-20">
      <div className={container}>
        <Reveal>
          <CenterHead
            eyebrow={t("testimonials.eyebrow")}
            title={<MutedTail text={t("testimonials.title")} />}
          />
        </Reveal>
        <Reveal>
          <div className="overflow-hidden rounded-[28px]">
            <div
              className="flex transition-transform duration-[600ms] [transition-timing-function:cubic-bezier(0.6,0.05,0.2,1)] motion-reduce:transition-none"
              style={{ transform: `translateX(${(locale === "ar" ? 1 : -1) * current * 100}%)` }}
            >
              {visible.map((item) => (
                <article
                  key={item.id}
                  className="grid w-full shrink-0 grid-cols-[300px_1fr] items-center gap-[50px] bg-(--lg-band) p-11 max-[1024px]:grid-cols-[200px_1fr] max-[1024px]:gap-[30px] max-[640px]:grid-cols-1 max-[640px]:gap-[22px] max-[640px]:p-[26px_22px]"
                >
                  <div className="aspect-square overflow-hidden rounded-3xl max-[640px]:w-[120px]">
                    <Photo
                      photo={portraitFor[item.id as keyof typeof portraitFor] ?? freightPhotos.portraitDaniel}
                      locale={locale}
                      widths={[240, 400, 600]}
                      sizes="(min-width: 1024px) 300px, (min-width: 640px) 200px, 120px"
                      className="grayscale"
                    />
                  </div>
                  <div>
                    <p className={eyebrow}>{item.sector?.[locale] ?? item.role[locale]}</p>
                    <blockquote className="my-4 text-[clamp(19px,2.2vw,27px)] font-normal leading-[1.4] tracking-[-0.02em] text-text rtl:tracking-normal">
                      “{item.text[locale]}”
                    </blockquote>
                    <p className="text-text">
                      <b className="block font-semibold">{item.author[locale]}</b>
                      <span className="text-[13.5px] text-muted">{item.role[locale]}</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-[22px] flex items-center justify-between gap-4">
            <div className="flex gap-2">
              {visible.map((item, dot) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={t("testimonials.slide", { n: String(dot + 1) })}
                  aria-current={dot === current ? "true" : undefined}
                  onClick={() => go(dot)}
                  className={`h-2 cursor-pointer rounded-full border-0 p-0 transition-[width,background-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus ${
                    dot === current ? "w-7 bg-text" : "w-2 bg-border"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2.5">
              <button
                type="button"
                aria-label={t("testimonials.previous")}
                onClick={() => go(current - 1)}
                className={`${roundButton} border border-border bg-surface`}
              >
                <ArrowIcon className="size-[18px] rotate-180 rtl:rotate-0" />
              </button>
              <button
                type="button"
                aria-label={t("testimonials.next")}
                onClick={() => go(current + 1)}
                className={`${roundButton} border border-border bg-surface`}
              >
                <ArrowIcon className="size-[18px] rtl:rotate-180" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
