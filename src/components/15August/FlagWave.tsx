"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./page.module.css";

const FlagWaveCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect screen size on mount
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile breakpoint
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!isMobile && containerRef.current) {
      gsap.to(containerRef.current, {
        x: "-50%", // move half the container width to left
        duration: 20,
        ease: "linear",
        repeat: -1,
      });
    }
  }, [isMobile]);

  return (
    <div className={styles.flagWrapper}>
      {!isMobile ? (
        <div className={styles.flagSlider} ref={containerRef}>
          <img
            src="/flag/flag_flow.jpg"
            alt="15 August Flag Animation"
            className={styles.flagImage}
          />
          <img
            src="/flag/flag_flow.jpg"
            alt="15 August Flag Animation"
            className={styles.flagImage}
          />
        </div>
      ) : (
        <div className={styles.flagSlider}>
          <img
            src="/Flag_Mobile.jpg"
            alt="15 August Flag Animation"
            className={styles.flagImage}
            id="mobile"
          />
          <img
            src="/Flag_Mobile.jpg"
            alt="15 August Flag Animation"
            className={styles.flagImage}
          />
        </div>
      )}
    </div>
  );
};

export default FlagWaveCanvas;
