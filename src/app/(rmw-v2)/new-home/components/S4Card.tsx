"use client";
import Image from "next/image";
import Link from "next/link";
import React, { forwardRef } from "react";
import { FiArrowRight } from "react-icons/fi";

interface S4CardProps {
  linkTxt: string;
  title: string;
  list: string[];
  cardBg: string;
  linkBG: string;
  linkTxtColor: string;
  img: string;
  top: string;
  link: string;
}

const S4Card = forwardRef<HTMLDivElement, S4CardProps>(({
  link,
  linkTxt,
  title,
  list,
  cardBg,
  linkBG,
  linkTxtColor,
  img,
  top,
}, ref) => {
  return (
    <div
      ref={ref}
      className={`w-full flex overflow-hidden flex-col-reverse rounded-[32px] lg:flex-row justify-between gap-0 ${cardBg} shadow-lg lg:sticky ${top}`}
    >
      {/* Left Side Card Div  */}
      <div
        className={`flex-1 h-auto min-h-[350px] sm:min-h-[380px] md:min-h-[400px] lg:h-[532px] flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16`}
      >
        <div className="w-full max-w-[600px] flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          <Link
            href={link}
            className={`inline-flex w-fit h-[32px] sm:h-[36px] md:h-[40px] lg:h-[42px] px-3 sm:px-4 md:px-5 lg:px-6 justify-center items-center cursor-pointer ${linkBG} rounded-[8px] font-[600] text-[18px]  ${linkTxtColor} transition-transform duration-200 hover:scale-105`}
          >
            {linkTxt}
          </Link>
          <h2 className="font-[600] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] text-black leading-tight">
            {title}
          </h2>
          <ul className="flex flex-col gap-2.5 sm:gap-3 md:gap-4">
            {list.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 sm:gap-3 font-[400] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] text-black"
              >
                <span className="mt-[6px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-[#21EAB5]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <button onClick={() => window.open(link, "_blank")} className="w-fit min-w-[110px] sm:min-w-[120px] md:min-w-[130px] h-[30px] sm:h-[32px] md:h-[34px] px-3 sm:px-4 border-[0.8px] border-[#3D28171A] bg-white rounded-[8px] text-black cursor-pointer font-[500] text-[12px] sm:text-[13px] md:text-[14px] text-[#3D2817] flex justify-center items-center gap-2 sm:gap-3 transition-transform duration-200 hover:scale-105">
            Read More <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Right Side Image Div  */}
      <div className="w-full lg:w-[400px] xl:w-[595px] h-[250px] sm:h-[300px] md:h-[350px] lg:h-[532px] relative flex-shrink-0">
        <Image
        onClick={() => window.open(link, "_blank")}
          src={img}
          alt={`RMW ${linkTxt} Services`}
          fill
          className="xl:object-cover objet-contain rounded-tl-[32px] rounded-bl-[32px]"
        />
      </div>
    </div>
  );
});

S4Card.displayName = "S4Card";

export default S4Card;
