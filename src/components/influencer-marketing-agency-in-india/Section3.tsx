"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Plus } from "lucide-react";
import accordionStyles from "./Section3.module.css";
import containerStyles from "@/components/celebrity-endorsements/page.module.css";

const EXPLORE_ARROW_IMAGE =
  "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";

const servicesData = [
  {
    id: "01",
    title: "Influencer Identification",
    titleLineBreak: true,
    description:
      "When developing a partnership with an influencer, it is critical to find someone who not only has a voice, but also has the ability to create trust and influence purchasing behaviour amongst their audience, becoming lifelong customers for your business!|||Ritz Digital Media provides results-driven influencer partnerships through identifying and qualifying each influencer that shares similar values with the brand delivering authentic engagement, authentic influence, and measurable conversions.",
    hasImage: true,
    imageSrc: "/varun/influencer-marketing/Influencer%20Identification.jpg",
  },
  {
    id: "02",
    title: "Cost-Benefit Analysis",
    imageSrc: "/varun/influencer-marketing/Cost-Benefit%20Analysis.jpg",
    description:
      "Successful influencer marketing campaigns require balancing your budget with the return when investing in developing the relationship with each influencer you decide to partner with.|||Additionally, our team will work collaboratively with you to provide a complete cost benefit analysis and develop an influencer marketing strategy to ensure you receive maximum ROI on your budget, targeted investments, and authentic partnerships that will result in true business success, not just exposure.",
  },
  {
    id: "03",
    title: "Term Negotiations",
    imageSrc: "/varun/influencer-marketing/Terms%20Negotiations.jpg",
    description:
      "Bargaining with an influencer is an art. Our team will advocate for you to negotiate mutually beneficial terms, a well-defined strategic deliverable, and competitive pricing with each of your influencer partnerships, ensuring each partnership is risk-free, profitable and long-lasting.|||With our expertise we handle all influencer agreements professionally, protecting your interests to maximise the success of each of your influencer marketing campaigns.",
  },
  {
    id: "04",
    title: "Creative Collaboration",
    imageSrc: "/varun/influencer-marketing/Creative%20Collaboration.jpg",
    description:
      "Influencers succeed with authentic engagement, not scripted messaging. We work closely with the influencers to leverage their authentic voice through effective brand messaging to create copy that is credible, compelling and drives action.|||Each campaign will allow the influencer to use their creativity to gain trust with audiences, resulting in measurable engagement of audiences.",
  },
  {
    id: "05",
    title: "Campaign Integration",
    imageSrc: "/varun/influencer-marketing/Campaign%20Integration.jpg",
    description:
      "Combined with influencer content, the reach is best served if it is completely merged within the overall marketing campaign across all available media (digital, social, & traditional).|||Our goal is to reach more people through the best, most consistent messaging possible & persuade them to do business with the company's product in order to provide a greater level of marketing effectiveness.",
  },
  {
    id: "06",
    title: "Messaging Optimization",
    imageSrc: "/varun/influencer-marketing/Messaging%20Optimization.jpg",
    description:
      "Influencers can tell a great story, however, the great influence campaign must motivate customers to take action and participate in the brand and the product, whether that means making a purchase or joining the loyalty program (customer). With Ritz Media World, every influencer program provides results which are quantified!",
  },
];

export default function Section3() {
  const [openItem, setOpenItem] = useState<string | null>("01");

  return (
    <section className="w-full bg-[#0F1640] py-[35px] lg:py-[70px] flex justify-center px-4 sm:px-6 lg:px-0">

      <div className={`w-full mx-auto overflow-hidden ${containerStyles.containerWidth}`}>
        <div className="text-center">
          <p
            className="uppercase text-[11px] sm:text-[12px] tracking-[0.1em] text-[#C99237]"
            style={{ fontFamily: "MontserratSemiBold" }}
          >
            Services
          </p>
          <h2
            className="text-white text-[28px] lg:text-[36px] font-[700] leading-tight"
            style={{ fontFamily: "MontserratBold" }}
          >
            What We Provide
          </h2>
          <p
            className="text-[#FFFFFF] text-[12px] sm:text-[13px] md:text-[14px] mt-1"
            style={{ fontFamily: "OpenSansRegular" }}
          >
            Is more than what you&apos;ll ever need
          </p>
        </div>

        <div className="h-px w-full bg-[#2A3378] mt-8 sm:mt-10" />

        {/* First item - Influencer Identification - original 3-column layout when expanded */}
        <div className="border-b border-[#2A3378]">
          <button
            type="button"
            onClick={() => setOpenItem(openItem === "01" ? null : "01")}
            className="w-full py-4 sm:py-5 flex items-center justify-between gap-3 text-left cursor-pointer hover:bg-white/5 transition-colors"
            aria-expanded={openItem === "01"}
            style={{ display: openItem === "01" ? "none" : "flex" }}
          >
            <p
              className="text-[#E5E8FF] text-[15px] sm:text-[17px] md:text-[20px] leading-[22px] font-[700]"
              style={{ fontFamily: "MontserratRegular" }}
            >
              Influencer Identification
            </p>
            <Plus className="text-[#BFC6FF] w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          </button>
          <div
            className={`${accordionStyles.accordionContent} ${openItem === "01" ? accordionStyles.accordionContentOpen : accordionStyles.accordionContentClosed}`}
          >
            <div className="py-5 sm:py-6">
              <div className="flex flex-col lg:flex-row gap-1 lg:gap-8 xl:gap-10 items-start">
                <div className="flex items-start justify-between gap-3 sm:gap-4 lg:gap-5 w-full lg:w-[24%] xl:w-[22%] shrink-0 ml-0">
                  <div className="flex items-center sm:items-center lg:items-start gap-3 sm:gap-4 lg:gap-5 min-w-0">
                    <span
                      className="text-[#FFFFFF] text-[13px] sm:text-[15px] lg:pt-2 lg:mt-2"
                      style={{ fontFamily: "MontserratMedium" }}
                    >
                      01
                    </span>
                    <h3
                      className="text-white text-[24px] lg:text-[28px] leading-[28px] sm:leading-[28px] lg:leading-[44px] font-[500]"
                      style={{ fontFamily: "OpenSansRegular" }}
                    >
                      Influencer Identification
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenItem(null)}
                    aria-label="Collapse"
                    className="flex lg:hidden shrink-0 mt-1 hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    <Image
                      src="/service-v3/influencer-marketing-agency-in-india/s2/cross.svg"
                      alt="Collapse"
                      width={20}
                      height={20}
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                  </button>
                </div>
                <div className="w-full lg:flex-1 mt-1 lg:mt-0">
                  <div
                    className="text-[#FFFFFF] text-[16px] font-[400] leading-[22px] sm:leading-[24px] md:leading-[26px] lg:leading-[22px] tracking-[0] lg:text-[14px] xl:text-[16px] "
                    style={{ fontFamily: "OpenSansRegular" }}
                  >
                    {servicesData[0].description.split("|||").map((para, i) => (
                      <p key={i} className={i > 0 ? "mt-3 sm:mt-4 md:mt-4 lg:mt-5" : ""}>
                        {para.trim()}
                      </p>
                    ))}
                  </div>
                  <div className="mt-2 lg:mt-6 hidden lg:flex items-center gap-2.5">
                    <span
                      className="text-white text-[14px] sm:text-[15px]"
                      style={{ fontFamily: "MontserratMedium" }}
                    >
                      Learn more
                    </span>
                    <Link
                      href="/contact.html"
                      target="_blank"
                      aria-label="Learn more"
                      className="w-[40px]  h-[40px] rounded-full bg-[#C99237] flex items-center justify-center hover:bg-[#b8822f] transition-colors"
                    >
                      <Image
                        src={EXPLORE_ARROW_IMAGE}
                        alt="Arrow"
                        width={22}
                        height={7} 
                      />
                    </Link>
                  </div>
                </div>
                <div className="w-full lg:w-auto flex flex-col items-start gap-3 shrink-0 mt-4 lg:mt-0">
                  <div className="flex items-start gap-3 w-full">
                  <div
                    className="relative w-full aspect-[4/3] md:w-[280px] md:h-[198px] md:aspect-auto rounded-[5px] overflow-hidden"
                  >
                    <Image
                      src={servicesData[0].imageSrc}
                      alt="Influencer identification"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenItem(null)}
                    aria-label="Collapse"
                    className="hidden lg:flex shrink-0 mt-1 hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    <Image
                      src="/service-v3/influencer-marketing-agency-in-india/s2/cross.svg"
                      alt="Collapse"
                      width={30}
                      height={30}
                    />
                  </button>
                  </div>
                  <div className="flex lg:hidden mt-1 items-center gap-2.5 w-full md:w-[280px]">
                    <span
                      className="text-white text-[14px] sm:text-[15px]"
                      style={{ fontFamily: "MontserratMedium" }}
                    >
                      Learn more
                    </span>
                    <Link
                      href="/contact.html"
                      target="_blank"
                      aria-label="Learn more"
                      className="w-[40px] h-[40px] rounded-full bg-[#C99237] flex items-center justify-center hover:bg-[#b8822f] transition-colors"
                    >
                      <Image
                        src={EXPLORE_ARROW_IMAGE}
                        alt="Arrow"
                        width={22}
                        height={7}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Items 2-6 - same 3-column layout as first item when expanded */}
        {servicesData.slice(1).map((item) => {
          const isOpen = openItem === item.id;
          return (
            <div key={item.id} className="border-b border-[#2A3378]">
              <button
                type="button"
                onClick={() => setOpenItem(isOpen ? null : item.id)}
                className="w-full py-4 sm:py-5 flex items-center justify-between gap-3 text-left cursor-pointer hover:bg-white/5 transition-colors"
                aria-expanded={isOpen}
                style={{ display: isOpen ? "none" : "flex" }}
              >
<p
                className="text-[#E5E8FF] text-[15px] sm:text-[17px] md:text-[20px] font-[700]"
                style={{ fontFamily: "MontserratRegular" }}
              >
                {item.title}
              </p>
                <Plus className="text-[#BFC6FF] w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              </button>
              <div
                className={`${accordionStyles.accordionContent} ${isOpen ? accordionStyles.accordionContentOpen : accordionStyles.accordionContentClosed}`}
              >
                <div className="py-5 sm:py-6">
                  <div className="flex flex-col lg:flex-row gap-1 lg:gap-8 xl:gap-10 items-start">
                    <div className="flex items-start justify-between gap-3 sm:gap-4 lg:gap-5 w-full lg:w-[24%] xl:w-[22%] shrink-0 ml-0">
                      <div className="flex items-center sm:items-center lg:items-start gap-3 sm:gap-4 lg:gap-5 min-w-0">
                        <span
                          className="text-[#FFFFFF] text-[13px] sm:text-[15px] lg:pt-1 lg:mt-2"
                          style={{ fontFamily: "MontserratMedium" }}
                        >
                          {item.id}
                        </span>
                        <h3
                          className="text-white text-[24px] lg:text-[28px] leading-[28px] sm:leading-[28px] lg:leading-[44px] font-[500]"
                          style={{ fontFamily: "OpenSansRegular" }}
                        >
                          {item.title}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOpenItem(null)}
                        aria-label="Collapse"
                        className="flex lg:hidden shrink-0 mt-1 hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        <Image
                          src="/service-v3/influencer-marketing-agency-in-india/s2/cross.svg"
                          alt="Collapse"
                          width={20}
                          height={20}
                          className="w-4 h-4 sm:w-5 sm:h-5"
                        />
                      </button>
                    </div>
                    <div className="w-full lg:flex-1 mt-1 lg:mt-0">
                      <div
                        className="text-[#FFFFFF] text-[16px] font-[400] leading-[22px] sm:leading-[24px] md:leading-[26px] lg:leading-[28px] tracking-[0] lg:text-[16px]"
                        style={{ fontFamily: "OpenSansRegular" }}
                      >
                        {item.description.split("|||").map((para, i) => (
                          <p key={i} className={i > 0 ? "mt-3 sm:mt-4 md:mt-4 lg:mt-5" : ""}>
                            {para.trim()}
                          </p>
                        ))}
                      </div>
                      <div className="mt-2 lg:mt-6 hidden lg:flex items-center gap-2.5">
                        <span
                          className="text-white text-[14px] sm:text-[15px]"
                          style={{ fontFamily: "MontserratMedium" }}
                        >
                          Learn more
                        </span>
                        <Link
                          href="/contact.html"
                          target="_blank"
                          aria-label="Learn more"
                          className="w-[40px] h-[40px] rounded-full bg-[#C99237] flex items-center justify-center hover:bg-[#b8822f] transition-colors"
                        >
                          <Image
                            src={EXPLORE_ARROW_IMAGE}
                            alt="Arrow"
                            width={22}
                            height={7}
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="w-full lg:w-auto flex flex-col items-start gap-3 shrink-0 mt-2 lg:mt-0">
                      <div className="flex items-start gap-3 w-full">
                      <div
                        className="relative w-full aspect-[4/3] md:w-[280px] md:h-[198px] md:aspect-auto rounded-[5px] overflow-hidden"
                      >
                        <Image
                          src={item.imageSrc}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setOpenItem(null)}
                        aria-label="Collapse"
                        className="hidden lg:flex shrink-0 mt-1 hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        <Image
                          src="/service-v3/influencer-marketing-agency-in-india/s2/cross.svg"
                          alt="Collapse"
                          width={30}
                          height={30}
                        />
                      </button>
                      </div>
                      <div className="flex lg:hidden mt-1 items-center gap-2.5 w-full md:w-[280px]">
                        <span
                          className="text-white text-[14px] sm:text-[15px]"
                          style={{ fontFamily: "MontserratMedium" }}
                        >
                          Learn more
                        </span>
                        <Link
                          href="/contact.html"
                          target="_blank"
                          aria-label="Learn more"
                          className="w-[40px] h-[40px] rounded-full bg-[#C99237] flex items-center justify-center hover:bg-[#b8822f] transition-colors"
                        >
                          <Image
                            src={EXPLORE_ARROW_IMAGE}
                            alt="Arrow"
                            width={22}
                            height={7}
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

        <Link
          href="/contact.html"
          target="_blank"
          rel="noopener noreferrer"
          className="block cursor-pointer text-[#FFFFFF] text-[14px] font-[400] leading-[24px] tracking-[0] mt-4 text-center md:text-center lg:text-left hover:opacity-90 outline-none focus-visible:underline"
          style={{ fontFamily: "OpenSansRegular" }}
        >
          Not sure which path fits your brand?{" "}
          <span className="underline">
            Let&apos;s discuss your unique needs,
          </span>
        </Link>
      </div>
    </section>
  );
}
