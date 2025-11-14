"use client";

import Image from "next/image";
import React from "react";

type TimelineItem = {
  icn: string;
  year: string;
  title: string;
  para: string;
};

const TIMELINE_DATA: TimelineItem[] = [
  {
    icn: "/new-page/icns/glob_white.png",
    year: "2008",
    title: "Foundation",
    para: "Ritz Media World launched with a mission to reimagine brand communication for India's growth markets.",
  },
  {
    icn: "/new-page/icns/glob_white.png",
    year: "2012",
    title: "Innovation Leadership",
    para: "Pioneered centrespread storytelling in Hindustan Times, setting new creative benchmarks for print.",
  },
  {
    icn: "/new-page/icns/glob_white.png",
    year: "2016",
    title: "Digital Expansion",
    para: "Scaled into 360° digital marketing, unifying performance, content, and automation for premium brands.",
  },
  {
    icn: "/new-page/icns/glob_white.png",
    year: "2020",
    title: "Premium Positioning",
    para: "Became the go-to agency for UHNI and luxury lifestyle brands across India and the Middle East.",
  },
  {
    icn: "/new-page/icns/glob_white.png",
    year: "2025",
    title: "Today",
    para: "17+ years, 1000+ campaigns, 500+ success stories—and we’re still elevating brands to market leadership.",
  },
];

const TIMELINE_STATS = [
  {
    value: "17+",
    label: "Years of Excellence",
  },
  {
    value: "1,000+",
    label: "Campaigns Delivered",
  },
  {
    value: "500+",
    label: "Success Stories",
  },
  {
    value: "50+",
    label: "Cities Covered",
  },
];

function TimelineCard({
  item,
  txtAlign,
}: {
  item: TimelineItem;
  txtAlign: String;
}) {
  return (
    <div className="w-full max-w-[525px] rounded-[20px] bg-white p-6 shadow-[0_20px_60px_rgba(16,24,40,0.08)]">
      <div className={`flex flex-col gap-3 ${txtAlign}`}>
        <div>
          <span className="text-[28px] font-semibold text-[#D4A574]">
            {item.year}
          </span>
        </div>
        <div>
          <p className="text-base font-semibold text-[#101828]">{item.title}</p>
        </div>
        <p className="text-sm leading-relaxed text-[#4A5565]">{item.para}</p>
      </div>
    </div>
  );
}

function S7() {
  return (
    <section className="relative flex w-full justify-center overflow-hidden bg-[#F7F9FC] py-16 sm:py-20 lg:py-20">
      <div className="flex w-full max-w-[96%] flex-col gap-14 px-4 sm:px-6 lg:px-0">
        {/* Row 1 */}
        <div className="flex flex-col items-center gap-3 text-center">
          <button className="inline-flex h-9 w-[130px] items-center justify-center rounded-full bg-[#D4A574] text-[14px] font-[400] text-[#ffffff] ">
            Our Journey
          </button>
          <h2 className="text-3xl font-semibold text-[#101828] sm:text-4xl lg:text-[48px] lg:leading-[1.1]">
            17 Years of <span className="text-[#D4A574]">Brand Excellence</span>
          </h2>
          <p className="max-w-2xl text-base text-[#4A5565] sm:text-lg">
            From pioneering print innovations to 360° digital mastery, our
            journey reflects our commitment to excellence.
          </p>
        </div>

        {/* Row 2 */}
        <div className="relative flex flex-col gap-16 lg:gap-20 ">
          <div className="hidden lg:block absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#E4C08C] via-[#D4A574] to-[#E4C08C]" />

          {TIMELINE_DATA.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.year}
                className="grid gap-8 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:justify-between"
              >
                <div
                  className={`hidden lg:flex ${
                    isEven ? "justify-start" : "justify-start"
                  }`}
                >
                  {isEven ? (
                    <TimelineCard item={item} txtAlign={"text-right"} />
                  ) : null}
                </div>

                <div className="relative flex flex-col items-center gap-3">
                  <span className="h-10 w-[2px] bg-gradient-to-b from-transparent via-[#D4A574] to-transparent lg:h-16" />
                  <div className="flex h-12 w-12 items-center overflow-hidden justify-center rounded-full border border-[#F6E2C8] bg-white shadow-[0_12px_30px_rgba(212,165,116,0.28)] p-1">
                <div className="bg-[#D4A574] w-full h-full rounded-full flex justify-center items-center">
                <Image
                      src={item.icn}
                      alt={item.title}
                      width={26}
                      height={26}
                    />
                  </div>
                 
                </div> <span className="h-10 w-[2px] bg-gradient-to-b from-transparent via-[#D4A574] to-transparent lg:h-16" />
                </div>

                <div
                  className={`hidden lg:flex ${
                    isEven ? "justify-end" : "justify-end"
                  }`}
                >
                  {!isEven ? (
                    <TimelineCard item={item} txtAlign={"text-left"} />
                  ) : null}
                </div>

                <div className="lg:hidden">
                  <TimelineCard item={item} txtAlign={"text-left"} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Row 3 */}
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
          {TIMELINE_STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-[14px] border border-[#E5E7EB] bg-white px-6 py-6 text-center "
            >
              <h2 className="text-3xl font-semibold text-[#D4A574] sm:text-[36px]">
                {stat.value}
              </h2>
              <p className="text-[16px] font-[400] text-[#364153] sm:text-[13px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default S7;
