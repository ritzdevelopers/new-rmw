"use client";

import { useState, useEffect } from "react";
import S5Card from "./cards/S5Card";
import S5CardMobile from "./cards/S5CardMobile";
import styles from "./page.module.css";

const TOTAL_CARDS = 8;
const CARD_WIDTH = 378;
const CARD_GAP = 16;
const SLIDE_STEP = CARD_WIDTH + CARD_GAP;
const SLIDE_PERCENT = 100 / TOTAL_CARDS;

const CARD_CONTENT = {
    title: "Advertising Concept Development",
    image: "/radio-advertising-page/s5/s5i1.png",
    content:
        "As a leading radio advertising agency, we craft compelling, audio-centric campaign ideas, specifically designed to resonate with FM radio audiences. Our approach is designed to guarantee that your radio advertisement breaks through, delivers brand awareness, and generates measurable results in the target market.",
};

function useIsXl() {
    const [isXl, setIsXl] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const set = () => setIsXl(mq.matches);
        set();
        mq.addEventListener("change", set);
        return () => mq.removeEventListener("change", set);
    }, []);
    return isXl;
}

function Section5() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const isXl = useIsXl();

    const goNext = () => setCurrentIndex((prev) => (prev + 1) % TOTAL_CARDS);
    const goPrev = () => setCurrentIndex((prev) => (prev - 1 + TOTAL_CARDS) % TOTAL_CARDS);

    const progressPercent = ((currentIndex + 1) / TOTAL_CARDS) * 100;
    const currentPage = (currentIndex + 1).toString().padStart(2, "0");

    const trackTransform = isXl
        ? `translateX(-${currentIndex * SLIDE_STEP}px)`
        : `translateX(-${currentIndex * SLIDE_PERCENT}%)`;

    return (
        <section className="w-full py-8 sm:py-12 md:py-16 xl:py-[70px] flex justify-center items-center">

            {/* Centered Align Container  */}
            <div className={`w-full flex flex-col justify-center items-center gap-6 sm:gap-8 xl:gap-10 ${styles.containerWidth}`}>
                <div className="w-full flex flex-col justify-center items-center text-center px-2 sm:px-0">
                    <p className={`font-[600] text-[12px] sm:text-[14px] xl:text-[16px] uppercase text-[#C99237] ${styles.fontpoppins}`}>
                        Services
                    </p>
                    <h2 className={`font-[700] text-[24px] sm:text-[28px] md:text-[32px] xl:text-[36px] ${styles.fontmontserrat}`}>
                        What We Provide
                    </h2>
                    <p className={`font-[400] text-[14px] sm:text-[15px] xl:text-[16px] ${styles.fontopensans}`}>
                        Is more than what you'll ever need
                    </p>
                </div>

                <div className="w-full flex flex-col gap-6 sm:gap-8 justify-between">
                    {/* Mobile only: slider with image-on-top cards */}
                    <div className="w-full flex justify-center overflow-hidden sm:hidden">
                        <div className="w-full overflow-hidden">
                            <div
                                className={`${styles.s5SliderTrack} flex`}
                                style={{
                                    width: "800%",
                                    transform: `translateX(-${currentIndex * SLIDE_PERCENT}%)`,
                                }}
                            >
                                {Array.from({ length: TOTAL_CARDS }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-center items-stretch flex-shrink-0 w-[12.5%] min-w-0 px-1"
                                        style={{ flexBasis: "12.5%" }}
                                    >
                                        <S5CardMobile
                                            title={CARD_CONTENT.title}
                                            image={CARD_CONTENT.image}
                                            content={CARD_CONTENT.content}
                                            index={index}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sm and up: existing book-style slider (unchanged) */}
                    <div className="hidden sm:flex w-full justify-center overflow-hidden">
                        <div className="w-full overflow-hidden">
                            <div
                                className={`${styles.s5SliderTrack} flex ${isXl ? "gap-4" : ""}`}
                                style={{
                                    width: isXl ? undefined : "800%",
                                    transform: trackTransform,
                                }}
                            >
                                {Array.from({ length: TOTAL_CARDS }).map((_, index) => (
                                    <div
                                        key={index}
                                        className={`flex justify-center items-center flex-shrink-0 xl:flex-none ${isXl ? "" : "w-[12.5%] min-w-0"}`}
                                        style={isXl ? undefined : { flexBasis: "12.5%" }}
                                    >
                                        <div className="flex justify-center items-center [&>*]:origin-center [&>*]:scale-[0.82] sm:[&>*]:scale-90 md:[&>*]:scale-95 xl:[&>*]:scale-100">
                                            <S5Card
                                                isActive={index === currentIndex}
                                                isOpen={index === currentIndex}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Pagination, progress bar, prev/next (shared) */}
                    <div className="flex w-full justify-between items-center gap-2 sm:gap-4">
                        <div className="flex justify-between items-center min-w-[60px] sm:min-w-[80px] xl:w-[100px]">
                            <p className="font-[500] text-[14px] sm:text-[18px] xl:text-[20px] text-[#222222]">
                                {currentPage}
                            </p>
                            <span className="font-[500] text-[14px] sm:text-[18px] xl:text-[20px] text-[#808080]">/</span>
                            <p className="font-[500] text-[14px] sm:text-[18px] xl:text-[20px] text-[#808080]">
                                {TOTAL_CARDS.toString().padStart(2, "0")}
                            </p>
                        </div>

                        <div className="flex-1 min-w-0 h-[2px] bg-[#D9D9D9] rounded-[5px] relative overflow-hidden mx-1 sm:mx-2">
                            <div
                                className="h-full bg-[#000000] rounded-[5px] transition-all duration-300 ease-out"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>

                        <div className="flex justify-between items-center gap-1 min-w-[56px] sm:min-w-[72px] xl:w-[100px]">
                            <button
                                type="button"
                                onClick={goPrev}
                                className="w-6 h-6 sm:w-7 sm:h-7 xl:w-[28px] xl:h-[28px] cursor-pointer flex justify-center items-center hover:opacity-80 transition-opacity flex-shrink-0"
                                aria-label="Previous card"
                            >
                                <img src="/lft-btn.svg" alt="" className="w-full h-full object-contain" />
                            </button>
                            <button
                                type="button"
                                onClick={goNext}
                                className="w-6 h-6 sm:w-7 sm:h-7 xl:w-[28px] xl:h-[28px] cursor-pointer flex justify-center items-center hover:opacity-80 transition-opacity flex-shrink-0"
                                aria-label="Next card"
                            >
                                <img src="/rght-btn.svg" alt="" className="w-full h-full object-contain" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Section5;
