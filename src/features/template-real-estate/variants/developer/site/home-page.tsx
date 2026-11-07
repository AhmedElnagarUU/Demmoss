"use client";

import { About } from "./home-about";
import { Collection } from "./home-collection";
import { Panorama, Principles } from "./home-principles";
import { ContactSection } from "./contact-section";
import { HeroSection } from "./hero-section";
import { ProcessSteps } from "./process-steps";
import { TestimonialsSlider } from "./testimonials-slider";

// The home page mirrors theme-sources/01-solenne-estates.html, section by section, in the same order:
// hero, principles, panorama of residence types, collection, about and team, process, client voices, book a viewing.
export function HomePage() {
  return (
    <>
      <HeroSection />
      <Principles />
      <Panorama />
      <Collection />
      <About />
      <ProcessSteps />
      <TestimonialsSlider />
      <ContactSection />
    </>
  );
}
