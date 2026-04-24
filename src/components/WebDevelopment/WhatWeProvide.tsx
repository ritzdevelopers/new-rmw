"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GoArrowLeft, GoArrowRight, GoArrowUpRight } from "react-icons/go";
import styles from "./webDevelopment.module.css";
import Image from "next/image";

type ProvideSlide = {
    id: string;
    title: string;
    description: string;
    image: string;
};


export default function WhatWeProvide() {
    const EXPLORE_ARROW_IMAGE =
        "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";


    const slides: ProvideSlide[] = [
        {
            id: "01",
            title: "UI/UX Design",
            description:
                "Good UX isn't just usability. It's about a data-driven UX strategy and conversion-driven UI design. We can deliver the best mobile first responsive designs, intuitive UIs and user-centric digital experience designs, increasing engagement, accessibility and streamlining customer journey with: Wireframing, Prototyping, Usability Testing and Interaction design. We deliver not just traffic, but enhance user retention rates, increase conversion rates and generate tangible ROI.",
            image: "/webDevelopment/ui-ux.jpg",
        },
        {
            id: "02",
            title: "Custom Website Design & Development",
            description:
                "Your business deserves better than a website template. Your business deserves custom website design and full-stack web development designed for performance. Your custom designed websites are responsive and scalable and designed based on your business, customer, and business conversion goals. Our landing pages were created with clean code architecture with the use of a fast loading framework to offer high performance and optimized design for optimal user engagement, search presence, and conversion with the use of each pixel and design element for the benefit of generating leads from clicks.",
            image: "/webDevelopment/Custom-Design-Development.jpg",
        },
        {
            id: "03",
            title: "E-Commerce website development",
            description:
                "E-commerce is about delivering a high-performance online shopping experience. Our e-commerce solutions cover custom e-commerce development, secure payment gateway integration, shopping cart optimization, mobile commerce readiness, SEO optimization, speed optimization, product UX design, and conversion funnels. We develop conversion-driven e-commerce sites that increase online sales, customer retention, and lifetime value to build your trustworthy and scalable digital store.",
            image: "/webDevelopment/E-Com-Web-Dev.jpg",
        },
        {
            id: "04",
            title: "Landing page development ",
            description:
                "Our landing pages are designed for you by using conversion rate optimization (CRO), A/B testing, performance marketing, and SEO friendly designs. We engineer your landing pages to have high click-through rates, high quality leads, and excellent campaign ROI through mobile responsiveness and optimizing the conversion of your landing page to acquire quality leads.",
            image: "/webDevelopment/LandingPageDev.jpg",
            // image: "/webDevelopment/WordPress-Web-Design.jpg",
        },
        {
            id: "05",
            title: "WordPress Web Design",
            description: "A robust, flexible and SEO optimized custom WordPress design and development for smart online businesses. We specialize in custom WordPress designs that are fully responsive, easy to use and manage (CMS based), search engine friendly with clean coded and plugin integrated, to get a performant, conversion focused, smart WordPress website to drive leads and sales through content marketing.",
            image: "/webDevelopment/WordPress-Web-Design.jpg",
        },

    ];

    const HEADING = "What We Provide";
    const SUBHEADING = "Is more than what you'll ever need";

    const slideTransition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 48 : -48,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 48 : -48,
            opacity: 0,
        }),
    };
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const activeSlide = useMemo(() => slides[activeIndex], [activeIndex]);

    const goPrev = () => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const goNext = () => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % slides.length);
    };

    return (
        <section className={`w-full  py-6 md:py-10  lg:py-14 border-t border-[#D9D9D9] ${styles.page_containerWidth} `}>
            <div className={`${styles.page_containerWidth} mx-auto px-4 md:px-10 lg:px-10 xl:px-13`}>
                <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3 xl:grid-cols-[1.1fr_1fr_1.1fr] xl:gap-6">
                    <div className="md:col-span-2 lg:col-span-1 text-center md:text-left">
                        <p className={`text-[16px] text-[#C99237] ${styles.poppinsMedium}`}>SERVICES</p>
                        <h2 className={`mt-1  text-[26px]  md:text-[30px] lg:text-[30px] xl:text-[36px]    leading-[1.1] text-[#0A0A0A]   ${styles.montserratBold}
`}>
                            {HEADING}
                        </h2>
                        <p className={`mt-1 text-[16px] font-[400] text-[#101010] ${styles.fontopensans}`}>{SUBHEADING}</p>
                        <div className="mt-4 flex w-full items-center justify-center md:justify-end gap-6 md:hidden">
                            <div className="relative ">
                                <AnimatePresence mode="wait" initial={false} custom={direction}>
                                    <motion.p
                                        key={activeIndex}
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={slideTransition}
                                        className={`text-[16px] font-[500] ${styles.fontopensans} will-change-transform`}
                                    >
                                        <span className="text-black">
                                            {String(activeIndex + 1).padStart(2, "0")}
                                        </span>
                                        <span className="text-[#888888]">  {" / "}</span>
                                        <span className="text-[#888888]">
                                            {String(slides.length).padStart(2, "0")}
                                        </span>
                                    </motion.p>
                                </AnimatePresence>
                            </div>
                            <button
                                onClick={goPrev}
                                type="button"
                                aria-label="Previous slide"
                                className="transition-opacity hover:opacity-70 cursor-pointer"
                            >
                                <Image
                                    src="/webDevelopment/arrow-left.png"
                                    alt="Previous"
                                    width={27}
                                    height={27}
                                    className="w-[20px] md:w-[27px] h-[20px] md:h-[27px]"
                                />
                            </button>
                            <button
                                onClick={goNext}
                                type="button"
                                aria-label="Next slide"
                                className="transition-opacity hover:opacity-70 cursor-pointer"
                            >
                                <Image
                                    src="/webDevelopment/arrow-right.png"
                                    alt="Next"
                                    width={27}
                                    height={27}
                                    className="w-[20px] md:w-[27px] h-[20px] md:h-[27px]"
                                />
                            </button>
                        </div>

                        <div className="relative mt-5 md:mt-6 lg:mt-55 xl:mt-44 border-t-0 lg:border-t border-[#D9D9D9] pt-5">
                            <AnimatePresence mode="wait" initial={false} custom={direction}>
                                <motion.div
                                    key={activeIndex}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={slideTransition}
                                    className="will-change-transform"
                                >
                                    <p className={`text-[20px] text-[#111111] ${styles.montserrat}`}>
                                        <span className="mb-1 block text-[16px] font-[500] md:mr-4 md:mb-0 md:inline">{activeSlide.id}</span>
                                        <span className="text-14px md:text-[20px] lg:text-[15px] xl:text-[26px] font-[600]">{activeSlide.title}</span>
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="relative mx-auto w-full  h-[368px] sm:h-[360px] md:h-[420px] lg:h-[450px] xl:h-[480px] max-w-[280px] sm:max-w-[320px] md:max-w-[340px] overflow-hidden rounded-[80px] sm:rounded-[100px] md:rounded-[120px] xl:rounded-[140px]
">
                        <AnimatePresence mode="wait" initial={false} custom={direction}>
                            <motion.img
                                key={activeIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={slideTransition}
                                src={activeSlide.image}
                                alt={activeSlide.title}
                                className="absolute inset-0 h-full w-full object-cover will-change-transform"
                            />
                        </AnimatePresence>
                    </div>

                    <div className="flex min-h-0 flex-col text-center md:text-left">
                        <div className="relative min-h-[160px] sm:min-h-[180px] md:min-h-[200px]">
                            <AnimatePresence mode="wait" initial={false} custom={direction}>
                                <motion.div
                                    key={activeIndex}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={slideTransition}
                                    className="will-change-transform"
                                >
                                    <p className={` text-[14px] sm:text-[15px] md:text-[15px] lg:text-[15px]  xl:text-[16px] leading-[1.6] sm:leading-[1.7]   text-[#111111] ${styles.fontopensans}
`}>
                                        {activeSlide.description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className=" mt-0 sm:mt-10 md:mt-12   flex flex-col sm:flex-row    items-center md:items-start sm:items-center  justify-between gap-4  border-0 md:border-t border-[#D8D8D8]   pt-4">
                            <div className="flex items-center justify-center md:justify-start gap-4 md:gap-4 lg:gap-4 xl:gap-6 ">
                                <span className={`
                        text-[16px] md:text-[16px] lg:text-[15px] xl:text-[18px] font-[500]  ${styles.montserrat}
                    `}>
                                    Learn more
                                </span>

                                <div className="
                                    w-[30px] h-[30px]
                                    sm:w-[34px] sm:h-[34px]
                                    md:w-[36px] md:h-[36px]
                                    bg-[#C99237] rounded-full 
                                    flex items-center justify-center cursor-pointer
                                ">
                                    <img src={EXPLORE_ARROW_IMAGE} alt="Explore Arrow" />
                                </div>
                            </div>

                            <div className="hidden md:flex items-center justify-between w-full sm:w-auto gap-6 lg:gap-4 xl:gap-6">
                                <div className="relative ">
                                    <AnimatePresence mode="wait" initial={false} custom={direction}>
                                        <motion.p
                                            key={activeIndex}
                                            custom={direction}
                                            variants={slideVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={slideTransition}
                                            className={`text-[16px] font-[500] ${styles.fontopensans} will-change-transform`}
                                        >
                                            {/* Active index (BLACK) */}
                                            <span className="text-black">
                                                {String(activeIndex + 1).padStart(2, "0")}
                                            </span>

                                            <span className="text-[#888888]">  {" / "}</span>

                                            {/* Total slides (GRAY) */}
                                            <span className="text-[#888888]">
                                                {String(slides.length).padStart(2, "0")}
                                            </span>
                                        </motion.p>
                                    </AnimatePresence>
                                </div>
                                <button
                                    onClick={goPrev}
                                    type="button"
                                    aria-label="Previous slide"
                                    className="transition-opacity hover:opacity-70 cursor-pointer"
                                >
                                    <Image
                                        src="/webDevelopment/arrow-left.png"
                                        alt="Previous"
                                        width={27}
                                        height={27}
                                        className="w-[20px] xl:w-[27px] h-[20px] xl:h-[27px]"
                                    />
                                </button>

                                <button
                                    onClick={goNext}
                                    type="button"
                                    aria-label="Next slide"
                                    className="transition-opacity hover:opacity-70 cursor-pointer"
                                >
                                    <Image
                                        src="/webDevelopment/arrow-right.png"
                                        alt="Next"
                                        width={27}
                                        height={27}
                                        className="w-[20px] xl:w-[27px] h-[20px] xl:h-[27px]"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
