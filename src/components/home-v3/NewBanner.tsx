"use client";
import { useEffect, useState } from "react";

const bannerSlides = [
    {
        image: "/4th_floor_rmw/home/banner/rmw-bn-i1.jpg",
        textColor: "text-white",
        highlightColor: "text-[#C99237]",
        domainColor: "text-[#C99237]",
        subHeadingColor: "text-white",
    },

    {
        image: "/4th_floor_rmw/home/banner/rmw-bn-i2.jpg",
        textColor: "text-[#1F2A44]",
        highlightColor: "text-[#C99237]",
        domainColor: "text-[#C99237]",
        subHeadingColor: "text-[#1F2A44]",
    },

    {
        image: "/4th_floor_rmw/home/banner/rmw-bn-i3.jpg",
        textColor: "text-white",
        highlightColor: "text-[#C99237]",
        domainColor: "text-[#C99237]",
        subHeadingColor: "text-white",
    },

    {
        image: "/4th_floor_rmw/home/banner/rmw-bn-i4.jpg",
        textColor: "text-[#0A3B3B]",
        highlightColor: "text-white",
        domainColor: "text-white",
        subHeadingColor: "text-white",
    },

    {
        image: "/4th_floor_rmw/home/banner/rmw-bn-i5.jpg",
        textColor: "text-white",
        highlightColor: "text-black",
        domainColor: "text-black",
        subHeadingColor: "text-white",
    },
];

function NewBanner() {
    const [imgSlide, setImgSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setImgSlide((prev) => (prev + 1) % bannerSlides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const activeSlide = bannerSlides[imgSlide];

    return (
        <section className="w-full relative overflow-hidden">
            <img
                src={activeSlide.image}
                alt="Ritz Media World banner"
                className="w-full h-auto object-cover transition-all duration-500 ease-linear"
            />

            {/* TEXT OVERLAY */}
            <div className="absolute left-[3%] top-[69%] -translate-y-1/2 w-[92%] max-w-[820px]">

                <h1
                    className="font-normal leading-[1.1] tracking-[-0.01em] whitespace-nowrap"
                    style={{
                        fontFamily: "Arial",
                        fontSize: "clamp(20px, 3.2vw, 48px)"
                    }}
                >
                    <span className={activeSlide.highlightColor}>W</span>
                    <span className={activeSlide.textColor}>hoever </span>

                    <span className={activeSlide.highlightColor}>W</span>
                    <span className={activeSlide.textColor}>herever </span>

                    <span className={activeSlide.highlightColor}>W</span>
                    <span className={activeSlide.textColor}>henever</span>

                    <span className={`${activeSlide.domainColor} font-normal`}>
                        .ritzmediaworld.com
                    </span>
                </h1>

                <p
                    className={`mt-[6px] ${activeSlide.subHeadingColor}`}
                    style={{
                        fontFamily: "Arial",
                        fontSize: "clamp(12px, 1.2vw, 20px)",
                        lineHeight: "1.35"
                    }}
                >
                    Your brand keeps working, even when you don’t.
                </p>

            </div>
        </section>
    );
}

export default NewBanner;