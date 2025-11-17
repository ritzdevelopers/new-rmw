"use client";
import React from "react";
import styles from "./page.module.css";

function ASI({
  icn,
  py,
  px,
  bgType = "instagram",
}: {
  icn: React.ReactNode;
  py: string;
  px: string;
  bgType?: "facebook" | "instagram" | "youtube" | "linkedin";
}) {
  const bgClasses = {
    facebook: "bg-[#1877F2]", //f9ce34
    instagram: "bg-gradient-to-b from-[#6228d7] via-[#ee2a7b] to-[#f9ce34]",
    youtube: "bg-[#FF0000]",
    linkedin: "bg-[#0077B5]",
  };

  return (
    <div
      className={`w-[34px] h-[48px] ${bgClasses[bgType]} fixed ${px} ${py} flex justify-start pl-2 cursor-pointer ${styles.sbAnime} items-center z-50`}
    >
      {icn}
    </div>
  );
}

export default ASI;
