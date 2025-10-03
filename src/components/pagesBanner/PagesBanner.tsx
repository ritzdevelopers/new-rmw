"use client";
import React, { useEffect, useState } from "react";
import styles from "./Pages.module.css";

interface VideoTextProps {
  headingTitle?: string;
  videoURL: string;
  mtP: string | number;
  mtS: string | number;
  sH: string | number;
}

export default function VideoText({
  headingTitle,
  videoURL,
  mtP,
  mtS,
  sH,
}: VideoTextProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);

    // Initial check
    checkScreen();

    // Use debounce to avoid too many state updates on resize
    let timeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(checkScreen, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={styles.wrapper}
      style={{
        marginTop: isMobile ? mtS : mtP,
        height: isMobile ? sH : "auto",
      }}
    >
      <video
        className={styles.video}
        src={videoURL}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata" // preload only metadata to reduce initial load
      />
      <h1 className={styles.text}>{headingTitle}</h1>
    </div>
  );
}
