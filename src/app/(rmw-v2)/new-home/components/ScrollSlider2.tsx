"use client";

import { MoveRight, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BsStars } from "react-icons/bs";

gsap.registerPlugin(ScrollTrigger);

export interface CardData {
  id: number;
  title: string;
  description: string;
  icon: string;
  iconAlt: string;
  features: string[];
  link: string;
  linkText: string;
  bg: string; // Can be solid color or gradient
  ellipseImage: string;
  featureDotColor: string;
  buttonBg?: string;
  buttonTextColor?: string;
  buttonHoverBg?: string;
}

interface ScrollSliderProps {
  cards: CardData[];
  sectionRef: React.RefObject<HTMLElement | null>;
}

function ScrollSlider2({ cards, sectionRef }: ScrollSliderProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!trackRef.current || !sliderRef.current || !sectionRef.current || cards.length === 0) return;

    // Set initial position
    gsap.set(trackRef.current, { x: 0 });

    // Create ScrollTrigger animation
    const ctx = gsap.context(() => {
      const updateScrollDistance = () => {
        const track = trackRef.current;
        const slider = sliderRef.current;
        if (!track || !slider) return 0;

        const trackWidth = track.scrollWidth;
        const viewportWidth = slider.clientWidth;
        // Calculate scroll distance - we want to scroll until the last card is fully visible
        // The padding-right we added (100vw) ensures we have extra space
        const scrollDistance = trackWidth - viewportWidth;
        return Math.max(0, scrollDistance);
      };

      const scrollDistance = updateScrollDistance();

      if (scrollDistance && scrollDistance > 0) {
        gsap.to(trackRef.current, {
          x: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top -16%",
            end: () => {
              const track = trackRef.current;
              const slider = sliderRef.current;
              if (!track || !slider) return "+=0";
              
              const trackWidth = track.scrollWidth;
              const viewportWidth = slider.clientWidth;
              // Calculate the actual scroll distance needed
              const actualDistance = trackWidth - viewportWidth;
              // Add extra space to ensure the last card is fully visible
              // The padding-right helps, but we need a bit more scroll distance
              return `+=${actualDistance + viewportWidth * 0.5}`;
            },
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            markers: false, // Set to true for debugging
          },
        });
      }
    }, sectionRef);

    // Handle window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [cards.length, sectionRef]);

  return (
    <div ref={sliderRef} className="w-full">
      <div
        ref={trackRef}
        className="flex gap-0"
        style={{ willChange: "transform", paddingRight: "100vw" }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative md:py-6 flex min-h-[320px] sm:min-h-[400px] md:min-h-[440px] flex-shrink-0 flex-col overflow-hidden p-[1px] transition-transform duration-300 hover:-translate-y-2 w-full sm:w-[calc(100vw-3rem)] md:w-[calc(50vw-2rem)] lg:w-[700px] h-auto lg:h-[600px] flex flex-col justify-between items-end"
          >
            <div className="w-full text-center flex justify-center items-center">
            <p className="text-[#FFFFFF] text-[18px] font-[400] lg:max-w-[400px]">Best Creative Agency In The Real Estate Segment In Delhi NCR</p>
            </div>
            <div className="w-full h-[220px] xs:h-[300px] sm:h-[360px] md:h-[420px] lg:h-[458px] relative">
              <Image
                src="/new-page/award-img.jpg"
                alt="RMW"
                fill
                style={{ objectFit: "contain", zIndex: "50" }}
                sizes="(min-width: 1024px) 700px, (min-width: 768px) 50vw, 100vw"
                priority
              />

              {/* Absolute Positioned Btn  */}
              <button className="w-[123px] h-[35px] bg-[#F59612] rounded-[6px] text-white text-[14px] font-[400] flex items-center justify-center rotate-[15deg] absolute cursor-pointer top-[-6px] right-[70px] z-999">
              <BsStars className="w-6 h-6" />
              Excellence
              </button>
            </div>
        
            {/* Absolute Position Div  */}
            <div className="absolute bottom-1 left-22 h-[497px] w-auto z-0">
              <img className="h-full w-full " src="/new-page/rct.png" alt="" />
            </div> 
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScrollSlider2;