"use client";

import { useRealEstate } from "../../../context";
import { findPhoto, SitePhoto } from "../../../site/photo";
import { seedTeam } from "../seed/content";
import { Reveal } from "./reveal";
import { rtlSafe } from "./styles";

// The people who design and build, on the light About band. Goal: trust. Fixed site content (not edited in the dashboard).
// Each portrait is grayscale and turns to colour on hover, like the source.
export function TeamGrid() {
  const { config, locale } = useRealEstate();
  return (
    <ul className="mt-[100px] grid grid-cols-3 gap-7 border-t border-black/15 pt-[50px] max-[1024px]:grid-cols-1">
      {seedTeam.map((member) => (
        <li key={member.id}>
          <Reveal className="group flex items-center gap-5">
            <div className="size-[84px] shrink-0 overflow-hidden rounded-full">
              <SitePhoto
                photo={findPhoto(config.photos, member.photo)}
                locale={locale}
                sizes="84px"
                className="grayscale transition-[filter] duration-500 group-hover:grayscale-0 motion-reduce:transition-none"
              />
            </div>
            <div>
              <h3 className={`text-[13px] font-normal uppercase tracking-[0.18em] ${rtlSafe}`}>
                {member.name[locale]}
              </h3>
              <p className={`text-[11px] tracking-[0.1em] text-(--re-ink-muted) ${rtlSafe}`}>
                {member.role[locale]}
              </p>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
