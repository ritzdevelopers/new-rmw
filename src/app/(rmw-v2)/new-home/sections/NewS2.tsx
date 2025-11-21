"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import HoverCard from "../components/HoverCard";
import AnimatedBtn from "../components/AnimatedBtn";

function NewS2() {
  const [mainImg, setMainImg] = useState<string>("/new-page/s2/rm-s2-i1.jpg");
  const [subImg, setSubImg] = useState<string>("/new-page/s2/rm-s2.jpg");
  const mainImgRef = useRef<HTMLDivElement | null>(null);
  const subImgRef = useRef<HTMLDivElement | null>(null);
  const prevMainImgRef = useRef<string>("/new-page/s2/rm-s2-i1.jpg");
  const prevSubImgRef = useRef<string>("/new-page/s2/rm-s2.jpg");

  // Animate main image changes with fade transition
  useEffect(() => {
    if (mainImg !== prevMainImgRef.current && mainImgRef.current) {
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        const container = mainImgRef.current;
        if (container) {
          const imgElement = container.querySelector("img");
          if (imgElement) {
            // Set initial opacity and animate fade in
            gsap.fromTo(
              imgElement,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.7,
                ease: "power2.out",
              }
            );
          }
        }
      });
      prevMainImgRef.current = mainImg;
    }
  }, [mainImg]);

  // Animate sub image changes with fade transition
  useEffect(() => {
    if (subImg !== prevSubImgRef.current && subImgRef.current) {
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        const container = subImgRef.current;
        if (container) {
          const imgElement = container.querySelector("img");
          if (imgElement) {
            // Set initial opacity and animate fade in
            gsap.fromTo(
              imgElement,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.7,
                ease: "power2.out",
              }
            );
          }
        }
      });
      prevSubImgRef.current = subImg;
    }
  }, [subImg]);


  return (
    <section className="w-screen flex flex-col gap-8 sm:gap-8 md:gap-0  items-center min-h-[60vh] py-8 sm:py-10 md:py-20 px-4 sm:px-6">
      {/* Center Align Text Divs */}
      <div className="flex flex-col justify-center gap-4 sm:gap-5 md:gap-6 items-center w-full md:w-[85%] lg:w-[65%]">
        <div className="text-center">
          <h3 className="font-[500] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] leading-tight sm:leading-snug">
            What can you expect from the
            It’s a potent question with a surprisingly simple answer. You can expect a dose of obsession with creative storytelling with a strong hint of consistency.
            {" "}
            <span className="text-[#F79024]">
              Best advertising agency in NOIDA?
            </span>
            That’s what
            <span className="text-[#F79024]">  Ritz Media World</span> is all about.
          </h3>
        </div>
        <AnimatedBtn btnText="Click Me to know more" link=" https://ritzmediaworld.com/services"></AnimatedBtn>
      </div>

      {/* Center Align Main Div  */}
      <div className="w-full max-w-[1171px] flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 lg:gap-0">
        {/* Left Side Div  */}
        <div className="w-full lg:w-[820px] flex flex-col justify-between gap-4 sm:gap-5">
          {/* Top Div  */}
          <div className="w-full h-[60px] sm:h-[80px] lg:h-[100px]"></div>

          {/* Bottom Div  */}
          <div
            ref={mainImgRef}
            className="w-full h-[250px] sm:h-[320px] md:h-[380px] overflow-hidden lg:h-[442px] relative"
          >
            <Image
              src={mainImg}
              alt="RMW"
              fill
              className="object-cover hover:scale-105 transition-all duration-300 ease-in-out"
              style={{ opacity: 1 }}
            ></Image>
          </div>
        </div>

        {/* Right Side Div */}
        <div className="w-full lg:w-[309px] flex flex-col justify-between gap-4 sm:gap-5">
          {/* Top Section Image Div  */}
          <div
            ref={subImgRef}
            className="w-full h-[200px] sm:h-[250px] md:h-[280px] overflow-hidden lg:h-[311px] relative"
          >
            <Image
              src={subImg}
              alt="RMW"
              fill
              className="object-cover hover:scale-105 transition-all duration-300 ease-in-out"
              style={{ opacity: 1 }}
            ></Image>
          </div>

          {/* Bottom Section Card  */}
          <HoverCard
            width="w-full cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out lg:w-[309px]"
            height="h-[120px] sm:h-[140px] lg:h-[154px]"
            title="1B+"
            para="Words Written"
            id={"not-hover"}
            img={"/new-page/s2/rm-s2-i4.jpg"}
            imgID={4}
            setMainImg={setMainImg}
            setSubImg={setSubImg}
            mainImg={mainImg}
          ></HoverCard>
        </div>
      </div>

      {/* Center Align Bottom Div  */}
      <div className="w-full max-w-[1078px] flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 lg:gap-0 sm:h-auto lg:h-[220px] mt-6 sm:mt-8 lg:mt-10">
        {[
          {
            ttl: "1M+",
            para: "Creatives Published",
            id: "",
            img: "/new-page/s2/rm-s2-i1.jpg",
            imgID: 1,
          },
          {
            ttl: "1K+",
            para: "Campaigns Executed",
            id: "btm",
            img: "/new-page/s2/rm-s2.jpg",
            imgID: 2,
          },
          {
            ttl: "500+",
            para: "Success Stories",
            id: "",
            img: "/new-page/s2/rm-s2-i3.jpg",
            imgID: 3,
          },
        ].map((ob, idx) => {
          return (
            <HoverCard
              width="w-full cursor-pointer hover:bg-gray-200 transition-all duration-300 ease-in-out sm:w-[calc(33.333%-16px)] lg:w-[309px]"
              height="h-[120px] sm:h-[140px] lg:h-[154px]"
              title={ob.ttl}
              para={ob.para}
              id={ob.id}
              key={idx}
              img={ob.img}
              imgID={ob.imgID}
              setMainImg={setMainImg}
              setSubImg={setSubImg}
              mainImg={mainImg}
            />
          );
        })}
      </div>
    </section>
  );
}

export default NewS2;
