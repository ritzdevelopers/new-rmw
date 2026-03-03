"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";

type CaseStudy = {
  title: string;
  image: string;
  slug: string;
};

const ITEMS_PER_BATCH = 6;
const MOCK_CARDS: CaseStudy[] = [
  {
    title: "Unleashing Digital Dominance: The PAYTM Success Story",
    image: "/work-html/banners/wave_work.png",
    slug: "#",
  },
  {
    title: "Creative Services vs. Marketing Services: What's the Difference?",
    image: "/work-html/banners/wave_work.png",
    slug: "#",
  },
  {
    title: "From Reality to Virtuality - Metaverse Technology",
    image: "/work-html/banners/wave_work.png",
    slug: "#",
  },
  {
    title: "Navigating Success: A Case Study on MakeMyTrip",
    image: "/work-html/banners/wave_work.png",
    slug: "#",
  },
  {
    title: "360° Audio Branding Strategy with hit 360° Audio Branding",
    image: "/work-html/banners/wave_work.png",
    slug: "#",
  },
  {
    title: "Dominating the Indian Small Car Market: A Maruti Case Study",
    image: "/work-html/banners/wave_work.png",
    slug: "#",
  },
  {
    title: "Reinventing Brand Presence Through Social Storytelling",
    image: "/work-html/banners/wave_work.png",
    slug: "#",
  },
  {
    title: "Scaling Engagement with Performance-Led Content",
    image: "/work-html/banners/wave_work.png",
    slug: "#",
  },
  {
    title: "How Regional Campaigns Drove Pan-India Awareness",
    image: "/work-html/banners/wave_work.png",
    slug: "#",
  },
  {
    title: "Driving App Installs with Creative-First Paid Media",
    image: "/work-html/banners/wave_work.png",
    slug: "#",
  },
  {
    title: "Building Trust with Community-Led Digital Campaigns",
    image: "/work-html/banners/wave_work.png",
    slug: "#",
  },
  {
    title: "From Product Launch to Market Leadership in 90 Days",
    image: "/work-html/banners/wave_work.png",
    slug: "#",
  },
];

export default function Section2() {
  const [cards] = useState<CaseStudy[]>(MOCK_CARDS);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);

  const visibleCards = useMemo(
    () => cards.slice(0, visibleCount),
    [cards, visibleCount]
  );

  const hasMore = visibleCount < cards.length;

  const onLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_BATCH);
  };

  return (
    <section className="w-full bg-white py-8 sm:py-10 md:py-12">
      <div className="w-[92%] sm:w-[88%] md:w-[84%] lg:w-[78%] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {visibleCards.map((item, index) => (
            <Link
              key={`${item.slug}-${index}`}
              href={item.slug || "#"}
              className="block border border-[#E7E7E7] bg-white overflow-hidden transition-shadow duration-300 hover:shadow-md"
            >
              <div className="relative w-full aspect-[16/9] bg-[#F2F2F2]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>

              <div className="p-3 sm:p-4">
                <h3
                  className="text-[#0F1640] text-[22px] leading-[34px] min-h-[68px]"
                  style={{ fontFamily: "MontserratBold", fontWeight: 700 }}
                >
                  {item.title}
                </h3>

                <div className="mt-1 flex items-center gap-2">
                  <p
                    className="text-[#0F1640] text-[18px] leading-[46px]"
                    style={{ fontFamily: "MontserratMedium", fontWeight: 500 }}
                  >
                    Case Studies
                  </p>
                  <span
                    aria-label="Case studies"
                    className="w-7 h-7 rounded-full bg-[#C99237] flex items-center justify-center shrink-0"
                  >
                    <GoArrowUpRight className="text-white" size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {hasMore && (
          <div className="mt-7 sm:mt-9 border-y border-[#E9E9E9] py-2 sm:py-5 text-center">
            <button
              type="button"
              onClick={onLoadMore}
              className="text-[#0F1640] text-[18px] leading-[50px] text-center"
              style={{ fontFamily: "MontserratSemiBold", fontWeight: 600 }}
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}