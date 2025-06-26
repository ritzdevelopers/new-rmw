"use client";

import Link from "next/link";
import { useSplitText } from "@/hooks/useSplitText";
import useGSAPHoverEffect from "@/hooks/useGSAPHoverEffect";

const AboutFirst = () => {
  const textRefs = useSplitText();
  useGSAPHoverEffect();

  return (
    <div className="elementor-widget-container">
      <section className="tp-ab__area tp-ab__plr">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-lg-8">
              <div className="tp-ab__title-box">
                <h3
                  ref={(el) => {
                    if (el) textRefs.current.push(el);
                  }}
                  className="tp-ab__title tp-split__text tp-split__in-right"
                >
                  About the Agency <br />
                  &amp; Legacy
                </h3>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4">
              <div className="tp-ab__btn-wrap text-center text-lg-end">
                <div className="tp-hover__btn-wrap tp-btn__bounce">
                  <Link
                    className="tp-hover__btn tp-hover__btn-item"
                    href="/contact"
                    target="_self"
                    rel="nofollow"
                  >
                    <span className="tp-btn__circle-text">
                      LET&#039;S TALK TODAY
                    </span>
                    <span className="tp-btn__circle-arrow">
                      <svg
                        width="26"
                        height="27"
                        viewBox="0 0 26 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 25.37L23.8469 2.52313M1 1H25.37V25.37"
                          stroke="black"
                          strokeLinecap="square"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tp-ab__thumb pt-100 text-center">
          <img decoding="async" src="/about-images/First_Banner.jpg" alt="" />
        </div>
      </section>
    </div>
  );
};

export default AboutFirst;
