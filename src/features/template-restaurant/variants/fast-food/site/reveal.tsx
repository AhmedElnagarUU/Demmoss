"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = { className?: string; children: ReactNode };

// The source design fades content up 28px the first time it enters the viewport (its `.rv` class).
// One-shot: an IntersectionObserver marks it shown and disconnects. Reduced motion shows everything at once.
export function Reveal({ className = "", children }: Props) {
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
      className={`translate-y-7 opacity-0 transition-[opacity,translate,transform] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 data-[shown=true]:translate-y-0 data-[shown=true]:opacity-100 ${className}`}
    >
      {children}
    </div>
  );
}
