"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import pageStyles from "./page.module.css";

const NAVY_ACTIVE = "#1E255E";

const FAQ_ITEMS = [
    {
        id: "01",
        question: "Is Ritz Media World a real estate digital marketing agency in India?",
        answer:
            "Yes Ritz Media World is a real estate digital marketing agency in India.",
    },
    {
        id: "02",
        question: "Does Ritz Media World offer creative services in Delhi NCR?",
        answer:
            "Yes we offer creative services in Delhi Noida and Delhi NCR.",
    },
    {
        id: "03",
        question: "Is Ritz Media World a full service marketing agency?",
        answer:
            "Yes we offer SEO, Social Media Marketing, Branding, PPC, Web Designing, Newspaper Ad & FM radio Ad Services.",
    },
    {
        id: "04",
        question: " Does Ritz Media World provide social media marketing services?",
        answer:
            "Yes we offer social media marketing, Meta Ads, Instagram marketing, and content creation services.",
    },
    {
        id: "05",
        question: " Is Ritz Media World a creative agency in Noida?",
        answer:
            "Yes Ritz Media World is a creative agency in Noida and offers branding and advertising services.",
    },
    {
        id: "06",
        question: " Does Ritz Media World offer newspaper and radio advertising?",
        answer:
            "Yes we offer newspaper advertising, print media advertising and FM Radio advertising services",
    },
    {
        id: "07",
        question: " Does Ritz Media World provide SEO and PPC services?",
        answer:
            "Yes we offer SEO, Google Ads, PPC, performance marketing services.",
    },
    {
        id: "08",
        question: "Why choose Ritz Media World?",
        answer:
            "We combine creative branding, digital marketing and performance strategies and help brands grow at a faster rate.",
    },
];

function Faq() {
    const [activeId, setActiveId] = useState(FAQ_ITEMS[0].id);
    const [heights, setHeights] = useState({});
    const answerRefs = useRef({});

    const measureHeights = useCallback(() => {
        const next = {};
        FAQ_ITEMS.forEach((item) => {
            const el = answerRefs.current[item.id];
            if (el) next[item.id] = el.scrollHeight;
        });
        setHeights(next);
    }, []);

    useLayoutEffect(() => {
        measureHeights();
        window.addEventListener("resize", measureHeights);
        return () => window.removeEventListener("resize", measureHeights);
    }, [measureHeights, activeId]);

    return (
        <section className="w-full px-4 py-0 md:px-6 md:py-[0px] lg:px-8">
            <div className="mx-auto w-full max-w-[1366px]">
                <div
                    className={`overflow-hidden rounded-[12px] bg-white ${pageStyles.fontopensans} lg:grid lg:grid-cols-[42.8%_57.2%] lg:items-center`}
                >
                    {/* Left — intro */}
                    <div className="flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                        <h2
                            className={`${pageStyles.fontMontserrat} text-[30px] font-semibold leading-[1.05] tracking-[-0.01em] text-[#0E0E0E] text-center lg:text-left sm:text-[35px] md:text-[40px] xl:text-[45px] lg:text-[30px]`}
                        >
                            Frequently asked questions
                        </h2>

                        <p
                            className={`mt-7 text-[14px] font-semibold leading-[1.28] text-[#111111] text-center lg:text-left sm:text-[15px] lg:mt-9 lg:text-[16px] ${pageStyles.fontopensans}`}
                        >
                            Ready to Unleash the Power of Your Brand.
                        </p>

                        <p
                            className={`mt-5 xl:max-w-[500px] lg:w-full text-[14px] leading-[1.72] text-[#2F2F2F] text-center lg:text-left sm:text-[15px] lg:mt-6 lg:max-w-[560px] lg:text-[16px]`}
                        >
                            The FAQ section answers the most commonly asked
                            questions related to our services. See how Ritz Media
                            World can create creative solutions for your specific
                            needs and beyond expectations.
                        </p>
                    </div>

                    {/* Right — stacked accordion (Faq3D / contact pattern) */}
                    <div className="py-0">
                        {FAQ_ITEMS.map((item, index) => {
                            const isOpen = activeId === item.id;
                            const isFirst = index === 0;
                            const isLast = index === FAQ_ITEMS.length - 1;

                            return (
                                <div
                                    key={item.id}
                                    className={`-mt-[7px] overflow-hidden border border-solid border-[#1A235C] transition-[background-color] duration-300 ease-out ${
                                        isFirst ? "mt-0 rounded-t-[12px]" : "rounded-t-[12px]"
                                    } ${isLast ? "rounded-b-[12px]" : ""} ${
                                        isOpen
                                            ? "relative z-[2] text-white"
                                            : "relative z-[1] bg-white text-[#111111] hover:bg-[#F8F9FC]"
                                    }`}
                                    style={
                                        isOpen
                                            ? { backgroundColor: NAVY_ACTIVE }
                                            : undefined
                                    }
                                >
                                    <button
                                        type="button"
                                        className="flex min-h-[62px] w-full cursor-pointer items-center gap-4 rounded-t-[12px] px-5 py-4 text-left sm:min-h-[70px] sm:gap-5 sm:px-6 sm:py-5 lg:min-h-[72px] lg:px-7"
                                        onClick={() =>
                                            setActiveId((prev) =>
                                                prev === item.id ? prev : item.id
                                            )
                                        }
                                        aria-expanded={isOpen}
                                    >
                                        <span
                                            className={`${pageStyles.fontMontserrat} w-10 shrink-0 text-[16px] font-semibold leading-none sm:w-12 sm:text-[18px] lg:text-[18px]`}
                                        >
                                            {item.id}
                                        </span>
                                        <span
                                            className={`${pageStyles.fontMontserrat} flex-1 text-[16px] font-semibold leading-[1.32] sm:text-[17px] lg:text-[18px]`}
                                        >
                                            {item.question}
                                        </span>
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-[height,opacity] duration-500 ease-in-out ${
                                            isOpen ? "opacity-100" : "opacity-0"
                                        }`}
                                        style={{
                                            height: isOpen
                                                ? heights[item.id]
                                                    ? `${heights[item.id]}px`
                                                    : "auto"
                                                : "0px",
                                        }}
                                    >
                                        <div
                                            ref={(el) => {
                                                answerRefs.current[item.id] = el;
                                            }}
                                            className="px-5 pb-6 sm:px-6 sm:pb-7 lg:px-7 lg:pb-8"
                                        >
                                            <div className="flex gap-4 sm:gap-5">
                                                <span className="w-10 shrink-0 sm:w-12" />
                                                <p className="max-w-[900px] whitespace-pre-line text-[14px] leading-[1.8] text-white/90 sm:text-[15px] lg:text-[16px]">
                                                    {item.answer}
                                                </p>
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

export default Faq;
