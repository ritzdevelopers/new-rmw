"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BsEyeFill } from "react-icons/bs";
import { RiEyeCloseFill } from "react-icons/ri";

function NewBlogSection() {
  const blogsData = [
    {
      img: "/new-page/s10/b2.png",
      date: "January 10, 2024",
      title: "Top 15 Skills an SEO Expert Should Have…",
      key: "Latest Insights",
    },
    {
      img: "/new-page/s10/b1.jpg",
      date: "January 10, 2024",
      title: "Top 15 Skills an SEO Expert Should Have…",
      key: "Latest Insights",
    },
    {
      img: "/new-page/s10/b3.jpg",
      date: "January 10, 2024",
      title: "Top 15 Skills an SEO Expert Should Have…",
      key: "Latest Insights",
    },
  ];

  const [activeIdx, setActiveIdx] = useState<Number>(0);
  const cardRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    for (let i = 0; i < 3; i++) {
      if (activeIdx === i) {
      }
    }
  }, [activeIdx]);

  const [blinkEye, setBlinkEye] = useState(false);

  useEffect(() => {
    if (blinkEye) {
      const interval = setInterval(() => {
        setBlinkEye((pr) => !pr);
      }, 2000);

      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => {
        setBlinkEye((pr) => !pr);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [blinkEye]);

  return (
    <section className="relative flex w-full justify-center overflow-hidden bg-white py-12 sm:py-16 md:py-20">
      <div className="flex w-full max-w-[92%] flex-col gap-8 sm:gap-10 lg:gap-12 px-4 sm:px-6 lg:px-8">
        {/* Row 1 - Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 sm:gap-8">
          <div className="flex flex-col items-start gap-3 sm:gap-4 w-full md:w-auto">
            <button className="rounded-full bg-[#D4A574] px-4 py-1.5 text-[10px] font-semibold text-[#ffffff] sm:px-6 sm:py-2 sm:text-xs md:text-sm">
              Latest Insights
            </button>
            <h2 className="text-2xl font-semibold text-[#101828] leading-tight sm:text-3xl md:text-4xl lg:text-[48px] lg:leading-[1.1]">
              Here's what we've been <br className="hidden sm:block" /> up to
            </h2>
          </div>

          <div className="max-w-full md:max-w-lg w-full md:w-auto">
            <p className="text-sm text-[#4A5565] leading-relaxed sm:text-base md:text-lg text-start">
              Explore industry insights, expert tips, and creative inspiration
              from the Ritz team. Our blog is where we share knowledge, ideas,
              and what's next in digital.
            </p>
          </div>
        </div>

        {/* Row 2 - Blog Cards Grid */}
        <div className="w-full flex flex-col sm:flex-row sm:flex-wrap sm:justify-center md:justify-evenly lg:flex-nowrap lg:justify-start items-stretch sm:items-center gap-4 sm:gap-4 md:gap-5 lg:gap-6">
          {blogsData.map((cd, idx) => {
            return (
              <Link
                key={idx}
                href="#"
                onMouseEnter={() => setActiveIdx(idx)}
                ref={cardRef}
                className={`group flex flex-col overflow-hidden rounded-[20px] sm:rounded-[24px] bg-white shadow-[0_18px_45px_rgba(16,24,40,0.08)] transition-[width,transform,box-shadow] duration-700 ease-in-out hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(16,24,40,0.15)] w-full sm:w-[calc(50%-8px)] md:w-[calc(50%-10px)] lg:flex-shrink-0 lg:w-[315px] ${
                  idx === activeIdx ? "lg:w-[calc(100%-680px)]" : ""
                }`}
              >
                {/* Image Container */}
                <div className="relative h-[200px] w-full overflow-hidden sm:h-[240px] md:h-[280px] lg:h-[322px]">
                  <Image
                    src={cd.img}
                    alt={cd.title}
                    fill
                    className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  {/* Absolute Positioned Div  */}
                  <button className="w-[90px] sm:w-[100px] md:w-[111px] z-20 h-[28px] sm:h-[32px] md:h-[36px] rounded-full absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 cursor-pointer font-[400] text-[11px] sm:text-[12px] md:text-[14px] text-[#ffffff] bg-[#D4A574]">
                    Latest Inside
                  </button>
                  {/* Absolute Positioned Overlay Div  */}
                  <div
                    className={`w-full h-full absolute z-10 top-0 left-0 flex justify-center items-center transition-opacity duration-500 ease-in-out lg:pointer-events-auto pointer-events-none ${
                      activeIdx === idx
                        ? "opacity-100 bg-[#000000b8]"
                        : "opacity-0 bg-transparent"
                    }`}
                  >
                    {/* Eye Div  */}
                    <div className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px] bg-white rounded-full flex justify-center items-center transition-transform duration-300">
                      <BsEyeFill
                        className={`text-gray-400 text-2xl sm:text-3xl md:text-4xl lg:text-6xl transform transition-all duration-300 ease-out ml-1 z-50 ${
                          blinkEye
                            ? "scale-y-[1] mt-0"
                            : "scale-y-[0.1] mt-2 opacity-60"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Content Container */}
                <div className="flex flex-col gap-2 sm:gap-3 px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
                  <p className="text-xs font-normal text-[#4A5565] sm:text-sm md:text-base">
                    {cd.date}
                  </p>
                  <h3 className="text-base font-semibold text-[#101828] leading-snug sm:text-lg md:text-xl lg:text-[20px]">
                    {cd.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default NewBlogSection;
