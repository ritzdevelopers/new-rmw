"use client"
import { useEffect, useState } from "react";

// import Link from "next/link";
type headingProp = {
  heading: string | null;
};
const ServiceThirdHero = ({ heading }: headingProp) => {
  const lines = heading?.toUpperCase().split(" ");
  const [svgSize, setSvgSize] = useState({ width: 300, height: 200 });
  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 628) {
        // Width less than 628: width 300, height 280
        setSvgSize({ width: 300, height: 200 });
      } else if (w >= 800 && w < 1024) {
        // Width between 628 and 1024: width 628, height 300
        setSvgSize({ width: 628, height: 300 });
      } else {
        // Width 1024 and above: width 800, height 350
        setSvgSize({ width: 800, height: 350 });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const { width: svgWidth, height: svgHeight } = svgSize;
  const fontSizeClamp = "clamp(2rem, 7vw, 5.5rem)";

  // vertical position centered roughly in the SVG
  const textY = svgHeight / 2;
  return (
    <div
      className="elementor-element elementor-element-9b5be38 e-con-full e-flex e-con e-parent e-lazyloaded"
      data-id="9b5be38"
      data-element_type="container"
      style={{ padding: "0", margin: "0" }}
    >
      <div
        className="elementor-element elementor-element-88259bc e-con-full e-flex e-con e-child"
        data-id="88259bc"
        data-element_type="container"
        style={{ padding: "0", margin: "0" }}
      >
        <div
          className="elementor-element elementor-element-3f42da0 elementor-widget elementor-widget-hero-banner"
          data-id="3f42da0"
          data-element_type="widget"
          data-widget_type="hero-banner.default"
        >
          <div className="elementor-widget-container">
            <section
              className="tp-hero__3-area fix tp-hero__3-space tp-hero__3-bg tp-hero__3-overlay p-relative tp-bg-className"
              data-background="/service-banner/Service_Bg_RMW.jpg"
              style={{
                backgroundImage: "/service-banner/Service_Bg_RMW.jpg",
              }}
            >
             

              <div className="tp-hero__3-wrap">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-xl-12">
                      <div className="tp-hero__3-title-box p-relative">
                        <div
                          style={{
                            width: "100%",
                            maxWidth: svgWidth,
                            margin: "0 auto",
                            position: "relative",
                            height: svgHeight,
                            textAlign: "start",
                            // marginTop: "90px",
                          }}
                        >
                          <svg
                            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                            style={{
                              width: "100%",
                              height: "auto",
                              aspectRatio: `${svgWidth} / ${svgHeight}`,
                            }}
                          >
                            <defs>
                              <clipPath id="video-text-clip">
                                <text
                                  x={svgWidth / 2}
                                  y={textY / 1.5}
                                  textAnchor="middle"
                                  fill="white"
                                  fontFamily="Arial, sans-serif"
                                  fontWeight="bold"
                                  style={{
                                    fontSize: fontSizeClamp,
                                    userSelect: "none",
                                  }}
                                >
                                  {lines?.map((line, index) => (
                                    <tspan
                                      key={index}
                                      x={svgWidth / 2}
                                      dy={index === 0 ? "0" : "1em"} // vertical offset between lines
                                    >
                                      {line}
                                    </tspan>
                                  ))}
                                </text>
                              </clipPath>
                            </defs>
                          </svg>
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              clipPath: "url(#video-text-clip)",
                              WebkitClipPath: "url(#video-text-clip)",
                            }}
                          >
                            <video
                              src="/videos/bg_pattern.mp4"
                              autoPlay
                              loop
                              muted
                              playsInline
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                              }}
                            />
                          </div>
                        </div>
                      </div>

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

export default ServiceThirdHero;
