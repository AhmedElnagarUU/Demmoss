"use client";

import { useRealEstate } from "../../../context";
import { findPhoto, SitePhoto } from "../../../site/photo";
import { seedTeam } from "../seed/content";

// The people who design and build. Goal: trust. Fixed site content (not edited in the dashboard).
export function TeamGrid() {
  const { config, locale } = useRealEstate();
  return (
    <ul className="grid gap-6 sm:grid-cols-3">
      {seedTeam.map((member) => (
        <li key={member.id} className="flex items-center gap-4">
          <div className="size-20 shrink-0 overflow-hidden rounded-full bg-surface">
            <SitePhoto photo={findPhoto(config.photos, member.photo)} locale={locale} sizes="80px" />
          </div>
          <div>
            <h3 className="font-semibold text-text">{member.name[locale]}</h3>
            <p className="text-sm text-muted">{member.role[locale]}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
