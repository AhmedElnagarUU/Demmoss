"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = { className?: string; children: ReactNode };

// The source fades blocks up 24px the first time they enter the viewport (.7s). One-shot; reduced motion shows everything.
export function Reveal({ className = "", children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-shown={shown ? "true" : "false"}
      className={`translate-y-6 opacity-0 transition-[opacity,translate] duration-700 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none data-[shown=true]:translate-y-0 data-[shown=true]:opacity-100 ${className}`}
    >
      {children}
    </div>
  );
}
