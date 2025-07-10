"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "@/app/styles/marque.css";
import Link from "next/link";

const Swiper1 = () => {
  return (
    <div className="elementor-widget-container">
      <section className="tp-text-slider__8-area fix tp-text__inner-1 pt-20 pb-10">
        <div className="tp-text__slider-4-wrap p-relative">
          <div className="swiper-container tp-text__4-slider-active swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
            <Swiper
              modules={[Autoplay]}
              loop={true}
              freeMode={true}
              slidesPerView={"auto"}
              spaceBetween={30}
              centeredSlides={true}
              allowTouchMove={false}
              speed={10000}
              autoplay={{
                delay: 1,
                disableOnInteraction: true,
                // reverseDirection: true
              }}
              id="swiper-wrapper-5c84fcbd31dc5174"
              aria-live="off"
            >
              <SwiperSlide
                className="swiper-slide swiper-slide-duplicate"
                data-swiper-slide-index="0"
                role="group"
                aria-label="1 / 18"
                style={{ marginRight: "30px" }}
              >
                <div className="tp-text__4-wrap">
                  <h3 className="tp-text__8-text">
                  <Link
                  href="/services/best-digital-marketing-agency"
                > DIGITAL _ MARKETING
                </Link>
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide swiper-slide-duplicate"
                data-swiper-slide-index="0"
                role="group"
                aria-label="2 / 18"
                style={{ marginRight: "30px" }}
              >
                <div className="tp-text__4-wrap">
                  <h3 className="tp-text__8-text">
                  <Link
                  href="/services/best-print-advertising-agency"
                >  PRINTING_MARKETING
                </Link>
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide swiper-slide-duplicate"
                data-swiper-slide-index="0"
                role="group"
                aria-label="3 / 18"
                style={{ marginRight: "30px" }}
              >
                <div className="tp-text__4-wrap">
                  <h3 className="tp-text__8-text">
                  <Link
                  href="/services/top-radio-ad-agency"
                >RADIO_MARKETING
                </Link>
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide swiper-slide-duplicate"
                data-swiper-slide-index="0"
                role="group"
                aria-label="4 / 18"
                style={{ marginRight: "30px" }}
              >
                <div className="tp-text__4-wrap">
                  <h3 className="tp-text__8-text">
                  <Link
                  href="/services/leading-creative-agency-india"
                > CREATIVE_SERVICES
                </Link>
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide swiper-slide-duplicate"
                data-swiper-slide-index="0"
                role="group"
                aria-label="5 / 18"
                style={{ marginRight: "30px" }}
              >
                <div className="tp-text__4-wrap">
                  <h3 className="tp-text__8-text">
                  <Link
                  href="/services/leading-content-marketing-agency"
                > CONTENT_MARKETING
                </Link>
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide swiper-slide-duplicate"
                data-swiper-slide-index="0"
                role="group"
                aria-label="6 / 18"
                style={{ marginRight: "30px" }}
              >
                <div className="tp-text__4-wrap">
                  <h3 className="tp-text__8-text">
                  <Link
                  href="/services/best-website-designing-company"
                > WEB_DEVELOPMENT
                </Link>
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide swiper-slide-duplicate"
                data-swiper-slide-index="0"
                role="group"
                aria-label="7 / 18"
                style={{ marginRight: "30px" }}
              >
                <div className="tp-text__4-wrap">
                  <h3 className="tp-text__8-text">
                  <Link
                  href="/services/celebrity-endorsement-agency-india"
                > CELEBRITY_ENDORSEMENTS
                </Link>
                  </h3>
                </div>
              </SwiperSlide>
              <SwiperSlide
                className="swiper-slide swiper-slide-duplicate"
                data-swiper-slide-index="0"
                role="group"
                aria-label="7 / 18"
                style={{ marginRight: "30px" }}
              >
                <div className="tp-text__4-wrap">
                  <h3 className="tp-text__8-text">
                  <Link
                  href="/services/influencer-marketing-agency-in-india"
                >INFLUENCER_MARKETING
                </Link>
                  </h3>
                </div>
              </SwiperSlide>
            </Swiper>
            <span
              className="swiper-notification"
              aria-live="assertive"
              aria-atomic="true"
            ></span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Swiper1;
