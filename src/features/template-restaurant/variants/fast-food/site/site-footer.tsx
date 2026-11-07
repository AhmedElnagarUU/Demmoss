"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/shared/i18n/config";
import { businessNameOf } from "@/features/demo-engine/fake-auth/business-name";
import { getFastFoodT } from "../messages";
import { useFastFoodStore } from "../store";
import { container, scriptFont } from "./styles";

// The source footer's social marks. The hexes are the source's literal footer colors.
type SocialKey = "footer.facebook" | "footer.instagram" | "footer.pinterest";

const socials: { key: SocialKey; icon: ReactNode }[] = [
  {
    key: "footer.facebook",
    icon: <path d="M14 8h2V4h-3a4 4 0 0 0-4 4v3H7v4h2v6h4v-6h3l1-4h-4V8.5c0-.3.2-.5.5-.5z" />,
  },
  {
    key: "footer.instagram",
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17" cy="7" r=".6" />
      </>
    ),
  },
  {
    key: "footer.pinterest",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M11 8c3-1 5 1 4 4s-3 3-4 1l-1 6" />
      </>
    ),
  },
];

// Dark one-row footer: the script logo, the copyright line, and three social circles (like the source).
export function SiteFooter({ locale }: { locale: Locale }) {
  const t = getFastFoodT(locale);
  const name = useFastFoodStore((state) => businessNameOf(state, locale));
  const root = `/${locale}/demos/restaurant/fast-food`;

  return (
    <footer className="bg-[#2a2420] text-[13px] text-[#d9cfc0]">
      <div className={`${container} flex flex-wrap items-center justify-between gap-5 py-10`}>
        <Link
          href={root}
          className={`${scriptFont} text-[34px] leading-none text-white max-sm:text-[28px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus`}
        >
          {name}
        </Link>
        <p>{t("footer.rights", { name })}</p>
        <div className="flex gap-2.5">
          {socials.map((social) => (
            <a
              key={social.key}
              href="#"
              aria-label={t(social.key)}
              className="grid size-[38px] place-items-center rounded-full border border-[#5b5148] text-white transition-colors duration-200 hover:border-primary hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-[17px] fill-none stroke-current stroke-[1.8]"
              >
                {social.icon}
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
