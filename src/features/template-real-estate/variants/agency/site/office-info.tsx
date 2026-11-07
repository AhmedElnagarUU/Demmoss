"use client";

import { Fragment } from "react";
import { useRealEstate } from "../../../context";
import { getAgencyT } from "../messages";
import { useAgencyStore } from "../store";
import { h2Small, labelClass, rtlSafe } from "./styles";

// Puts every part on its own line (the source breaks the address, the contact and the hours into two lines).
function Lines({ parts }: { parts: readonly string[] }) {
  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={part}>
          {index > 0 ? <br /> : null}
          {part}
        </Fragment>
      ))}
    </>
  );
}

// "12 Example Row, Riverside, 00000" becomes "12 Example Row" and "Riverside, 00000".
function addressLines(address: string): string[] {
  const match = /^([^,،]+)[,،]\s*(.+)$/.exec(address);
  return match?.[1] && match[2] ? [match[1], match[2]] : [address];
}

const infoTitle = `mb-1.5 text-[10px] font-medium uppercase tracking-[0.26em] text-(--re-accent) ${rtlSafe}`;
const infoText = "my-1.5 text-sm text-muted";

// The street map drawn as a small picture, like the source (no map service, nothing to load).
function MapArt() {
  return (
    <svg
      viewBox="0 0 400 280"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="absolute inset-0 size-full"
    >
      <rect width="400" height="280" fill="#e6e0d6" />
      <path d="M0 200 Q120 150 220 190 T400 150 L400 280 L0 280Z" fill="#d3d9d6" />
      <g stroke="#fff" strokeWidth="6" fill="none">
        <path d="M0 90H400" />
        <path d="M130 0V280" />
        <path d="M290 0V280" />
        <path d="M0 40L400 130" />
      </g>
      <g stroke="#fff" strokeWidth="2.5" fill="none">
        <path d="M0 150H400" />
        <path d="M210 0V200" />
        <path d="M60 0V280" />
        <path d="M350 0V280" />
      </g>
      <g fill="#cfc8ba">
        <rect x="140" y="100" width="60" height="40" />
        <rect x="300" y="100" width="40" height="50" />
        <rect x="70" y="20" width="50" height="60" />
      </g>
    </svg>
  );
}

// "Visit our office": address, contact and hours (edited in the dashboard Settings), then the map.
// Goal: trust and a way to arrive (a real office with real hours).
export function OfficeInfo() {
  const { locale } = useRealEstate();
  const t = getAgencyT(locale);
  const settings = useAgencyStore((state) => state.settings);

  return (
    <div>
      <p className={`${labelClass} mb-[22px] text-(--re-accent)`}>{t("contact.infoEyebrow")}</p>
      <h2 className={h2Small}>{t("contact.infoTitle")}</h2>
      <div className="my-[26px] flex flex-wrap gap-10">
        <div>
          <p className={infoTitle}>{t("contact.address")}</p>
          <p className={infoText}>
            <Lines parts={addressLines(settings.address[locale])} />
          </p>
        </div>
        <div>
          <p className={infoTitle}>{t("contact.contactLabel")}</p>
          <p className={infoText}>
            <span dir="ltr" className="inline-block">
              {settings.phone}
            </span>
            <br />
            <span dir="ltr" className="inline-block">
              {t("contact.email")}
            </span>
          </p>
        </div>
        <div>
          <p className={infoTitle}>{t("contact.hours")}</p>
          <p className={infoText}>
            <Lines parts={settings.hours[locale].split(" · ")} />
          </p>
        </div>
      </div>
      <div className="relative h-[280px] overflow-hidden rounded-3xl border border-border bg-[#e6e0d6]">
        <MapArt />
        <div
          aria-hidden="true"
          style={{ left: "55%", top: "46%", transform: "rotate(-45deg) translate(-50%, -50%)" }}
          className="absolute size-[22px] rounded-[50%_50%_50%_0] bg-text shadow-[0_0_0_8px_rgba(17,17,17,0.12)] after:absolute after:inset-[7px] after:rounded-full after:bg-(--re-beige)"
        />
        <p
          className={`absolute bottom-4 start-4 rounded-xl bg-surface px-3.5 py-2 text-[10px] uppercase tracking-[0.18em] text-text ${rtlSafe}`}
        >
          {t("contact.mapLabel")}
        </p>
      </div>
    </div>
  );
}
