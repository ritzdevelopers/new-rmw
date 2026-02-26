"use client"

import S3Card from "./cards/S3Card";
import { BsArrowLeft } from "react-icons/bs";
import styles from "./page.module.css";
import { useState } from "react";

function Section3() {

    const cardsData = [
        {
            tile: "Advertisement Design",
            para: "Your brand is more than a logo—it’s a promise. We strategically craft identities that resonate, impress, and persuade customers long-term. Combining insightful positioning with imaginative visuals, we make your brand memorable, authentic, and compelling enough to command loyalty in crowded markets.",
            imgPath: "/service-v3/print-advertising/s3/Ad-Scheduling-S.png",
            bigImgPath: "",
        },
        {
            tile: "Ad Placement",
            para: "Your brand is more than a logo—it’s a promise. We strategically craft identities that resonate, impress, and persuade customers long-term. Combining insightful positioning with imaginative visuals, we make your brand memorable, authentic, and compelling enough to command loyalty in crowded markets.",
            imgPath: "/service-v3/print-advertising/s3/Ad-Placement-S.png",
            bigImgPath: "",
        },
        {
            tile: "Copywriting",
            para: "Your brand is more than a logo—it’s a promise. We strategically craft identities that resonate, impress, and persuade customers long-term. Combining insightful positioning with imaginative visuals, we make your brand memorable, authentic, and compelling enough to command loyalty in crowded markets.",
            imgPath: "/service-v3/print-advertising/s3/Copywriting-S.png",
            bigImgPath: "",
        },
        {
            tile: "Cost Negotiation",
            para: "Your brand is more than a logo—it’s a promise. We strategically craft identities that resonate, impress, and persuade customers long-term. Combining insightful positioning with imaginative visuals, we make your brand memorable, authentic, and compelling enough to command loyalty in crowded markets.",
            imgPath: "/service-v3/print-advertising/s3/Cost-Negotiation-S.png",
            bigImgPath: "",
        },
        {
            tile: "Ad Size Optimization",
            para: "Your brand is more than a logo—it’s a promise. We strategically craft identities that resonate, impress, and persuade customers long-term. Combining insightful positioning with imaginative visuals, we make your brand memorable, authentic, and compelling enough to command loyalty in crowded markets.",
            imgPath: "/service-v3/print-advertising/s3/Ad-Size-Optimization.png",
            bigImgPath: "",
        },
        {
            tile: "Ad Scheduling",
            para: "Your brand is more than a logo—it’s a promise. We strategically craft identities that resonate, impress, and persuade customers long-term. Combining insightful positioning with imaginative visuals, we make your brand memorable, authentic, and compelling enough to command loyalty in crowded markets.",
            imgPath: "/service-v3/print-advertising/s3/Ad-Scheduling-S.png",
            bigImgPath: "",
        },
    ];

    const [activeCard, setActiveCard] = useState(0);
    const [activeCardImg, setActiveCardImg] = useState("/service-v3/print-advertising/s3/Advertisement-Design-B.jpg");
    return (
        <section className="w-full justify-center items-center py-8 sm:py-12 md:py-14 xl:py-[70px] border-t border-b border-[#E5E5E5]">
            {/* Centered Align Container  */}
            <div className={`w-full flex flex-col gap-4 sm:gap-6 ${styles.containerWidth2} px-4 sm:px-6 md:pl-8 xl:pl-10`}>
                {/* Top Container  */}
                <div className="w-full flex flex-col justify-center items-center text-center">
                    <p className={`font-[600] text-[14px] sm:text-[16px] uppercase text-[#C99237] ${styles.fontpopins}`}>
                        Services
                    </p>
                    <h2 className={`font-[700] text-[24px] sm:text-[28px] md:text-[32px] xl:text-[36px] ${styles.fontmontserrat}`}>
                        What We Provide
                    </h2>
                    <p className={`font-[400] text-[14px] sm:text-[16px] ${styles.fontopensans}`}>
                        Is more than what you’ll ever need
                    </p>

                </div>

                {/* Bottom Slider Container  */}
                <div className="w-full flex flex-col lg:flex-row justify-between gap-4 sm:gap-6 lg:gap-4 xl:gap-6 items-stretch lg:items-start">
                    {/* Left Side Container  */}
                    <div className="w-full min-w-0 lg:flex-1 lg:min-w-0">
                        {
                            Array.from({ length: 6 }).map((_, index) => (
                                <S3Card setActiveCard={setActiveCard} activeCard={activeCard} setActiveCardImg={setActiveCardImg} index={index} key={index} data={cardsData[index] as { tile: string; para: string; imgPath: string, bigImgPath: string }} />
                            ))
                        }
                    </div>

                    {/* Right Side Container  */}
                    <div className="w-full hidden lg:block min-w-0 lg:w-[400px] xl:w-[560px] lg:flex-shrink-0 relative">
                        {/* Absolute Positioned Container  */}
                        <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-[50px] lg:h-[50px] xl:w-[58px] xl:h-[58px] absolute top-4 left-2 sm:top-8 sm:left-4 lg:top-12 lg:-left-3 xl:top-20 xl:-left-5 rounded-full overflow-hidden flex justify-center items-center bg-[#C99237] cursor-pointer">
                            <svg className="w-5 h-[18px] sm:w-6 sm:h-5 lg:w-7 lg:h-6 xl:w-8 xl:h-[29px]" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28.1701 4.23947L24.8452 13.1667L18.7764 5.82364L28.1701 4.23947Z" fill="white" />
                                <rect x="3.18524" y="24.2398" width="24" height="1" transform="rotate(-39.5724 3.18524 24.2398)" fill="white" />
                            </svg>
                        </div>

                        {/* Main Image Container  */}
                        <div className="w-full"><img src="/service-v3/print-advertising/s3/Advertisement-Design-B.jpg" alt="" className="w-full h-auto object-cover" /></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Section3;