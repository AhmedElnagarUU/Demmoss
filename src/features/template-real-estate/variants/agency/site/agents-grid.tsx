"use client";

import { useRealEstate } from "../../../context";
import { findPhoto, SitePhoto } from "../../../site/photo";
import { useAgencyStore } from "../store";

// The agents of the agency (edited in the dashboard, Agents). Goal: trust, a real person to call.
export function AgentsGrid() {
  const { config, locale } = useRealEstate();
  const agents = useAgencyStore((state) => state.agents);

  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {agents.map((agent) => (
        <li key={agent.id} className="space-y-3">
          <div className="aspect-4/5 overflow-hidden rounded-control bg-surface">
            <SitePhoto
              photo={findPhoto(config.photos, agent.photo)}
              locale={locale}
              sizes="(min-width: 1024px) 25vw, 50vw"
            />
          </div>
          <h3 className="text-lg font-semibold text-text">{agent.name[locale]}</h3>
          <p className="text-sm text-muted">{agent.role[locale]}</p>
          <a
            href={`tel:${agent.phone.replace(/\s/g, "")}`}
            dir="ltr"
            className="inline-block text-start text-sm font-semibold text-text underline focus-visible:outline-2 focus-visible:outline-focus"
          >
            {agent.phone}
          </a>
        </li>
      ))}
    </ul>
  );
}
