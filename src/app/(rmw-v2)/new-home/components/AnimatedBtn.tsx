"use client";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import styles from "./page.module.css"

function AnimatedBtn({ btnText }: { btnText: string }) {
  return (
    <div className={`w-[62px] h-[62px] rounded-full text-white flex items-center justify-center cursor-pointer bg-[#242424] ${styles.animatedBtn}`}>
      <div className="flex justify-center items-center whitespace-nowrap w-full">
        <FaArrowRight className={`text-[#FFFFFF] w-[20px] h-[20px] rotate-[329deg] flex-shrink-0 ${styles.animatedBtnIcn}`}/>
        <span className={`text-white font-medium ${styles.animatedBtnText}`}>{btnText}</span>
      </div>
    </div>
  );
}
export default AnimatedBtn;

