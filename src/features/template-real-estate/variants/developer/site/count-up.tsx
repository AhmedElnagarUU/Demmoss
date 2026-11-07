"use client";

import { useEffect, useRef, useState } from "react";
import { intlLocale } from "@/features/demo-engine/format/format";
import type { Locale } from "@/shared/i18n/config";

// A number that counts up (cubic ease-out, 1.8s) once half of it is in view, like the source.
// Reduced motion shows the end value at once.
export function CountUp({ target, locale }: { target: number; locale: Locale }) {
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
          const progress = Math.min((now - start) / 1800, 1);
          setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return <span ref={ref}>{new Intl.NumberFormat(intlLocale(locale)).format(value)}</span>;
}
