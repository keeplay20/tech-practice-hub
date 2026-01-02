import React from "react";

import { HomeHeader } from "./sub-components/header/header";
import { HeroSection } from "./sub-components/hero-section/hero-section";
import { AboutSection } from "./sub-components/about-section/about-section";
import { DestinationSection } from "./sub-components/destination-section/destination-section";
import { HomeFooter } from "./sub-components/footer/footer";

export const Home = () => {
  return (
    <>
      <HomeHeader />
      <HeroSection />
      <AboutSection />
      <DestinationSection />
      <HomeFooter />
    </>
  );
};
