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
  const mainImgElementRef = useRef<HTMLImageElement | null>(null);
  const subImgElementRef = useRef<HTMLImageElement | null>(null);
  const mainImgAnimationRef = useRef<gsap.core.Timeline | null>(null);
  const subImgAnimationRef = useRef<gsap.core.Timeline | null>(null);

  // Enhanced animation for main image changes with smooth crossfade
  useEffect(() => {
    if (mainImg !== prevMainImgRef.current && mainImgRef.current) {
      // Use requestAnimationFrame to ensure DOM is updated with new src
      requestAnimationFrame(() => {
        const container = mainImgRef.current;
        if (!container) return;
        
        const imgElement = container.querySelector("img") as HTMLImageElement;
        
        if (imgElement) {
          mainImgElementRef.current = imgElement;
          
          // Kill any existing animation
          if (mainImgAnimationRef.current) {
            mainImgAnimationRef.current.kill();
          }
          
          // Create a timeline for smooth transition
          const tl = gsap.timeline();
          mainImgAnimationRef.current = tl;
          
          // Animate out the old image with scale down, blur, and fade
          tl.to(imgElement, {
            opacity: 0,
            scale: 0.92,
            filter: "blur(12px) brightness(0.75)",
            duration: 0.45,
            ease: "power2.in",
          })
          // Update the previous image reference
          .call(() => {
            prevMainImgRef.current = mainImg;
          })
          // Set initial state for new image (after src update)
          .set(imgElement, {
            opacity: 0,
            scale: 1.1,
            filter: "blur(12px) brightness(1.25)",
          })
          // Wait a bit for image to load
          .to({}, { duration: 0.2 })
          // Animate in the new image with scale up, blur removal, and fade
          .to(imgElement, {
            opacity: 1,
            scale: 1,
            filter: "blur(0px) brightness(1)",
            duration: 0.85,
            ease: "power3.out",
          });
        }
      });
    }
  }, [mainImg]);

  // Enhanced animation for sub image changes with smooth crossfade
  useEffect(() => {
    if (subImg !== prevSubImgRef.current && subImgRef.current) {
      // Use requestAnimationFrame to ensure DOM is updated with new src
      requestAnimationFrame(() => {
        const container = subImgRef.current;
        if (!container) return;
        
        const imgElement = container.querySelector("img") as HTMLImageElement;
        
        if (imgElement) {
          subImgElementRef.current = imgElement;
          
          // Kill any existing animation
          if (subImgAnimationRef.current) {
            subImgAnimationRef.current.kill();
          }
          
          // Create a timeline for smooth transition
          const tl = gsap.timeline();
          subImgAnimationRef.current = tl;
          
          // Animate out the old image with scale down, blur, and fade
          tl.to(imgElement, {
            opacity: 0,
            scale: 0.92,
            filter: "blur(12px) brightness(0.75)",
            duration: 0.45,
            ease: "power2.in",
          })
          // Update the previous image reference
          .call(() => {
            prevSubImgRef.current = subImg;
          })
          // Set initial state for new image (after src update)
          .set(imgElement, {
            opacity: 0,
            scale: 1.1,
            filter: "blur(12px) brightness(1.25)",
          })
          // Wait a bit for image to load
          .to({}, { duration: 0.2 })
          // Animate in the new image with scale up, blur removal, and fade
          .to(imgElement, {
            opacity: 1,
            scale: 1,
            filter: "blur(0px) brightness(1)",
            duration: 0.85,
            ease: "power3.out",
          });
        }
      });
    }
  }, [subImg]);

  // Set up initial styles for images on mount
  useEffect(() => {
    const setupMainImg = () => {
      if (mainImgRef.current) {
        const imgElement = mainImgRef.current.querySelector("img") as HTMLImageElement;
        if (imgElement) {
          mainImgElementRef.current = imgElement;
          // Set initial styles
          gsap.set(imgElement, {
            opacity: 1,
            scale: 1,
            filter: "blur(0px) brightness(1)",
          });
        }
      }
    };
    
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(setupMainImg);
  }, []);

  useEffect(() => {
    const setupSubImg = () => {
      if (subImgRef.current) {
        const imgElement = subImgRef.current.querySelector("img") as HTMLImageElement;
        if (imgElement) {
          subImgElementRef.current = imgElement;
          // Set initial styles
          gsap.set(imgElement, {
            opacity: 1,
            scale: 1,
            filter: "blur(0px) brightness(1)",
          });
        }
      }
    };
    
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(setupSubImg);
  }, []);

  // Cleanup animations on unmount
  useEffect(() => {
    return () => {
      if (mainImgAnimationRef.current) {
        mainImgAnimationRef.current.kill();
      }
      if (subImgAnimationRef.current) {
        subImgAnimationRef.current.kill();
      }
    };
  }, []);


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
              className="object-cover"
              style={{ 
                willChange: "opacity, transform, filter"
              }}
              priority
              onLoad={() => {
                // Update ref when image loads
                if (mainImgRef.current) {
                  const imgElement = mainImgRef.current.querySelector("img") as HTMLImageElement;
                  if (imgElement) {
                    mainImgElementRef.current = imgElement;
                  }
                }
              }}
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
              className="object-cover"
              style={{ 
                willChange: "opacity, transform, filter"
              }}
              priority
              onLoad={() => {
                // Update ref when image loads
                if (subImgRef.current) {
                  const imgElement = subImgRef.current.querySelector("img") as HTMLImageElement;
                  if (imgElement) {
                    subImgElementRef.current = imgElement;
                  }
                }
              }}
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
