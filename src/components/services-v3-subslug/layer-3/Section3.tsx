"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./Section3.module.css";

const EXPLORE_ARROW_IMAGE =
  "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";

export default function Section3() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const accordionItems = [
    {
      label: "Branding & Identity Development",
      paragraphs: [
        "Take your brand identity to the next level with our branding and design solutions. We help you in developing a memorable and authentic brand identity that connects with your customers, builds loyalty, and helps you stand out in the cutthroat market.",
        "Our full-service branding solutions include logo design, brand positioning, and visual communication that helps you succeed.",
      ],
      imageSrc: "/services-v3-slug/images/Mask group (1).png",
    },
    {
      label: "Graphic Design",
      paragraphs: [
        "Tap into the power of visual communication with our professional graphic design solutions. Whether it is digital or offline media, our breathtaking designs engage, impress, and convert your audience.",
        "From infographics to marketing collateral, we design graphics that communicate effectively and deliver results, resulting in higher engagement and ROI.",
      ],
      imageSrc: "/services-v3-slug/images/Mask group (2).png",
    },
    {
      label: "Logo Design",
      paragraphs: [
        "Your logo is the face of your brand. We are logo design experts who can help you in designing a unique and memorable logo that builds trust and leaves a lasting impression.",
        "Our logo design solutions ensure that your brand gets noticed, builds customer loyalty, and achieves instant recognition, making it an essential part of brand promotion.",
      ],
      imageSrc: "/services-v3-slug/images/Mask group (3).png",
    },
    {
      label: "Print Advertising Design",
      paragraphs: [
        "Leave your mark in the competitive world of print media with our effective print advertising design. Our designs are created in a manner that generates interest and encourages response, whether it is brochure design, flyer design, or poster design.",
        "With our professional print ad design, we turn paper into profit, ensuring that your message is seen, remembered, and acted upon.",
      ],
      imageSrc: "/services-v3-slug/images/Mask group (4).png",
    },
    {
      label: "Packaging Design",
      paragraphs: [
        "Use your product packaging as a marketing tool. Our packaging design services create highly persuasive and effective packaging that influences buying decisions and creates brand identity.",
        "Whether it is retail or e-commerce, our packaging design is created to capture attention, create brand loyalty, and boost sales.",
      ],
      imageSrc: "/services-v3-slug/images/Mask group (5).png",
    },
  ];

  return (
    <section className="w-full bg-[#F7F7F7] py-10 sm:py-12 md:py-16 lg:py-20 flex justify-center">
      <div className={`w-[92%] sm:w-[90%] md:w-[86%] lg:w-[80%] mx-auto ${styles.containerWidth}`}>
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <p
            className="uppercase text-[12px] sm:text-[13px] md:text-[14px] tracking-wide text-[#C99237] font-[700]"
            style={{ fontFamily: "MontserratBold" }}
          >
            Services
          </p>
          <h3
            className="text-[26px] sm:text-[32px] md:text-[36px] lg:text-[44px] font-[800] text-black"
            style={{ fontFamily: "MontserratBold" }}
          >
            What We Provide
          </h3>
          <p
            className="text-[14px] sm:text-[15px] md:text-[16px] text-[#6E6E6E]"
            style={{ fontFamily: "PoppinsRegular" }}
          >
            is more than what you&apos;ll ever need
          </p>
        </div>

        <div className="h-px w-full bg-[#AAA8A8] mb-8 sm:mb-10 md:mb-12" />

        <div className="space-y-4">
          {accordionItems.map((item, index) => {
            const isOpen = openItem === item.label;
            const shapeSrc =
              index === 0 ? "/services-v3-slug/yellow-rectangle-accordion.png" :
              index === 1 ? "/services-v3-slug/accordion-shape-2.png" :
              index === 2 ? "/services-v3-slug/accordion-shape-3.png" :
              index === 3 ? "/services-v3-slug/accordion-shape-4.png" :
              "/services-v3-slug/accordion-shape-5.png";

            return (
              <div key={item.label} className="border-b border-[#AAA8A8] pb-4">
                <button
                  type="button"
                  onClick={() => setOpenItem(isOpen ? null : item.label)}
                  className="w-full flex items-center justify-between text-left"
                  aria-expanded={isOpen}
                >
                  <p
                    className="text-[16px] sm:text-[18px] text-[#101828]"
                    style={{ fontFamily: "MontserratMedium" }}
                  >
                    {item.label}
                  </p>
                  <span className="text-[#6E6E6E] text-2xl leading-none select-none">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={`${styles.accordionContent} ${isOpen ? styles.accordionContentOpen : styles.accordionContentClosed}`}
                >
                  <div className="pt-6 sm:pt-8">
                    <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-14 justify-center">
                      <div className="relative w-full sm:w-auto lg:max-w-[430px] xl:max-w-[480px] flex justify-center lg:justify-start">
                        <div className="absolute left-[6px] sm:left-[10px] md:left-[4px] lg:left-[5px] top-[6px] w-[92px] sm:w-[105px] md:w-[120px] lg:w-[298px] h-[210px] sm:h-[232px] md:h-[246px] lg:h-[345px] z-0">
                          <Image
                            src={shapeSrc}
                            alt=""
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="relative w-[364px] h-[392px] mx-auto lg:mx-9 z-[1]">
                          <Image
                            src={item.imageSrc}
                            alt={item.label}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <div className="flex-1 max-w-[680px] justify-center">
                        <div className="space-y-5 justify-center mt-[24px]">
                          {item.paragraphs.map((para, i) => (
                            <p
                              key={i}
                              className="text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed md:leading-[28px] text-[#2D2D2D]"
                              style={{ fontFamily: "PoppinsRegular" }}
                            >
                              {para}
                            </p>
                          ))}
                        </div>

                        <div className="mt-8 flex items-center gap-4 flex-wrap">
                          <span
                            className="text-[#101828] text-[16px]"
                            style={{ fontFamily: "MontserratMedium" }}
                          >
                            Learn more
                          </span>
                          <Link
                            href="/contact.html"
                            target="_blank"
                            aria-label={`Learn more about ${item.label}`}
                            className="w-10 h-10 rounded-full bg-[#C99237] flex items-center justify-center hover:bg-[#b8822f] transition-colors"
                          >
                            <Image
                              src={EXPLORE_ARROW_IMAGE}
                              alt="Arrow"
                              width={18}
                              height={16}
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
