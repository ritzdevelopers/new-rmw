"use client";
import React from "react";
import styles from "./page.module.css";

function ASI({
  icn,
  py,
  px,
}: {
  icn: React.ReactNode;
  py: string;
  px: string;
}) {
  return (
    <div
      className={`w-[34px] h-[48px] bg-gradient-to-b from-[#E6B889] to-[#926541] fixed ${px} ${py} flex justify-start pl-2 cursor-pointer ${styles.sbAnime} items-center z-50`}
    >
      {icn}
    </div>
  );
}

export default ASI;
