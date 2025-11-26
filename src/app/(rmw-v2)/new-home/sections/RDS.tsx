"use client";
import React from "react";
import S4Card from "../components/S4Card";

function RDS() {
  const s4CardsData = [
    {
      linkTxt: "Digital Marketing",
      title: "Digital marketing strategies that drive growth.",
      list: [
        {
          text: "SEO (Search Engine Optimization)",
          link: "https://ritzmediaworld.com/services/digital-marketing/search-engine-optimization-seo",
        },
        {
          text: "PPC (Google Ads) Services",
          link: "https://ritzmediaworld.com/services/digital-marketing/ppc-google-ads-agency",
        },
        {
          text: "Social Media Management",
          link: "https://ritzmediaworld.com/services/digital-marketing/social-media-management",
        },
        {
          text: "ORM (Online Reputation Management)",
          link: "https://ritzmediaworld.com/services/digital-marketing/orm-in-digital-marketing",
        },
      ],
      cardBg: "bg-gradient-to-tl from-[#D1FFEC] to-[#F7FFDF]",
      linkBG: "bg-[#21EAB5]",
      linkTxtColor: "text-[#101828]",
      img: "/new-page/digital.jpg",
      link: "/services/digital-marketing",
    },
    {
      linkTxt: "Creative Services",
      title: "Creative design solutions that elevate brands.",
      list: [
        {
          text: "Branding & Identity Development",
          link: "https://ritzmediaworld.com/services/digital-marketing/brand-awareness",
        },
        {
          text: "Graphic Design",
          link: "https://ritzmediaworld.com/services/creative-services/graphic-designing",
        },
        {
          text: "Logo Design",
          link: "https://ritzmediaworld.com/services/creative-services/logo-design",
        },
        {
          text: "Print Advertising Design",
          link: "https://ritzmediaworld.com/services/print-advertising",
        },
      ],
      cardBg: "bg-gradient-to-tl from-[#F7FFDF] to-[#EFFFD1]",
      linkBG: "bg-[#21EAB5]",
      linkTxtColor: "text-[#101828]",
      img: "/new-page/banners-for-rmw9.jpg",
      link: "/services/creative-services",
    },
    {
      linkTxt: "Print Advertising",
      title: "Print advertising campaigns that maximize impact.",
      list: [
        {
          text: "Ad Placement",
          link: "https://ritzmediaworld.com/services/print-advertising/ad-placements",
        },
        {
          text: "Copywriting",
          link: "https://ritzmediaworld.com/services/print-advertising/copywriting",
        },
        {
          text: "Ad Scheduling",
          link: "https://ritzmediaworld.com/services/print-advertising/advertisement-scheduling",
        },
        {
          text: "Cost Negotiation",
          link: "https://ritzmediaworld.com/services/print-advertising/negotiating-rates",
        },
      ],
      cardBg: "bg-gradient-to-tl from-[#F7FFDF] to-[#FFE8D1]",
      linkBG: "bg-[#21EAB5]",
      linkTxtColor: "text-[#101828]",
      img: "/new-page/banners-for-rmw5.jpg",
      link: "/services/print-advertising",
    },
  ];

  return (
    <section className="w-full relative flex flex-col items-center py-6 sm:py-8 md:py-10 lg:py-12 px-4">
    <div className="w-full sm:w-[95%] md:w-[92%] lg:w-[90%]">
  
      {s4CardsData.map((ob, idx) => (
          <div
            key={idx}
            className="sticky w-full h-[100vh] sm:h-[95vh] md:h-[90vh] lg:h-[80vh] top-0 sm:top-4 md:top-16 lg:top-32 mb-4 sm:mb-6 md:mb-8 lg:mb-0"
            style={{ zIndex: 10 + idx,  top: idx == 0 ? 0 : `${idx*40}px`}}
          >
            <S4Card
              link={ob.link}
              linkTxt={ob.linkTxt}
              title={ob.title}
              list={ob.list}
              cardBg={ob.cardBg}
              linkBG={ob.linkBG}
              linkTxtColor={ob.linkTxtColor}
              img={ob.img}
            />
          </div>
      ))}
  
    </div>
  </section>
  

  );
}

export default RDS;
