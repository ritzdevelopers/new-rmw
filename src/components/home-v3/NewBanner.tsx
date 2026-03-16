"use client";
import { useEffect, useState } from "react";

const bannerSlides = [
    {
        desktop: "/4th_floor_rmw/home/banner/bn1.jpg",
        mobile: "/4th_floor_rmw/home/banner/bn-1-mobile.png",
        textColor: "text-[#0A3B3B]",
        highlightColor: "text-white",
        domainColor: "text-white",
        subHeadingColor: "text-white",
    },

    {
        desktop: "/4th_floor_rmw/home/banner/bn2.jpg",
        mobile: "/4th_floor_rmw/home/banner/bn-2-mobile.png",
        textColor: "text-white",
        highlightColor: "text-[#C99237]",
        domainColor: "text-[#C99237]",
        subHeadingColor: "text-white",
    },

    {
        desktop: "/4th_floor_rmw/home/banner/bn3.jpg",
        mobile: "/4th_floor_rmw/home/banner/bn-3-mobile.png",
        textColor: "text-white",
        highlightColor: "text-black",
        domainColor: "text-black",
        subHeadingColor: "text-white",
    },

    {
        desktop: "/4th_floor_rmw/home/banner/bn5.jpg",
        mobile: "/4th_floor_rmw/home/banner/bn-4-mobile.png",
        textColor: "text-white",
        highlightColor: "text-[#C99237]",
        domainColor: "text-[#C99237]",
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
                src={activeSlide.desktop}
                alt="Ritz Media World banner"
                className="hidden md:block w-full h-auto object-cover transition-all duration-500 ease-linear"
            />
            <img
                src={activeSlide.mobile}
                alt="Ritz Media World banner"
                className="block md:hidden w-full h-auto object-cover transition-all duration-500 ease-linear"
            />

            {/* TEXT OVERLAY */}
            {/* TEXT OVERLAY */}
            <div className="
absolute
left-[5%]
top-[38%]
md:top-[55%]
-translate-y-1/2
w-[90%]
max-w-[820px]
text-left
md:left-[5%]
md:translate-x-0
md:text-left
">

                <h1
                    className="
leading-[1.15]
tracking-[-0.01em]

font-bold
text-[17px]

sm:text-[22px]

md:text-[18px]
lg:text-[33px]
md:font-normal
"
                    style={{ fontFamily: "Arial" }}
                >
                    <span className={`${activeSlide.highlightColor} font-bold`}>W</span>
                    <span className={`${activeSlide.textColor} font-bold md:font-light`}>hoever </span>

                    <span className={`${activeSlide.highlightColor} font-bold`}>W</span>
                    <span className={`${activeSlide.textColor} font-bold md:font-light`}>herever </span>

                    <span className={`${activeSlide.highlightColor} font-bold`}>W</span>
                    <span className={`${activeSlide.textColor} font-bold md:font-light`}>henever</span>

                    <span className={`${activeSlide.textColor} md:hidden`}>.</span>

                    <span className={`${activeSlide.domainColor} block md:inline font-bold md:font-normal`}>
                        <span className="hidden md:inline">.</span>ritzmediaworld.com
                    </span>
                </h1>

                <p
                    className={`
mt-[6px]
text-[11px]
sm:text-[14px]
md:text-[12px]
lg:text-[17px]
xl:text-[20px]
${activeSlide.subHeadingColor}
`}
                    style={{
                        fontFamily: "Arial",
                        lineHeight: "1.35"
                    }}
                >
                    Your brand keeps working,<br className="md:hidden" />{" "}even when you don’t.
                </p>

            </div>
        </section>
    );
}

export default NewBanner;