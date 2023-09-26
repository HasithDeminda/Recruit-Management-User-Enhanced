import React, { Fragment } from "react";
import Header from "../components/Header/Header";
import HeroSection from "../components/Hero-Section/HeroSection";
import CompanySection from "../components/Company-section/Company";

import AboutUs from "../components/About-us/AboutUs";
import ChooseUs from "../components/Choose-us/ChooseUs";
import Features from "../components/Feature-section/Features";

import Testimonials from "../components/Testimonial/Testimonials";

import Newsletter from "../components/Newsletter/Newsletter";
import Footer from "../components/Footer/Footer";

const Landing = () => {
  return (
    <Fragment>
      <Header />
      <HeroSection />
      <CompanySection />
      <AboutUs />
      {/* <RecentJobs /> */}
      <ChooseUs />
      <Features />
      <Testimonials />
      <Newsletter />
      <Footer />
    </Fragment>
  );
};

export default Landing;
