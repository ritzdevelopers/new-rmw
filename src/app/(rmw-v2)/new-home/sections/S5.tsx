"use client";

import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type StoryResult = {
  icn: string;
  title: string;
  para: string;
};

type StoryCard = {
  title: string;
  img: string;
  subTitle: string;
  subPara: string;
  para: string;
  subPara2: string;
  para2: string;
  res?: string;
  results: StoryResult[];
  link: string;
  btn: string;
};

const storiesData: StoryCard[] = [
  {
    title: "Digital Advertising",
    img: "/new-page/icns/s5-i1.png",
    subTitle: "Luxury Real Estate",
    subPara: "Challenge",
    para: "Launch a high-end residential project in NCR while competing with legacy developers.",
    subPara2: "Our Approach",
    para2:
      "Integrated marketing with newspaper centrespreads, metro-wide outdoor presence, and precision digital funnels.",
    res: "Results",
    results: [
      {
        icn: "/new-page/icns/badge-icn.png",
        title: "250%",
        para: "Increase in qualified leads",
      },
      {
        icn: "/new-page/icns/users-icn.png",
        title: "85%",
        para: "Target audience reach",
      },
      {
        icn: "/new-page/icns/globe-icn.png",
        title: "40%",
        para: "Conversion rate",
      },
    ],
    link: "/case-studies/digital-advertising",
    btn: "Digital Advertising",
  },
  {
    title: "Print Advertising",
    img: "/new-page/icns/s5-i2.png",
    subTitle: "Lifestyle & Retail",
    subPara: "Challenge",
    para: "Transform a regional player into a national luxury brand for the UHNI audience.",
    subPara2: "Our Approach",
    para2:
      "360° brand refresh supported by storytelling-led editorial spreads, experiential OOH, and social advocacy.",
    res: "Results",
    results: [
      {
        icn: "/new-page/icns/badge-icn.png",
        title: "180%",
        para: "Lift in brand awareness",
      },
      {
        icn: "/new-page/icns/users-icn.png",
        title: "3X",
        para: "Growth in social engagement",
      },
      {
        icn: "/new-page/icns/globe-icn.png",
        title: "65%",
        para: "Increase in market share",
      },
    ],
    link: "/case-studies/print-advertising",
    btn: "Print Advertising",
  },
  {
    title: "Brand Identity",
    img: "/new-page/icns/s5-i3.png",
    subTitle: "Healthcare & Wellness",
    subPara: "Challenge",
    para: "Reposition a specialised medical network as the go-to destination for international patients.",
    subPara2: "Our Approach",
    para2:
      "Research-driven brand architecture, premium visual system, and multilingual patient experience journeys.",
    res: "Results",
    results: [
      {
        icn: "/new-page/icns/badge-icn.png",
        title: "210%",
        para: "Rise in global inquiries",
      },
      {
        icn: "/new-page/icns/users-icn.png",
        title: "92%",
        para: "Patient satisfaction scores",
      },
      {
        icn: "/new-page/icns/globe-icn.png",
        title: "54%",
        para: "Increase in repeat visits",
      },
    ],
    link: "/case-studies/brand-identity",
    btn: "Brand Identity",
  },
];

function S5() {
  return (
    <section className="relative flex w-full justify-center overflow-hidden bg-[#FDF8F1] py-16 sm:py-20 md:pb-[5px] lg:py-24">
      <div className="flex w-full max-w-[99%] flex-col gap-12 px-4 sm:px-6 lg:px-0">
        {/* Row 1 */}
        <div className="flex flex-col items-center gap-4 text-center">
          <button className="inline-flex h-9 w-[130px] items-center justify-center rounded-full bg-[#E8DDD1] text-[14px] font-[400] text-[#8B7355] ">
            Proven Results
          </button>
          <h2 className="text-3xl font-semibold text-[#101828] sm:text-4xl lg:text-[48px] lg:leading-[1.15]">
            Success Stories That <span className="text-[#D4A574]">Inspire</span>
          </h2>
          <p className="text-base text-[#4A5565] sm:text-lg">
            Real challenges. Creative solutions. Measurable brand impact.
          </p>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col gap-16 sm:gap-20">
          {storiesData.map((story, idx) => (
            <article
              key={story.title}
              className={`flex flex-col gap-8 lg:items-center lg:justify-center lg:gap-6 ${
                idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              <div className="relative w-full overflow-hidden rounded-[28px] bg-white shadow-[0_25px_65px_rgba(16,24,40,0.12)] sm:w-[85%] sm:self-center lg:w-[46%]">
                <div className="relative aspect-[4/3] lg:w-full lg:h-[384px]">
                  <Image
                    src={story.img}
                    alt={story.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex w-full flex-col gap-4 rounded-[28px]te px-6 py-8 sm:px-10 lg:w-[46%]">
                <div className="flex flex-col gap-1">
                  <p className="text-[14px] font-[400] text-[#D4A574]">
                    {story.subTitle}
                  </p>
                  <h3 className="text-[26px] font-semibold text-[#101828] sm:text-[32px]">
                    {story.title}
                  </h3>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[14px] font-[400] text-[#6A7282]">
                      {story.subPara}
                    </p>
                    <p className="text-sm text-[#364153] sm:text-base">
                      {story.para}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[14px] font-[400] text-[#6A7282]">
                      {story.subPara2}
                    </p>
                    <p className="text-sm text-[#364153] sm:text-base">
                      {story.para2}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap lg:flex-nowrap gap-2">
                  {story.results.map((result) => (
                    <div
                      key={`${story.title}-${result.title}`}
                      className="flex h-[110px] w-[190px] flex-col items-center justify-center gap-2 rounded-2xl  bg-[#F9FAFB] text-center sm:w-[200px]"
                    >
                      <Image
                        src={result.icn}
                        alt={result.title}
                        width={24}
                        height={24}
                      />
                      <h4 className="text-xl font-semibold text-[#101828]">
                        {result.title}
                      </h4>
                      <p className="text-xs text-[#4A5565] sm:text-sm">
                        {result.para}
                      </p>
                    </div>
                  ))}
                </div>

                <Link
                  href={story.link}
                  className="group inline-flex items-center gap-3 text-[14px] font-[500] text-[#3D2817] transition-transform duration-200 hover:translate-x-1 "
                >
                  View Full Case Study
                  <MoveRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Row 3 */}
        <div className="flex w-full justify-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-3 rounded-xl bg-[#D4A574] px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#c2925d] sm:px-8 sm:py-4 sm:text-base h-[40px]"
          >
            View All 500+ Success Stories
            <MoveRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default S5;
