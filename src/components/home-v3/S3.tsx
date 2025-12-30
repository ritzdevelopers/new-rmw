"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import styles from "./S3.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

function S3() {
  const swiperRef = useRef<SwiperType | null>(null);

  // Data array for slides
  const slidesData = [
    {
      img: "/home-v3/s3/450-digital.png",
      category: "Digital Marketing",
      ttl: "Digital marketing strategies that drive growth",
      list: [
        {subService:"SEO (Search Engine Optimization)", link: "https://ritzmediaworld.com/services/digital-marketing/search-engine-optimization-seo"},
        {subService:"PPC (Google Ads) Services", link: "https://ritzmediaworld.com/services/digital-marketing/ppc-google-ads-agency"},
        {subService:"Social Media Management", link: "https://ritzmediaworld.com/services/digital-marketing/social-media-management"},
        {subService:"ORM (Online Reputation Management)", link: "https://ritzmediaworld.com/services/digital-marketing/orm-in-digital-marketing"},
      ],
      link: "https://ritzmediaworld.com/services/digital-marketing",
    },
    {
      img: "/home-v3/s3/450creative.png",
      category: "Creative Services",
      ttl: "Creative design solutions that elevate brands",
      list: [
        {subService:"Branding & Identity Development", link: "https://ritzmediaworld.com/services/digital-marketing/brand-awareness"},
        {subService:"Graphic Design", link: "https://ritzmediaworld.com/services/creative-services/graphic-designing"},
        {subService:"Logo Design", link: "https://ritzmediaworld.com/services/creative-services/logo-design"},
        {subService:"Print Advertising Design", link: "https://ritzmediaworld.com/services/print-advertising"},
      ],
      link: "https://ritzmediaworld.com/services/creative-services",
    },
    {
      img: "/home-v3/s3/450-print.png",
      category: "Print Advertising",
      ttl: "Print advertising campaigns that maximize impact",
      list: [
        {subService:"Ad Placement", link: "https://ritzmediaworld.com/services/print-advertising/ad-placements"}, 
        {subService:"Copywriting", link: "https://ritzmediaworld.com/services/print-advertising/copywriting"},
        {subService:"Ad Scheduling", link: "https://ritzmediaworld.com/services/print-advertising/advertisement-scheduling"},
        {subService:"Cost Negotiation", link: "https://ritzmediaworld.com/services/print-advertising/negotiating-rates"},
      ],
      link: "https://ritzmediaworld.com/services/print-advertising",
    },
    {
      img: "/home-v3/s3/450-influncer.png",
      category: "Influencer Marketing",
      ttl: "Influencer marketing strategies that drive growth",
      list: [
        {subService:"SEO (Search Engine Optimization)", link: "https://ritzmediaworld.com/services/digital-marketing/search-engine-optimization-seo"},
        {subService:"PPC (Google Ads) Services", link: "https://ritzmediaworld.com/services/digital-marketing/ppc-google-ads-agency"},
        {subService:"Social Media Management", link: "https://ritzmediaworld.com/services/digital-marketing/social-media-management"},
        {subService:"ORM (Online Reputation Management)", link: "https://ritzmediaworld.com/services/digital-marketing/orm-in-digital-marketing"},
      ],
      link: "https://ritzmediaworld.com/services/influencer-marketing-agency-in-india",
    },
    {
      img: "/home-v3/s3/450radio4.png",
      category: "Radio Advertising",
      ttl: "Creative design solutions that elevate brands",
      list: [
        {subService:"Branding & Identity Development", link: "https://ritzmediaworld.com/services/digital-marketing/brand-awareness"},
        {subService:"Graphic Design", link: "https://ritzmediaworld.com/services/creative-services/graphic-designing"},
        {subService:"Logo Design", link: "https://ritzmediaworld.com/services/creative-services/logo-design"},
        {subService:"Print Advertising Design", link: "https://ritzmediaworld.com/services/print-advertising"},
      ],
      link: "https://ritzmediaworld.com/services/radio-advertising",
    },
    {
      img: "/home-v3/s3/450web.png",
      category: "Web Development",
      ttl: "Web Development campaigns that maximize impact",
      list: [
        {subService:"Ad Placement", link: "https://ritzmediaworld.com/services/print-advertising/ad-placements"},
        {subService:"Copywriting", link: "https://ritzmediaworld.com/services/print-advertising/copywriting"},
        {subService:"Ad Scheduling", link: "https://ritzmediaworld.com/services/print-advertising/advertisement-scheduling"},
        {subService:"Cost Negotiation", link: "https://ritzmediaworld.com/services/print-advertising/negotiating-rates"},
      ],
      link: "https://ritzmediaworld.com/services/web-designing-and-development",
    },
    {
      img: "/home-v3/s3/450-content.png",
      category: "Content Marketing",
      ttl: "Creative design solutions that elevate brands",
      list: [
        {subService:"Branding & Identity Development", link: "https://ritzmediaworld.com/services/digital-marketing/brand-awareness"},
        {subService:"Graphic Design", link: "https://ritzmediaworld.com/services/creative-services/graphic-designing"},
        {subService:"Logo Design", link: "https://ritzmediaworld.com/services/creative-services/logo-design"},
        {subService:"Print Advertising Design", link: "https://ritzmediaworld.com/services/print-advertising"},
      ],
      link: "https://ritzmediaworld.com/services/contents-marketing",
    },
    {
      img: "/home-v3/s3/450celebrate.png",
      category: "Celebrity Endorsements",
      ttl: "Celebrity Endorsements campaigns that maximize impact",
      list: [
        {subService:"Ad Placement", link: "https://ritzmediaworld.com/services/print-advertising/ad-placements"},
        {subService:"Copywriting", link: "https://ritzmediaworld.com/services/print-advertising/copywriting"},
        {subService:"Ad Scheduling", link: "https://ritzmediaworld.com/services/print-advertising/advertisement-scheduling"},
        {subService:"Cost Negotiation", link: "https://ritzmediaworld.com/services/print-advertising/negotiating-rates"},
      ],
      link: "https://ritzmediaworld.com/services/celebrity-endorsements",
    },
  ];

  return (
    <section className="w-full min-h-[895px] bg-[#F7F7F7] flex justify-end items-center md:pt-0 pt-10">
      {/* Centered Align End Container  */}
      <div className="w-[95%] h-[90%]">
        {/* Top Row  */}
        <div>
          <p className="uppercase font-[600] text-[16px] text-[#C99237]">
            What We Do
          </p>
          <h2
            className="font-[700] text-[36px]"
            style={{
              fontFamily: "MontserratBold",
            }}
          >
            360° Brand Elevation Services
          </h2>
          <p className="font-[400] text-[16px] max-w-6xl">
          From strategy to execution, we help brands grow with clarity, consistency, and impact across every touchpoint.
          </p>
        </div>

        {/* Bottom Row  */}
        <div className="w-full flex flex-col gap-6">
          {/* Btn Container  */}
          <div className="w-full flex justify-end items-center gap-2 pr-6">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="cursor-pointer"
              aria-label="Previous slide"
            >
              <img
                src="/home-v3/s3/lftb.png"
                alt="RMW"
                className="w-[27px] h-[27px]"
              />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="cursor-pointer"
              aria-label="Next slide"
            >
              <img
                src="/home-v3/s3/rhgt.png"
                alt="RMW"
                className="w-[27px] h-[27px]"
              />
            </button>
          </div>

          {/* Swiper Slider Container  */}
          <div className="w-full overflow-visible">
            <Swiper
              loop={true}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                // Mobile (default)
                320: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },
                // Tablet
                640: {
                  slidesPerView: 1.2,
                  spaceBetween: 16,
                },
                // Small Desktop
                768: {
                  slidesPerView: 1.5,
                  spaceBetween: 16,
                },
                // Medium Desktop
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                // Large Desktop
                1280: {
                  slidesPerView: 2.5,
                  spaceBetween: 16,
                },
                // Extra Large Desktop
                1440: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
              }}
              className={styles.swiperContainer}
            >
              {slidesData.map((ob, idx) => {
                return (
                  <SwiperSlide
                  
                    key={idx}
                    style={{ height: "auto", width: "auto" }}
                  >
                    <div className="min-h-[642px] w-full max-w-[503px] sm:w-[503px] relative">
                      <div className="w-full min-h-[336px] relative z-0">
                        <Image
                          src={ob.img}
                          onClick={()=>window.open(ob.link, "_blank")}
                          alt={ob.ttl}
                          fill
                          className="object-cover"
                        ></Image>
                      </div>
                      <div className="w-full max-w-[442px] sm:w-[442px] z-10 h-[calc(100%-336px)] bg-[#F7F7F7] absolute bottom-8 right-0 pl-4 sm:pl-8 py-6 sm:py-8 flex flex-col gap-3 xl:p-5">
                        <p
                          className="font-[600] text-[16px] sm:text-[18px] text-[#C99237]"
                          style={{
                            fontFamily: "OpenSansSemiBold",
                          }}
                        >
                          {ob.category}
                        </p>
                        <h2
                          className="font-[600] text-[22px] sm:text-[26px]"
                          style={{
                            fontFamily: "OpenSansSemiBold",
                          }}
                        >
                          {ob.ttl}
                        </h2>
                        <ul className="font-[400] text-[14px] sm:text-[16px] flex flex-col gap-2 list-disc pl-5">
                          {ob.list.map((item, listIdx) => {
                            return (
                              <li
                                key={listIdx}
                                style={{
                                  fontFamily: "OpenSansRegular",
                                }}
                              >
                                <Link href={item.link} target="_blank">{item.subService}</Link>
                              </li>
                            );
                          })}
                        </ul>
                        <div>
                          <Link
                            href={ob.link}
                            target="_blank"
                            className="font-[600] text-[14px] sm:text-[16px] underline"
                            style={{
                              fontFamily: "OpenSansSemiBold",
                            }}
                          >
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}

export default S3;
