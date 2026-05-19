"use client";
import BrandImpactSection2 from "@/components/copy/BrandImpactSection2";
import S7 from "@/components/home-v3/S7";
import Section5 from "@/components/services-v3-subslug/layer-4/Section5";
import { BsArrowUpRight } from "react-icons/bs";
import styles from "@/components/home-v3/services/page.module.css";
import Textimonials from "@/components/influencer-marketing-agency-in-india/Section5";
import React, {useEffect, useState } from "react";
import Process3D from "./3dprocess";
import Services3D from "./Services";
import Faq3D from "./faq";

function Page() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth < 768); // md breakpoint
        };

        checkScreen();
        window.addEventListener("resize", checkScreen);

        return () => window.removeEventListener("resize", checkScreen);
    }, []);
    const images = [
        { id: 1, image: "/services/3drendring/3d1.png" },
        { id: 2, image: "/services/3drendring/3d2.png" },
        { id: 3, image: "/services/3drendring/3d3.png" },
        { id: 4, image: "/services/3drendring/3d4.png" },
        { id: 5, image: "/services/3drendring/3d5.png" },
        { id: 6, image: "/services/3drendring/3d6.png" },
        { id: 7, image: "/services/3drendring/3d7.png" },
        { id: 8, image: "/services/3drendring/3d8.png" },
        { id: 9, image: "/services/3drendring/3d9.png" },
        { id: 10, image: "/services/3drendring/3d10.png" },
        { id: 11, image: "/services/3drendring/3d11.png" },
        { id: 12, image: "/services/3drendring/3d12.png" },
    ];
    const [viewerOpen, setViewerOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openViewer = (index: number) => {
        setCurrentIndex(index);
        setViewerOpen(true);
    };

    const closeViewer = () => {
        setViewerOpen(false);
    };

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <>
            <section      style={{
                backgroundImage: `url(${isMobile
                    ? "/services/3drendring/bannermobile.jpg"
                    : "/services/3drendring/bannerdesktop.jpg"
                    })`,
            }}
                className={`flex w-full min-h-[380px] items-end justify-center 
                    bg-[#0F1640] 
                    bg-cover bg-center bg-no-repeat px-4 pb-10 pt-16 sm:min-h-[420px] sm:px-6 sm:pb-12 md:h-[300px] md:min-h-[300px] md:justify-start md:px-8 md:pb-6 md:pt-0 lg:h-[500px] lg:min-h-[500px] lg:px-12 lg:pb-10 xl:min-h-[515px] xl:pb-14 ${styles.bannerSize}`}
            >
                <div className="flex w-full max-w-[90%] flex-col text-center sm:max-w-[85%] md:max-w-[80%] md:gap-5 md:text-left lg:max-w-none lg:gap-6">
                    <div className="relative mx-auto hidden h-[35px] w-[155px] md:mx-0 md:block lg:h-[37px] lg:w-[165px]">
                        <img
                            src="/home-v3/service-imgs/s1/yellow-reactangle.png"
                            alt="Ritz Media World"
                            title="Ritz Media World"
                            className="h-full w-full object-contain"
                        />
                        <p className="absolute right-6 top-1/2 -translate-y-1/2 text-[12px] font-[700] uppercase text-white sm:text-[13px] md:text-[14px] lg:right-8 lg:text-[16px]">
                            Services
                        </p>
                    </div>

                    <div className="mx-auto max-w-[320px] sm:max-w-[430px] md:mx-0 md:max-w-none md:pl-8 lg:pl-12">
                        <h1 className="mt-0 font-[700] text-[28px] leading-[1.1] text-white sm:text-3xl md:text-[45px] md:leading-[1.2] lg:mt-3 lg:text-[55px] xl:text-[65px]">
                            3D Rendering Services
                        </h1>
                        <p className="mt-3 font-[500] text-[13px] leading-6 text-white sm:text-[14px] sm:leading-7 md:text-[16px] md:leading-8 lg:text-[18px] xl:text-[22px]">
                            Experience photo-realistic 3D exterior renderings that bring your building designs to life.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto w-full max-w-[90%] px-4 py-10 sm:max-w-[85%] sm:px-6 md:max-w-[80%] md:py-14 lg:max-w-7xl">
                <div className="flex w-full flex-col text-center">
                    <p className={`font-[400] text-[#000000] text-lg leading-snug sm:text-xl sm:leading-normal md:text-[18px] md:leading-10 lg:text-[20px] xl:text-[30px] ${styles.fontmontserrat} ${styles.yofText}`}>
                        See It Before It Exists. Sell It Before It’s Built.
                    </p>
                    <p className={`mt-5 font-[400] text-[14px] leading-7 text-[#000000] sm:text-[15px] xl:text-[16px] ${styles.fontopensans}`}>
                        All innovations start as an idea- but they sell when viewed. At Ritz Media World, the vision is crystal clear; to produce imagery which enhances value and influence choice. Our 3D architecture rendering and real estate visualization approach goes above and beyond – seamlessly merging together photorealistic 3D renders, walkthroughs and interior and exterior design visuals, coupled with high-quality CGI, to produce visuals that inspire decision-making and deliver tangible results.
                    </p>
                    <p className={`mt-8 font-[400] text-[14px] leading-7 text-[#000000] sm:text-[15px] xl:text-[16px] ${styles.fontopensans}`}>
                        At Ritz Media World, technology and architecture collide. The outcome is far beyond an image; instead, these high-impact visuals have been developed to improve presentation, attract attention and ensure conversions quicker.
                    </p>
                    <p className={`mt-8 font-[600] text-[16px] leading-7 text-[#000000] sm:text-[15px] xl:text-[16px] ${styles.fontopensans}`}>
                    Experience cutting-edge 3D + AI walkthroughs at 5X speed and 5X lower cost, now available at Ritz Media World - bringing your projects to life faster and more affordably than ever.

                    </p>
                    <a
                        href="https://ritzmediaworld.com/contact.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="mt-10 flex justify-center">
                            <button
                                type="button"
                                className="flex cursor-pointer items-center justify-between gap-3 border-none bg-transparent transition-opacity hover:opacity-80 sm:gap-4"
                            >
                                <p className={`font-[500] text-[16px] text-[#0F1640] xl:text-[18px] ${styles.fontopensans}`}>
                                    Let’s Talk Today
                                </p>
                                <div className="flex h-[36px] w-[36px] items-center justify-center rounded-[50px] bg-[#C99237] text-white sm:h-[38px] sm:w-[38px] lg:h-[40px] lg:w-[40px]">
                                    <BsArrowUpRight className="text-[16px] text-white sm:text-[17px] lg:text-[18px]" />
                                </div>
                            </button>
                        </div>
                    </a>
                </div>
            </section>

            <div>
                <section className="mx-auto w-full max-w-[90%] px-4 py-10 sm:max-w-[85%] sm:px-6 md:max-w-[80%] md:py-14 lg:max-w-7xl">
                    <h2 className="mb-8 text-center text-2xl font-semibold leading-tight text-[#111111] sm:mb-10 sm:text-3xl md:text-[45px] md:leading-tight lg:mb-10 lg:text-[55px]">
                        3D Rendering Showcase
                    </h2>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                        {images.slice(0, 9).map((item, index) => {
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => openViewer(index)}
                                    className="group cursor-pointer overflow-hidden rounded-sm border-0 bg-transparent p-0 text-left"
                                    aria-label={`View 3D render ${index + 1}`}
                                >
                                    <img
                                        src={item.image}
                                        alt={`3D rendering showcase ${index + 1}`}
                                        className=" w-full object-cover transition duration-500 group-hover:scale-105 "
                                    />
                                </button>
                            );
                        })}
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-5 sm:grid-cols-3 sm:gap-5">
                        {images.slice(9, 12).map((item, index) => {
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => openViewer(index + 9)}
                                    className="group cursor-pointer overflow-hidden rounded-sm border-0 bg-transparent p-0 text-left"
                                    aria-label={`View 3D render ${index + 10}`}
                                >
                                    <img
                                        src={item.image}
                                        alt={`3D rendering showcase ${index + 10}`}
                                        className="w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                </button>
                            );
                        })}
                    </div>
                </section>

                {viewerOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-12 sm:px-16"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Image viewer"
                    >
                        <button
                            type="button"
                            onClick={closeViewer}
                            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center text-3xl text-white sm:right-5 sm:top-5 sm:text-5xl"
                            aria-label="Close viewer"
                        >
                            &times;
                        </button>
                        <button
                            type="button"
                            onClick={prevImage}
                            className="absolute left-2 z-10 cursor-pointer p-2 text-3xl font-bold text-white sm:left-6 sm:text-5xl md:left-10"
                            aria-label="Previous image"
                        >
                            &#10094;
                        </button>
                        <img
                            src={images[currentIndex].image}
                            alt={`3D rendering showcase ${currentIndex + 1}`}
                            className="max-h-[80vh] max-w-full object-contain sm:max-h-[85vh] sm:max-w-[90%]"
                        />
                        <button
                            type="button"
                            onClick={nextImage}
                            className="absolute right-2 z-10 cursor-pointer p-2 text-3xl font-bold text-white sm:right-6 sm:text-5xl md:right-10"
                            aria-label="Next image"
                        >
                            &#10095;
                        </button>
                    </div>
                )}
            </div>

            <Services3D />
            <Process3D />
            <Faq3D />
            <Textimonials />
            <Section5 />
            <S7 />
            <div className="pt-5 lg:pt-20">
                <BrandImpactSection2 />
            </div>
        </>
    );
}

export default Page;
