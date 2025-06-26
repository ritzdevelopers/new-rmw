"use client";

// import { notFound } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  FaVolumeMute,
  FaVolumeUp,
  FaPlay,
  FaPause,
  FaShareAlt,
} from "react-icons/fa";

const stories = [
  {
    id: 1,
    slug: "how-money-is-made",
    title: "How money is made",
    slides: [
      {
        type: "image",
        text: "Money is made by printing presses in secure facilities.",
        image: "/storytestimg.jpg",
      },
      {
        type: "video",
        text: "Modern currency includes watermarks, threads, and holograms.",
        image: "/storytestvid.mp4",
      },
    ],
  },
  {
    id: 2,
    slug: "burger-sisters-of-kenya",
    title: "The burger sisters of Kenya",
    slides: [
      {
        type: "video",
        text: "Meet two sisters who launched Kenya's best burger spot.",
        image: "/slides/burger1.jpg",
      },
    ],
  },
  {
    id: 3,
    slug: "fashion-bright-future",
    title: "11 designers who represent fashion's bright future",
    slides: [
      {
        type: "image",
        text: "These young designers are redefining fashion today.",
        image: "/slides/fashion1.jpg",
      },
    ],
  },
];

export default function StoryPage({ params }: { params: { storyId: string } }) {
  const story = stories.find((s) => s.slug === params.storyId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const backgroundVideoRef = useRef<HTMLVideoElement | null>(null);
  const mainVideoRef = useRef<HTMLVideoElement | null>(null); // your existing videoRef can be reused
   const currentSlide = story?.slides?.[currentIndex];

// ✅ Pause background video + add 1 min cap on video
useEffect(() => {
  if (!currentSlide) return;

  if (backgroundVideoRef.current) {
    backgroundVideoRef.current.pause();
  }

  if (currentSlide.type === "video" && mainVideoRef.current) {
    const video = mainVideoRef.current;

    const onTimeUpdate = () => {
      if (video.currentTime >= 60) {
        video.pause();
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }
}, [currentSlide]);

// ✅ Auto-advance after 10s
useEffect(() => {
  if (!isPaused) {
    const timer = setTimeout(() => {
      goToNext();
    }, 10000);
    return () => clearTimeout(timer);
  }
}, [currentIndex, isPaused]); // 👈 also fix missing dependency

// ✅ Sync muted/paused state
useEffect(() => {
  if (!currentSlide) return;
  if (videoRef.current) {
    videoRef.current.muted = isMuted;
    if (isPaused) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }
}, [isMuted, isPaused, currentSlide]);

// ✅ Render fallback when story is not ready
if (!story || !currentSlide) {
  return <div>Loading...</div>; // Or show spinner, etc.
}
  
  
  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? story.slides.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % story.slides.length);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: story.title,
          text: currentSlide.text,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      alert("Share not supported in this browser.");
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  const togglePause = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPaused((prev) => !prev);
  };

  return (
    <div
      className="position-relative d-flex align-items-center justify-content-center vh-100 vw-100 text-white overflow-hidden"
      onClick={goToNext}
      style={{
        cursor: "pointer",
        zIndex: 10000,
        padding: 0,
        margin: 0,
        border: "none",
      }}
    >
      {currentSlide.type === "video" ? (
        <video
          ref={backgroundVideoRef}
          src={currentSlide.image}
          muted
          playsInline
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            objectFit: "cover",
            filter: "blur(20px) brightness(0.6)",
            transform: "scale(1.08)",
            zIndex: 0,
            border: "none",
            outline: "none",
            boxShadow: "none",
          }}
        />
      ) : (
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: `url(${currentSlide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(20px) brightness(0.6)",
            transform: "scale(1.08)", // ✅ Same fix here
            zIndex: 0,
          }}
        />
      )}

      {/* Controls */}

      {/* Arrows */}
      <button
        className="position-absolute rounded-circle border-0 d-flex align-items-center justify-content-center"
        style={{
          left: "calc(50% - 210px)",
          width: "40px",
          height: "40px",
          backgroundColor: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(6px)",
          zIndex: 10,
        }}
        onClick={(e) => {
          e.stopPropagation();
          goToPrev();
        }}
      >
        <FiChevronLeft size={22} color="#fff" />
      </button>

      <div
        className="position-relative z-2 p-3 rounded-4 shadow-lg text-white"
        style={{
          width: "320px",
          height: "570px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          overflow: "hidden",
        }}
      >
        <div
          className="position-absolute top-2 end-0 d-flex gap-2 p-3"
          style={{ zIndex: 20 }}
        >
          <button
            onClick={toggleMute}
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "28px",
              height: "28px",
              background: "rgba(100, 100, 100, 0.4)"
,
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "#fff",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1.0)")
            }
          >
            {isMuted ? <FaVolumeMute size={12} /> : <FaVolumeUp size={12} />}
          </button>

          <button
            onClick={togglePause}
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "28px",
              height: "28px",
              background: "rgba(100, 100, 100, 0.4)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "#fff",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1.0)")
            }
          >
            {isPaused ? <FaPlay size={12} /> : <FaPause size={12} />}
          </button>

          <button
            onClick={handleShare}
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "28px",
              height: "28px",
               background: "rgba(100, 100, 100, 0.4)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "#fff",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1.0)")
            }
          >
            <FaShareAlt size={12} />
          </button>
        </div>

        {currentSlide.type === "video" ? (
          <video
            ref={(el) => {
              mainVideoRef.current = el;
              videoRef.current = el;
            }}
            src={currentSlide.image}
            autoPlay
            muted
            playsInline
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ objectFit: "cover", zIndex: 0 }}
          />
        ) : (
          <img
            src={currentSlide.image}
            alt="slide background"
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ objectFit: "cover", zIndex: 0 }}
          />
        )}

        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1))",
            zIndex: 1,
          }}
        ></div>

        <div className="d-flex w-100 mb-3" style={{ gap: "2px" }}>
          {story.slides.map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-pill position-relative"
              style={{
                flex: 1,
                height: "2px",
                backgroundColor: "rgba(255,255,255,0.3)",
                overflow: "hidden",
                borderRadius:"30%"
              }}
            >
              <div
                className="position-absolute top-0 start-0 h-100 bg-white"
                style={{
                  width:
                    i < currentIndex
                      ? "100%"
                      : i === currentIndex
                      ? "100%"
                      : "0%",
                  animation:
                    i === currentIndex
                      ? "fillProgress 10s linear forwards"
                      : "none",
                }}
              ></div>
            </div>
          ))}
        </div>

        {/* optional can be added or cannot  */}

        <div className="position-relative z-2 h-100 d-flex flex-column justify-content-end">
          <div className="text-white fw-bold fs-6 mb-2">
            {currentSlide.text}
          </div>
        </div>
      </div>

      <button
        className="position-absolute rounded-circle border-0 d-flex align-items-center justify-content-center"
        style={{
          right: "calc(50% - 210px)",
          width: "40px",
          height: "40px",
          backgroundColor: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(6px)",
          zIndex: 10,
        }}
        onClick={(e) => {
          e.stopPropagation();
          goToNext();
        }}
      >
        <FiChevronRight size={22} color="#fff" />
      </button>
    </div>
  );
}
