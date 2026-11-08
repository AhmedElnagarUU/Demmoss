"use client";

import { useEffect, useState } from "react";

/**
 * The section the reader is in: the last one touching the band 20%-30% below the top of the screen.
 * `tail` elements (the closing call to action) count as the last section.
 * The URL hash follows the reading position without scrolling.
 */
export function useActiveSection(ids: string[], tail: string[] = []): string {
  const first = ids[0] ?? "";
  const last = ids[ids.length - 1] ?? "";
  const [active, setActive] = useState(first);
  const key = ids.join("|");
  const tailKey = tail.join("|");

  useEffect(() => {
    const known = key.split("|");
    const tails = tailKey === "" ? [] : tailKey.split("|");
    const elements = [...known, ...tails].flatMap((id) => {
      const element = document.getElementById(id);
      return element ? [element] : [];
    });
    const visible = new Set<string>();

    function choose(next: string) {
      const section = tails.includes(next) ? last : next;
      setActive(section);
      const url = section === first ? window.location.pathname + window.location.search : `#${section}`;
      const current = window.location.hash || "";
      if (section === first && current === "") return;
      if (url.startsWith("#") && current === url) return;
      window.history.replaceState(null, "", url);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const ordered = [...known, ...tails].filter((id) => visible.has(id));
        const latest = ordered[ordered.length - 1];
        if (latest) choose(latest);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    for (const element of elements) observer.observe(element);

    function onHashChange() {
      const id = window.location.hash.slice(1);
      if (known.includes(id)) setActive(id);
    }
    window.addEventListener("hashchange", onHashChange);
    onHashChange();

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [key, tailKey, first, last]);

  return active;
}
