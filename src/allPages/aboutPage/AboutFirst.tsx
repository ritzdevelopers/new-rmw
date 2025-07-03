"use client";

import Link from "next/link";
import { useSplitText } from "@/hooks/useSplitText";
import useGSAPHoverEffect from "@/hooks/useGSAPHoverEffect";
import PagesBanner from "@/components/pagesBanner/PagesBanner";

const AboutFirst = () => {
  // const textRefs = useSplitText();
  useGSAPHoverEffect();

  return (
    <div className="elementor-widget-container">
      <section className="tp-ab__area tp-ab__plr">
        <div className="container">
          <div className="row">
            {/* <div style={{backgroundColor:'yellowgreen'}}> */}
              <PagesBanner headingTitle={"Our Agency"}/>
            {/* </div> */}
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
