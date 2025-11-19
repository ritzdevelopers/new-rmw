"use client";

import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

function ScrollSlider({ cards, sectionRef }: ScrollSliderProps) {
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
            start: "top top",
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
        className="flex gap-6"
        style={{ willChange: "transform", paddingRight: "100vw" }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative md:py-6 flex min-h-[440px] flex-shrink-0 flex-col overflow-hidden rounded-[28px] p-[1px] transition-transform duration-300 hover:-translate-y-2 w-full sm:w-[calc(100vw-3rem)] md:w-[calc(50vw-2rem)] lg:w-[700px]"
            style={{
              background: card.bg,
            }}
          >
            <div className="relative z-10 flex h-full flex-col justify-between gap-6 rounded-[28px] px-8 py-10 backdrop-blur-sm sm:px-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFFFFF33]">
                <Image
                  src={card.icon}
                  alt={card.iconAlt}
                  width={36}
                  height={36}
                />
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="text-[32px] font-[600] text-white sm:text-[30px]">
                  {card.title}
                </h2>
                <p className="text-sm text-[#FFFFFFE5] sm:text-[16px] font-[400]">
                  {card.description}
                </p>
              </div>

           

              <Link
                href={card.link}
                className={`group inline-flex md:h-[40px] w-full items-center justify-center gap-2 rounded-[8px] px-6 py-3 text-[16px] font-[500] transition-colors duration-200 ${
                  card.buttonBg || "bg-[#FFFFFF]"
                } ${card.buttonTextColor || "text-black"} ${
                  card.buttonHoverBg || "hover:bg-[#c2925d] hover:text-[#ffffff]"
                } hover:text-white`}
              >
                {card.linkText}
                <MoveRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Absolute Position Image Container */}
            <div className="absolute -right-22 -top-22 z-10">
              <img
                src={card.ellipseImage}
                alt="RMW"
                className="w-[256px] h-[256px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScrollSlider;

