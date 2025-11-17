"use client";
import Image from "next/image";
import React from "react";

function S51() {
  return (
    <section className="w-screen h-[664px] flex justify-center items-center">
      <div className="w-full h-full relative">
        {/* 
        Next.js <Image> does not accept "objectFit" directly as a prop when using "fill".
        Instead, use className with object-cover or use style.
        Also, minor typo: "tranform" should be "transform"
        */}
        <Image
          src="/new-page/s6/rm-s6-bg.png"
          alt="RMW"
          fill
          className="object-cover"
          priority
        />

        {/* Center Align Play Btn Icon and Heading together in a flex-col, justify-between and fully responsive */}
        <div className="absolute h-[284px]  top-1/2 transform -translate-y-1/2 inset-0 flex flex-col items-center  px-4 py-6">
          <div className="flex flex-col items-center justify-between w-full h-full gap-8">
            <h2 className="mt-4 font-[600] text-[22px] xs:text-[28px] sm:text-[36px] md:text-[44px] lg:text-[48px] leading-tight text-white text-center max-w-[90vw]">
              Making Your Business Unique
            </h2>
            <div className="w-[88px] h-[88px] xs:w-[110px] xs:h-[110px] sm:w-[132px] sm:h-[132px] md:w-[156px] md:h-[156px] cursor-pointer flex items-center justify-center">
              <img
                src="/new-page/icns/rm-btn.png"
                alt="RMW"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default S51;
