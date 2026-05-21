"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./page.module.css";
import accordionStyles from "./Section4.module.css";

const PROPERTY_TYPES = [
  {
    icon: "/varun.icon/Residential.svg",
    label: "Residential Apartments",
  },
  { icon: "/varun.icon/Villas.svg", label: "Villas & Bungalows" },
  { icon: "/varun.icon/Commercial.svg", label: "Commercial Towers" },
  { icon: "/varun.icon/Townships.svg", label: "Townships" },
];

const SERVICES = [
  {
    id: "01",
    title: "3D Architectural Walkthrough Animation",
    description:
      "A fully animated cinematic video showing you around the development, from the outside of the building, through to the lobby and individual apartments, leisure facilities, grounds. The walkthrough animations are photoreal lit, natural camera movement with ambient sound for a full, emotional, walkthrough.",
    video: "/services/walkthrough/videos/RMW_PRESENT3.mp4",
    propertyTypes: PROPERTY_TYPES,
  },
  {
    id: "02",
    title: "360° Virtual Property Tour",
    description:
    "A fully animated cinematic video showing you around the development, from the outside of the building, through to the lobby and individual apartments, leisure facilities, grounds. The walkthrough animations are photoreal lit, natural camera movement with ambient sound for a full, emotional, walkthrough.",
  video: "/services/walkthrough/videos/RMW_PRESENT3.mp4",
  propertyTypes: PROPERTY_TYPES,
  },
  {
    id: "03",
    title: "3D Aerial Flythrough Animation",
    description:
    "A fully animated cinematic video showing you around the development, from the outside of the building, through to the lobby and individual apartments, leisure facilities, grounds. The walkthrough animations are photoreal lit, natural camera movement with ambient sound for a full, emotional, walkthrough.",
  video: "/services/walkthrough/videos/RMW_PRESENT3.mp4",
  propertyTypes: PROPERTY_TYPES,
  },
  {
    id: "04",
    title: "Interior Walkthrough Animation",
    description:
    "A fully animated cinematic video showing you around the development, from the outside of the building, through to the lobby and individual apartments, leisure facilities, grounds. The walkthrough animations are photoreal lit, natural camera movement with ambient sound for a full, emotional, walkthrough.",
  video: "/services/walkthrough/videos/RMW_PRESENT3.mp4",
  propertyTypes: PROPERTY_TYPES,
  },
  {
    id: "05",
    title: "VR Walkthrough Experience",
    description:
    "A fully animated cinematic video showing you around the development, from the outside of the building, through to the lobby and individual apartments, leisure facilities, grounds. The walkthrough animations are photoreal lit, natural camera movement with ambient sound for a full, emotional, walkthrough.",
  video: "/services/walkthrough/videos/RMW_PRESENT3.mp4",
  propertyTypes: PROPERTY_TYPES,
  },
];

function PlayShowreelOverlay({ onPlay }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center gap-3 bg-black/20 transition-colors hover:bg-black/30"
      aria-label="Play showreel"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/90 sm:h-[72px] sm:w-[72px]">
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="h-7 w-7 sm:h-8 sm:w-8"
          aria-hidden
        >
          <path d="M8 5.14v14.72a1 1 0 0 0 1.5.86l11.04-7.36a1 1 0 0 0 0-1.72L9.5 4.28a1 1 0 0 0-1.5.86z" />
        </svg>
      </span>
      <span
        className="text-[14px] font-medium text-white sm:text-[16px]"
        style={{ fontFamily: "MontserratMedium, Montserrat, sans-serif" }}
      >
        Play Showreel
      </span>
    </button>
  );
}

function RichServicePanel({ item, onClose, videoRef, videoPlaying, playShowreel, setVideoPlaying }) {
  return (
    <div className="pt-5 pb-8 sm:pt-6  md:pb-12 ">
      <div
        className={`flex w-full flex-col-reverse  items-center justify-between gap-6 md:flex-row md:items-stretch ${accordionStyles.row}`}
      >
        <div className={`min-w-0 w-full md:w-[calc(100%-477px)] ${accordionStyles.leftCol}`}>
          <span
            className="block text-[16px] font-medium leading-none text-[#111111] sm:text-[18px]"
            style={{
              fontFamily: "MontserratMedium, Montserrat, sans-serif",
            }}
          >
            {item.id}
          </span>

          <h3
            className="mt-3 max-w-[500px] text-[22px] font-semibold leading-[32px] text-[#111111] sm:mt-4 sm:text-[26px] sm:leading-[38px] md:text-[30px] md:leading-[44px]"
            style={{
              fontFamily: "MontserratSemiBold, Montserrat, sans-serif",
              fontWeight: 600,
            }}
          >
            {item.title}
          </h3>

          <p
            className="mt-5 max-w-full text-[15px] leading-[26px] text-[#111111] sm:mt-6 sm:text-[16px] sm:leading-[28px] md:mt-8"
            style={{
              fontFamily: "OpenSansRegular, Open Sans, sans-serif",
              fontWeight: 400,
            }}
          >
            {item.description}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-6 sm:mt-10 sm:grid-cols-4 sm:gap-x-4 md:mt-6">
            {item.propertyTypes.map((type) => (
              <div
                key={type.label}
                className="flex flex-col items-center text-center"
              >
                <Image
                  src={type.icon}
                  alt=""
                  width={48}
                  height={48}
                  className="h-10 w-10 sm:h-12 sm:w-12"
                />
                <p
                  className="mt-3 text-[11px] font-semibold leading-[16px] text-[#C99237] sm:text-[14px] sm:leading-[20px]"
                  style={{
                    fontFamily: "OpenSansSemiBold, Open Sans, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  {type.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={`h-auto w-full shrink-0 md:w-[477px] ${accordionStyles.imgCol}`}>
          <div className="mb-3 flex justify-end sm:mb-4">
            <button
              type="button"
              onClick={onClose}
              className="flex shrink-0  items-center justify-center"
              aria-label={`Close ${item.title}`}
            >
              <Image
                src="/varun.icon/cross-content-marketing.svg"
                alt=""
                width={28}
                height={28}
                className="h-6 w-6 sm:h-7 sm:w-7"
              />
            </button>
          </div>
          <div className="relative w-full overflow-hidden bg-[#0a1128]">
            <video
              ref={videoRef}
              src={item.video}
              className="block h-auto w-full object-cover"
              muted
              playsInline
              preload="metadata"
              onEnded={() => setVideoPlaying(false)}
              onClick={() => {
                if (!videoPlaying) playShowreel();
              }}
            />
            {!videoPlaying && <PlayShowreelOverlay onPlay={playShowreel} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Section4() {
  const [openId, setOpenId] = useState("01");
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
    setVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const playShowreel = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
    setVideoPlaying(true);
  };

  return (
    <section
      className={`flex w-full items-center justify-center bg-white pb-[35px] lg:pb-[70px] ${accordionStyles.root}`}
    >
      <div className={`w-full ${styles.containerWidth} ${accordionStyles.container}`}>
        <h2
          className="mb-8 text-center text-[32px] font-semibold leading-[40px] text-[#111111] sm:mb-10 sm:text-[40px] md:mb-12 md:text-[45px] md:leading-[54px]"
          style={{
            fontFamily: "MontserratSemiBold, Montserrat, sans-serif",
            fontWeight: 600,
          }}
        >
          Our Services
        </h2>

        <div className="border-t border-[#222222]">
          {SERVICES.map((item) => {
            const isOpen = openId === item.id;
            const hasRichContent = Boolean(item.video && item.propertyTypes);

            return (
              <div key={item.id} className="border-b border-[#22222]">
                {!(isOpen && hasRichContent) && (
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className="flex w-full items-start cursor-pointer justify-between gap-4 py-5 text-left sm:gap-6 sm:py-6 md:py-7"
                    aria-expanded={isOpen}
                  >
                    <div className="flex min-w-0 flex-1 items-center">
                      <h3
                        className="min-w-0 text-[18px] font-semibold leading-[26px] text-[#111111] sm:text-[20px] sm:leading-[28px] lg:text-[22px]"
                        style={{
                          fontFamily: "MontserratSemiBold, Montserrat, sans-serif",
                          fontWeight: 600,
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <span className="mt-1 flex shrink-0 items-center justify-center">
                      {isOpen ? (
                        <Image
                          src="/varun.icon/cross-content-marketing.svg"
                          alt=""
                          width={28}
                          height={28}
                          className="h-6 w-6 sm:h-7 sm:w-7"
                        />
                      ) : (
                        <span
                          className="select-none text-[28px] font-light leading-none text-[#6E6E6E] sm:text-[32px]"
                          aria-hidden
                        >
                          +
                        </span>
                      )}
                    </span>
                  </button>
                )}

                <div
                  className={`${accordionStyles.accordionContent} ${
                    isOpen
                      ? accordionStyles.accordionContentOpen
                      : accordionStyles.accordionContentClosed
                  }`}
                >
                  {isOpen && hasRichContent ? (
                    <RichServicePanel
                      item={item}
                      onClose={() => toggleItem(item.id)}
                      videoRef={videoRef}
                      videoPlaying={videoPlaying}
                      playShowreel={playShowreel}
                      setVideoPlaying={setVideoPlaying}
                    />
                  ) : (
                    isOpen &&
                    item.description && (
                      <div className="pb-6 sm:pb-8">
                        <p
                          className="text-[15px] leading-[26px] text-[#111111] sm:text-[16px] sm:leading-[28px]"
                          style={{
                            fontFamily: "OpenSansRegular, Open Sans, sans-serif",
                          }}
                        >
                          {item.description}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
