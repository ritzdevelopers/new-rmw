"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CardData {
  id: number;
  title: string;
  text?: string;
}

function Section5() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const cards: CardData[] = [
    {
      id: 1,
      title: "RADIO_MARKETING",
      text: "Innovative radio marketing solutions that reach your audience",
    },
    {
      id: 2,
      title: "RADIO_MARKETING",
      text: "Strategic campaigns that drive engagement and results",
    },
    {
      id: 3,
      title: "RADIO_MARKETING",
      text: "Creative content that connects with listeners",
    },
    {
      id: 4,
      title: "RADIO_MARKETING",
      text: "Measurable impact through powerful radio advertising",
    },
  ];

  useEffect(() => {
    if (!trackRef.current || !sectionRef.current || cards.length === 0) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const cardElements = cardsRef.current;

    // Set initial positions
    gsap.set(track, { y: 0 });

    const ctx = gsap.context(() => {
      const updateScrollDistance = () => {
        if (!track) return 0;
        const trackHeight = track.scrollHeight;
        const viewportHeight = window.innerHeight;
        const scrollDistance = trackHeight - viewportHeight;
        return Math.max(0, scrollDistance);
      };

      const scrollDistance = updateScrollDistance();
      const isMobile = window.innerWidth < 1024;

      if (scrollDistance && scrollDistance > 0) {
        // Animate track sliding up
        const mainScrollTrigger = gsap.to(track, {
          y: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: isMobile ? "top top" : "top top",
            end: () => {
              const trackHeight = track.scrollHeight;
              const viewportHeight = window.innerHeight;
              const actualDistance = trackHeight - viewportHeight;
              return `+=${actualDistance + viewportHeight * 0.5}`;
            },
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Calculate which card should show text based on scroll progress
              const progress = self.progress;
              const totalCards = cardElements.length;
              
              cardElements.forEach((card, index) => {
                if (!card) return;
                const textElement = card.querySelector(".card-text");
                if (!textElement) return;
                
                // Calculate progress for this specific card
                const cardStart = index / totalCards;
                const cardEnd = (index + 1) / totalCards;
                const cardProgress = (progress - cardStart) / (cardEnd - cardStart);
                
                // Fade in when card is in center (between 0.3 and 0.7 of card's scroll range)
                let opacity = 0;
                let yOffset = 20;
                
                if (progress >= cardStart && progress <= cardEnd) {
                  // Smooth fade in/out
                  if (cardProgress < 0.3) {
                    opacity = 0;
                    yOffset = 20;
                  } else if (cardProgress >= 0.3 && cardProgress <= 0.7) {
                    const fadeProgress = (cardProgress - 0.3) / 0.4;
                    opacity = fadeProgress;
                    yOffset = 20 * (1 - fadeProgress);
                  } else {
                    opacity = 1;
                    yOffset = 0;
                  }
                } else if (progress < cardStart) {
                  opacity = 0;
                  yOffset = 20;
                } else {
                  opacity = 0;
                  yOffset = 20;
                }
                
                gsap.set(textElement, { opacity, y: yOffset });
              });
            },
          },
        });

        // Initialize all text elements as hidden
        cardElements.forEach((card) => {
          if (!card) return;
          const textElement = card.querySelector(".card-text");
          if (textElement) {
            gsap.set(textElement, { opacity: 0, y: 20 });
          }
        });
      }
    }, section);

    // Handle window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [cards.length]);

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen bg-[#ED8B24] overflow-hidden relative"
    >
      <div
        ref={trackRef}
        className="flex flex-col h-full"
        style={{ willChange: "transform" }}
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="w-full h-screen flex-shrink-0 flex justify-center items-center px-4 sm:px-6 md:px-8 lg:px-0"
          >
            <div className="w-full max-w-7xl flex flex-col justify-center items-center text-center gap-4 sm:gap-6 md:gap-8">
              <h2 className="font-[700] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] text-white break-words">
                {card.title}
              </h2>
              {card.text && (
                <p className="card-text font-[400] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] text-white/90 max-w-3xl opacity-0">
                  {card.text}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Section5;
// 