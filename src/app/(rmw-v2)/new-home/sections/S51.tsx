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
      className="w-screen h-[664px] lg:h-screen flex justify-center items-center"
      onClick={handleSectionClick}
    >
      <div className="w-full h-full relative">
        {/* Video Background */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
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
          <div className="absolute h-[284px] top-1/2 transform -translate-y-1/2 inset-0 flex flex-col items-center px-4 py-6 z-10 transition-opacity duration-300">
            <div className="flex flex-col items-center justify-between w-full h-full gap-8">
              <h2 className="mt-4 font-[600] text-[22px] xs:text-[28px] sm:text-[36px] md:text-[44px] lg:text-[48px] leading-tight text-white text-center max-w-[90vw]">
                Making Your Business Unique
              </h2>
              
              {/* Custom Play Button */}
              <button
                ref={playButtonRef}
                onClick={handlePlayClick}
                className="relative w-[88px] h-[88px] xs:w-[110px] xs:h-[110px] sm:w-[132px] sm:h-[132px] md:w-[156px] md:h-[156px] rounded-full cursor-pointer flex items-center justify-center transition-opacity hover:opacity-90 focus:outline-none aspect-square animate-pulse"
                aria-label="Play video"
              >
                {/* Pulsing ring effect */}
                <div className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-75" />
                
                {/* Outer white circle */}
                <div className="absolute inset-0 rounded-full border-2 border-white" />
                
                {/* Inner gray circle */}
                <div className="absolute inset-[2px] rounded-full bg-gray-500/80 backdrop-blur-sm" />
                
                {/* Play Icon */}
                <svg
                  className="relative z-10 w-[30%] h-[30%] text-white ml-1"
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
