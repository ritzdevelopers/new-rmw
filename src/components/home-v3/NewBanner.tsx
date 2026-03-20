"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { gsap } from "gsap";
import styles from "./NewBanner.module.css";

type BannerSlideConfig = {
    desktop: string;
    mobile: string;
    textColor: string;
    highlightColor: string;
    domainColor: string;
    subHeadingColor: string;
};

const bannerSlides = [
    {
        desktop: "/4th_floor_rmw/home/banner/bn1.jpg",
        mobile: "/4th_floor_rmw/home/banner/mobile-bn1.jpg",
        textColor: "text-[#0A3B3B]",
        highlightColor: "text-white",
        domainColor: "text-white",
        subHeadingColor: "text-white",
    },
    {
        desktop: "/4th_floor_rmw/home/banner/bn2.jpg",
        mobile: "/4th_floor_rmw/home/banner/mobile-bn2.jpg",
        textColor: "text-white",
        highlightColor: "text-[#C99237]",
        domainColor: "text-[#C99237]",
        subHeadingColor: "text-white",
    },
    {
        desktop: "/4th_floor_rmw/home/banner/bn3.jpg",
        mobile: "/4th_floor_rmw/home/banner/mobile-bn3.jpg",
        textColor: "text-white",
        highlightColor: "text-[#0F173E]",
        domainColor: "text-[#0F173E]",
        subHeadingColor: "text-white",
    },
    {
        desktop: "/4th_floor_rmw/home/banner/bn5.jpg",
        mobile: "/4th_floor_rmw/home/banner/mobile-bn5.jpg",
        textColor: "text-white",
        highlightColor: "text-[#C99237]",
        domainColor: "text-[#C99237]",
        subHeadingColor: "text-white",
    },
];

type BannerPhase = "lines" | "done";

function AnimatedBannerText({
    slide,
    shouldAnimate,
    gatewayStarted,
    onAnimationComplete,
}: {
    slide: BannerSlideConfig;
    shouldAnimate: boolean;
    gatewayStarted: boolean;
    onAnimationComplete?: () => void;
}) {
    const [phase, setPhase] = useState<BannerPhase>("lines");
    const [typedDomain, setTypedDomain] = useState("");
    const mainRefs = useRef<HTMLSpanElement[]>([]);
    const subRef = useRef<HTMLSpanElement>(null);
    const lineGroupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!shouldAnimate) return;

        const lineGroup = lineGroupRef.current;
        const mainEls = mainRefs.current.filter(Boolean);
        const subEl = subRef.current;

        if (!lineGroup || !mainEls.length || !subEl) return;

        setPhase("lines");

        gsap.set(mainEls, { y: 42, opacity: 0 });
        gsap.set(subEl, { y: 34, opacity: 0 });
        gsap.set(lineGroup, { scaleX: 1, scaleY: 1, opacity: 1 });

        const tl = gsap.timeline();

        tl.to(mainEls, {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.45,
            ease: "power3.out",
        })
            .to(
                subEl,
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                },
                "-=0.2"
            )
            .add(() => {
                setPhase("done");
                onAnimationComplete?.();
            });

        return () => {
            gsap.killTweensOf(mainEls);
            gsap.killTweensOf(subEl);
            gsap.killTweensOf(lineGroup);
            tl.kill();
        };
    }, [shouldAnimate, onAnimationComplete]);

    const showStaticLines = phase === "lines" && !shouldAnimate;

    return (
        <div
            className="
                absolute left-[5%] top-[38%] md:top-[55%] -translate-y-1/2
                w-[90%] max-w-[820px] text-left md:left-[5%] md:translate-x-0 md:text-left
            "
            style={{
                opacity: gatewayStarted ? 1 : 0,
                transition: "opacity 200ms ease",
            }}
        >
            <div
                ref={lineGroupRef}
                className={`${phase === "lines" ? "opacity-100" : "opacity-0 pointer-events-none"} transition-opacity duration-200`}
            >
                <h1
                    className="
                        leading-[1.15] tracking-[-0.01em]
                        text-[17px] sm:text-[22px] md:text-[18px] lg:text-[33px]
                    "
                    style={{ fontFamily: "Arial" }}
                >
                    {["Whoever", "Wherever", "Whenever"].map((word, idx) => (
                        <span
                            key={word}
                            ref={(el) => {
                                if (el) mainRefs.current[idx] = el;
                            }}
                            className={`inline-block mr-1 md:mr-2 font-bold md:font-normal ${
                                showStaticLines ? "" : "will-change-transform"
                            }`}
                        >
                            <span className={`${slide.highlightColor} font-bold`}>W</span>
                            <span className={`${slide.textColor} font-bold md:font-light`}>{word.slice(1)}</span>
                        </span>
                    ))}
                </h1>

                <p
                    className={`
                        mt-[6px]
                        text-[11px] sm:text-[14px] md:text-[12px] lg:text-[17px] xl:text-[20px]
                        ${slide.subHeadingColor}
                    `}
                    style={{ fontFamily: "Arial", lineHeight: "1.35" }}
                >
                    <span
                        ref={subRef}
                        className={`inline-block ${shouldAnimate ? "will-change-transform" : ""}`}
                    >
                        Your brand keeps working, even when you don’t.
                    </span>
                </p>
            </div>

        </div>
    );
}

function NewBanner() {
    const [activeSlide, setActiveSlide] = useState(0);
    const [gatewayStarted, setGatewayStarted] = useState(false);
    const [playToken, setPlayToken] = useState(0);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleGatewayHideStart = () => {
            setGatewayStarted(true);
            setPlayToken((prev) => prev + 1);
        };

        const runtimeWindow = window as Window & { __rmwGatewayHideStarted?: boolean };
        if (
            runtimeWindow.__rmwGatewayHideStarted ||
            sessionStorage.getItem("rmw_gateway_hide_started") === "true"
        ) {
            handleGatewayHideStart();
        }

        window.addEventListener("rmw:gateway-hide-start", handleGatewayHideStart);
        return () => {
            window.removeEventListener("rmw:gateway-hide-start", handleGatewayHideStart);
        };
    }, []);

    useEffect(() => {
        if (!gatewayStarted) return;
        setPlayToken((prev) => prev + 1);
    }, [activeSlide, gatewayStarted]);

    return (
        <section className="w-full relative overflow-hidden">
            <Swiper
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                modules={[Pagination, Autoplay]}
                className={`${styles.bannerSwiper} w-full h-full`}
                onSwiper={(swiper) => setActiveSlide(swiper.realIndex)}
                onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
                loop
            >
                {bannerSlides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full">
                            <img
                                src={slide.desktop}
                                alt="Ritz Media World banner"
                                className="hidden md:block w-full h-auto object-cover"
                            />
                            <img
                                src={slide.mobile}
                                alt="Ritz Media World banner"
                                className="block md:hidden w-full h-auto object-cover"
                            />

                            <AnimatedBannerText
                                key={`${index}-${playToken}`}
                                slide={slide}
                                gatewayStarted={gatewayStarted}
                                shouldAnimate={gatewayStarted && index === activeSlide}
                                onAnimationComplete={() => undefined}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}

export default NewBanner;
