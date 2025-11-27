"use client";
import React, { useRef, useState, useEffect } from "react";

function S51() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSource, setVideoSource] = useState("/new-page/dekstop-vd.mp4");

  // Detect screen size for responsive video
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVideoSource("/new-page/mobile-vd.mp4");
      } else if (width >= 768 && width < 1024) {
        setVideoSource("/new-page/tab-vd.mp4");
      } else {
        setVideoSource("/new-page/dekstop-vd.mp4");
      }
      
      // Reload video when source changes
      if (videoRef.current) {
        videoRef.current.load();
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle play button click
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // Stop video when clicking anywhere on website (except the play button)
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't stop if clicking on the play button or its children
      if (playButtonRef.current && playButtonRef.current.contains(target)) {
        return;
      }
      
      // Don't stop if clicking on the video element itself
      if (videoRef.current && videoRef.current.contains(target)) {
        return;
      }
      
      if (videoRef.current && isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    if (isPlaying) {
      document.addEventListener("click", handleDocumentClick);
      return () => document.removeEventListener("click", handleDocumentClick);
    }
  }, [isPlaying]);

  // Handle section click to stop video
  const handleSectionClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Don't stop if clicking on the play button or its children
    if (playButtonRef.current && playButtonRef.current.contains(target)) {
      return;
    }
    
    // Don't stop if clicking on the video element itself
    if (videoRef.current && videoRef.current.contains(target)) {
      return;
    }
    
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section 
      className="w-full overflow-hidden overflow-x-hidden overflow-y-hidden min-h-[664px] lg:min-h-screen flex justify-center items-center"
      onClick={handleSectionClick}
    >
      <div className="w-full h-full relative max-w-full overflow-x-hidden overflow-y-hidden">
        {/* Video Background */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover max-w-full"
          loop
          muted
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={videoSource} type="video/mp4" />
        </video>

        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content - Hide when video is playing */}
        {!isPlaying && (
          <div className="absolute top-1/2 transform -translate-y-1/2 inset-0 flex flex-col items-center px-4 py-6 z-10 transition-opacity duration-300 overflow-x-hidden overflow-y-hidden max-w-full max-h-full">
            <div className="flex flex-col items-center justify-center w-full h-full max-w-full max-h-full overflow-x-hidden overflow-y-hidden pb-8">       
              {/* Custom Play Button */}
              <button
                ref={playButtonRef}
                onClick={handlePlayClick}
                className="pulse-button w-[88px] h-[88px] sm:w-[110px] sm:h-[110px] rounded-full cursor-pointer flex items-center justify-center transition-opacity hover:opacity-90 focus:outline-none aspect-square"
                aria-label="Play video"
              >
                {/* Pulsing background behind border */}
                <div className="pulse-border-bg" />
                
                {/* Outer white border */}
                <div className="absolute inset-0 rounded-full z-20" />
                
                {/* Play Icon */}
                <svg
                  className="relative z-30 w-[30%] h-[30%] text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default S51;
