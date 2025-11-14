"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { BsArrowDown } from "react-icons/bs";
import { gsap } from "gsap";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
    // question: "What services does RMW offer?",
    answer:
      "RMW offers a comprehensive range of digital marketing services including brand identity design, digital advertising, social media management, print advertising, web development, and content creation. We help brands transform their digital presence and achieve their marketing goals.",
  },
  {
    question:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
    // question: "How long does a typical project take?",
    answer:
      "Project timelines vary depending on the scope and complexity of the work. A typical branding project may take 4-6 weeks, while a complete digital marketing campaign can range from 2-8 weeks. We work closely with clients to establish realistic timelines and deliver high-quality results within agreed timeframes.",
  },
  {
    question:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
    // question: "What is your approach to client collaboration?",
    answer:
      "We believe in transparent communication and collaborative partnerships. Our team maintains regular check-ins, provides progress updates, and welcomes client feedback throughout the project lifecycle. We strive to be an extension of your team, always available for support and consultation.",
  },
];

function S9() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleAccordion = (index: number) => {
    const isOpening = openIndex !== index;
    const newOpenIndex = isOpening ? index : null;
    setOpenIndex(newOpenIndex);

    // Animate the clicked accordion item
    const accordionItem = accordionRefs.current[index];
    const answerContent = answerRefs.current[index];
    const arrowIcon = accordionItem?.querySelector(
      ".arrow-icon"
    ) as HTMLElement | null;

    if (!accordionItem || !answerContent) return;

    if (isOpening) {
      // Close previously open item
      if (openIndex !== null && openIndex !== index) {
        const prevItem = accordionRefs.current[openIndex];
        const prevAnswer = answerRefs.current[openIndex];
        const prevArrow = prevItem?.querySelector(
          ".arrow-icon"
        ) as HTMLElement | null;

        if (prevItem && prevAnswer) {
          gsap.to(prevAnswer, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: () => {
              prevAnswer.style.display = "none";
              prevAnswer.style.height = "auto";
            },
          });
          if (prevArrow) {
            gsap.to(prevArrow, {
              rotation: 0,
              duration: 0.3,
              ease: "power2.inOut",
            });
          }
        }
      }

      // Open new item
      answerContent.style.display = "block";
      const targetHeight = answerContent.scrollHeight;
      answerContent.style.height = "0px";
      answerContent.style.opacity = "0";

      gsap.to(answerContent, {
        height: targetHeight,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          answerContent.style.height = "auto";
        },
      });

      if (arrowIcon) {
        gsap.to(arrowIcon, {
          rotation: 180,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    } else {
      // Close current item
      answerContent.style.height = `${answerContent.scrollHeight}px`;
      // Force reflow
      answerContent.offsetHeight;
      gsap.to(answerContent, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          answerContent.style.display = "none";
          answerContent.style.height = "auto";
        },
      });

      if (arrowIcon) {
        gsap.to(arrowIcon, {
          rotation: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Adjust animation distance based on screen size
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      const imageX = isMobile ? -30 : -50;
      const contentX = isMobile ? 30 : 50;

      // Initialize arrow rotations to 0 and ensure answer content is hidden
      accordionRefs.current.forEach((accordionItem, idx) => {
        if (accordionItem) {
          const arrowIcon = accordionItem.querySelector(
            ".arrow-icon"
          ) as HTMLElement | null;
          if (arrowIcon) {
            gsap.set(arrowIcon, { rotation: 0 });
          }
        }
        // Ensure answer content starts hidden
        const answerContent = answerRefs.current[idx];
        if (answerContent) {
          answerContent.style.display = "none";
          answerContent.style.height = "auto";
          answerContent.style.opacity = "0";
        }
      });

      // Initial animation for section
      gsap.fromTo(
        imageRef.current,
        { autoAlpha: 0, x: imageX },
        { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );

      gsap.fromTo(
        contentRef.current,
        { autoAlpha: 0, x: contentX },
        { autoAlpha: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.4 }
      );

      // Stagger animation for FAQ items
      gsap.fromTo(
        accordionRefs.current.filter((ref) => ref !== null),
        { autoAlpha: 0, y: isMobile ? 15 : 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.6,
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-screen min-h-screen flex justify-center items-center bg-gradient-to-b from-[#101828] via-[#1E2939] to-[#1E2939] py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 overflow-x-hidden"
    >
      {/* Centered Positioned Div */}
      <div className="w-[90%] max-w-[1400px] flex flex-col lg:flex-row justify-between items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20">
        {/* Left Side Image  */}
        <div
          ref={imageRef}
          className="w-full sm:w-[400px] md:w-[450px] lg:w-[514px] h-[300px] sm:h-[400px] md:h-[450px] lg:h-[514px] relative flex-shrink-0 order-2 lg:order-1"
        >
          <Image
            src={"/new-page/s9/s9-img.png"}
            alt="RMW FAQ"
            fill
            className="object-contain"
            priority
          />

          {/* Absolute Position Div - Responsive positioning */}
          <div className="absolute -right-8 sm:-right-12 md:-right-16 lg:-right-18 -top-10 sm:-top-12 md:-top-16 lg:-top-20 -z-10 opacity-60 lg:opacity-100">
            <div className="relative w-[150px] h-[150px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] lg:w-[218px] lg:h-[218px]">
              <Image
                src={"/new-page/icns/Ellipse1.png"}
                alt="RMW Decorative"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Right Side Content  */}
        <div
          ref={contentRef}
          className="w-full lg:w-[623px] xl:w-[700px] flex flex-col gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 order-1 lg:order-2"
        >
          {/* Heading */}
          <div>
            <h2 className="font-[600] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[42px] leading-[1.2] text-white">
              Frequently Asked <span className="text-[#D4A574]">Questions</span>
            </h2>
          </div>

          {/* FAQ Accordion Items */}
          <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
            {faqData.map((faq, idx) => {
              return (
                <div
                  key={`faq-${idx}`}
                  ref={(el) => {
                    accordionRefs.current[idx] = el;
                  }}
                  className="w-full min-h-[80px] sm:min-h-[90px] md:min-h-[100px] lg:h-[112px] bg-[#3A4966] text-white rounded-[16px] sm:rounded-[18px] md:rounded-[20px] overflow-hidden transition-all duration-300  cursor-pointer"
                  onClick={() => toggleAccordion(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleAccordion(idx);
                    }
                  }}
                  aria-expanded={openIndex === idx}
                >
                  {/* Question Row */}
                  <div className="flex justify-between items-center gap-4 px-4 sm:px-5 md:px-6 lg:px-8 py-4 sm:py-5 md:py-6">
                    <p className="font-[400] text-[14px] sm:text-[16px] md:text-[17px] lg:text-[18px] leading-[1.5] text-white flex-1">
                      {faq.question}
                    </p>
                    <div className="arrow-icon flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center">
                      <BsArrowDown className="w-full h-full text-[#ffffff]" />
                    </div>
                  </div>

                  {/* Answer Content */}
                  {/* <div
                    ref={(el) => {
                      answerRefs.current[idx] = el;
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-5 md:px-6 lg:px-8 pb-4 sm:pb-5 md:pb-6">
                      <p className="font-[400] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-[1.7] text-white/90">
                        {faq.answer}
                      </p>
                    </div>
                  </div> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default S9;
