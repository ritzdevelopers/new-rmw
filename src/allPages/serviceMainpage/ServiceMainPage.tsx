"use client";

import dynamic from "next/dynamic";
import ServiceMainHero from './ServiceMainHero';
import Footer from '@/components/footer/Footer';

// Lazy load heavy or below-the-fold components
const ProjectSwiper = dynamic(() => import('../Homepage/ProjectSwiper'), { ssr: false });
const ServiceMainIdentity = dynamic(() => import('./ServiceMainIdentity'), { ssr: false });
const ServiceMainOurService = dynamic(() => import('./ServiceMainOurService'), { ssr: false });
const ServiceMainAbout = dynamic(() => import('./ServiceMainAbout'), { ssr: false });
const SwiperHome = dynamic(() => import('../Homepage/SwiperHome'), { ssr: false });
const ProjectMarque = dynamic(() => import('../projectsPage/ProjectMarque'), { ssr: false });
const ProjectNumbers = dynamic(() => import('../projectsPage/ProjectNumbers'), { ssr: false });
const Awards = dynamic(() => import('../Homepage/Awards'), { ssr: false });
// const Experts = dynamic(() => import("../aboutPage/Experts"), { ssr: false });
const ServiceMainTestimonial = dynamic(() => import('./ServiceMainTestimonial'), { ssr: false });
const ServiceMainTalk = dynamic(() => import('./ServiceMainTalk'), { ssr: false });

const ServiceMainPage = () => {
  return (
    <>
      {/* Above-the-fold content: Hero */}
      <ServiceMainHero />

      {/* Lazy-loaded components */}
      <ProjectSwiper />
      <ServiceMainIdentity />
      <ServiceMainOurService/>
      <ServiceMainAbout/>
      <SwiperHome/>
      <ProjectMarque />
      <ProjectNumbers />
      <Awards/>
      {/* <Experts/>  */}
      <ServiceMainTestimonial />
      <ServiceMainTalk />

      {/* Footer */}
      <Footer/>
    </>
  )
}

export default ServiceMainPage;
