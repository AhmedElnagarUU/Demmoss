"use client";

import { useEffect, useRef } from "react";

export function ReadingProgress({ className = "" }: { className?: string }) {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const percent = scrollable > 0 ? Math.min(100, Math.max(0, (window.scrollY / scrollable) * 100)) : 0;
      if (bar.current) bar.current.style.width = `${percent}%`;
    }
    function onScroll() {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className={`h-0.5 w-full overflow-hidden bg-white/10 ${className}`}>
      <div ref={bar} className="h-full w-0 bg-primary" />
    </div>
  );
}
