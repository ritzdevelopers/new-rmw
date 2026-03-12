"use client";

import Image from "next/image";
import { useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import styles from "@/components/shared/container.module.css";
import accordionStyles from "./Section3.module.css";

const CELEBRITY_IMAGE = "/service-v3/celebrity-endorsements/s3/celebrity.jpg";

const servicesData = [
  {
    id: "01",
    title: "Celebrity Identification",
    description:
      "Choosing the right celebrity endorsement isn't luck, it's strategy. At Ritz Media World, we identify celebrities for brand endorsement which bears an image, values, and fan following that fully coincides with your brand. We make sure that every recommendation we offer is authentic, credible, conversion focused, turning celebrity fans into lifelong customers of your brand.",
  },
  {
    id: "02",
    title: "Contract Negotiations",
    description:
      "Convincing celebrities to endorse is more precise than it is flair and showmanship. The professionals on our team offer you the best deal possible, managing costs and ensuring that every partnership is one of maximum value and minimum risk.",
  },
  {
    id: "03",
    title: "Creative Collaboration",
    description:
      "Celebrities can tell great stories that can influence people. Our in-house creative team collaborates with the best to create endorsement campaigns that are authentic, engaging, and build brand trust. Every collaboration is carefully designed to take advantage of the celebrity figure and transform the admiration into action by loyal customers. This effect creates measurable results.",
  },
  {
    id: "04",
    title: "Campaign Integration",
    description:
      "Celebrity endorsements are pivotal when they seamlessly integrate. We utilize celebrity endorsements in all marketing channels to enhance effectiveness. We infuse the personality of a celebrity in all your advertising – digital, prints, radio, events and more – to make your investment of a celebrity 100 times effective.",
  },
  {
    id: "05",
    title: "Public Relations",
    description:
      "Most effective celebrity endorsements are global and integrated across all touch points. We deliver powerful celebrity campaigns that deliver effective ROI across a broad range of platforms from digital and social media to print, events and radio.",
  },
  {
    id: "06",
    title: "Legal Compliance",
    description:
      "Careful attention to detail makes a good celebrity endorsement campaign. At Ritz Media World, we handle the legalities involved in making sure that your brand is legally protected. Every celebrity endorsement campaign will be beneficial for your brand, transparent and risk-free thanks to our attention to detail.",
  },
];

export default function Section3() {
  const [openItem, setOpenItem] = useState<string | null>("01");

  const toggleExplore = (id: string) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full bg-[#0F1640] py-10 sm:py-12 md:py-14 lg:py-16 flex justify-center">
      <div className={`w-full max-w-[1300px] mx-auto ${styles.containerWidth}`}>
        <div className="flex flex-col gap-5 sm:gap-6">
          <div className="flex flex-col gap-1 sm:gap-2">
            <p
              className="text-[#C99237] uppercase text-[12px] sm:text-[13px] font-[600]"
              style={{ fontFamily: "MontserratSemiBold" }}
            >
              Services
            </p>
            <h2
              className="text-white text-[34px] sm:text-[40px] md:text-[46px] lg:text-[48px] leading-[1.05] font-[700]"
              style={{ fontFamily: "MontserratBold" }}
            >
              What We Provide{" "}
              <span
                className="text-[#FFFFFF] text-[16px] md:text-[17px] lg:text-[16px]"
                style={{ fontFamily: "OpenSansRegular" }}
              >
                Is more than what you&apos;ll ever need
              </span>
            </h2>
          </div>

          <div className="w-full max-w-[1246px] mx-auto rounded-[10px] overflow-hidden">
            {servicesData.map((item, index) => {
              const isOpen = openItem === item.id;
              const isFirst = index === 0;
              const isLast = index === servicesData.length - 1;

              return (
                <div
                  key={item.id}
                  className={`${isFirst ? "rounded-t-[10px]" : ""} ${
                    isLast ? "rounded-b-[10px]" : ""
                  } ${isOpen ? "overflow-visible" : "overflow-hidden"}`}
                  style={{
                    background: isOpen
                      ? "linear-gradient(149.48deg, #C1892C -2.74%, #EFBB68 114.55%)"
                      : "#161E4E",
                    borderBottom:
                      !isLast ? "1px solid rgba(255,255,255,0.15)" : "none",
                  }}
                >
                  <div className="flex items-start justify-between gap-6 sm:gap-8 px-4 sm:px-5 md:px-6 lg:px-7 py-5 sm:py-6">
                    <div className="flex-1 flex items-start gap-8 sm:gap-10 md:gap-12 lg:gap-17">
                      <p
                        className="text-white text-[24px] sm:text-[26px] md:text-[28px] leading-[1] pt-1"
                        style={{ fontFamily: "MontserratRegular" }}
                      >
                        {item.id}.
                      </p>
                      <h3
                        className="text-white font-[600] text-[28px] leading-[50px] tracking-[0em]"
                        style={{ fontFamily: "MontserratSemiBold" }}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <div className="shrink-0">
                      {/* Explore More - toggles accordion */}
                      <button
                        type="button"
                        onClick={() => toggleExplore(item.id)}
                        className="flex items-center gap-3"
                        aria-expanded={isOpen}
                      >
                        <span
                          className="text-white text-[16px] sm:text-[18px]"
                          style={{ fontFamily: "MontserratMedium" }}
                        >
                          Explore More
                        </span>
                        <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center transition-transform duration-200">
                          <GoArrowUpRight
                            className={`text-[#C99237] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                            size={18}
                          />
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Accordion content - description + image */}
                  <div
                    className={`${accordionStyles.accordionContent} ${isOpen ? accordionStyles.accordionContentOpen : accordionStyles.accordionContentClosed}`}
                  >
                    <div className="px-4 sm:px-5 md:px-6 lg:px-7 pb-5 sm:pb-6 md:pb-7">
                      <div className="pl-0 sm:pl-[86px] lg:pl-[96px]">
                        <p
                          className="mt-0 pt-0 text-white font-[400] text-[16px] leading-[28px] tracking-[0em] max-w-[796px] lg:ml-[10px] lg:text-[17px]"
                          style={{ fontFamily: "OpenSansRegular" }}
                        >
                          {item.description}
                        </p>

                        <div className="mt-8 sm:mt-9 md:mt-10 relative w-full max-w-[760px] h-[190px] sm:h-[225px] md:h-[250px] lg:h-[206px] xl:h-[210px] rounded-[8px] overflow-hidden">
                          <Image
                            src={CELEBRITY_IMAGE}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="(min-width: 1280px) 760px, (min-width: 1024px) 60vw, 90vw"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
