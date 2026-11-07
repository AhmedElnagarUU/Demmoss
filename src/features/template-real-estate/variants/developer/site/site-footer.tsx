"use client";

import Link from "next/link";
import { useRealEstate } from "../../../context";
import { businessNameOf } from "@/features/demo-engine/fake-auth/business-name";
import { getDeveloperT } from "../messages";
import { firstWord } from "./brand";
import { PinterestIcon, InstagramIcon, LinkedInIcon, YouTubeIcon } from "./icons";
import { container, rtlSafe } from "./styles";

const columnTitle = `mb-[18px] text-[11px] font-normal uppercase tracking-[0.26em] text-muted ${rtlSafe}`;
const footerLink =
  "block text-[13px] text-text/85 transition-colors duration-300 hover:text-(--re-accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";
const socialLink =
  "grid size-[42px] place-items-center rounded-full border border-border text-text transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-on-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

// The black footer of the source: the big name word, four columns (brand and social icons, residences, company, contact),
// then the copyright row. Goal: trust and a clear way to every part of the site.
export function SiteFooter() {
  const { store, config, locale } = useRealEstate();
  const t = getDeveloperT(locale);
  const name = store((state) => businessNameOf(state, locale));
  const settings = store((state) => state.settings);
  const root = `/${locale}${config.basePath}`;

  const residences = [
    { href: `${root}/residences?type=villa`, label: t("pano.forest.title") },
    { href: `${root}/residences?type=coastal`, label: t("pano.coastal.title") },
    { href: `${root}/residences?type=penthouse`, label: t("pano.city.title") },
    { href: `${root}/contact`, label: t("pano.bespoke.title") },
  ];
  const company = [
    { href: `${root}#about`, label: t("nav.about") },
    { href: `${root}#principles`, label: t("nav.principles") },
    { href: `${root}/process`, label: t("footer.process") },
    { href: `${root}#testimonials`, label: t("footer.clients") },
  ];
  const socials = [
    { label: t("footer.instagram"), icon: <InstagramIcon className="size-[17px]" /> },
    { label: t("footer.linkedin"), icon: <LinkedInIcon className="size-[17px]" /> },
    { label: t("footer.pinterest"), icon: <PinterestIcon className="size-[17px]" /> },
    { label: t("footer.youtube"), icon: <YouTubeIcon className="size-[17px]" /> },
  ];

  return (
    <footer className="overflow-x-clip border-t border-border bg-(--re-deep) pb-9 pt-[100px]">
      <div className={container}>
        <p
          aria-hidden="true"
          className={`overflow-hidden whitespace-nowrap text-center text-[clamp(30px,8.6vw,150px)] font-extralight uppercase leading-none tracking-[0.3em] text-text/90 max-[640px]:tracking-[0.12em] rtl:font-light ${rtlSafe}`}
        >
          {firstWord(name)}
        </p>
        <div className="mt-[90px] grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 border-t border-border pt-[50px] max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
          <div>
            <p className={columnTitle}>{name}</p>
            <p className="max-w-[300px] text-[13px] text-muted">{t("footer.tagline")}</p>
            <div className="mt-4 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  onClick={(event) => event.preventDefault()}
                  aria-label={social.label}
                  className={socialLink}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          <nav aria-label={t("footer.residences")}>
            <p className={columnTitle}>{t("footer.residences")}</p>
            <ul className="space-y-2.5">
              {residences.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={t("footer.company")}>
            <p className={columnTitle}>{t("footer.company")}</p>
            <ul className="space-y-2.5">
              {company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <address className="not-italic">
            <p className={columnTitle}>{t("footer.contact")}</p>
            <p dir="ltr" className="mb-2.5 text-start text-[13px] text-text/85">
              {settings.phone}
            </p>
            <p className="mb-2.5 text-[13px] text-text/85">{t("contact.email")}</p>
            <p className="mb-2.5 text-[13px] text-text/85">{settings.address[locale]}</p>
          </address>
        </div>
        <p
          className={`mt-[60px] flex flex-wrap justify-between gap-4 text-[11px] tracking-[0.14em] text-muted ${rtlSafe}`}
        >
          <span>{t("footer.copyright", { name })}</span>
          <span>{t("footer.legal")}</span>
        </p>
      </div>
    </footer>
  );
}
