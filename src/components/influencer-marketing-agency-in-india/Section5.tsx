"use client";

import Image from "next/image";
import { useRef } from "react";
import styles from "@/components/shared/container.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

const testimonials = [
  {
    client: "Madhusudan Ghee",
    para: "To me, advertising my brand was merely a means to ensure my elongated presence in the market. Thanks to ritz Media world, my advertisements not only ensured my brand's sustenance but have also got me a great number of quality leads.",
    role: "Managing Director",
  },
  {
    client: "Eldeco Group",
    para: "They not only make sure that they deliver on their promises, but also educate you on what exactly is needed to be done for your brand, thereby preventing you from under or over spending your precious money.",
    role: "Managing Director",
  },
  {
    client: "Escorts Tractor",
    para: "I must admit that RMW and its team of professionals are always on my favourite list. They have always delivered the best services to me even if they had to put in extra efforts and their team has always been available for extensive support.",
    role: "Chief Communication Officer",
  },
  {
    client: "FAIRFOX - EON",
    para: "If there is one thing serving as a full service digital agency for more than a decade taught us, it has to be the value of relationships. Therefore, our relationship with our clients is both a priority and a point of pride to us.",
    role: "Marketing Head",
  },
];

export default function Section5() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative w-full bg-[#FFFFFF] py-10 sm:py-12 md:py-14 lg:py-16 flex justify-center">
      <div className="hidden lg:block absolute right-0 top-10 bottom-0 sm:top-12 sm:bottom-0 md:top-14 md:bottom-0 lg:top-16 lg:bottom-0 left-[45%] bg-[#F7F7F7] z-0" />
      <div className={`w-full mx-auto overflow-hidden ${styles.containerWidth}`}>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-8 xl:gap-10 items-start">
          <div className="w-full lg:w-[30%] xl:w-[26%] pt-1 mt-0 lg:mt-10 xl:mt-[100px]">
            <p
              className="uppercase text-[#C99237] text-[16px] tracking-wide font-[600]"
              style={{ fontFamily: "OpenSansSemiBold" }}
            >
              Clients Testimonials
            </p>
            <h2
              className="text-black text-[34px] sm:text-[40px] lg:text-[30px] xl:text-[34px] leading-[1.02] font-[700] mt-1 xl:whitespace-nowrap"
              style={{ fontFamily: "MontserratBold" }}
            >
              What Our Clients Say
            </h2>
            <p
              className="text-[#1C1C1C] text-[16px] sm:text-[17px] lg:text-[16px] leading-[1.45] mt-3 max-w-[281px]"
              style={{ fontFamily: "OpenSansRegular" }}
            >
              Don&apos;t just take our word for it, hear from the brands we&apos;ve
              helped transform.
            </p>

            <div className="mt-6 flex flex-wrap xl:flex-nowrap gap-3">
              <button
                onClick={() =>
                  window.open("https://ritzmediaworld.com/contact.html", "_blank")
                }
                className="h-[40px] px-6 rounded-[6px] bg-[#C99237] text-white text-[15px] sm:text-[16px] font-[600] cursor-pointer"
                style={{ fontFamily: "OpenSansSemiBold" }}
              >
                Text Tutorial
              </button>
              <button
                onClick={() =>
                  window.open("https://ritzmediaworld.com/web-stories", "_blank")
                }
                className="h-[40px] px-3 rounded-[6px] bg-transparent text-black text-[15px] sm:text-[16px] font-[600] cursor-pointer"
                style={{ fontFamily: "OpenSansSemiBold" }}
              >
                Video Tutorial
              </button>
            </div>
          </div>

          <div className="w-full lg:w-[78%] relative overflow-hidden">
            <div className="hidden lg:block absolute top-6 right-2 z-20">
              <div className="relative w-[71px] h-[27px]">
                <Image
                  src="/service-v3/influencer-marketing-agency-in-india/s5/left_right_slider.svg"
                  alt="Testimonial slider controls"
                  fill
                  className="object-contain pointer-events-none"
                />
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => swiperRef.current?.slidePrev()}
                  className="absolute left-0 top-0 w-[27px] h-[27px] cursor-pointer"
                />
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => swiperRef.current?.slideNext()}
                  className="absolute right-0 top-0 w-[27px] h-[27px] cursor-pointer"
                />
              </div>
            </div>

            <div className="relative z-10 lg:ml-19 lg:pt-14 w-full">
              <Swiper
                modules={[Autoplay]}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                loop={true}
                slidesPerView="auto"
                spaceBetween={20}
                autoplay={{ delay: 4500, disableOnInteraction: false }}
                breakpoints={{
                  640: { spaceBetween: 12 },
                  1024: { spaceBetween: 20 },
                  1280: { spaceBetween: 25 },
                }}
              >
                {testimonials.map((item) => (
                  <SwiperSlide key={item.client} className="!w-[395px]">
                    <div className="w-full mx-auto lg:mx-0 h-[260px] sm:h-[280px] lg:h-[295px] bg-white rounded-none  border-[#E7E7E7] flex flex-col gap-2 sm:gap-2 lg:gap-3 p-5 pl-10 sm:p-6 sm:pl-12 lg:px-6 lg:pl-12 lg:pt-12 lg:pb-7 relative" style={{ boxShadow: '0px 2px 15px 0px #D0D0D040' }}>
                      <p
                        className="font-[400] text-[13px] sm:text-[14px] lg:text-[15px] text-[#060606] overflow-y-auto flex-1 min-h-0"
                        style={{ fontFamily: "OpenSansRegular" }}
                      >
                        {item.para}
                      </p>
                      <div>
                        <h3
                          className="text-[16px] sm:text-[17px] lg:text-[18px] text-[#000000]"
                          style={{ fontFamily: "OpenSansBold" }}
                        >
                          {item.client}
                        </h3>
                        <p
                          className="font-[400] text-[13px] sm:text-[13.5px] lg:text-[14px] text-[#282828] mt-1"
                          style={{ fontFamily: "OpenSansRegular" }}
                        >
                          {item.role}
                        </p>
                      </div>
                      <img
                        src="/home-v3/exl-icn.png"
                        alt="Quote"
                        className="absolute top-4 left-4 z-0 w-[32px] h-[28px] object-contain rotate-180"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
