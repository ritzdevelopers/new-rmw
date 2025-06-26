"use client"

// import React, { useEffect } from 'react'
import ServiceMainHero from './ServiceMainHero'
// import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import ProjectSwiper from '../Homepage/ProjectSwiper'
import ServiceMainIdentity from './ServiceMainIdentity'
import ServiceMainOurService from './ServiceMainOurService'
import SwiperHome from '../Homepage/SwiperHome'
import ServiceMainAbout from './ServiceMainAbout'
import ProjectMarque from '../projectsPage/ProjectMarque'
import ProjectNumbers from '../projectsPage/ProjectNumbers'
// import ServiceMainAwards from './ServiceMainAwards'
// import ServiceMainArticle from './ServiceMainArticle'
import ServiceMainTalk from './ServiceMainTalk'
import ServiceMainTestimonial from './ServiceMainTestimonial'
// import ServiceMainTeam from './ServiceMainTeam'
// import ServiceMainWorkSwiper from './ServiceMainWorkSwiper'
import Awards from '../Homepage/Awards'
import Experts from "../aboutPage/Experts";

const ServiceMainPage = () => {
  
  return (
    <>
      <ServiceMainHero />
      <ProjectSwiper />
      <ServiceMainIdentity />
      <ServiceMainOurService/>
      <ServiceMainAbout/>
      <SwiperHome/>
      {/* <ServiceMainWorkSwiper /> */}
      <ProjectMarque />
      <ProjectNumbers />
      <Awards/>
      <Experts/>
      <ServiceMainTestimonial />
      <ServiceMainTalk />
      <Footer/>  
    </>
  )
}

export default ServiceMainPage
