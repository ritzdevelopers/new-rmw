'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './page.module.css';

const FlagWaveCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.to(containerRef.current, {
      x: '-100%', // move half the container width to left
      duration: 20,
      ease: 'linear',
      repeat: -1,
    });
  }, []);

  return (
    <div className={styles.flagWrapper}>
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
    </div>
  );
};

export default FlagWaveCanvas;
