"use client";

import { useState } from "react";
import { useRealEstate } from "../../../context";
import { noFilter, type HomeFilter } from "../home-filter";
import { getAgencyT } from "../messages";
import { AgentsGrid } from "./agents-grid";
import { HeroSection } from "./hero-section";
import { HomeListings } from "./home-listings";
import { HomeMortgage } from "./home-mortgage";
import { Neighbourhoods, WhySection } from "./home-bands";
import { OfficeInfo } from "./office-info";
import { Reveal } from "./reveal";
import { StatsStrip } from "./stats-strip";
import { container, h2Class, labelClass, sectionPad } from "./styles";
import { TestimonialsSlider } from "./testimonials-slider";
import { ViewingCard } from "./viewing-card";

// The home page mirrors theme-sources/02-hartwell-realty.html, section by section, in the same order:
// hero + search, numbers, listings, principles, neighbourhoods, mortgage, agents, client stories, viewing form + office.
export function HomePage() {
  const { locale } = useRealEstate();
  const t = getAgencyT(locale);
  const [filter, setFilter] = useState<HomeFilter>(noFilter);

  // the hero search filters the listings below and scrolls to them, like the source
  function search(next: HomeFilter) {
    setFilter(next);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("listings")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <>
      <HeroSection onSearch={search} />
      <StatsStrip />
      <HomeListings filter={filter} onFilter={setFilter} />
      <WhySection />
      <Neighbourhoods />
      <HomeMortgage />

      <section
        id="agents"
        aria-labelledby="agents-title"
        className="scroll-mt-20 overflow-x-clip pb-[110px] max-[1024px]:pb-20 max-[640px]:pb-16"
      >
        <div className={container}>
          <Reveal className="mb-[46px] max-[640px]:mb-[30px]">
            <p className={`${labelClass} mb-[22px] text-(--re-accent)`}>{t("agents.eyebrow")}</p>
            <h2 id="agents-title" className={h2Class}>
              {t("agents.title")}
            </h2>
          </Reveal>
          <AgentsGrid />
        </div>
      </section>

      <TestimonialsSlider />

      <section
        id="contact"
        aria-label={t("contact.eyebrow")}
        className={`${sectionPad} scroll-mt-20 overflow-x-clip`}
      >
        <div
          className={`${container} grid grid-cols-[1.1fr_1fr] gap-[60px] max-[1024px]:grid-cols-1 max-[1024px]:gap-10`}
        >
          <Reveal>
            <ViewingCard level={2} idPrefix="home-viewing" />
          </Reveal>
          <Reveal>
            <OfficeInfo />
          </Reveal>
        </div>
      </section>
    </>
  );
}
