"use client";
// import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
// import Link from "next/link";
const SwiperHome = () => {
  return (
    <div
      className="elementor-element elementor-element-dbafe44 e-con-full e-flex e-con e-parent"
      data-id="dbafe44"
      data-element_type="container"
    >
      <div
        className="elementor-element elementor-element-0c208c3 e-con-full e-flex e-con e-child"
        data-id="0c208c3"
        data-element_type="container"
      >
        <div
          className="elementor-element elementor-element-ad4ca69 elementor-widget elementor-widget-brand"
          data-id="ad4ca69"
          data-element_type="widget"
          data-widget_type="brand.default"
        >
          <div className="elementor-widget-container">
            <div className="tp-brand__area pb-20">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="tp-brand-wrap">
                      <div className="swiper-container tp-brand__active">
                        <Swiper
                          modules={[Autoplay]}
                          slidesPerView={5}
                          loop={true}
                          autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                          }} // Adjust autoplay delay
                          // speed={1500}
                          centeredSlides={true}
                          breakpoints={{
                            1200: { slidesPerView: 5 },
                            992: { slidesPerView: 4 },
                            768: { slidesPerView: 3 },
                            576: { slidesPerView: 2 },
                            0: { slidesPerView: 1 },
                          }}
                          onSlideChangeTransitionStart={(swiper) => {
                            const isLight =
                              swiper.slides[
                                swiper.activeIndex
                              ].classList.contains("is-light");
                            document
                              .querySelector(".tp-slider-variation")
                              ?.classList.toggle("is-light", isLight);
                          }}
                          className="tp-slider-active"
                        >
                          <SwiperSlide>
                            <div className="tp-brand__item">
                              <div className="tp-brand__logo">
                                <img
                                   src="/home-images/home-swiper1-img2.jpeg"
                                  alt="Brand logo"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="tp-brand__item">
                              <div className="tp-brand__logo">
                                <img
                                  src="/home-images/home-swiper1-img3.jpeg"
                                  alt="Brand logo"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="tp-brand__item">
                              <div className="tp-brand__logo">
                                <img
                                  src="/home-images/home-swiper1-img4.jpeg"
                                  alt="Brand logo"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="tp-brand__item">
                              <div className="tp-brand__logo">
                                <img
                                  src="/home-images/home-swiper1-img5.jpeg"
                                  alt="Brand logo"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="tp-brand__item">
                              <div className="tp-brand__logo">
                                <img
                                  src="/home-images/home-swiper1-img6.jpeg"
                                  alt="Brand logo"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="tp-brand__item">
                              <div className="tp-brand__logo">
                                <img
                                  src="/home-images/home-swiper1-img7.jpeg"
                                  alt="Brand logo"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="tp-brand__item">
                              <div className="tp-brand__logo">
                                <img
                                  src="/home-images/home-swiper1-img8.jpeg"
                                  alt="Brand logo"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="tp-brand__item">
                              <div className="tp-brand__logo">
                                <img
                                  src="/home-images/home-swiper1-img9.jpeg"
                                  alt="Brand logo"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="tp-brand__item">
                              <div className="tp-brand__logo">
                                <img
                                  src="/home-images/home-swiper1-img10.jpeg"
                                  alt="Brand logo"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="tp-brand__item">
                              <div className="tp-brand__logo">
                                <img
                                  src="/home-images/home-swiper1-img11.jpeg"
                                  alt="Brand logo"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="tp-brand__item">
                              <div className="tp-brand__logo">
                                <img
                                  src="/home-images/home-swiper1-img12.jpeg"
                                  alt="Brand logo"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="tp-brand__item">
                              <div className="tp-brand__logo">
                                <img
                                  src="/home-images/home-swiper1-img13.jpeg"
                                  alt="Brand logo"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="tp-brand__item">
                              <div className="tp-brand__logo">
                                <img
                                  src="/home-images/home-swiper1-img14.jpeg"
                                  alt="Brand logo"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="tp-brand__item">
                              <div className="tp-brand__logo">
                                <img
                                  src="/home-images/home-swiper1-img15.jpeg"
                                  alt="Brand logo"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="tp-brand__item">
                              <div className="tp-brand__logo">
                                <img
                                  src="/home-images/home-swiper1-img16.jpeg"
                                  alt="Brand logo"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                            </div>
                          </SwiperSlide>
                          <SwiperSlide>
                            <div className="tp-brand__item">
                              <div className="tp-brand__logo">
                                <img
                                  src="/home-images/home-swiper1-img17.jpeg"
                                  alt="Brand logo"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }}
                                />
                              </div>
                            </div>
                          </SwiperSlide>
                        </Swiper>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwiperHome;
