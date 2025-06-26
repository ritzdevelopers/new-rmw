"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Feedback = () => {
  return (
    <div
      className="elementor-element elementor-element-43b8018 e-con-full e-flex e-con e-parent"
      data-id="43b8018"
      data-element_type="container"
    >
      <div
        className="elementor-element elementor-element-42bb39e e-con-full e-flex e-con e-child"
        data-id="42bb39e"
        data-element_type="container"
      >
        <div
          className="elementor-element elementor-element-1b52e19 elementor-widget elementor-widget-testimonial"
          data-id="1b52e19"
          data-element_type="widget"
          data-widget_type="testimonial.default"
        >
          <div className="elementor-widget-container">
            <section className="tp-testimonial__area fix tp-bg-class">
              <div className="container">
                <div className="tp-testimonial__wrap p-relative">
                  {/* <div className="tp-testimonial__shape">
                    <img
                      decoding="async"
                      src="https://etorisoft.com/wp/avtrix/wp-content/uploads/2024/08/testi-bg-1-1-shape.png"
                      alt=""
                      style={{filter: 'sepia(10%) saturate(120%) brightness(105%) hue-rotate(185deg)'}}
                    />
                  </div> */}
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="tp-awards__title-box mb-20">
                        <span className="tp-section-title-pre mb-20">
                          Clients Feedback
                        </span>
                        <div className="tp-section-title-wrap d-flex align-items-center justify-content-between">
                          <h3 className="tp-section-title">
                            Client’s <span> Testimonial </span>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="swiper-container tp-testimonial__active">
                      <Swiper
                        spaceBetween={75}
                        slidesPerView={3}
                        loop={true}
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        breakpoints={{
                          1200: { slidesPerView: 3 },
                          992: { slidesPerView: 2 },
                          768: { spaceBetween: 30, slidesPerView: 2 },
                          576: { slidesPerView: 1 },
                          0: { slidesPerView: 1 },
                        }}
                        modules={[Autoplay]}
                        className="tp-testimonial__active"
                      >
                        <SwiperSlide>
                          <div className="tp-testimonial__item">
                            <div className="tp-testimonial__thumb-box mb-25 d-flex align-items-center justify-content-between">
                              <div className="tp-testimonial__thumb">
                                {/* <img
                                  decoding="async"
                                  src="https://ritzmediaworld.com//webroot/images/gallery/6106855b-46a9-5a43-b168-7d6774383544_1460_550.png"
                                  alt=""
                                /> */}
                              </div>
                              <div className="tp-testimonial__icon">
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="46"
                                    height="34"
                                    viewBox="0 0 46 34"
                                    fill="none"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M14.6491 17.336C14.7498 17.336 14.8503 17.3637 14.9371 17.4201C15.1018 17.5246 15.1932 17.7105 15.1731 17.9017C14.885 20.6874 14.1452 23.2837 12.9738 25.6189C11.9386 27.6816 10.5833 29.4923 8.92531 31.0312C17.0185 26.8031 20.3125 17.782 19.2013 10.4938C18.5036 5.91889 15.7208 1.02949 10.0035 1.02949C5.06897 1.02946 1.05343 4.95374 1.05343 9.77708C1.05352 14.5995 5.06894 18.5238 10.0035 18.5238C11.5416 18.5237 13.0578 18.1359 14.3902 17.4022C14.4707 17.3575 14.5603 17.3361 14.6491 17.336L14.6491 17.336ZM5.50434 33.4835C5.30218 33.4835 5.11197 33.3691 5.02418 33.1823C4.91534 32.9473 5.00041 32.6694 5.22444 32.5317C11.2939 28.8211 13.377 23.1532 14.0099 18.7365C12.7525 19.2727 11.3853 19.5533 10.0036 19.5533C4.4874 19.5533 0 15.167 0 9.77711C8.867e-05 4.38626 4.48738 2.37942e-09 10.0036 2.37942e-09C12.7562 -5.77435e-05 15.1759 1.05096 17.0012 3.03858C18.671 4.85631 19.7922 7.38199 20.243 10.3428C21.5709 19.0484 16.9097 30.1098 5.65795 33.4612C5.60672 33.4764 5.55458 33.4835 5.50436 33.4835L5.50434 33.4835Z"
                                      fill="#8A5A0D"
                                    ></path>
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M40.1872 17.336C40.2878 17.336 40.3884 17.3637 40.4762 17.4201C40.6408 17.5246 40.7313 17.7105 40.7121 17.9018C40.4241 20.6874 39.6834 23.2837 38.5119 25.6189C37.4768 27.6816 36.1224 29.4923 34.4644 31.0313C42.5558 26.8031 45.8506 17.7821 44.7395 10.4938C44.0418 5.91889 41.2599 1.02949 35.5426 1.02949C30.6071 1.02946 26.5925 4.95374 26.5925 9.77708C26.5926 14.5995 30.6071 18.5238 35.5426 18.5238C37.0799 18.5237 38.597 18.1359 39.9294 17.4022C40.0099 17.3575 40.0985 17.3361 40.1872 17.3361L40.1872 17.336ZM31.0424 33.4835C30.8404 33.4835 30.6501 33.3691 30.5632 33.1824C30.4535 32.9473 30.5394 32.6694 30.7626 32.5317C36.833 28.8211 38.9152 23.1532 39.548 18.7365C38.2907 19.2727 36.9244 19.5533 35.5426 19.5533C30.0265 19.5533 25.5391 15.167 25.5391 9.77711C25.5391 4.38626 30.0264 2.37942e-09 35.5426 2.37942e-09C38.2943 -5.77436e-05 40.7139 1.05096 42.5393 3.03858C44.2092 4.85631 45.3303 7.38199 45.782 10.3419C47.109 19.0484 42.4478 30.1098 31.1961 33.4612C31.1449 33.4764 31.0936 33.4835 31.0424 33.4835V33.4835Z"
                                      fill="#8A5A0D"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                            </div>
                            <div className="tp-testimonial__content">
                              <p>
                              To me, advertising my brand was merely a means to ensure my elongated presence in the market. Thanks to ritz Media world, my advertisements not only ensured my brand’s sustenance but have also got me a great number of quality leads.
                                </p>
                              <div className="tp-testimonial__author">
                                <h3 className="tp-testimonial__author-title">
                                Madhusudan Ghee
                                </h3>
                                <span className="tp-testimonial__author-designation">
                                  

                                  <span>                                  Managing Director</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide>
                          <div className="tp-testimonial__item">
                            <div className="tp-testimonial__thumb-box mb-25 d-flex align-items-center justify-content-between">
                              <div className="tp-testimonial__thumb">
                                {/* <img
                                  decoding="async"
                                  src="https://ritzmediaworld.com//webroot/images/gallery/6106855b-46a9-5a43-b168-7d6774383544_1460_550.png"
                                  alt=""
                                /> */}
                              </div>
                              <div className="tp-testimonial__icon">
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="46"
                                    height="34"
                                    viewBox="0 0 46 34"
                                    fill="none"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M14.6491 17.336C14.7498 17.336 14.8503 17.3637 14.9371 17.4201C15.1018 17.5246 15.1932 17.7105 15.1731 17.9017C14.885 20.6874 14.1452 23.2837 12.9738 25.6189C11.9386 27.6816 10.5833 29.4923 8.92531 31.0312C17.0185 26.8031 20.3125 17.782 19.2013 10.4938C18.5036 5.91889 15.7208 1.02949 10.0035 1.02949C5.06897 1.02946 1.05343 4.95374 1.05343 9.77708C1.05352 14.5995 5.06894 18.5238 10.0035 18.5238C11.5416 18.5237 13.0578 18.1359 14.3902 17.4022C14.4707 17.3575 14.5603 17.3361 14.6491 17.336L14.6491 17.336ZM5.50434 33.4835C5.30218 33.4835 5.11197 33.3691 5.02418 33.1823C4.91534 32.9473 5.00041 32.6694 5.22444 32.5317C11.2939 28.8211 13.377 23.1532 14.0099 18.7365C12.7525 19.2727 11.3853 19.5533 10.0036 19.5533C4.4874 19.5533 0 15.167 0 9.77711C8.867e-05 4.38626 4.48738 2.37942e-09 10.0036 2.37942e-09C12.7562 -5.77435e-05 15.1759 1.05096 17.0012 3.03858C18.671 4.85631 19.7922 7.38199 20.243 10.3428C21.5709 19.0484 16.9097 30.1098 5.65795 33.4612C5.60672 33.4764 5.55458 33.4835 5.50436 33.4835L5.50434 33.4835Z"
                                      fill="#8A5A0D"
                                    ></path>
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M40.1872 17.336C40.2878 17.336 40.3884 17.3637 40.4762 17.4201C40.6408 17.5246 40.7313 17.7105 40.7121 17.9018C40.4241 20.6874 39.6834 23.2837 38.5119 25.6189C37.4768 27.6816 36.1224 29.4923 34.4644 31.0313C42.5558 26.8031 45.8506 17.7821 44.7395 10.4938C44.0418 5.91889 41.2599 1.02949 35.5426 1.02949C30.6071 1.02946 26.5925 4.95374 26.5925 9.77708C26.5926 14.5995 30.6071 18.5238 35.5426 18.5238C37.0799 18.5237 38.597 18.1359 39.9294 17.4022C40.0099 17.3575 40.0985 17.3361 40.1872 17.3361L40.1872 17.336ZM31.0424 33.4835C30.8404 33.4835 30.6501 33.3691 30.5632 33.1824C30.4535 32.9473 30.5394 32.6694 30.7626 32.5317C36.833 28.8211 38.9152 23.1532 39.548 18.7365C38.2907 19.2727 36.9244 19.5533 35.5426 19.5533C30.0265 19.5533 25.5391 15.167 25.5391 9.77711C25.5391 4.38626 30.0264 2.37942e-09 35.5426 2.37942e-09C38.2943 -5.77436e-05 40.7139 1.05096 42.5393 3.03858C44.2092 4.85631 45.3303 7.38199 45.782 10.3419C47.109 19.0484 42.4478 30.1098 31.1961 33.4612C31.1449 33.4764 31.0936 33.4835 31.0424 33.4835V33.4835Z"
                                      fill="#8A5A0D"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                            </div>
                            <div className="tp-testimonial__content">
                              <p>
                                
                              If there is one thing serving as a full service digital agency for more than a decade taught us, it has to be the value of relationships. Therefore, our relationship with our clients is both a priority and a point of pride to us.                              </p>
                              <div className="tp-testimonial__author">
                                <h3 className="tp-testimonial__author-title">
                                FAIRFOX - EON
                                </h3>
                                <span className="tp-testimonial__author-designation">
                                  
                            
                                  <span>Marketing Head</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide>
                          <div className="tp-testimonial__item">
                            <div className="tp-testimonial__thumb-box mb-25 d-flex align-items-center justify-content-between">
                              <div className="tp-testimonial__thumb">
                                {/* <img
                                  decoding="async"
                                  src="https://ritzmediaworld.com//webroot/images/gallery/6106855b-46a9-5a43-b168-7d6774383544_1460_550.png"
                                  alt=""
                                /> */}
                              </div>
                              <div className="tp-testimonial__icon">
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="46"
                                    height="34"
                                    viewBox="0 0 46 34"
                                    fill="none"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M14.6491 17.336C14.7498 17.336 14.8503 17.3637 14.9371 17.4201C15.1018 17.5246 15.1932 17.7105 15.1731 17.9017C14.885 20.6874 14.1452 23.2837 12.9738 25.6189C11.9386 27.6816 10.5833 29.4923 8.92531 31.0312C17.0185 26.8031 20.3125 17.782 19.2013 10.4938C18.5036 5.91889 15.7208 1.02949 10.0035 1.02949C5.06897 1.02946 1.05343 4.95374 1.05343 9.77708C1.05352 14.5995 5.06894 18.5238 10.0035 18.5238C11.5416 18.5237 13.0578 18.1359 14.3902 17.4022C14.4707 17.3575 14.5603 17.3361 14.6491 17.336L14.6491 17.336ZM5.50434 33.4835C5.30218 33.4835 5.11197 33.3691 5.02418 33.1823C4.91534 32.9473 5.00041 32.6694 5.22444 32.5317C11.2939 28.8211 13.377 23.1532 14.0099 18.7365C12.7525 19.2727 11.3853 19.5533 10.0036 19.5533C4.4874 19.5533 0 15.167 0 9.77711C8.867e-05 4.38626 4.48738 2.37942e-09 10.0036 2.37942e-09C12.7562 -5.77435e-05 15.1759 1.05096 17.0012 3.03858C18.671 4.85631 19.7922 7.38199 20.243 10.3428C21.5709 19.0484 16.9097 30.1098 5.65795 33.4612C5.60672 33.4764 5.55458 33.4835 5.50436 33.4835L5.50434 33.4835Z"
                                      fill="#8A5A0D"
                                    ></path>
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M40.1872 17.336C40.2878 17.336 40.3884 17.3637 40.4762 17.4201C40.6408 17.5246 40.7313 17.7105 40.7121 17.9018C40.4241 20.6874 39.6834 23.2837 38.5119 25.6189C37.4768 27.6816 36.1224 29.4923 34.4644 31.0313C42.5558 26.8031 45.8506 17.7821 44.7395 10.4938C44.0418 5.91889 41.2599 1.02949 35.5426 1.02949C30.6071 1.02946 26.5925 4.95374 26.5925 9.77708C26.5926 14.5995 30.6071 18.5238 35.5426 18.5238C37.0799 18.5237 38.597 18.1359 39.9294 17.4022C40.0099 17.3575 40.0985 17.3361 40.1872 17.3361L40.1872 17.336ZM31.0424 33.4835C30.8404 33.4835 30.6501 33.3691 30.5632 33.1824C30.4535 32.9473 30.5394 32.6694 30.7626 32.5317C36.833 28.8211 38.9152 23.1532 39.548 18.7365C38.2907 19.2727 36.9244 19.5533 35.5426 19.5533C30.0265 19.5533 25.5391 15.167 25.5391 9.77711C25.5391 4.38626 30.0264 2.37942e-09 35.5426 2.37942e-09C38.2943 -5.77436e-05 40.7139 1.05096 42.5393 3.03858C44.2092 4.85631 45.3303 7.38199 45.782 10.3419C47.109 19.0484 42.4478 30.1098 31.1961 33.4612C31.1449 33.4764 31.0936 33.4835 31.0424 33.4835V33.4835Z"
                                      fill="#8A5A0D"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                            </div>
                            <div className="tp-testimonial__content">
                              <p>
                                
                              They not only make sure that they deliver on their promises, but also educate you on what exactly is needed to be done for your brand, thereby preventing you from under or over spending your precious money.                              </p>
                              <div className="tp-testimonial__author">
                                <h3 className="tp-testimonial__author-title">
                                Eldeco Group
                                </h3>
                                <span className="tp-testimonial__author-designation">
                                  
                                  
                                  <span> Managing Director</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide>
                          <div className="tp-testimonial__item">
                            <div className="tp-testimonial__thumb-box mb-25 d-flex align-items-center justify-content-between">
                              <div className="tp-testimonial__thumb">
                                {/* <img
                                  decoding="async"
                                  src="https://ritzmediaworld.com//webroot/images/gallery/6106855b-46a9-5a43-b168-7d6774383544_1460_550.png"
                                  alt=""
                                /> */}
                              </div>
                              <div className="tp-testimonial__icon">
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="46"
                                    height="34"
                                    viewBox="0 0 46 34"
                                    fill="none"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M14.6491 17.336C14.7498 17.336 14.8503 17.3637 14.9371 17.4201C15.1018 17.5246 15.1932 17.7105 15.1731 17.9017C14.885 20.6874 14.1452 23.2837 12.9738 25.6189C11.9386 27.6816 10.5833 29.4923 8.92531 31.0312C17.0185 26.8031 20.3125 17.782 19.2013 10.4938C18.5036 5.91889 15.7208 1.02949 10.0035 1.02949C5.06897 1.02946 1.05343 4.95374 1.05343 9.77708C1.05352 14.5995 5.06894 18.5238 10.0035 18.5238C11.5416 18.5237 13.0578 18.1359 14.3902 17.4022C14.4707 17.3575 14.5603 17.3361 14.6491 17.336L14.6491 17.336ZM5.50434 33.4835C5.30218 33.4835 5.11197 33.3691 5.02418 33.1823C4.91534 32.9473 5.00041 32.6694 5.22444 32.5317C11.2939 28.8211 13.377 23.1532 14.0099 18.7365C12.7525 19.2727 11.3853 19.5533 10.0036 19.5533C4.4874 19.5533 0 15.167 0 9.77711C8.867e-05 4.38626 4.48738 2.37942e-09 10.0036 2.37942e-09C12.7562 -5.77435e-05 15.1759 1.05096 17.0012 3.03858C18.671 4.85631 19.7922 7.38199 20.243 10.3428C21.5709 19.0484 16.9097 30.1098 5.65795 33.4612C5.60672 33.4764 5.55458 33.4835 5.50436 33.4835L5.50434 33.4835Z"
                                      fill="#8A5A0D"
                                    ></path>
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M40.1872 17.336C40.2878 17.336 40.3884 17.3637 40.4762 17.4201C40.6408 17.5246 40.7313 17.7105 40.7121 17.9018C40.4241 20.6874 39.6834 23.2837 38.5119 25.6189C37.4768 27.6816 36.1224 29.4923 34.4644 31.0313C42.5558 26.8031 45.8506 17.7821 44.7395 10.4938C44.0418 5.91889 41.2599 1.02949 35.5426 1.02949C30.6071 1.02946 26.5925 4.95374 26.5925 9.77708C26.5926 14.5995 30.6071 18.5238 35.5426 18.5238C37.0799 18.5237 38.597 18.1359 39.9294 17.4022C40.0099 17.3575 40.0985 17.3361 40.1872 17.3361L40.1872 17.336ZM31.0424 33.4835C30.8404 33.4835 30.6501 33.3691 30.5632 33.1824C30.4535 32.9473 30.5394 32.6694 30.7626 32.5317C36.833 28.8211 38.9152 23.1532 39.548 18.7365C38.2907 19.2727 36.9244 19.5533 35.5426 19.5533C30.0265 19.5533 25.5391 15.167 25.5391 9.77711C25.5391 4.38626 30.0264 2.37942e-09 35.5426 2.37942e-09C38.2943 -5.77436e-05 40.7139 1.05096 42.5393 3.03858C44.2092 4.85631 45.3303 7.38199 45.782 10.3419C47.109 19.0484 42.4478 30.1098 31.1961 33.4612C31.1449 33.4764 31.0936 33.4835 31.0424 33.4835V33.4835Z"
                                      fill="#8A5A0D"
                                    ></path>
                                  </svg>
                                </span>
                              </div>
                            </div>
                            <div className="tp-testimonial__content">
                              <p>
                              I must admit that RMW and its team of professionals are always on my favourite list. They have always delivered the best services to me even if they had to put in extra efforts and their team has always been available for extensive support. 
                                </p>
                              <div className="tp-testimonial__author">
                                <h3 className="tp-testimonial__author-title">
                                Escorts Tractor
                                </h3>
                                <span className="tp-testimonial__author-designation">
                                  

                                  <span>                                  Chief Communication Officer</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>

                       
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Feedback;
