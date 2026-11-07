"use client";

import { useRealEstate } from "../../../context";
import { findPhoto, SitePhoto } from "../../../site/photo";
import { getAgencyT } from "../messages";
import { useAgencyStore } from "../store";
import { InstagramIcon, LinkedInIcon, XIcon } from "./icons";
import { Reveal } from "./reveal";
import { rtlSafe } from "./styles";

const socialLink =
  "grid size-9 place-items-center rounded-full border border-white/60 text-white transition-colors duration-300 hover:border-(--re-beige) hover:bg-(--re-beige) hover:text-[#111] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

// The agents of the agency (edited in the dashboard, Agents): a portrait that loses its grey tint on hover and reveals
// social icons, then name, role and phone. Goal: trust, a real person to call.
export function AgentsGrid() {
  const { config, locale } = useRealEstate();
  const t = getAgencyT(locale);
  const agents = useAgencyStore((state) => state.agents);

  return (
    <ul className="grid grid-cols-4 gap-6 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
      {agents.map((agent) => (
        <li key={agent.id}>
          <Reveal className="group relative">
            <div className="relative aspect-3/4 overflow-hidden rounded-[20px]">
              <div className="size-full grayscale-[0.3] transition-[filter,scale] duration-700 group-hover:scale-105 group-hover:grayscale-0 motion-reduce:transition-none">
                <SitePhoto
                  photo={findPhoto(config.photos, agent.photo)}
                  locale={locale}
                  sizes="(min-width: 1320px) 300px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex translate-y-full justify-center gap-2.5 bg-[linear-gradient(0deg,rgba(0,0,0,0.6),transparent)] p-4 transition-transform duration-[400ms] group-focus-within:translate-y-0 group-hover:translate-y-0 motion-reduce:transition-none">
                <a
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  aria-label={t("agents.instagram")}
                  className={socialLink}
                >
                  <InstagramIcon className="size-[15px]" />
                </a>
                <a
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  aria-label={t("agents.linkedin")}
                  className={socialLink}
                >
                  <LinkedInIcon className="size-[15px]" />
                </a>
                <a
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  aria-label={t("agents.x")}
                  className={socialLink}
                >
                  <XIcon className="size-[15px]" />
                </a>
              </div>
            </div>
            <h3
              className={`mt-[18px] text-sm font-normal uppercase leading-[1.2] tracking-[0.2em] rtl:font-medium rtl:leading-[1.5] ${rtlSafe}`}
            >
              {agent.name[locale]}
            </h3>
            <p className={`my-0.5 text-[10px] uppercase tracking-[0.22em] text-(--re-accent) ${rtlSafe}`}>
              {agent.role[locale]}
            </p>
            <a
              href={`tel:${agent.phone.replace(/[^\d+]/g, "")}`}
              dir="ltr"
              className="inline-block text-start text-xs tracking-[0.08em] text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rtl:text-end"
            >
              {agent.phone}
            </a>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
