"use client";
import Accordion from "@/components/Accordian";
// import { useState } from "react";

interface ServiceItem {
  title: string;
  description: string;
  link: string;
}

interface ServiceProps {
  data: ServiceItem[];
}

const Service: React.FC<ServiceProps> = ({ data }) => {
  return (
    <div className="tp-service__area fix tp-bg-class">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-services__title-box mb-45">
              <span className="tp-section-title-pre mb-30">Services</span>
              <div className="tp-section-title-wrap d-md-flex align-items-center justify-content-between">
                <h3 className="tp-section-title">
                  What We Provide
                  <br />
                  <span>
                    <i
                      style={{ top: "-18px", fontSize: "22px" }}
                      className="tp-hero__subtitle mb-10"
                    >
                      is more than what you’ll ever need
                    </i>
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Accordion Section */}
      <div
        style={{
          backgroundColor: "#FFA122",
        }}
      >
        <div className="container">
          <div
            className="row align-items-center "
            style={{
              backgroundColor: "#FFA122",
              paddingTop: "1rem",
            }}
          >
            <div className="col-xl-6 gx-0">
              <Accordion data={data} />
            </div>

            {/* Image Section */}
            <div className="col-xl-6">
              <div className="tp-services__thumb">
                <div
                  className=""
                  style={{ position: "relative", width: "60%", margin: "auto" }}
                >
                  <img
                    src="/home-images/mobile-frame-img.png"
                    alt="mobile"
                    style={{ width: "100%" }}
                  />
                  <video
                    src="/test-images/test-video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "5px",
                      width: "95%",
                      zIndex: "-1",
                      borderRadius: "50px",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
