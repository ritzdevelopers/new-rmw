"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { ChevronDown } from "lucide-react";

const LOGOS_PER_PAGE = 16;

type Section3Props = {
    logos: string[];
};

function Section3({ logos }: Section3Props) {
    const [visibleCount, setVisibleCount] = useState(() =>
        Math.min(LOGOS_PER_PAGE, logos.length)
    );

    const visibleLogos = logos.slice(0, visibleCount);
    const hasMore = visibleCount < logos.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => Math.min(prev + LOGOS_PER_PAGE, logos.length));
    };

    if (logos.length === 0) {
        return null;
    }

    return (
        <section className="w-full py-[40px] xl:py-[70px] flex flex-col gap-4 justify-center items-center">
            <div className={`w-full ${styles.containerWidth}`}>
                <div className="grid w-full grid-cols-3 md:grid-cols-4 border-t border-l border-[#D8D8D8]">
                    {visibleLogos.map((imgSrc, idx) => (
                        <div
                            key={imgSrc}
                            className="h-[120px] flex items-center justify-center border-b border-r border-[#D8D8D8]"
                        >
                            <img
                                src={imgSrc}
                                alt={`Client ${idx + 1}`}
                                className="max-h-[72px] w-auto object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {hasMore && (
                <div className="w-full flex justify-center items-center">
                    <button
                        type="button"
                        onClick={handleLoadMore}
                        className="bg-[#0F1640] rounded-[700] font-[500] w-[179px] h-[50px] flex justify-center items-center gap-2"
                    >
                        <p className="font-[400] text-[16px] cursor-pointer text-white">Load More</p>
                        <ChevronDown className="w-5 h-5 text-white" />
                    </button>
                </div>
            )}
        </section>
    );
}

export default Section3;
