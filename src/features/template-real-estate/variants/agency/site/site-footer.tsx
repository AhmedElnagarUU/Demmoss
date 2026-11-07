"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRealEstate } from "../../../context";
import { businessNameOf } from "@/features/demo-engine/fake-auth/business-name";
import { getAgencyT } from "../messages";
import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon } from "./icons";
import { BrandName, logoLinkClass } from "./brand";
import { container, rtlSafe } from "./styles";

const columnTitle = `mb-5 text-[10px] font-medium uppercase tracking-[0.26em] text-(--re-beige) ${rtlSafe}`;
const footerLink =
  "hover:text-(--re-beige) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const socialLink =
  "grid size-9 place-items-center rounded-full border border-white/60 text-white transition-colors duration-300 hover:border-(--re-beige) hover:bg-(--re-beige) hover:text-[#111] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

// The dark footer of the source: logo with a monthly-news signup, two link columns, social icons, copyright.
// The signup only thanks the visitor (nothing is stored or sent). Goal: trust and a way to keep in touch.
export function SiteFooter() {
  const { store, config, locale } = useRealEstate();
  const t = getAgencyT(locale);
  const name = store((state) => businessNameOf(state, locale));
  const root = `/${locale}${config.basePath}`;
  const [thanks, setThanks] = useState(false);

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setThanks(true);
  }

  const explore = [
    { href: `${root}/listings?purpose=sale`, label: t("footer.buy") },
    { href: `${root}/listings?purpose=rent`, label: t("footer.rent") },
    { href: `${root}#mortgage`, label: t("footer.sell") },
    { href: `${root}#mortgage`, label: t("footer.mortgage") },
  ];
  const company = [
    { href: `${root}#agents`, label: t("footer.agents") },
    { href: `${root}#testi`, label: t("footer.reviews") },
    { href: `${root}#hoods`, label: t("footer.hoods") },
    { href: `${root}#contact`, label: t("footer.contact") },
  ];

  return (
    <footer className="overflow-x-clip bg-(--re-dark) pb-9 pt-[90px] text-white/65">
      <div className={container}>
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-[50px] border-b border-white/15 pb-[60px] max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1 max-[640px]:gap-[34px]">
          <div>
            <Link href={root} className={`${logoLinkClass} inline-block text-white`}>
              <BrandName name={name} />
            </Link>
            <p className="mt-[18px] max-w-[340px] text-[13px]">{t("footer.tagline")}</p>
            <form onSubmit={subscribe} className="mt-[18px] flex max-w-[380px] border-b border-white/30">
              <input
                type="email"
                required
                aria-label={t("footer.emailLabel")}
                placeholder={t("footer.emailPlaceholder")}
                className="w-full rounded-none border-0 bg-transparent px-0.5 py-[9px] text-[13px] text-white outline-0 placeholder:text-white/65 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              />
              <button
                type="submit"
                className={`cursor-pointer px-1 text-[10px] uppercase tracking-[0.22em] text-(--re-beige) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${rtlSafe}`}
              >
                {t("footer.subscribe")}
              </button>
            </form>
            <p role="status" className="mt-2.5 min-h-5 text-xs text-(--re-beige)">
              {thanks ? t("footer.thanks") : ""}
            </p>
          </div>
          <nav aria-label={t("footer.explore")}>
            <p className={columnTitle}>{t("footer.explore")}</p>
            <ul>
              {explore.map((link) => (
                <li key={link.label} className="my-[9px] text-[13px]">
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={t("footer.company")}>
            <p className={columnTitle}>{t("footer.company")}</p>
            <ul>
              {company.map((link) => (
                <li key={link.label} className="my-[9px] text-[13px]">
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className={columnTitle}>{t("footer.follow")}</p>
            <div className="flex gap-2.5">
              <a
                href="#"
                onClick={(event) => event.preventDefault()}
                aria-label={t("footer.instagram")}
                className={socialLink}
              >
                <InstagramIcon className="size-[15px]" />
              </a>
              <a
                href="#"
                onClick={(event) => event.preventDefault()}
                aria-label={t("footer.facebook")}
                className={socialLink}
              >
                <FacebookIcon className="size-[15px]" />
              </a>
              <a
                href="#"
                onClick={(event) => event.preventDefault()}
                aria-label={t("footer.linkedin")}
                className={socialLink}
              >
                <LinkedInIcon className="size-[15px]" />
              </a>
              <a
                href="#"
                onClick={(event) => event.preventDefault()}
                aria-label={t("footer.x")}
                className={socialLink}
              >
                <XIcon className="size-[15px]" />
              </a>
            </div>
          </div>
        </div>
        <p
          className={`flex flex-wrap justify-between gap-2.5 pt-[30px] text-[11px] uppercase tracking-[0.14em] ${rtlSafe}`}
        >
          <span>{t("footer.copyright", { name })}</span>
          <span>{t("footer.legal")}</span>
        </p>
      </div>
    </footer>
  );
}
