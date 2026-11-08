"use client";

import { useState } from "react";
import type { Locale } from "@/shared/i18n/config";
import type { FreightEstimate } from "../../../types";
import { HomeAbout } from "./home-about";
import { HomeCalculator } from "./home-calculator";
import { HomeFaq } from "./home-faq";
import { HomePricing } from "./home-pricing";
import { HomeStats } from "./home-stats";
import { HomeSteps } from "./home-steps";
import { HomeTestimonials } from "./home-testimonials";
import { HeroSection } from "./hero-section";
import { QuoteSection } from "./quote-section";

// The home page follows the source order exactly: hero, about panel with services, calculator, stats,
// steps, pricing, testimonials, FAQ and the quote block. The calculator's pill seeds the quote form below.
export function HomePage({ locale }: { locale: Locale }) {
  const [estimate, setEstimate] = useState<FreightEstimate | null>(null);

  function requestQuote(next: FreightEstimate) {
    setEstimate(next);
    requestAnimationFrame(() => {
      const target = document.getElementById("contacts");
      if (!target) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
  }

  return (
    <>
      <HeroSection locale={locale} />
      <HomeAbout locale={locale} />
      <HomeCalculator locale={locale} onQuote={requestQuote} />
      <HomeStats locale={locale} />
      <HomeSteps locale={locale} />
      <HomePricing locale={locale} />
      <HomeTestimonials locale={locale} />
      <HomeFaq locale={locale} />
      <QuoteSection locale={locale} estimate={estimate} />
    </>
  );
}
