"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "../page.module.css"
import gsap from "gsap";


function S3Card({ setActiveCard, activeCard, setActiveCardImg, index, data }: { setActiveCard: React.Dispatch<React.SetStateAction<number>>, activeCard: number, setActiveCardImg: React.Dispatch<React.SetStateAction<string>>, index: number, data: { tile: string; para: string; imgPath: string, bigImgPath: string } }) {


    const ref1 = useRef<HTMLDivElement>(null);
    const ref2 = useRef<HTMLDivElement>(null);
  
    useLayoutEffect(() => {
        if (!ref1.current || !ref2.current) return;
      
        const content = ref1.current;
        const preview = ref2.current;
      
        const ctx = gsap.context(() => {
      
          if (index === activeCard) {
      
            // First make sure height is measurable
            gsap.set(content, { height: "auto" });
            const height = content.offsetHeight;
      
            // Reset back to 0 before animating
            gsap.fromTo(
              content,
              { height: 0, opacity: 0 },
              {
                height: height,
                opacity: 1,
                duration: 0.65,
                ease: "power4.out"
              }
            );
      
            // Fade preview smoothly
            gsap.to(preview, {
              opacity: 0,
              duration: 0.25,
              ease: "power2.out"
            });
      
            // Subtle stagger inside content
            gsap.fromTo(
              content.children,
              { y: 15, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: "power3.out",
                delay: 0.15
              }
            );
      
          } else {
      
            // Collapse smoothly
            gsap.to(content, {
              height: 0,
              opacity: 0,
              duration: 0.55,
              ease: "power3.inOut"
            });
      
            // Show preview again smoothly
            gsap.to(preview, {
              opacity: 1,
              duration: 0.35,
              ease: "power2.out",
              delay: 0.15
            });
          }
      
        });
      
        return () => ctx.revert();
      
      }, [activeCard, index]);

    return (
        <div onClick={() => { setActiveCard(index), setActiveCardImg(data.bigImgPath) }} className="w-full lg:max-w-full xl:w-[630px] border-b border-[#E5E5E5] flex justify-start items-start gap-3 sm:gap-4 lg:gap-5 xl:gap-6 py-3 sm:py-4 lg:py-4 xl:py-4 cursor-pointer">
            {/* Left Side: Number */}
            <div className="flex-shrink-0">
                <p className={`font-[500] text-[16px] sm:text-[18px] lg:text-[19px] xl:text-[20px] ${styles.fontmontserrat}`}>0{index + 1}</p>
            </div>

            {/* Right Side: Image + Content */}
            <div ref={ref1} className={`transform transition-all overflow-hidden duration-200 ease-linear ${index === activeCard ? "flex justify-start items-start gap-3 sm:gap-4 lg:gap-5 xl:gap-6 min-w-0 flex-1" : "hidden"}`}>
                {/* Content Container */}
                <div className="flex flex-col gap-2 sm:gap-3 min-w-0">
                    <h3 className={`font-[500] text-[20px] sm:text-[28px] md:text-[32px] lg:text-[34px] xl:text-[36px] leading-tight ${styles.fontmontserrat}`}>
                        {data.tile}
                    </h3>
                    <p className={`font-[400] text-[14px] sm:text-[16px] leading-relaxed ${styles.fontmontserrat}`}>
                        {data.para}
                    </p>
                </div>
            </div>

            {/* Right Side In-Active  */}
            <div ref={ref2} className={`transform transition-all duration-200 ease-linear ${activeCard !== index ? "flex justify-start items-center gap-3 sm:gap-4 lg:gap-5 xl:gap-6 min-w-0 flex-1" : "hidden"}`}>
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-[50px] lg:h-[50px] xl:w-[58px] flex-shrink-0 rounded-[4px] relative">
                    <img src={data.imgPath} alt="Print Advertising" className="w-full h-auto object-cover" />
                </div>
                <h3 className={`font-[600] text-[16px] sm:text-[18px] lg:text-[19px] xl:text-[20px] ${styles.fontmontserrat}`}>
                    {data.tile}
                </h3>

            </div>
        </div>
    );
}

export default S3Card;