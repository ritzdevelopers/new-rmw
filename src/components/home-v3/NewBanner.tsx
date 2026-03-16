"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import styles from "./NewBanner.module.css";

const bannerSlides = [
    {
        desktop: "/4th_floor_rmw/home/banner/bn1.jpg",
        mobile: "/4th_floor_rmw/home/banner/mobile-bn1.jpg",
        textColor: "text-[#0A3B3B]",
        highlightColor: "text-white",
        domainColor: "text-white",
        subHeadingColor: "text-white",
    },
    {
        desktop: "/4th_floor_rmw/home/banner/bn2.jpg",
        mobile: "/4th_floor_rmw/home/banner/mobile-bn2.jpg",
        textColor: "text-white",
        highlightColor: "text-[#C99237]",
        domainColor: "text-[#C99237]",
        subHeadingColor: "text-white",
    },
    {
        desktop: "/4th_floor_rmw/home/banner/bn3.jpg",
        mobile: "/4th_floor_rmw/home/banner/mobile-bn3.jpg",
        textColor: "text-white",
        highlightColor: "text-[#0F173E]",
        domainColor: "text-[#0F173E]",
        subHeadingColor: "text-white",
    },
    {
        desktop: "/4th_floor_rmw/home/banner/bn5.jpg",
        mobile: "/4th_floor_rmw/home/banner/mobile-bn5.jpg",
        textColor: "text-white",
        highlightColor: "text-[#C99237]",
        domainColor: "text-[#C99237]",
        subHeadingColor: "text-white",
    },
];

function NewBanner() {
    return (
        <section className="w-full relative overflow-hidden">
            <Swiper
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                modules={[Pagination, Autoplay]}
                className={`${styles.bannerSwiper} w-full h-full`}
                loop
            >
                {bannerSlides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full">
                            <img
                                src={slide.desktop}
                                alt="Ritz Media World banner"
                                className="hidden md:block w-full h-auto object-cover"
                            />
                            <img
                                src={slide.mobile}
                                alt="Ritz Media World banner"
                                className="block md:hidden w-full h-auto object-cover"
                            />

                            <div
                                className="
                                    absolute left-[5%] top-[38%] md:top-[55%] -translate-y-1/2
                                    w-[90%] max-w-[820px] text-left md:left-[5%] md:translate-x-0 md:text-left
                                "
                            >
                                <h1
                                    className="
                                        leading-[1.15] tracking-[-0.01em] font-bold
                                        text-[17px] sm:text-[22px] md:text-[18px] lg:text-[33px] md:font-normal
                                    "
                                    style={{ fontFamily: "Arial" }}
                                >
                                    <span className={`${slide.highlightColor} font-bold`}>W</span>
                                    <span className={`${slide.textColor} font-bold md:font-light`}>hoever </span>
                                    <span className={`${slide.highlightColor} font-bold`}>W</span>
                                    <span className={`${slide.textColor} font-bold md:font-light`}>herever </span>
                                    <span className={`${slide.highlightColor} font-bold`}>W</span>
                                    <span className={`${slide.textColor} font-bold md:font-light`}>henever</span>
                                    <span className={`${slide.textColor} md:hidden`}>.</span>
                                    <span className={`${slide.domainColor} block md:inline font-bold md:font-normal`}>
                                        <span className="hidden md:inline">.</span>ritzmediaworld.com
                                    </span>
                                </h1>

                                <p
                                    className={`
                                        mt-[6px]
                                        text-[11px] sm:text-[14px] md:text-[12px] lg:text-[17px] xl:text-[20px]
                                        ${slide.subHeadingColor}
                                    `}
                                    style={{ fontFamily: "Arial", lineHeight: "1.35" }}
                                >
                                    Your brand keeps working,<br className="md:hidden" /> even when you don’t.
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default NewBanner;
