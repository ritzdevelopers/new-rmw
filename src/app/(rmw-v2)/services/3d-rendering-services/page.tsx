"use client";
import BrandImpactSection2 from "@/components/copy/BrandImpactSection2";
import S7 from "@/components/home-v3/S7";
import Section5 from "@/components/services-v3-subslug/layer-4/Section5";

import Link from "next/link";
import Image from "next/image";
import styles from "@/components/home-v3/services/page.module.css";
import Textimonials from "@/components/influencer-marketing-agency-in-india/Section5";
import React, { useEffect, useState } from "react";
import Process3D from "./3dprocess";
import Services3D from "./Services";
import Faq3D from "./faq";

function Page() {
    const EXPLORE_ARROW_IMAGE =
        "/service-v3/celebrity-endorsements/s3/group-105398-1.svg";
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
            <section style={{
                backgroundImage: `url(${isMobile
                    ? "/services/3drendring/bannermobile.jpg"
                    : "/services/3drendring/bannerdesktop.jpg"
                    })`,
            }}
                className="flex w-full min-w-0 min-h-[460px] items-start justify-center overflow-visible bg-[#0a1128] bg-[url('/varunimage/banner-of-render-%20services-mobile.jpg')] bg-cover bg-center bg-no-repeat px-6 pt-18 pb-10 sm:min-h-[400px] sm:px-10 sm:pb-12 md:min-h-[300px] md:items-end md:justify-start md:bg-[url('/varunimage/banner-of-render-%20services.jpg')] md:px-0 md:pt-40 md:pb-14 lg:min-h-[500px] xl:min-h-[570px] lg:px-0 lg:pt-44 lg:pb-16 xl:px-0 xl:pt-48 xl:pb-20 ">
                <div className="flex w-full max-w-4xl flex-col items-center gap-1 text-center md:translate-y-[50px] md:items-start md:gap-2 md:text-left lg:gap-3 xl:gap-5">
                    <div className="relative hidden h-[32px] w-[140px] md:block md:h-[37px] md:w-[170px]">
                        <img
                            src="/home-v3/service-imgs/s1/yellow-reactangle.png"
                            alt=""
                            className="h-full w-full object-contain"
                        />
                        <p
                            className={`absolute top-1/2 right-6 -translate-y-1/2 text-[12px] font-bold uppercase tracking-wide text-white sm:right-7 sm:text-[14px] md:right-8 md:text-[16px] ${styles.fontmontserrat}`}
                        >
                            SERVICES
                        </p>
                    </div>


                    <h1
                        className={`text-[32px] font-extrabold leading-[1.1] text-white sm:text-[40px] md:text-[26px] lg:text-[30px] xl:text-[55px] lg:leading-[1.08] xl:px-14 lg:px-13 md:px-12 ${styles.bannerHeadlineSm}`}
                        style={{ fontFamily: "MontserratExtraBold, Montserrat, sans-serif" }}
                    >
                        <span className="block">3D Rendering Services</span>

                    </h1>

                    <p
                        className=" text-[14px] font-normal leading-[1.5] text-white sm:text-[16px] md:text-[13px] lg:text-[15px] lg:leading-[1.45] xl:whitespace-nowrap xl:px-14 lg:px-13 md:px-12 xl:text-[22px]"
                        style={{ fontFamily: "MontserratMedium, Montserrat, sans-serif" }}
                    >
                        Experience photo-realistic 3D exterior renderings that bring your building designs to life.
                    </p>


                </div>
            </section>



            <section className="flex w-full justify-center bg-white px-4 py-[35px] sm:px-6 md:py-[70px]">
                <div className="mx-auto flex w-full  flex-col items-center text-center">
                    <h2
                        className="text-[18px] leading-[25px] text-[#000000] sm:text-[28px] sm:leading-[40px] lg:text-[30px] md:leading-[42px] md:text-[25px]"
                        style={{
                            fontFamily: "MontserratRegular, Montserrat, sans-serif",
                            fontWeight: 400,
                            letterSpacing: 0,
                        }}
                    >
                        See It Before It Exists. Sell It Before It’s Built.
                    </h2>

                    <p
                        className=" mt-2 lg:mt-4 xl:mt-6 text-[14px] leading-[26px] text-[#000000] sm:mt-7 sm:text-[16px] sm:leading-[28px] md:mt-4 max-w-[1050px]"
                        style={{
                            fontFamily: "OpenSansRegular, Open Sans, sans-serif",
                            fontWeight: 400,
                            letterSpacing: 0,
                        }}
                    >
                        All innovations start as an idea- but they sell when viewed. At Ritz Media World, the vision is crystal clear; to produce imagery which enhances value and influence choice. Our 3D architecture rendering and real estate visualization approach goes above and beyond – seamlessly merging together photorealistic 3D renders, walkthroughs and interior and exterior design visuals, coupled with high-quality CGI, to produce visuals that inspire decision-making and deliver tangible results.
                    </p>

                    <p
                        className="mt-5 lg:mt-4 xl:mt-5 text-[14px] max-w-[1050px] leading-[26px] text-[#000000] md:mt-4 sm:text-[16px] sm:leading-[28px]"
                        style={{
                            fontFamily: "OpenSansRegular, Open Sans, sans-serif",
                            fontWeight: 400,
                            letterSpacing: 0,
                        }}
                    >
                        At Ritz Media World, technology and architecture collide. The outcome is far beyond an image; instead, these high-impact visuals have been developed to improve presentation, attract attention and ensure conversions quicker.

                    </p>

                    <p
                        className="mt-6 lg:mt-4 xl:mt-6 max-w-[850px] text-[14px] leading-[26px] text-[#000000]  sm:text-[16px] sm:leading-[28px] md:mt-5"
                        style={{
                            fontFamily: "OpenSansSemiBold, Open Sans, sans-serif",
                            fontWeight: 600,
                            letterSpacing: 0,
                        }}
                    >
                        Experience cutting-edge 3D + AI walkthroughs at 5X speed and 5X lower cost, now available at Ritz Media World - bringing your projects to life faster and more affordably than ever.
                    </p>

                    <div className="md:mt-4 lg:mt-6 xl:mt-8 flex items-center justify-center gap-4 sm:mt-10">
                        <Link
                            href="/contact.html"
                            target="_blank"
                            aria-label="Let's Talk Today"
                            className="text-[18px] font-medium text-[#0F1640] transition-colors  md:text-[20px]"
                            style={{ fontFamily: "MontserratMedium, Montserrat, sans-serif" }}
                        >
                            Let&apos;s Talk Today
                        </Link>
                        <Link
                            href="/contact.html"
                            target="_blank"
                            aria-label="Let's Talk Today"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C99237] transition-colors hover:bg-[#0F1640] sm:h-11 sm:w-11"
                        >
                            <Image src={EXPLORE_ARROW_IMAGE}
                                alt=""
                                width={22}
                                height={20}
                            />
                        </Link>
                    </div>
                </div>
            </section>
            <div>
                <section className="w-full bg-white px-0 pb-[35px] sm:px-0 lg:pb-[70px]">
                    <div className={`mx-auto w-full ${styles.containerWidth}`}>
                        <h2
                            className="mb-8 text-center md:text-[45px] text-[45px] 
          font-semibold leading-[36px] font-weight-600 text-[#000000] sm:mb-10 sm:text-[28px] md:mb-10
     md:leading-[42px] lg:mb-12"
                            style={{
                                fontFamily: "MontserratRegular, Montserrat, sans-serif",
                                fontWeight: 400,
                            }}
                        >
                            3D Rendering Showcase
                        </h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                            {images.slice(0, 8).map((item, index) => {
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
