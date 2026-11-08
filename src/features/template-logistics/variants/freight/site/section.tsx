"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { intlLocale } from "@/features/demo-engine/format/format";
import type { Locale } from "@/shared/i18n/config";

type RevealProps = { className?: string; delay?: 0 | 1 | 2 | 3 | 4; children: ReactNode };

// The source fades content up 26px the first time it enters the viewport (.8s, staggered by .08s).
// One-shot; reduced motion shows everything at once.
export function Reveal({ className = "", delay = 0, children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-shown={shown ? "true" : "false"}
      style={delay ? { transitionDelay: `${delay * 80}ms` } : undefined}
      className={`translate-y-[26px] opacity-0 transition-[opacity,translate,transform] duration-[800ms] ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none data-[shown=true]:translate-y-0 data-[shown=true]:opacity-100 ${className}`}
    >
      {children}
    </div>
  );
}

type CountUpProps = { target: number; locale: Locale; decimals?: number; suffix?: string };

// The source counts each stat up over 1.6s (cubic ease-out) when it enters the viewport.
export function CountUp({ target, locale, decimals = 0, suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        if (reduce) {
          setValue(target);
          return;
        }
        let start: number | null = null;
        const step = (now: number) => {
          start = start ?? now;
          const progress = Math.min((now - start) / 1600, 1);
          setValue(target * (1 - Math.pow(1 - progress, 3)));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  const formatted = new Intl.NumberFormat(intlLocale(locale), {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}

type PageHeroProps = { eyebrow: string; title: string; intro?: string };

// Inner pages reuse the source's hero gradient band and typography, with room for the fixed header.
export function PageHero({ eyebrow, title, intro }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ececee_0%,#f3f3f4_45%,#fff_100%)] pb-16 pt-[150px] max-[1024px]:pt-[130px] max-[640px]:pb-12 max-[640px]:pt-[110px]">
      <div className="mx-auto w-full max-w-[1240px] px-8 max-[1024px]:px-6 max-[640px]:px-4">
        <p className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted rtl:normal-case rtl:tracking-normal">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl text-[clamp(36px,5vw,64px)] font-normal leading-[1.04] tracking-[-0.035em] text-text rtl:tracking-normal">
          {title}
        </h1>
        {intro ? <p className="mt-5 max-w-2xl text-[16.5px] text-text/85">{intro}</p> : null}
      </div>
    </section>
  );
}

type CenterHeadProps = { eyebrow: string; title: ReactNode; intro?: string };

// The centred head of the source's blocks (how it works, pricing, testimonials, quote).
export function CenterHead({ eyebrow, title, intro }: CenterHeadProps) {
  return (
    <div className="mx-auto mb-[54px] max-w-[640px] text-center">
      <p className="text-[11.5px] font-medium uppercase tracking-[0.14em] text-muted rtl:normal-case rtl:tracking-normal">
        {eyebrow}
      </p>
      <h2 className="mt-3.5 text-[clamp(28px,3.4vw,44px)] font-medium leading-[1.08] tracking-[-0.025em] text-text rtl:leading-[1.35] rtl:tracking-normal">
        {title}
      </h2>
      {intro ? <p className="mt-3.5 text-muted">{intro}</p> : null}
    </div>
  );
}
