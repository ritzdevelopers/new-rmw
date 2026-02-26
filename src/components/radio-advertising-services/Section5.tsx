"use client";

import { useState } from "react";
import S5Card from "./cards/S5Card";
import styles from "./page.module.css";

const TOTAL_CARDS = 8;
const CARD_WIDTH = 378;
const CARD_GAP = 16;
const SLIDE_STEP = CARD_WIDTH + CARD_GAP;

function Section5() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goNext = () => setCurrentIndex((prev) => (prev + 1) % TOTAL_CARDS);
    const goPrev = () => setCurrentIndex((prev) => (prev - 1 + TOTAL_CARDS) % TOTAL_CARDS);

    const progressPercent = ((currentIndex + 1) / TOTAL_CARDS) * 100;
    const currentPage = (currentIndex + 1).toString().padStart(2, "0");

    return (
        <section className="w-full px-20 py-[70px] flex justify-center items-center">
            <div className={`w-full flex flex-col justify-center items-center gap-10 ${styles.containerWidth}`}>
                <div className="w-full flex flex-col justify-center items-center">
                    <p className="font-[600] text-[16px] uppercase text-[#C99237]">
                        Services
                    </p>
                    <h2 className="font-[700] text-[36px]">What We Provide</h2>
                    <p className="font-[400] text-[16px]">Is more than what you'll ever need</p>
                </div>

                <div className="w-full flex flex-col gap-8 justify-between">
                    {/* Slider: one card visible at a time, infinite loop */}
                    <div className="w-full flex justify-center">
                        <div className="overflow-hidden" style={{ width: '100% '}}>
                            <div
                                className={`${styles.s5SliderTrack} flex gap-4`}
                                style={{
                                    transform: `translateX(-${currentIndex * SLIDE_STEP}px)`,
                                }}
                            >
                                {Array.from({ length: TOTAL_CARDS }).map((_, index) => (
                                    <S5Card
                                        key={index}
                                        isActive={index === currentIndex}
                                        isOpen={index === currentIndex}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Pagination, progress bar, prev/next */}
                    <div className="flex w-full justify-between items-center gap-4">
                        <div className="w-[100px] flex justify-between items-center">
                            <p className="font-[500] text-[20px] text-[#222222]">{currentPage}</p>
                            <span className="font-[500] text-[20px] text-[#808080]">/</span>
                            <p className="font-[500] text-[20px] text-[#808080]">
                                {TOTAL_CARDS.toString().padStart(2, "0")}
                            </p>
                        </div>

                        <div className="w-[calc(100%-200px)] h-[2px] bg-[#D9D9D9] rounded-[5px] relative overflow-hidden">
                            <div
                                className="h-full bg-[#000000] rounded-[5px] transition-all duration-300 ease-out"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>

                        <div className="w-[100px] flex justify-between items-center">
                            <button
                                type="button"
                                onClick={goPrev}
                                className="w-[28px] h-[28px] cursor-pointer flex justify-center items-center hover:opacity-80 transition-opacity"
                                aria-label="Previous card"
                            >
                                <img src="/lft-btn.svg" alt="" className="w-full h-full" />
                            </button>
                            <button
                                type="button"
                                onClick={goNext}
                                className="w-[28px] h-[28px] cursor-pointer flex justify-center items-center hover:opacity-80 transition-opacity"
                                aria-label="Next card"
                            >
                                <img src="/rght-btn.svg" alt="" className="w-full h-full" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Section5;
