"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PagesBannerProps {
  headingTitle: string;
}
const PagesBanner: React.FC<PagesBannerProps> = ({ headingTitle }) => {
  const heading = headingTitle.toUpperCase()
  const [svgSize, setSvgSize] = useState({ width: 300, height: 200 });
  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      if (w < 768) {
        // Width less than 768: width 300, height 280
        setSvgSize({ width: 300, height: 200 });
      } else if (w >= 768 && w < 1024) {
        // Width between 768 and 1024: width 768, height 300
        setSvgSize({ width: 768, height: 300 });
      } else {
        // Width 1024 and above: width 800, height 350
        setSvgSize({ width: 800, height: 350 });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const { width: svgWidth, height: svgHeight } = svgSize;
  const fontSizeClamp = 'clamp(2.8rem, 8vw, 6rem)';

  // vertical position centered roughly in the SVG
  const textY = svgHeight / 2;
  return (
    <section className="breadcrumb__area fix p-relative breadcrumb__plr breadcrumb__overlay breadcrumb__bg">
     
      <div className="breadcrumb__shape">
      
      </div>
      <div className="container">
        <div className="row">
          <div className="col-xxl-12">
            <div className="breadcrumb__content text-center p-relative z-index-2">
              <div className="breadcrumb__list">
                {/* <!-- Breadcrumb NavXT 7.4.1 --> */}
                <span property="itemListElement" typeof="ListItem">
                  <Link
                    property="item"
                    typeof="WebPage"
                    title="Go to Ritz Media World."
                    href="/"
                    className="home"
                  ></Link>
                  <meta property="position" content="1" />
                </span>
              </div>
           
              <div
                style={{
                  width: '100%',
                  maxWidth: svgWidth,
                  margin: '0 auto',
                  position: 'relative',
                  height: svgHeight,
                  textAlign: 'start',
                }}
              >
                <svg
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  style={{ width: '100%', height: 'auto', aspectRatio: `${svgWidth} / ${svgHeight}` }}
                >
                  <defs>
                    <clipPath id="video-text-clip">
                      <text
                        x={svgWidth / 2} // some left padding
                        y={textY}
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fill="white"
                        fontFamily="Arial, sans-serif"
                        fontWeight="bold"
                        style={{
                          fontSize: fontSizeClamp,
                          userSelect: 'none',
                        }}
                      >
                        {heading}
                      </text>
                    </clipPath>
                  </defs>

                </svg>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    clipPath: 'url(#video-text-clip)',
                    WebkitClipPath: 'url(#video-text-clip)',
                  }}
                >
                  <video
                    src="/videos/bg_pattern2.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PagesBanner;
