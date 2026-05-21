"use client";

import { useRef, useState } from "react";
import styles from "./page.module.css";

const LANDSCAPE_VIDEOS = [
  { id: "landscape-1", src: "/services/walkthrough/videos/RMW_PRESENT.mp4", title: "RMW Present" },
  { id: "landscape-2", src: "/services/walkthrough/videos/RMW_PRESENT2.mp4", title: "RMW Present 2" },
  {
    id: "landscape-3",
    src: "/services/walkthrough/videos/construction_video.mp4",
    title: "Construction",
  },
  { id: "landscape-4", src: "/services/walkthrough/videos/RMW_PRESENT3.mp4", title: "RMW Present 3" },
  { id: "landscape-5", src: "/services/walkthrough/videos/Rmw-Brand.mp4", title: "RMW Brand" },
  {
    id: "landscape-6",
    src: "/services/walkthrough/videos/Service-reel-revised.mp4",
    title: "Service Reel Revised",
  },
];

const PORTRAIT_VIDEOS = [
  {
    id: "portrait-1",
    src: "/services/walkthrough/videos/Edelstein-Abode-Service-Reel.mp4",
    title: "Edelstein Abode Service Reel",
  },
  {
    id: "portrait-2",
    src: "/services/walkthrough/videos/Service-reel-6th-F.mp4",
    title: "Service Reel 6th F",
  },
  {
    id: "portrait-3",
    src: "/services/walkthrough/videos/Service-reel-revised.mp4",
    title: "Service Reel Revised",
  },
  {
    id: "portrait-4",
    src: "/services/walkthrough/videos/Service-reel-5th.mp4",
    title: "Service Reel 5th",
  },
];

function PlayIcon() {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/90 sm:h-[80px] sm:w-[80px]">
      <svg
        viewBox="0 0 24 24"
        fill="white"
        className="h-6 w-6 sm:h-9 sm:w-9"
        aria-hidden
      >
        <path d="M8 5.14v14.72a1 1 0 0 0 1.5.86l11.04-7.36a1 1 0 0 0 0-1.72L9.5 4.28a1 1 0 0 0-1.5.86z" />
      </svg>
    </span>
  );
}

function VideoCard({ video, aspectClass, playingId, onToggle, videoRefs }) {
  const isPlaying = playingId === video.id;

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#0a1128] ${aspectClass}`}
    >
      <video
        ref={(el) => {
          videoRefs.current[video.id] = el;
        }}
        src={video.src}
        title={video.title}
        className="h-full w-full object-cover"
        muted
        playsInline
        preload="metadata"
        onEnded={() => onToggle(video.id, true)}
        onClick={() => onToggle(video.id)}
      />

      {!isPlaying && (
        <button
          type="button"
          className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-black/15 transition-colors hover:bg-black/25"
          onClick={() => onToggle(video.id)}
          aria-label={`Play ${video.title}`}
        >
          <PlayIcon />
        </button>
      )}
    </div>
  );
}

export default function Section3() {
  const videoRefs = useRef({});
  const [playingId, setPlayingId] = useState(null);

  const togglePlay = (id, ended = false) => {
    if (ended) {
      setPlayingId(null);
      return;
    }

    const video = videoRefs.current[id];
    if (!video) return;

    if (playingId === id) {
      video.pause();
      setPlayingId(null);
      return;
    }

    Object.entries(videoRefs.current).forEach(([key, el]) => {
      if (!el || key === id) return;
      el.pause();
      el.currentTime = 0;
    });

    video.play().catch(() => {});
    setPlayingId(id);
  };

  return (
    <section className="w-full bg-white px-0 pb-[35px] sm:px-0 lg:pb-[70px]">
      <div className={`mx-auto w-full ${styles.containerWidth}`}>
        <h2
          className="mb-8 text-center md:text-[26px] text-[20px] font-normal leading-[36px] text-[#000000] sm:mb-10 sm:text-[28px] md:mb-10 md:text-[30px] md:leading-[42px] lg:mb-12"
          style={{
            fontFamily: "MontserratRegular, Montserrat, sans-serif",
            fontWeight: 400,
          }}
        >
          Walkthrough Showcase
        </h2>

        {/* Landscape — mobile 1, md+ 2 per row */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 md:gap-4 lg:gap-5 xl:gap-6">
          {LANDSCAPE_VIDEOS.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              aspectClass="aspect-video"
              playingId={playingId}
              onToggle={togglePlay}
              videoRefs={videoRefs}
            />
          ))}
        </div>

        {/* Portrait reels — mobile 1, md 2, lg/xl 4 */}
        <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:gap-4 md:mt-4 md:grid-cols-2 md:gap-4 lg:mt-5 lg:grid-cols-4 lg:gap-5 xl:mt-6 xl:gap-6">
          {PORTRAIT_VIDEOS.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              aspectClass="aspect-[9/16]"
              playingId={playingId}
              onToggle={togglePlay}
              videoRefs={videoRefs}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
