"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./page.module.css";

const FlagWaveCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) animationRef.current.kill();
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      // Kill any existing animation
      if (animationRef.current) animationRef.current.kill();

      // Reset position
      gsap.set(containerRef.current, { x: 0 });

      // Create new animation
      animationRef.current = gsap.to(containerRef.current, {
        x: "-50%", // Move by half the container width
        duration: 20,
        ease: "none",
        repeat: -1,
      });
    }
  }, [isMobile]); // This will re-run when isMobile changes

  return (
    <div className={styles.flagWrapper}>
      <div className={styles.flagSlider} ref={containerRef}>
        {isMobile ? (
          <img
            src={"/Flag_Mobile.jpg"}
            alt="15 August Flag Animation"
            className={styles.flagImage2}
          />
        ) : (
          <img
            src={"/flag/flag_flow.jpg"}
            alt="15 August Flag Animation"
            className={styles.flagImage}
          />
        )}
        {isMobile ? (
          <img
            src={"/Flag_Mobile.jpg"}
            alt="15 August Flag Animation"
            className={styles.flagImage}
          />
        ) : (
          <img
            src={"/flag/flag_flow.jpg"}
            alt="15 August Flag Animation"
            className={styles.flagImage}
          />
        )}
      </div>
    </div>
  );
};

export default FlagWaveCanvas;
