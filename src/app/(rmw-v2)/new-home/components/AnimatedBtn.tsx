"use client";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

function AnimatedBtn() {
  return (
    <div className="w-[62px] h-[62px] rounded-full text-white flex justify-center items-center cursor-pointer bg-[#242424]">
      <FaArrowRight className="text-[#FFFFFF] w-[20px] h-[20px] rotate-[329deg]" />
    </div>
  );
}

export default AnimatedBtn;
