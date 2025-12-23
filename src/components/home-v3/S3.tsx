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
      img: "/home-v3/s3/v2s3i1.png",
      category: "Digital Marketing",
      ttl: "Digital marketing strategies that drive growth",
      list: [
        "SEO (Search Engine Optimization)",
        "PPC (Google Ads) Services",
        "Social Media Management",
        "ORM (Online Reputation Management)",
      ],
      link: "/",
    },
    {
      img: "/home-v3/s3/v2s3i2.png",
      category: "Creative Services",
      ttl: "Creative design solutions that elevate brands",
      list: [
        "Branding & Identity Development",
        "Graphic Design",
        "Logo Design",
        "Print Advertising Design",
      ],
      link: "/",
    },
    {
      img: "/home-v3/s3/v2s2i2.png",
      category: "Print Advertising",
      ttl: "Print advertising campaigns that maximize impact",
      list: [
        "Ad Placement",
        "Copywriting",
        "Ad Scheduling",
        "Cost Negotiation",
      ],
      link: "/",
    },
    {
      img: "/home-v3/s3/v2s3i1.png",
      category: "Digital Marketing",
      ttl: "Digital marketing strategies that drive growth",
      list: [
        "SEO (Search Engine Optimization)",
        "PPC (Google Ads) Services",
        "Social Media Management",
        "ORM (Online Reputation Management)",
      ],
      link: "/",
    },
    {
      img: "/home-v3/s3/v2s3i2.png",
      category: "Creative Services",
      ttl: "Creative design solutions that elevate brands",
      list: [
        "Branding & Identity Development",
        "Graphic Design",
        "Logo Design",
        "Print Advertising Design",
      ],
      link: "/",
    },
    {
      img: "/home-v3/s3/v2s2i2.png",
      category: "Print Advertising",
      ttl: "Print advertising campaigns that maximize impact",
      list: [
        "Ad Placement",
        "Copywriting",
        "Ad Scheduling",
        "Cost Negotiation",
      ],
      link: "/",
    },
  ];

  return (
    <section className="w-full min-h-[895px] bg-[#F7F7F7] flex justify-end items-center">
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
            Our in-house team masters the entire spectrum of digital marketing ,
            from strategy and creative development to sophisticated campaigns.
            Our in-house team masters the entire spectrum
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
                          alt={ob.ttl}
                          fill
                          className="object-cover"
                        ></Image>
                      </div>
                      <div className="w-full max-w-[442px] sm:w-[442px] z-10 h-[calc(100%-336px)] bg-[#F7F7F7] absolute bottom-8 right-0 pl-4 sm:pl-8 py-6 sm:py-8 flex flex-col gap-3">
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
                                {item}
                              </li>
                            );
                          })}
                        </ul>
                        <div>
                          <Link
                            href={ob.link}
                            className="font-[600] text-[14px] sm:text-[16px] border-b-1 border-b-black"
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
