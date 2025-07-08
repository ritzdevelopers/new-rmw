"use client";
import React, { useEffect, useState } from "react";
import styles from "./Pages.module.css";

export default function VideoText({ headingTitle, videoURL, mtP, mtS }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  return (
    <div className={styles.wrapper} style={{ marginTop: isMobile ? mtS : mtP }}>
      <video className={styles.video} src={videoURL} autoPlay muted loop />
      <h1 className={styles.text}>{headingTitle}</h1>
    </div>
  );
}
